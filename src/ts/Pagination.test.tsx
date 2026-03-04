// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

// ITEMS is 23 entries, pageSize = 5 => 5 pages total

describe("Pagination", () => {
  it("shows first 5 items on mount", () => {
    render(<Pagination />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 5")).toBeInTheDocument();
    expect(screen.queryByText("Item 6")).toBeNull();
  });

  it("shows page indicator '1 / 5' on mount", () => {
    render(<Pagination />);
    expect(screen.getByText("1 / 5")).toBeInTheDocument();
  });

  it("Prev button is disabled on first page", () => {
    render(<Pagination />);
    expect(screen.getByText("Prev")).toBeDisabled();
  });

  it("Next button is enabled on first page", () => {
    render(<Pagination />);
    expect(screen.getByText("Next")).not.toBeDisabled();
  });

  it("clicking Next shows next page items", () => {
    render(<Pagination />);
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Item 6")).toBeInTheDocument();
    expect(screen.getByText("Item 10")).toBeInTheDocument();
    expect(screen.queryByText("Item 1")).toBeNull();
  });

  it("clicking Next updates page indicator", () => {
    render(<Pagination />);
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("2 / 5")).toBeInTheDocument();
  });

  it("Prev button enables after moving to page 2", () => {
    render(<Pagination />);
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Prev")).not.toBeDisabled();
  });

  it("clicking Prev goes back to page 1", () => {
    render(<Pagination />);
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Prev"));
    expect(screen.getByText("1 / 5")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("last page shows remaining items (21-23) and disables Next", () => {
    render(<Pagination />);
    // click Next 4 times to reach page 5
    for (let i = 0; i < 4; i++) fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("5 / 5")).toBeInTheDocument();
    expect(screen.getByText("Item 21")).toBeInTheDocument();
    expect(screen.getByText("Item 23")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeDisabled();
  });
});
