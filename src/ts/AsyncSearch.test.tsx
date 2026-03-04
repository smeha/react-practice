// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AsyncSearch } from "./AsyncSearch";

const MOCK_POSTS = [
  { id: 1, title: "React best practices" },
  { id: 2, title: "TypeScript guide" },
];

function stubFetch(data: unknown, ok = true, status = 200) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok, status, json: () => Promise.resolve(data) })
  );
}

describe("AsyncSearch", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("shows nothing on mount", () => {
    render(<AsyncSearch />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.queryByText(/loading/i)).toBeNull();
  });

  it("shows loading while fetch is in-flight", async () => {
    // fetch that never resolves — keeps loading state
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));
    render(<AsyncSearch />);
    fireEvent.change(screen.getByPlaceholderText("search posts..."), { target: { value: "react" } });
    await act(() => vi.advanceTimersByTimeAsync(400));
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows results after fetch resolves", async () => {
    stubFetch(MOCK_POSTS);
    render(<AsyncSearch />);
    fireEvent.change(screen.getByPlaceholderText("search posts..."), { target: { value: "react" } });
    await act(() => vi.advanceTimersByTimeAsync(400));
    await act(async () => {}); // flush fetch promise chain
    expect(screen.getByText("React best practices")).toBeInTheDocument();
  });

  it("caps results at 5 items", async () => {
    const many = Array.from({ length: 10 }, (_, i) => ({ id: i, title: `Post ${i}` }));
    stubFetch(many);
    render(<AsyncSearch />);
    fireEvent.change(screen.getByPlaceholderText("search posts..."), { target: { value: "post" } });
    await act(() => vi.advanceTimersByTimeAsync(400));
    await act(async () => {});
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("shows 'no results' when fetch returns empty array", async () => {
    stubFetch([]);
    render(<AsyncSearch />);
    fireEvent.change(screen.getByPlaceholderText("search posts..."), { target: { value: "xyz" } });
    await act(() => vi.advanceTimersByTimeAsync(400));
    await act(async () => {});
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it("shows error message on HTTP failure", async () => {
    stubFetch(null, false, 500);
    render(<AsyncSearch />);
    fireEvent.change(screen.getByPlaceholderText("search posts..."), { target: { value: "test" } });
    await act(() => vi.advanceTimersByTimeAsync(400));
    await act(async () => {});
    expect(screen.getByText(/HTTP 500/)).toBeInTheDocument();
  });

  it("clears results when query is emptied", async () => {
    stubFetch(MOCK_POSTS);
    render(<AsyncSearch />);
    const input = screen.getByPlaceholderText("search posts...");
    fireEvent.change(input, { target: { value: "react" } });
    await act(() => vi.advanceTimersByTimeAsync(400));
    await act(async () => {});
    fireEvent.change(input, { target: { value: "" } });
    await act(() => vi.advanceTimersByTimeAsync(400));
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
