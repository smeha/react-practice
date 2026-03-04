// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModalDemo } from "./ModalDemo";

describe("ModalDemo", () => {
  it("modal is not visible on mount", () => {
    render(<ModalDemo />);
    expect(screen.queryByText("Modal")).toBeNull();
  });

  it("shows modal when Open is clicked", () => {
    render(<ModalDemo />);
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Modal")).toBeInTheDocument();
  });

  it("closes modal when Close button is clicked", () => {
    render(<ModalDemo />);
    fireEvent.click(screen.getByText("Open"));
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText("Modal")).toBeNull();
  });

  it("closes modal when Escape key is pressed", () => {
    render(<ModalDemo />);
    fireEvent.click(screen.getByText("Open"));
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByText("Modal")).toBeNull();
  });

  it("does not close modal on non-Escape key", () => {
    render(<ModalDemo />);
    fireEvent.click(screen.getByText("Open"));
    fireEvent.keyDown(window, { key: "Enter" });
    expect(screen.getByText("Modal")).toBeInTheDocument();
  });

  it("closes modal when backdrop is clicked", () => {
    render(<ModalDemo />);
    fireEvent.click(screen.getByText("Open"));
    // backdrop is grandparent of the h3 "Modal"
    const panel = screen.getByText("Modal").parentElement!;
    const backdrop = panel.parentElement!;
    fireEvent.mouseDown(backdrop);
    expect(screen.queryByText("Modal")).toBeNull();
  });

  it("does not close modal when clicking inside the panel", () => {
    render(<ModalDemo />);
    fireEvent.click(screen.getByText("Open"));
    // clicking the panel itself (not the backdrop) should not close
    const panel = screen.getByText("Modal").parentElement!;
    fireEvent.mouseDown(panel);
    expect(screen.getByText("Modal")).toBeInTheDocument();
  });
});
