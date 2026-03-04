import { describe, it, expect } from "vitest";
import { isAnagram } from "./ValidAnagram";

describe("isAnagram", () => {
  it("anagram/nagaram => true", () => expect(isAnagram("anagram", "nagaram")).toBe(true));
  it("rat/car => false", () => expect(isAnagram("rat", "car")).toBe(false));
  it("same string is an anagram of itself", () => expect(isAnagram("abc", "abc")).toBe(true));
  it("different lengths => false", () => expect(isAnagram("ab", "abc")).toBe(false));
  it("empty strings => true", () => expect(isAnagram("", "")).toBe(true));
  it("repeated letters — counts must match", () => expect(isAnagram("aab", "baa")).toBe(true));
  it("same chars different counts => false", () => expect(isAnagram("aab", "bba")).toBe(false));
});
