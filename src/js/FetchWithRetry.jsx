import React, { useEffect, useState } from "react";

function fakeFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => (Math.random() < 0.3 ? reject(new Error("Network")) : resolve(["A", "B", "C"])), 300);
  });
}

export function FetchWithRetry() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [tick, setTick] = useState(0); // triggers refetch

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);

    fakeFetch()
      .then((res) => alive && setData(res))
      .catch((e) => alive && setErr(e.message))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false; // prevents setState after unmount
    };
  }, [tick]);

  if (loading) return <div>Loading...</div>;
  if (err)
    return (
      <div>
        Error: {err} <button onClick={() => setTick((t) => t + 1)}>Retry</button>
      </div>
    );

  return <ul>{data.map((x) => <li key={x}>{x}</li>)}</ul>;
}
