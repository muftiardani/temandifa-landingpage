import { NextRequest, NextResponse } from "next/server";

const SENTRY_HOST = "sentry.io";

export async function POST(request: NextRequest) {
  try {
    const envelope = await request.text();
    const piece = envelope.split("\n")[0];
    const header = JSON.parse(piece);
    
    const dsn = new URL(header.dsn);
    
    if (!dsn.hostname.endsWith(SENTRY_HOST)) {
      return NextResponse.json(
        { error: "Invalid Sentry host" },
        { status: 400 }
      );
    }
    
    const projectId = dsn.pathname.replace("/", "");
    
    if (!projectId) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }
    
    const sentryUrl = `https://${dsn.hostname}/api/${projectId}/envelope/`;
    
    const response = await fetch(sentryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-sentry-envelope",
      },
      body: envelope,
    });
    
    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[Sentry Tunnel] Error:", error);
    return NextResponse.json(
      { error: "Failed to tunnel request" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
