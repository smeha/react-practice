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
import { Test } from "./Test";

export default function App() {
  const fibonacciCount = 20;
  return (
    <>
      {/* <div className="section">
        <h4>TEST</h4>
        <Test />
      </div> */}
      <div className="section">
        <h4>Debounced Search (avoid stale results)</h4>
        <p>Input box. After user stops typing for 300ms, call fakeSearch(query) and render results. Show loading. If user types fast, older responses will not overwrite newer ones.</p>
        <DebouncedSearch />
      </div>
      <div className="section">
        <h4>Todo List (add / toggle / delete)</h4>
        <p>Todo list. Add items, toggle done, delete items. Show "remaining" count.</p>
        <Todo />
      </div>
      <div className="section">
        <h4>Paginated List (client-side)</h4>
        <p>Shows items 5 per page with Prev/Next. Disable buttons at bounds.</p>
        <Pagination />
      </div>
      <div className="section">
        <h4>Data Fetch with Loading / Error / Retry</h4>
        <p>Fetch data on mount. Shows loading, error message, and a Retry button.</p>
        <FetchWithRetry />
      </div>
      <div className="section">
        <h4>Modal (Escape + click outside)</h4>
        <p>A modal that closes on Escape and backdrop click</p>
        <ModalDemo />
      </div>
      <div className="section">
        <h4>Optimistic "Like" Toggle (revert on failure)</h4>
        <p>Toggle liked immediately; if server call fails, revert and show error.</p>
        <LikeButton />
      </div>
      <div className="section">
        <h4>Classic "Fibonacci"</h4>
        <p>Handle big n, avoid recursion blowup. Time O(n), space O(1).</p>
        <Fibonacci />
      </div>
      <div className="section">
        <h4>First {fibonacciCount} Fibonacci Numbers</h4>
        <FibonacciList count={fibonacciCount}/>
      </div>
      <div className="section">
        <h4>Two Sum</h4>
        <TwoSum />
      </div>
      <div className="section">
        <h4>Valid Parentheses</h4>
        <ValidParentheses />
      </div>
      <div className="section">
        <h4>Max Subarray (Kadane's)</h4>
        <MaxSubarray />
      </div>
      <div className="section">
        <h4>Longest Substring Without Repeating Characters</h4>
        <LongestSubstring />
      </div>
      <div className="section">
        <h4>Valid Anagram</h4>
        <ValidAnagram />
      </div>
      <div className="section">
        <h4>Async Search — debounce + abort</h4>
        <AsyncSearch />
      </div>
      <div className="section">
        <h4>"Case Events" pipeline</h4>
        <p>Filter, sort, limit, and group events by day. Shows counts per type.</p>
        <ProcessEvents />
      </div>
    </>
  );
}
