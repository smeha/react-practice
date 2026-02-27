import React, { useMemo, useState } from "react";

const ITEMS = Array.from({ length: 23 }, (_, i) => `Item ${i + 1}`);

export function Pagination() {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(ITEMS.length / pageSize);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return ITEMS.slice(start, start + pageSize);
  }, [page]);

  return (
    <div>
      <ul>{pageItems.map((x) => <li key={x}>{x}</li>)}</ul>
      <div style={{ display: "flex", gap: 8 }}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
