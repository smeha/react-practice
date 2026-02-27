import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

// Mock API
async function fetchResults(q: string, signal?: AbortSignal): Promise<Item[]> {
  await new Promise((r) => setTimeout(r, 300));
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  return q ? [{ id: "1", label: `Result for "${q}"` }] : [];
}

export function DebouncedSearch() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Item[]>([
    // items for later search
    // { id: "1", label: "Initial Item" },
    // { id: "2", label: "Second Item" },
  ]);
  const [loading, setLoading] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    const myRequestId = ++requestIdRef.current;

    const t = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchResults(q, controller.signal);
        // Race protection
        if (myRequestId === requestIdRef.current) setItems(res);
      } catch (e: any) {
        if (e?.name !== "AbortError") console.error(e);
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
