import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { config } from '../config';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

interface RateLimitEntry {
  timestamps: number[];
}

interface RateLimitData {
  [identifier: string]: RateLimitEntry;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const RATE_LIMIT_FILE = path.join(process.cwd(), 'tmp', 'rate-limit.json');
const RATE_LIMIT_WINDOW = config.rateLimit.windowMs;
const MAX_REQUESTS = config.rateLimit.maxRequests;

async function ensureTmpDir() {
  const tmpDir = path.dirname(RATE_LIMIT_FILE);
  try {
    await mkdir(tmpDir, { recursive: true });
  } catch {
    // Directory might already exist, ignore error
  }
}

async function readRateLimitData(): Promise<RateLimitData> {
  try {
    await ensureTmpDir();
    const data = await readFile(RATE_LIMIT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeRateLimitData(data: RateLimitData): Promise<void> {
  await ensureTmpDir();
  await writeFile(RATE_LIMIT_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function cleanupExpiredEntries(data: RateLimitData, now: number): RateLimitData {
  const cleaned: RateLimitData = {};
  
  for (const [identifier, entry] of Object.entries(data)) {
    const validTimestamps = entry.timestamps.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );
    
    if (validTimestamps.length > 0) {
      cleaned[identifier] = { timestamps: validTimestamps };
    }
  }
  
  return cleaned;
}

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const now = Date.now();
  
  let data = await readRateLimitData();
  
  data = cleanupExpiredEntries(data, now);
  
  const entry = data[identifier] || { timestamps: [] };
  const validTimestamps = entry.timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );
  
  const remaining = Math.max(0, MAX_REQUESTS - validTimestamps.length);
  
  const oldestTimestamp = validTimestamps[0] || now;
  const reset = oldestTimestamp + RATE_LIMIT_WINDOW;
  
  if (validTimestamps.length >= MAX_REQUESTS) {
    return {
      success: false,
      limit: MAX_REQUESTS,
      remaining: 0,
      reset,
    };
  }
  
  validTimestamps.push(now);
  data[identifier] = { timestamps: validTimestamps };
  
  await writeRateLimitData(data);
  
  return {
    success: true,
    limit: MAX_REQUESTS,
    remaining: remaining - 1,
    reset,
  };
}

export async function resetRateLimit(identifier: string): Promise<void> {
  const data = await readRateLimitData();
  delete data[identifier];
  await writeRateLimitData(data);
}
