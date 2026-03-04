// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Todo } from "./Todo";

describe("Todo", () => {
  it('shows "Remaining: 0" on mount', () => {
    render(<Todo />);
    expect(screen.getByText("Remaining: 0")).toBeInTheDocument();
  });

  it("adds a todo item", () => {
    render(<Todo />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Buy milk" } });
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Remaining: 1")).toBeInTheDocument();
  });

  it("does not add empty input", () => {
    render(<Todo />);
    fireEvent.click(screen.getByText("Add"));
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("clears the input after adding", () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Task" } });
    fireEvent.click(screen.getByText("Add"));
    expect(input).toHaveValue("");
  });

  it("toggles a todo done", () => {
    render(<Todo />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Task" } });
    fireEvent.click(screen.getByText("Add"));
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByText("Remaining: 0")).toBeInTheDocument();
  });

  it("toggles a todo back to undone", () => {
    render(<Todo />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Task" } });
    fireEvent.click(screen.getByText("Add"));
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText("Remaining: 1")).toBeInTheDocument();
  });

  it("deletes a todo", () => {
    render(<Todo />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Delete me" } });
    fireEvent.click(screen.getByText("Add"));
    fireEvent.click(screen.getByText("x"));
    expect(screen.queryByText("Delete me")).toBeNull();
    expect(screen.getByText("Remaining: 0")).toBeInTheDocument();
  });

  it("remaining only counts undone items", () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Remaining: 2")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getByText("Remaining: 1")).toBeInTheDocument();
  });
});
