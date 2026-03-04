import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export function isValid(s: string): boolean {
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

export function ValidParentheses() {
  const [input, setInput] = useState("({[]})");

  const output = isValid(input).toString();

  return (
    <div>
      <label>
        string:{" "}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: 160 }}
        />
      </label>
      <span style={{ marginLeft: 12 }}>{"=>"} {output}</span>
    </div>
  );
}
