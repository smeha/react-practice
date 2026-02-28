import { useState } from "react";

function lengthOfLongestSubstring(s: string): { length: number; substring: string } {
  const seen = new Map<string, number>();
  let best = 0, start = 0, bestStart = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (seen.has(ch) && seen.get(ch)! >= start) {
      start = seen.get(ch)! + 1;
    }
    seen.set(ch, i);
    if (i - start + 1 > best) {
      best = i - start + 1;
      bestStart = start;
    }
  }
  return { length: best, substring: s.slice(bestStart, bestStart + best) };
}

export function LongestSubstring() {
  const [input, setInput] = useState("abcabcbb");

  const { length, substring } = lengthOfLongestSubstring(input);

  return (
    <div>
      <label>
        string:{" "}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: 220 }}
        />
      </label>
      <span style={{ marginLeft: 12 }}>{"=>"} {length} &nbsp;<span style={{ color: "#888" }}>("{substring}")</span></span>
    </div>
  );
}
