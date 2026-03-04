import { describe, it, expect } from "vitest";
import { isValid } from "./ValidParentheses";

describe("isValid", () => {
  it("returns true for empty string", () => expect(isValid("")).toBe(true));
  it("returns true for simple parens", () => expect(isValid("()")).toBe(true));
  it("returns true for all bracket types", () => expect(isValid("()[]{}")).toBe(true));
  it("returns true for nested brackets", () => expect(isValid("({[]})")).toBe(true));

  it("returns false for wrong close order", () => expect(isValid("([)]")).toBe(false));
  it("returns false for unclosed opener", () => expect(isValid("([]")).toBe(false));
  it("returns false for closer with empty stack", () => expect(isValid(")")).toBe(false));
  it("returns false for mismatched types", () => expect(isValid("{]")).toBe(false));
});
