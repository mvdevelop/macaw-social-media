import { describe, it, expect } from "vitest";
import {
  setCache,
  getCached,
  isCacheValid,
  clearCache,
  getOrFetch,
} from "@/lib/cache";

describe("cache", () => {
  beforeEach(() => {
    clearCache();
  });

  it("should store and retrieve a value", () => {
    setCache("test-key", { foo: "bar" }, 5000);
    expect(getCached("test-key")).toEqual({ foo: "bar" });
  });

  it("should report cache as valid within TTL", () => {
    setCache("ttl-key", "value", 10_000);
    expect(isCacheValid("ttl-key")).toBe(true);
  });

  it("should return null for missing key", () => {
    expect(getCached("nonexistent")).toBeNull();
  });

  it("should return false for missing key validity", () => {
    expect(isCacheValid("nonexistent")).toBe(false);
  });

  it("should clear specific key", () => {
    setCache("a", 1, 5000);
    setCache("b", 2, 5000);
    clearCache("a");
    expect(getCached("a")).toBeNull();
    expect(getCached("b")).toBe(2);
  });

  it("should clear all keys", () => {
    setCache("x", 1, 5000);
    setCache("y", 2, 5000);
    clearCache();
    expect(getCached("x")).toBeNull();
    expect(getCached("y")).toBeNull();
  });

  it("getOrFetch should use cached value when valid", async () => {
    setCache("fetch-test", "cached", 5000);
    const result = await getOrFetch("fetch-test", async () => "fresh");
    expect(result).toBe("cached");
  });

  it("getOrFetch should fetch when no cache", async () => {
    const result = await getOrFetch("fresh-key", async () => "fresh-value");
    expect(result).toBe("fresh-value");
  });

  it("getOrFetch should update cache after fetch", async () => {
    await getOrFetch("update-key", async () => "new-value");
    expect(getCached("update-key")).toBe("new-value");
  });
});
