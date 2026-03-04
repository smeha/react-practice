import { describe, it, expect } from "vitest";
import { firstUniqChar } from "./FirstUniqueChar";
import { bestPerHouse } from "./WizardHouseFriends";
import { searchingChallenge } from "./BracketMatcher";
import { stringChallenge } from "./TimeDifference";
import { isPalindrome } from "./PalindromeChecker";
import { hasFourSequential } from "./FourSequential";
import { sumPositives } from "./SumPositives";
import { sumIfTriple } from "./SumIfTriple";

// ---------------------------------------------------------------------------
// firstUniqChar — returns index of first non-repeating character, or -1
// ---------------------------------------------------------------------------
describe("firstUniqChar", () => {
  it("returns 0 for 'leetcode' (l is unique)", () => {
    expect(firstUniqChar("leetcode")).toBe(0);
  });
  it("returns 2 for 'loveleetcode' (v is unique)", () => {
    expect(firstUniqChar("loveleetcode")).toBe(2);
  });
  it("returns -1 when all chars repeat", () => {
    expect(firstUniqChar("aabb")).toBe(-1);
  });
  it("returns 0 for a single character", () => {
    expect(firstUniqChar("z")).toBe(0);
  });
  it("returns -1 for empty string", () => {
    expect(firstUniqChar("")).toBe(-1);
  });
});

// ---------------------------------------------------------------------------
// bestPerHouse — picks the wizard with the most friends per house (alpha tie-break)
// ---------------------------------------------------------------------------
describe("bestPerHouse", () => {
  const data = [
    { name: "Harry", house: "Gryffindor", friends: ["Ron", "Hermione", "Neville"] },
    { name: "Hermione", house: "Gryffindor", friends: ["Harry", "Ron"] },
    { name: "Draco", house: "Slytherin", friends: ["Crabbe", "Goyle", "Pansy"] },
  ];

  it("picks Harry over Hermione in Gryffindor (more friends)", () => {
    expect(bestPerHouse(data).Gryffindor.name).toBe("Harry");
  });

  it("correctly reports friend count", () => {
    expect(bestPerHouse(data).Gryffindor.friends).toBe(3);
  });

  it("handles a house with one member", () => {
    expect(bestPerHouse(data).Slytherin.name).toBe("Draco");
  });

  it("breaks ties alphabetically", () => {
    const tied = [
      { name: "Zara", house: "Test", friends: ["a", "b"] },
      { name: "Anna", house: "Test", friends: ["x", "y"] },
    ];
    expect(bestPerHouse(tied).Test.name).toBe("Anna");
  });

  it("skips entries with no house", () => {
    const withBlank = [...data, { name: "Ghost", house: "", friends: ["a", "b", "c", "d"] }];
    expect(bestPerHouse(withBlank).Ghost).toBeUndefined();
  });

  it("returns empty object for empty input", () => {
    expect(bestPerHouse([])).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// searchingChallenge — balanced parentheses: 1 = balanced, 0 = not
// ---------------------------------------------------------------------------
describe("searchingChallenge", () => {
  it("returns 1 for balanced single pair", () => {
    expect(searchingChallenge("(hello)")).toBe(1);
  });
  it("returns 1 for nested pairs", () => {
    expect(searchingChallenge("(hello (world))")).toBe(1);
  });
  it("returns 0 for unclosed opening", () => {
    expect(searchingChallenge("((hello (world))")).toBe(0);
  });
  it("returns 0 for closing before opening", () => {
    expect(searchingChallenge(")hello(")).toBe(0);
  });
  it("returns 1 for string with no brackets", () => {
    expect(searchingChallenge("no brackets")).toBe(1);
  });
  it("returns 1 for empty string", () => {
    expect(searchingChallenge("")).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// stringChallenge — minutes between two 12-hour times, e.g. "1:00am-11:00am"
// ---------------------------------------------------------------------------
describe("stringChallenge", () => {
  it("600 minutes from 1:00am to 11:00am", () => {
    expect(stringChallenge("1:00am-11:00am")).toBe(600);
  });
  it("690 minutes from 12:30pm to 12:00am (crosses midnight)", () => {
    expect(stringChallenge("12:30pm-12:00am")).toBe(690);
  });
  it("120 minutes from 11:00pm to 1:00am (crosses midnight)", () => {
    expect(stringChallenge("11:00pm-1:00am")).toBe(120);
  });
  it("0 minutes for identical times", () => {
    expect(stringChallenge("6:00am-6:00am")).toBe(0);
  });
  it("returns null for invalid format", () => {
    expect(stringChallenge("bad-input")).toBe(null);
  });
});

// ---------------------------------------------------------------------------
// isPalindrome — ignores case and non-alphanumeric chars
// ---------------------------------------------------------------------------
describe("isPalindrome", () => {
  it("returns true for 'racecar'", () => {
    expect(isPalindrome("racecar")).toBe(true);
  });
  it("returns true ignoring spaces and case", () => {
    expect(isPalindrome("A man a plan a canal Panama")).toBe(true);
  });
  it("returns false for 'hello'", () => {
    expect(isPalindrome("hello")).toBe(false);
  });
  it("returns true for empty string", () => {
    expect(isPalindrome("")).toBe(true);
  });
  it("returns true for single character", () => {
    expect(isPalindrome("a")).toBe(true);
  });
  it("strips punctuation correctly", () => {
    expect(isPalindrome("Was it a car or a cat I saw?")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// hasFourSequential — true if array contains 4+ consecutive integers
// ---------------------------------------------------------------------------
describe("hasFourSequential", () => {
  it("returns true for [1, 2, 3, 4]", () => {
    expect(hasFourSequential([1, 2, 3, 4])).toBe(true);
  });
  it("returns true for unsorted [5, 3, 1, 2, 4]", () => {
    expect(hasFourSequential([5, 3, 1, 2, 4])).toBe(true);
  });
  it("returns false when only 3 sequential", () => {
    expect(hasFourSequential([10, 1, 2, 3])).toBe(false);
  });
  it("handles duplicates correctly", () => {
    expect(hasFourSequential([7, 7, 8, 9, 10])).toBe(true);
  });
  it("returns false for non-sequential evens", () => {
    expect(hasFourSequential([1, 3, 5, 7])).toBe(false);
  });
  it("returns false for fewer than 4 elements", () => {
    expect(hasFourSequential([1, 2, 3])).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// sumPositives — sum only the positive numbers
// ---------------------------------------------------------------------------
describe("sumPositives", () => {
  it("sums positives, ignores negatives", () => {
    expect(sumPositives([1, -2, 3, -4, 5])).toBe(9);
  });
  it("returns 0 for all-negative array", () => {
    expect(sumPositives([-1, -2, -3])).toBe(0);
  });
  it("does not count 0 as positive", () => {
    expect(sumPositives([0, 5, 10])).toBe(15);
  });
  it("returns 0 for empty array", () => {
    expect(sumPositives([])).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// sumIfTriple — sumPositives only when some value appears 3+ times
// ---------------------------------------------------------------------------
describe("sumIfTriple", () => {
  it("returns sum of positives when triple exists", () => {
    expect(sumIfTriple([1, 2, 3, 3, 3])).toBe(12);
  });
  it("returns 0 when no triple", () => {
    expect(sumIfTriple([1, 2, 3, 3])).toBe(0);
  });
  it("negative triple still triggers sum of positives", () => {
    // three -1s: hasTriple = true → sumPositives([-1,-1,-1,5]) = 5
    expect(sumIfTriple([-1, -1, -1, 5])).toBe(5);
  });
  it("returns 0 for empty array", () => {
    expect(sumIfTriple([])).toBe(0);
  });
  it("handles exactly 3 of a value", () => {
    expect(sumIfTriple([5, 5, 5, -3, -2])).toBe(15);
  });
});
