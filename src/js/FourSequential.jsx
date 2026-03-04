import { useState } from "react";

function hasFourSequential(values) {
  const sorted = [...values].sort((a, b) => a - b);
  let count = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] === sorted[i] + 1) {
      if (++count >= 4) return true;
    } else if (sorted[i + 1] !== sorted[i]) {
      count = 1;
    }
  }
  return false;
}

function parseNumbers(str) {
  return str.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
}

export function FourSequential() {
  const [input, setInput] = useState("5, 3, 1, 2, 4");
  const values = parseNumbers(input);
  const result = values.length > 0 ? hasFourSequential(values) : null;

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 1, 2, 3, 4"
      />
      <p>
        Contains 4+ sequential:{" "}
        <strong>{result === null ? "—" : result ? "true" : "false"}</strong>
      </p>
    </div>
  );
}
