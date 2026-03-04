import { describe, it, expect } from "vitest";
import { processEvents } from "./ProcessEvents";
import type { CaseEvent } from "./ProcessEvents";

const EVENTS: CaseEvent[] = [
  { id: "1", type: "note",     createdAt: "2024-05-01T10:00:00Z", title: "Note A" },
  { id: "2", type: "email",    createdAt: "2024-05-01T14:00:00Z", title: "Email A" },
  { id: "3", type: "call",     createdAt: "2024-05-02T09:00:00Z", title: "Call A" },
  { id: "4", type: "document", createdAt: "2024-05-02T11:00:00Z", title: "Doc A" },
  { id: "5", type: "note",     createdAt: "2024-05-03T08:00:00Z", title: "Note B" },
];

describe("processEvents", () => {
  describe("no options", () => {
    it("returns all events sorted descending by date", () => {
      const { events } = processEvents(EVENTS);
      const dates = events.map((e) => e.createdAt);
      expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
    });

    it("returns all 5 events", () => {
      expect(processEvents(EVENTS).events).toHaveLength(5);
    });
  });

  describe("type filter", () => {
    it("filters to only notes", () => {
      const { events } = processEvents(EVENTS, { type: "note" });
      expect(events.every((e) => e.type === "note")).toBe(true);
      expect(events).toHaveLength(2);
    });

    it("filters to only calls", () => {
      const { events } = processEvents(EVENTS, { type: "call" });
      expect(events).toHaveLength(1);
      expect(events[0].id).toBe("3");
    });
  });

  describe("limit", () => {
    it("limits to 2 events (most recent first)", () => {
      const { events } = processEvents(EVENTS, { limit: 2 });
      expect(events).toHaveLength(2);
      expect(events[0].createdAt > events[1].createdAt).toBe(true);
    });

    it("limit larger than total returns all", () => {
      expect(processEvents(EVENTS, { limit: 100 }).events).toHaveLength(5);
    });
  });

  describe("counts", () => {
    it("counts all event types correctly", () => {
      const { counts } = processEvents(EVENTS);
      expect(counts).toEqual({ note: 2, email: 1, call: 1, document: 1 });
    });

    it("counts reflect the filtered result, not total", () => {
      const { counts } = processEvents(EVENTS, { type: "note" });
      expect(counts).toEqual({ note: 2, email: 0, call: 0, document: 0 });
    });
  });

  describe("grouped", () => {
    it("groups events by YYYY-MM-DD", () => {
      const { grouped } = processEvents(EVENTS);
      expect(Object.keys(grouped).sort()).toEqual(["2024-05-01", "2024-05-02", "2024-05-03"]);
    });

    it("correct number of events per day", () => {
      const { grouped } = processEvents(EVENTS);
      expect(grouped["2024-05-01"]).toHaveLength(2);
      expect(grouped["2024-05-02"]).toHaveLength(2);
      expect(grouped["2024-05-03"]).toHaveLength(1);
    });
  });

  describe("edge cases", () => {
    it("empty input returns empty results", () => {
      const { events, counts } = processEvents([]);
      expect(events).toHaveLength(0);
      expect(counts).toEqual({ note: 0, email: 0, call: 0, document: 0 });
    });
  });
});
