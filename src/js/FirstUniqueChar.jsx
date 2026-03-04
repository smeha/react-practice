import { useState } from "react";

export function firstUniqChar(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }
  return -1;
}

export function FirstUniqueChar() {
  const [s, setS] = useState("leetcode");
  const idx = firstUniqChar(s);

  return (
    <div>
      <input value={s} onChange={(e) => setS(e.target.value)} placeholder="Enter string..." />
      <p>
        First unique index: <strong>{idx}</strong>
        {idx >= 0 ? ` => "${s[idx]}"` : " (none)"}
      </p>
    </div>
  );
}
