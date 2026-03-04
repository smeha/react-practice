import { describe, it, expect } from "vitest";
import { twoSum } from "./TwoSum";

describe("twoSum", () => {
  it("returns correct indices for basic case", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it("works when solution is not at the start", () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it("handles duplicate values", () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  it("returns null when no solution exists", () => {
    expect(twoSum([1, 2, 3], 100)).toBeNull();
  });

  it("returns null for empty array", () => {
    expect(twoSum([], 5)).toBeNull();
  });

  it("works with negative numbers", () => {
    expect(twoSum([-3, 4, 3, 90], 0)).toEqual([0, 2]);
  });
});
