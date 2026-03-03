import { useState, useEffect, useRef } from "react";

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

type Post = { id: number; title: string };

export function AsyncSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = query.trim();

    // debounce
    const t = setTimeout(() => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      if (!q) {
        setResults([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      fetchJson<Post[]>(`https://jsonplaceholder.typicode.com/posts?title_like=${encodeURIComponent(q)}`, abortRef.current.signal)
        .then((data) => {
          setResults(data.slice(0, 5));
          setLoading(false);
        })
        .catch((e) => {
          if ((e as Error).name === "AbortError") return;
          setError((e as Error).message);
          setLoading(false);
        });
    }, 400);

    return () => {
      clearTimeout(t);
      abortRef.current?.abort();
    };
  }, [query]);

  const empty = !loading && !error && query.trim() && results.length === 0;

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search posts..."
        style={{ width: 240 }}
      />
      {loading && <span style={{ marginLeft: 10, color: "#888" }}>loading...</span>}
      {error && <span style={{ marginLeft: 10, color: "red" }}>{error}</span>}
      {empty && <span style={{ marginLeft: 10, color: "#888" }}>no results</span>}

      {results.length > 0 && (
        <ul style={{ marginTop: 8, paddingLeft: 16 }}>
          {results.map((p) => (
            <li key={p.id}><strong>{p.id}.</strong> {p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
