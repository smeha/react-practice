import { describe, it, expect } from "vitest";
import { maxSubarray } from "./MaxSubarray";

describe("maxSubarray", () => {
  it("classic Kadane's example: sum=6 at [3,6]", () => {
    expect(maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual({ sum: 6, from: 3, to: 6 });
  });

  it("single element array", () => {
    expect(maxSubarray([5])).toEqual({ sum: 5, from: 0, to: 0 });
  });

  it("all negatives — returns the least negative", () => {
    expect(maxSubarray([-3, -1, -2])).toEqual({ sum: -1, from: 1, to: 1 });
  });

  it("all positives — whole array is the answer", () => {
    expect(maxSubarray([1, 2, 3])).toEqual({ sum: 6, from: 0, to: 2 });
  });

  it("subarray in the middle", () => {
    expect(maxSubarray([-1, 3, 4, -5, 1])).toEqual({ sum: 7, from: 1, to: 2 });
  });

  it("throws for empty array", () => {
    expect(() => maxSubarray([])).toThrow();
  });
});
