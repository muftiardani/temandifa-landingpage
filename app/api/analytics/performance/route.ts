import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

interface PerformanceMetric {
  metric: string;
  value: number;
  rating: string;
  id: string;
  timestamp: number;
  url: string;
  userAgent: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: PerformanceMetric = await request.json();

    if (!data.metric || data.value === undefined || !data.rating) {
      return NextResponse.json(
        { error: "Missing required fields: metric, value, rating" },
        { status: 400 }
      );
    }

    logger.info(
      `Web Vital received: ${data.metric}`,
      {
        metric: data.metric,
        value: data.value,
        rating: data.rating,
        id: data.id,
        url: data.url,
      },
      "Analytics"
    );

    return NextResponse.json(
      { success: true, received: data.metric },
      { status: 200 }
    );
  } catch (error) {
    logger.error(
      "Failed to process performance metric",
      error instanceof Error ? error : undefined,
      "Analytics"
    );

    return NextResponse.json(
      { error: "Failed to process metric" },
      { status: 500 }
    );
  }
}
