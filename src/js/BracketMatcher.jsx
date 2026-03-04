import { useState } from "react";

export function searchingChallenge(str) {
  let balance = 0;
  for (const ch of str) {
    if (ch === "(") balance++;
    else if (ch === ")") {
      balance--;
      if (balance < 0) return 0;
    }
  }
  return balance === 0 ? 1 : 0;
}

export function BracketMatcher() {
  const [str, setStr] = useState("(hello (world))");
  const result = searchingChallenge(str);

  return (
    <div>
      <input value={str} onChange={(e) => setStr(e.target.value)} placeholder="Enter expression..." />
      <p>Brackets balanced: <strong>{result === 1 ? "Yes (1)" : "No (0)"}</strong></p>
    </div>
  );
}
