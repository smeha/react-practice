import { DebouncedSearch } from "./DebouncedSearch";
import { Todo } from "./Todo";
import { Pagination } from "./Pagination";
import { FetchWithRetry } from "./FetchWithRetry";
import { ModalDemo } from "./ModalDemo";
import { LikeButton } from "./LikeButton";
import { FirstUniqueChar } from "./FirstUniqueChar";
import { WizardHouseFriends } from "./WizardHouseFriends";
import { BracketMatcher } from "./BracketMatcher";
import { TimeDifference } from "./TimeDifference";
import { PalindromeChecker } from "./PalindromeChecker";
import { FourSequential } from "./FourSequential";
import { SumPositives } from "./SumPositives";
import { SumIfTriple } from "./SumIfTriple";

export const sections = [
  {
    title: "Debounced Search (avoid stale results)",
    description:
      "Input box. After user stops typing for 300ms, call fakeSearch(query) and render results. Show loading. If user types fast, older responses will not overwrite newer ones.",
    complexity: { time: "O(1) per keystroke, O(r) render", space: "O(r) results buffer" },
    component: <DebouncedSearch />,
  },
  {
    title: "Todo List (add / toggle / delete)",
    description: 'Todo list. Add items, toggle done, delete items. Show "remaining" count.',
    complexity: { time: "O(1) add ; O(n) toggle/delete", space: "O(n)" },
    component: <Todo />,
  },
  {
    title: "Paginated List (client-side)",
    description: "Shows items 5 per page with Prev/Next. Disable buttons at bounds.",
    complexity: { time: "O(1) page flip ; O(p) render", space: "O(n) full list in state" },
    component: <Pagination />,
  },
  {
    title: "Data Fetch with Loading / Error / Retry",
    description: "Fetch data on mount. Shows loading, error message, and a Retry button.",
    complexity: { time: "O(1) trigger ; network-bound fetch", space: "O(n) response" },
    component: <FetchWithRetry />,
  },
  {
    title: "Modal (Escape + click outside)",
    description: "A modal that closes on Escape and backdrop click",
    complexity: { time: "O(1)", space: "O(1)" },
    component: <ModalDemo />,
  },
  {
    title: 'Optimistic "Like" Toggle (revert on failure)',
    description: "Toggle liked immediately; if server call fails, revert and show error.",
    complexity: { time: "O(1)", space: "O(1)" },
    component: <LikeButton />,
  },
  {
    title: "First Unique Character (frequency map)",
    description:
      "Given a string, return the index of the first non-repeating character. Build a frequency map in one pass, then scan again to find the first char with count 1.",
    complexity: { time: "O(n)", space: "O(k) where k = alphabet size" },
    component: <FirstUniqueChar />,
  },
  {
    title: "Wizard House Friends (group-by + reduce)",
    description:
      "From a list of wizards, find the character with the most friends per house. Ties broken alphabetically. Demonstrates grouping, comparison, and early-continue patterns.",
    complexity: { time: "O(n)", space: "O(h) where h = number of houses" },
    component: <WizardHouseFriends />,
  },
  {
    title: "Bracket Matcher (stack / balance counter)",
    description:
      "Return 1 if every opening parenthesis has a matching closing one in the correct order, 0 otherwise. A single balance counter replaces a full stack: increment on '(', decrement on ')', short-circuit if balance goes negative.",
    complexity: { time: "O(n)", space: "O(1)" },
    component: <BracketMatcher />,
  },
  {
    title: "Time Difference (12-hour clock arithmetic)",
    description:
      'Given two 12-hour times separated by "-" (e.g. "12:30pm-1:00am"), compute the total minutes between them. Handles midnight crossings by adding 1440 when the difference is negative.',
    complexity: { time: "O(1)", space: "O(1)" },
    component: <TimeDifference />,
  },
  {
    title: "Palindrome Checker (two-pointer)",
    description:
      "Strip non-alphanumeric chars, lowercase, then walk inward from both ends. Stops as soon as a mismatch is found — no extra allocation beyond the cleaned string.",
    complexity: { time: "O(n)", space: "O(n) cleaned copy" },
    component: <PalindromeChecker />,
  },
  {
    title: "Four Sequential Numbers (sort + scan)",
    description:
      "Return true if the array contains at least 4 consecutive integers (e.g. 1,2,3,4). Sort first, skip duplicates, then count runs with a single pass.",
    complexity: { time: "O(n log n) sort + O(n) scan", space: "O(n) sorted copy" },
    component: <FourSequential />,
  },
  {
    title: "Sum of Positives (reduce filter)",
    description:
      "Sum only the positive numbers in an array using a single reduce pass — no intermediate array created.",
    complexity: { time: "O(n)", space: "O(1)" },
    component: <SumPositives />,
  },
  {
    title: "Sum If Triple (frequency guard)",
    description:
      "Return sumPositives(values) only if any value appears 3 or more times; otherwise return 0. Builds a frequency map first, then delegates to sumPositives.",
    complexity: { time: "O(n)", space: "O(k) distinct values" },
    component: <SumIfTriple />,
  },
];
