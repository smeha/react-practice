
import type { ReactNode } from "react";

import { DebouncedSearch } from "./DebouncedSearch";
import { Todo } from "./Todo";
import { Pagination } from "./Pagination";
import { FetchWithRetry } from "./FetchWithRetry";
import { ModalDemo } from "./ModalDemo";
import { LikeButton } from "./LikeButton";
import { Fibonacci, FibonacciList } from "./Fibonacci";
import { ProcessEvents } from "./ProcessEvents";
import { TwoSum } from "./TwoSum";
import { ValidParentheses } from "./ValidParentheses";
import { MaxSubarray } from "./MaxSubarray";
import { LongestSubstring } from "./LongestSubstring";
import { ValidAnagram } from "./ValidAnagram";
import { AsyncSearch } from "./AsyncSearch";

export type Section = {
  title: string;
  description?: string;
  examples?: string;
  complexity?: { time: string; space: string };
  component: ReactNode;
};

const fibonacciCount = 20;

export const sections: Section[] = [
  {
    title: "Debounced Search (avoid stale results)",
    description:
      "Input box. After user stops typing for 300ms, call fetchResults(query) and render results. Show loading. If user types fast, older responses will not overwrite newer ones.",
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
    complexity: { time: "O(1) trigger + O(n) to process/render the fetched list", space: "O(n) response" },
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
    title: 'Classic "Fibonacci"',
    description: "Handle big n, avoid recursion blowup. Iterative with BigInt.",
    complexity: { time: "O(n)", space: "O(1)" },
    component: <Fibonacci />,
  },
  {
    title: `First ${fibonacciCount} Fibonacci Numbers`,
    description: `Calls fib(i) for each i from 0 to ${fibonacciCount - 1}.`,
    complexity: { time: "O(n²) — fib(i) is O(i) per call", space: "O(n)" },
    component: <FibonacciList count={fibonacciCount} />,
  },
  {
    title: "Two Sum",
    description: "Given an array of integers and a target, return the indices of the two numbers that add up to the target. HashMap complement lookup.",
    examples: "nums=[2,7,11,15], target=9 => [0,1]",
    complexity: { time: "O(n)", space: "O(n)" },
    component: <TwoSum />,
  },
  {
    title: "Valid Parentheses",
    description: "Given a string of brackets, return true if it is valid (every opener has a matching closer in correct order). Stack-based.",
    examples: '"([])" => true ; "([)]" => false ; "" => true',
    complexity: { time: "O(n)", space: "O(n) stack" },
    component: <ValidParentheses />,
  },
  {
    title: "Max Subarray (Kadane's)",
    description: "Find the contiguous subarray with the largest sum (Kadane's algorithm). Return sum and start/end indices.",
    examples: "[-2,1,-3,4,-1,2,1,-5,4] => sum=6, indices=[3,6]",
    complexity: { time: "O(n)", space: "O(1)" },
    component: <MaxSubarray />,
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters. Sliding window with a seen-char map; advance left pointer on repeat.",
    examples: '"abcabcbb" => 3 ("abc") ; "bbbbb" => 1 ; "pwwkew" => 3 ("wke")',
    complexity: { time: "O(n)", space: "O(min(n, α)) where α = alphabet size" },
    component: <LongestSubstring />,
  },
  {
    title: "Valid Anagram",
    description: "Given two strings, return true if 1st string is an anagram of 2nd string",
    examples: '("anagram", "nagaram") => true ; ("rat", "car") => false',
    complexity: { time: "O(n)", space: "O(1) fixed alphabet" },
    component: <ValidAnagram />,
  },
  {
    title: "Async Search — debounce + abort",
    description: "Debounce input (400 ms), fetch on each settled query, abort any in-flight request when a new one starts. Handle loading / error states.",
    examples: "Uses JSONPlaceholder '/posts?title_like=...' => shows first 5 results",
    complexity: { time: "O(n) dominated by response size", space: "O(r) => effectively O(1)" },
    component: <AsyncSearch />,
  },
  {
    title: '"Case Events" pipeline',
    description: "Filter, sort, limit, and group events by day. Shows counts per type.",
    complexity: { time: "O(n log n) sort dominates", space: "O(n)" },
    component: <ProcessEvents />,
  },
];
