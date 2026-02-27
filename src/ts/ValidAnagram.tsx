import { useState } from "react";

// ── algorithm ────────────────────────────────────────────────────────────────
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

// ── component ─────────────────────────────────────────────────────────────────
export function ValidAnagram() {
  const [s, setS] = useState("anagram");
  const [t, setT] = useState("nagaram");

  const result = isAnagram(s, t);

  return (
    <div style={{ fontFamily: "monospace" }}>
      <p style={{ margin: "0 0 4px" }}>
        <strong>Problem:</strong> Given two strings, return true if t is an anagram
        of s. Time O(n), space O(1) (fixed alphabet).
      </p>
      <p style={{ margin: "0 0 8px", color: "#888", fontSize: 13 }}>
        Examples: ("anagram", "nagaram") → true, ("rat", "car") → false
      </p>
      <label>
        s:{" "}
        <input value={s} onChange={(e) => setS(e.target.value)} style={{ width: 140 }} />
      </label>
      {"  "}
      <label>
        t:{" "}
        <input value={t} onChange={(e) => setT(e.target.value)} style={{ width: 140 }} />
      </label>
      <span style={{ marginLeft: 12 }}>→ {result.toString()}</span>
    </div>
  );
}
