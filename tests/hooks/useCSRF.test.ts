import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

vi.mock("@/lib/logger", () => ({
  logger: {
    debug: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

import { useCSRF } from "@/hooks/useCSRF";

describe("useCSRF", () => {
  const mockCSRFResponse = {
    token: "mock-token-123",
    hash: "mock-hash-456",
    expiresAt: Date.now() + 15 * 60 * 1000,
  };

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCSRFResponse),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("should fetch CSRF token on mount", async () => {
    const { result } = renderHook(() => useCSRF({ autoRefresh: false }));

    expect(result.current.isReady).toBe(false);

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.isReady).toBe(true);
    expect(result.current.token).toBe(mockCSRFResponse.token);
    expect(result.current.hash).toBe(mockCSRFResponse.hash);
    expect(global.fetch).toHaveBeenCalledWith("/api/csrf");
  });

  it("should handle fetch error gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCSRF({ autoRefresh: false }));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.isReady).toBe(false);
    expect(result.current.token).toBe("");
  });

  it("should handle non-ok response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: "Server error" }),
    });

    const { result } = renderHook(() => useCSRF({ autoRefresh: false }));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.isReady).toBe(false);
  });

  it("should provide refresh function for manual refresh", async () => {
    const { result } = renderHook(() => useCSRF({ autoRefresh: false }));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.isReady).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    await act(async () => {
      result.current.refresh();
      await flushPromises();
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("should return correct structure", async () => {
    const { result } = renderHook(() => useCSRF({ autoRefresh: false }));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current).toHaveProperty("token");
    expect(result.current).toHaveProperty("hash");
    expect(result.current).toHaveProperty("expiresAt");
    expect(result.current).toHaveProperty("isReady");
    expect(result.current).toHaveProperty("error");
    expect(result.current).toHaveProperty("refresh");
    expect(typeof result.current.refresh).toBe("function");
  });
});
