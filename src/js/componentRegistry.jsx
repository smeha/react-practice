import { DebouncedSearch } from "./DebouncedSearch";
import { Todo } from "./Todo";
import { Pagination } from "./Pagination";
import { FetchWithRetry } from "./FetchWithRetry";
import { ModalDemo } from "./ModalDemo";
import { LikeButton } from "./LikeButton";

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
];
