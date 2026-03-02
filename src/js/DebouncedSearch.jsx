import { useEffect, useRef, useState } from "react";

function fakeSearch(q) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(q ? [`${q} 1`, `${q} 2`, `${q} 3`] : []), 300);
  });
}

export function DebouncedSearch() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const reqId = useRef(0);

  useEffect(() => {
    const id = ++reqId.current;
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fakeSearch(q);
        if (id === reqId.current) setItems(res); // prevent stale overwrite
      } finally {
        if (id === reqId.current) setLoading(false);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [q]);

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." />
      {loading && <div>Loading...</div>}
      <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
    </div>
  );
}