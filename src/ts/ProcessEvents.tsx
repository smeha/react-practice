import { useState } from "react";

type CaseEventType = "note" | "document" | "email" | "call";

type CaseEvent = {
  id: string;
  type: CaseEventType;
  createdAt: string; // ISO
  title: string;
};

type Grouped = Record<string, CaseEvent[]>; // key = YYYY-MM-DD

function processEvents(
  events: readonly CaseEvent[],
  opts?: { type?: CaseEventType; limit?: number }
) {
  const { type, limit } = opts ?? {};

  const filtered = type ? events.filter((e) => e.type === type) : [...events];

  filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // ISO sorts lexicographically

  const limited = typeof limit === "number" ? filtered.slice(0, limit) : filtered;

  const grouped: Grouped = limited.reduce<Grouped>((acc, e) => {
    const day = e.createdAt.slice(0, 10);
    (acc[day] ??= []).push(e);
    return acc;
  }, {});

  const counts = limited.reduce<Record<CaseEventType, number>>(
    (acc, e) => {
      acc[e.type] = (acc[e.type] ?? 0) + 1;
      return acc;
    },
    { note: 0, document: 0, email: 0, call: 0 }
  );

  return { events: limited, grouped, counts };
}

const SAMPLE: CaseEvent[] = [
  { id: "1", type: "note",     createdAt: "2024-05-01T10:00:00Z", title: "Initial note" },
  { id: "2", type: "email",    createdAt: "2024-05-01T14:00:00Z", title: "Sent intro email" },
  { id: "3", type: "call",     createdAt: "2024-05-02T09:00:00Z", title: "Follow-up call" },
  { id: "4", type: "document", createdAt: "2024-05-02T11:00:00Z", title: "Uploaded contract" },
  { id: "5", type: "note",     createdAt: "2024-05-03T08:00:00Z", title: "Meeting summary" },
];

const EVENT_TYPES: CaseEventType[] = ["note", "document", "email", "call"];

export function ProcessEvents() {
  const [filterType, setFilterType] = useState<CaseEventType | "">("");
  const [limit, setLimit] = useState("");

  const { grouped, counts } = processEvents(
    SAMPLE,
    {
      type: filterType || undefined,
      limit: limit ? Number(limit) : undefined,
    }
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <label>
          Type:{" "}
          <select value={filterType} onChange={(e) => setFilterType(e.target.value as CaseEventType | "")}>
            <option value="">all</option>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label>
          Limit:{" "}
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="none"
            style={{ width: 60 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 8, fontSize: 13 }}>
        {EVENT_TYPES.map((t) => (
          <span key={t} style={{ marginRight: 12 }}>{t}: {counts[t]}</span>
        ))}
      </div>

      {Object.entries(grouped).map(([day, evts]) => (
        <div key={day}>
          <strong>{day}</strong>
          <ul>
            {evts.map((e) => (
              <li key={e.id}>[{e.type}] {e.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
