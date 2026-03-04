import { useState } from "react";

function sumPositives(values) {
  return values.reduce((sum, n) => (n > 0 ? sum + n : sum), 0);
}

function sumIfTriple(values) {
  const freq = values.reduce((acc, n) => ({ ...acc, [n]: (acc[n] || 0) + 1 }), {});
  const hasTriple = Object.values(freq).some((count) => count >= 3);
  return hasTriple ? sumPositives(values) : 0;
}

function parseNumbers(str) {
  return str.split(",").map((s) => s.trim()).filter((s) => s !== "").map(Number).filter((n) => !isNaN(n));
}

export function SumIfTriple() {
  const [input, setInput] = useState("1, 2, 3, 3, 3");
  const values = parseNumbers(input);
  const freq = values.reduce((acc, n) => ({ ...acc, [n]: (acc[n] || 0) + 1 }), {});
  const tripleVal = Object.entries(freq).find(([, c]) => c >= 3)?.[0];

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 1, 2, 3, 3, 3"
      />
      <p>
        {tripleVal
          ? `Triple found (${tripleVal}x3+) => sum of positives: `
          : "No triple => "}
        <strong>{sumIfTriple(values)}</strong>
      </p>
    </div>
  );
}
