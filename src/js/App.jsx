import { DebouncedSearch } from "./DebouncedSearch";
import { Todo } from "./Todo";
import { Pagination } from "./Pagination";
import { FetchWithRetry } from "./FetchWithRetry";
import { ModalDemo } from "./ModalDemo";
import { LikeButton } from "./LikeButton";

export default function App() {
  return (
    <>
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
    </>
  );
}
