import { useState } from "react";

// ── algorithm ────────────────────────────────────────────────────────────────
function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return null;
}

// ── component ─────────────────────────────────────────────────────────────────
export function TwoSum() {
  const [numsInput, setNumsInput] = useState("2, 7, 11, 15");
  const [target, setTarget] = useState("9");

  let output: string;
  try {
    const nums = numsInput.split(",").map((s) => {
      const n = Number(s.trim());
      if (isNaN(n)) throw new Error("invalid number");
      return n;
    });
    const result = twoSum(nums, Number(target));
    output = result ? `[${result[0]}, ${result[1]}]` : "no solution";
  } catch (e) {
    output = (e as Error).message;
  }

  return (
    <div style={{ fontFamily: "monospace" }}>
      <p style={{ margin: "0 0 4px" }}>
        <strong>Problem:</strong> Given an array of integers and a target, return the indices
        of the two numbers that add up to the target. Time O(n), space O(n).
      </p>
      <p style={{ margin: "0 0 8px", color: "#888", fontSize: 13 }}>
        Example: nums=[2,7,11,15], target=9 → [0,1]
      </p>
      <label>
        nums:{" "}
        <input
          value={numsInput}
          onChange={(e) => setNumsInput(e.target.value)}
          style={{ width: 200 }}
        />
      </label>
      {"  "}
      <label>
        target:{" "}
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          style={{ width: 60 }}
        />
      </label>
      <span style={{ marginLeft: 12 }}>→ {output}</span>
    </div>
  );
}
