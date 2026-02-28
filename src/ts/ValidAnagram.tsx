import { useState } from "react";

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const freq: Record<string, number> = {};
  for (const ch of s) freq[ch] = (freq[ch] ?? 0) + 1;
  for (const ch of t) {
    if (!freq[ch]) return false;
    freq[ch]--;
  }
  return true;
}

export function ValidAnagram() {
  const [s, setS] = useState("anagram");
  const [t, setT] = useState("nagaram");

  const result = isAnagram(s, t);

  return (
    <div>
      <label>
        1st string:{" "}
        <input value={s} onChange={(e) => setS(e.target.value)} style={{ width: 140 }} />
      </label>
      {"  "}
      <label>
        2nd string:{" "}
        <input value={t} onChange={(e) => setT(e.target.value)} style={{ width: 140 }} />
      </label>
      <span style={{ marginLeft: 12 }}>{"=>"} {result.toString()}</span>
    </div>
  );
}
