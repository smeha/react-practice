import { describe, it, expect } from "vitest";
import { fibonacci } from "./Fibonacci";

describe("fibonacci", () => {
  it("fib(0) = 0", () => expect(fibonacci(0)).toBe(0n));
  it("fib(1) = 1", () => expect(fibonacci(1)).toBe(1n));
  it("fib(2) = 1", () => expect(fibonacci(2)).toBe(1n));
  it("fib(10) = 55", () => expect(fibonacci(10)).toBe(55n));
  it("fib(20) = 6765", () => expect(fibonacci(20)).toBe(6765n));

  it("handles large n correctly (BigInt, no overflow)", () => {
    // fib(100) is a well-known value
    expect(fibonacci(100)).toBe(354224848179261915075n);
  });

  it("throws for negative input", () => {
    expect(() => fibonacci(-1)).toThrow();
  });

  it("throws for non-integer input", () => {
    expect(() => fibonacci(1.5)).toThrow();
  });
});
