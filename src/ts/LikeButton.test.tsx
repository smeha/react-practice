// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LikeButton } from "./LikeButton";

// fakeToggleLike: setTimeout 250ms then Math.random() < 0.2 => reject, else resolve

describe("LikeButton", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('shows "♡ Like" on mount', () => {
    render(<LikeButton />);
    expect(screen.getByRole("button", { name: "♡ Like" })).toBeInTheDocument();
  });

  it("optimistically shows liked state immediately on click", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    render(<LikeButton />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button", { name: "♥ Liked" })).toBeInTheDocument();
  });

  it("shows saving... and disables button while pending", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    render(<LikeButton />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("saving...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("stays liked and removes saving... after successful toggle", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5); // >= 0.2 => resolve
    render(<LikeButton />);
    fireEvent.click(screen.getByRole("button"));
    await act(() => vi.advanceTimersByTimeAsync(250));
    expect(screen.getByRole("button", { name: "♥ Liked" })).toBeInTheDocument();
    expect(screen.queryByText("saving...")).toBeNull();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("reverts to unliked and shows error on failure", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // < 0.2 => reject
    render(<LikeButton />);
    fireEvent.click(screen.getByRole("button"));
    await act(() => vi.advanceTimersByTimeAsync(250));
    expect(screen.getByRole("button", { name: "♡ Like" })).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
  });

  it("re-enables the button after save completes (success or failure)", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // fail path
    render(<LikeButton />);
    fireEvent.click(screen.getByRole("button"));
    await act(() => vi.advanceTimersByTimeAsync(250));
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
