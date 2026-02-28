import { useState, useEffect, useRef, useMemo } from "react";

export async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  ms: number
) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...args: TArgs) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

type Post = { id: number; title: string };

export function AsyncSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  // stable debounced fn — created once, captures stable refs/setters
  const search = useMemo(
    () =>
      debounce(async (q: string) => {
        abortRef.current?.abort(); // cancel previous in-flight request
        abortRef.current = new AbortController();

        if (!q.trim()) {
          setResults([]);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        try {
          const data = await fetchJson<Post[]>(
            `https://jsonplaceholder.typicode.com/posts?title_like=${encodeURIComponent(q)}`,
            abortRef.current.signal
          );
          setResults(data.slice(0, 5));
          setLoading(false);
        } catch (e) {
          if ((e as Error).name === "AbortError") return; // new query took over, leave state alone
          setError((e as Error).message);
          setLoading(false);
        }
      }, 400),
    []
  );

  useEffect(() => { search(query); }, [query, search]);
  useEffect(() => () => { abortRef.current?.abort(); }, []); // abort on unmount

  const empty = !loading && !error && query.trim() && results.length === 0;

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search posts..."
        style={{ width: 240 }}
      />
      {loading && <span style={{ marginLeft: 10, color: "#888" }}>loading…</span>}
      {error   && <span style={{ marginLeft: 10, color: "red"  }}>{error}</span>}
      {empty   && <span style={{ marginLeft: 10, color: "#888" }}>no results</span>}

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
