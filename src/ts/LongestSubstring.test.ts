import { describe, it, expect } from "vitest";
import { lengthOfLongestSubstring } from "./LongestSubstring";

describe("lengthOfLongestSubstring", () => {
  it('"abcabcbb" => length 3, substring "abc"', () => {
    expect(lengthOfLongestSubstring("abcabcbb")).toEqual({ length: 3, substring: "abc" });
  });

  it('"bbbbb" => length 1, substring "b"', () => {
    expect(lengthOfLongestSubstring("bbbbb")).toEqual({ length: 1, substring: "b" });
  });

  it('"pwwkew" => length 3, substring "wke"', () => {
    expect(lengthOfLongestSubstring("pwwkew")).toEqual({ length: 3, substring: "wke" });
  });

  it("empty string => length 0", () => {
    expect(lengthOfLongestSubstring("")).toEqual({ length: 0, substring: "" });
  });

  it("all unique chars => length = string length", () => {
    expect(lengthOfLongestSubstring("abcd")).toEqual({ length: 4, substring: "abcd" });
  });

  it("handles repeated char at end", () => {
    expect(lengthOfLongestSubstring("abca")).toEqual({ length: 3, substring: "abc" });
  });
});
