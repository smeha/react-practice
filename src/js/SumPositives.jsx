import { useState } from "react";

export function sumPositives(values) {
  return values.reduce((sum, n) => (n > 0 ? sum + n : sum), 0);
}

function parseNumbers(str) {
  return str.split(",").map((s) => Number(s.trim())).filter((s, i, arr) => s !== "" && !isNaN(arr[i]));
}

export function SumPositives() {
  const [input, setInput] = useState("1, -2, 3, -4, 5");
  const values = parseNumbers(input);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 1, -2, 3"
      />
      <p>Sum of positives: <strong>{sumPositives(values)}</strong></p>
    </div>
  );
}
