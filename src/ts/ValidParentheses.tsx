import { useState } from "react";

// ── algorithm ────────────────────────────────────────────────────────────────
function isValid(s: string): boolean {
  const stack: string[] = [];
  const match: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  for (const ch of s) {
    if ("([{".includes(ch)) {
      stack.push(ch);
    } else {
      if (stack.pop() !== match[ch]) return false;
    }
  }
  return stack.length === 0;
}

// ── component ─────────────────────────────────────────────────────────────────
export function ValidParentheses() {
  const [input, setInput] = useState("({[]})");

  const output = isValid(input).toString();

  return (
    <div style={{ fontFamily: "monospace" }}>
      <p style={{ margin: "0 0 4px" }}>
        <strong>Problem:</strong> Given a string of brackets, return true if it is
        valid (every opener has a matching closer in correct order). Time O(n), space O(n).
      </p>
      <p style={{ margin: "0 0 8px", color: "#888", fontSize: 13 }}>
        Examples: "([])" → true, "([)]" → false, "" → true
      </p>
      <label>
        s:{" "}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: 160 }}
        />
      </label>
      <span style={{ marginLeft: 12 }}>→ {output}</span>
    </div>
  );
}
