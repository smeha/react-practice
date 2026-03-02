import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

const SAMPLES: Item[] = [
  { id: "1",  label: "React" },
  { id: "2",  label: "TypeScript" },
  { id: "3",  label: "JavaScript" },
  { id: "4",  label: "Node.js" },
  { id: "5",  label: "Next.js" },
  { id: "6",  label: "Vite" },
  { id: "7",  label: "Tailwind CSS" },
  { id: "8",  label: "GraphQL" },
  { id: "9",  label: "PostgreSQL" },
  { id: "10", label: "Redis" },
];

async function fetchResults(q: string, signal?: AbortSignal): Promise<Item[]> {
  await new Promise((r) => setTimeout(r, 300));
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const lower = q.toLowerCase();
  return q ? SAMPLES.filter((item) => item.label.toLowerCase().includes(lower)) : [];
}

export function DebouncedSearch() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    const myRequestId = ++requestIdRef.current;

    const t = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchResults(q, controller.signal);
        if (myRequestId === requestIdRef.current) setItems(res); // race protection
      } catch (e: unknown) {
        if (!(e instanceof DOMException) || e.name !== "AbortError") console.error(e);
      } finally {
        if (myRequestId === requestIdRef.current) setLoading(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(t);
      controller.abort();
    };
  }, [q]);

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." />
      {loading ? <p>Loading...</p> : null}
      <ul>{items.map((it) => <li key={it.id}>{it.label}</li>)}</ul>
    </div>
  );
}
