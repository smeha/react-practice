import { useEffect, useState } from "react";

function fakeFetch(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => Math.random() < 0.3 ? reject(new Error("Network")) : resolve(["A", "B", "C"]), 300);
  });
}

export function FetchWithRetry() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [tick, setTick] = useState(0); // triggers refetch

  // event handler is the right place to kick off local UI state
  const retry = () => {
    setLoading(true);
    setErr(null);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    let alive = true;

    fakeFetch()
      .then((res) => {
        if (!alive) return;
        setData(res);
        setErr(null);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (!alive) return;
        setErr(e.message);
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [tick]);

  if (loading) return <div>Loading...</div>;
  if (err)
    return (
      <div>Error: {err} <button onClick={retry}>Retry</button></div>
    );

  return (
    <ul>
      {data.map((x) => (<li key={x}>{x}</li>))}
    </ul>
  );
}
