import * as Sentry from "@sentry/nextjs";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LoggerConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  enableDebug: boolean;
  enableInfo: boolean;
  minLevel: LogLevel;
  enableStructuredLogs: boolean;
}

interface LogMetadata {
  context?: string;
  requestId?: string;
  userId?: string;
  [key: string]: unknown;
}

interface StructuredLog {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  requestId?: string;
  data?: unknown;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private config: LoggerConfig;
  private requestId: string | null = null;

  constructor() {
    const logLevel = (process.env.LOG_LEVEL as LogLevel) || "debug";
    
    this.config = {
      isDevelopment: process.env.NODE_ENV === "development",
      isProduction: process.env.NODE_ENV === "production",
      enableDebug: process.env.NODE_ENV === "development",
      enableInfo: process.env.NODE_ENV === "development",
      minLevel: logLevel,
      enableStructuredLogs: process.env.STRUCTURED_LOGS === "true",
    };
  }

  setRequestId(requestId: string): void {
    this.requestId = requestId;
  }

  clearRequestId(): void {
    this.requestId = null;
  }

  generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.config.minLevel];
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: string
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : "";
    const requestIdStr = this.requestId ? `[${this.requestId}]` : "";
    return `${timestamp} ${level.toUpperCase()} ${requestIdStr}${contextStr} ${message}`;
  }

  private createStructuredLog(
    level: LogLevel,
    message: string,
    data?: unknown,
    context?: string,
    error?: Error
  ): StructuredLog {
    const log: StructuredLog = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    if (context) log.context = context;
    if (this.requestId) log.requestId = this.requestId;
    if (data !== undefined) log.data = data;
    if (error) {
      log.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    return log;
  }

  private output(
    level: LogLevel,
    message: string,
    data?: unknown,
    context?: string,
    error?: Error
  ): void {
    if (this.config.enableStructuredLogs) {
      const structuredLog = this.createStructuredLog(
        level,
        message,
        data,
        context,
        error
      );
      const logMethod = level === "error" ? console.error : 
                       level === "warn" ? console.warn : 
                       level === "debug" ? console.debug : console.log;
      logMethod(JSON.stringify(structuredLog));
    } else {
      const formattedMessage = this.formatMessage(level, message, context);
      const logData = error || data;
      
      switch (level) {
        case "error":
          console.error(formattedMessage, logData || "");
          break;
        case "warn":
          console.warn(formattedMessage, logData || "");
          break;
        case "debug":
          console.debug(formattedMessage, logData || "");
          break;
        default:
          console.log(formattedMessage, logData || "");
      }
    }
  }

  private sendToSentry(
    level: LogLevel,
    message: string,
    data?: unknown,
    error?: Error
  ): void {
    if (!this.config.isProduction) {
      return;
    }

    try {
      if (level === "error") {
        const errorToCapture = error || new Error(message);
        Sentry.captureException(errorToCapture, {
          extra: {
            originalMessage: message,
            data,
            requestId: this.requestId,
          },
        });
      } else if (level === "warn") {
        Sentry.addBreadcrumb({
          category: "log",
          message,
          level: "warning",
          data: {
            ...(data as Record<string, unknown>),
            requestId: this.requestId,
          },
        });
      }
    } catch {
      // Sentry not initialized, silently ignore
    }
  }

  debug(message: string, data?: unknown, context?: string): void {
    if (!this.shouldLog("debug") || !this.config.enableDebug) {
      return;
    }

    this.output("debug", message, data, context);
  }

  info(message: string, data?: unknown, context?: string): void {
    if (!this.shouldLog("info") || !this.config.enableInfo) {
      return;
    }

    this.output("info", message, data, context);
  }

  warn(message: string, data?: unknown, context?: string): void {
    if (!this.shouldLog("warn")) {
      return;
    }

    this.output("warn", message, data, context);
    this.sendToSentry("warn", message, data);
  }

  error(message: string, error?: Error | unknown, context?: string): void {
    if (!this.shouldLog("error")) {
      return;
    }

    const errorObj = error instanceof Error ? error : undefined;
    const errorData = error instanceof Error ? undefined : error;
    
    this.output("error", message, errorData, context, errorObj);
    this.sendToSentry("error", message, errorData, errorObj);
  }

  success(message: string, data?: unknown, context?: string): void {
    if (!this.shouldLog("info") || !this.config.enableInfo) {
      return;
    }

    const emoji = "✅";
    this.output("info", `${emoji} ${message}`, data, context);
  }

  withMetadata(metadata: LogMetadata) {
    const childLogger = new Logger();
    if (metadata.requestId) {
      childLogger.setRequestId(metadata.requestId);
    }
    return {
      debug: (message: string, data?: unknown) =>
        childLogger.debug(message, data, metadata.context),
      info: (message: string, data?: unknown) =>
        childLogger.info(message, data, metadata.context),
      warn: (message: string, data?: unknown) =>
        childLogger.warn(message, data, metadata.context),
      error: (message: string, error?: Error | unknown) =>
        childLogger.error(message, error, metadata.context),
      success: (message: string, data?: unknown) =>
        childLogger.success(message, data, metadata.context),
    };
  }

  child(context: string) {
    return this.withMetadata({ context });
  }

  group(label: string, callback: () => void): void {
    if (!this.config.enableDebug) {
      callback();
      return;
    }

    console.group(label);
    callback();
    console.groupEnd();
  }

  table(data: unknown): void {
    if (!this.config.enableDebug) {
      return;
    }

    console.table(data);
  }

  time(label: string): void {
    if (!this.config.enableDebug) {
      return;
    }

    console.time(label);
  }

  timeEnd(label: string): void {
    if (!this.config.enableDebug) {
      return;
    }

    console.timeEnd(label);
  }

  async measure<T>(label: string, operation: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await operation();
      const duration = performance.now() - start;
      this.debug(`${label} completed in ${duration.toFixed(2)}ms`);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.error(`${label} failed after ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  }
}

export const logger = new Logger();

export type { LogLevel, LogMetadata, StructuredLog };
