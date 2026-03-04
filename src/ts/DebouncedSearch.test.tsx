// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DebouncedSearch } from "./DebouncedSearch";

// fetchResults: 300ms internal delay, then filters SAMPLES array by label substring
// DebouncedSearch: 300ms debounce before calling fetchResults
// Total to see results: advance 600ms

describe("DebouncedSearch", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("shows empty list on mount", () => {
    render(<DebouncedSearch />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("does not show results before debounce fires", async () => {
    render(<DebouncedSearch />);
    fireEvent.change(screen.getByPlaceholderText("Search..."), { target: { value: "react" } });
    await act(() => vi.advanceTimersByTimeAsync(100)); // debounce hasn't fired yet
    expect(screen.queryByText("React")).toBeNull();
  });

  it("shows matching results after debounce + fetch resolve", async () => {
    render(<DebouncedSearch />);
    fireEvent.change(screen.getByPlaceholderText("Search..."), { target: { value: "react" } });
    await act(() => vi.advanceTimersByTimeAsync(600));
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("returns multiple matches", async () => {
    render(<DebouncedSearch />);
    fireEvent.change(screen.getByPlaceholderText("Search..."), { target: { value: "script" } });
    await act(() => vi.advanceTimersByTimeAsync(600));
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.queryByText("React")).toBeNull();
  });

  it("shows empty list for query with no matches", async () => {
    render(<DebouncedSearch />);
    fireEvent.change(screen.getByPlaceholderText("Search..."), { target: { value: "zzz" } });
    await act(() => vi.advanceTimersByTimeAsync(600));
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("clears results when query is cleared", async () => {
    render(<DebouncedSearch />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "react" } });
    await act(() => vi.advanceTimersByTimeAsync(600));
    expect(screen.getByText("React")).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "" } });
    await act(() => vi.advanceTimersByTimeAsync(600));
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
