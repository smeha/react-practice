// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { FetchWithRetry } from "./FetchWithRetry";

// fakeFetch internally: setTimeout 300ms then Math.random() < 0.3 => reject, else resolve

describe("FetchWithRetry", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('shows "Loading..." on mount before fetch resolves', () => {
    render(<FetchWithRetry />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows data items after successful fetch", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5); // >= 0.3 => resolve
    render(<FetchWithRetry />);
    await act(() => vi.advanceTimersByTimeAsync(300));
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("shows error message and Retry button on failed fetch", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // < 0.3 => reject
    render(<FetchWithRetry />);
    await act(() => vi.advanceTimersByTimeAsync(300));
    expect(screen.getByText(/Error/)).toBeInTheDocument();
    expect(screen.getByText("Retry")).toBeInTheDocument();
  });

  it("shows Loading... immediately after clicking Retry", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // fail first
    render(<FetchWithRetry />);
    await act(() => vi.advanceTimersByTimeAsync(300));
    fireEvent.click(screen.getByText("Retry"));
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows data after retry succeeds", async () => {
    const rand = vi.spyOn(Math, "random");
    rand.mockReturnValueOnce(0.1); // first fetch: fail
    rand.mockReturnValue(0.5); // retry: succeed
    render(<FetchWithRetry />);
    await act(() => vi.advanceTimersByTimeAsync(300));
    fireEvent.click(screen.getByText("Retry"));
    await act(() => vi.advanceTimersByTimeAsync(300));
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
