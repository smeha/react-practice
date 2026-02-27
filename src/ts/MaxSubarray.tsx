import { useState } from "react";

// ── algorithm ────────────────────────────────────────────────────────────────
function maxSubarray(nums: number[]): { sum: number; from: number; to: number } {
  if (nums.length === 0) throw new Error("array must be non-empty");
  let best = nums[0], cur = nums[0], from = 0, to = 0, start = 0;
  for (let i = 1; i < nums.length; i++) {
    if (cur + nums[i] < nums[i]) { cur = nums[i]; start = i; }
    else cur += nums[i];
    if (cur > best) { best = cur; from = start; to = i; }
  }
  return { sum: best, from, to };
}

// ── component ─────────────────────────────────────────────────────────────────
export function MaxSubarray() {
  const [numsInput, setNumsInput] = useState("-2, 1, -3, 4, -1, 2, 1, -5, 4");

  let output: string;
  try {
    const nums = numsInput.split(",").map((s) => {
      const n = Number(s.trim());
      if (isNaN(n)) throw new Error("invalid number");
      return n;
    });
    const { sum, from, to } = maxSubarray(nums);
    output = `sum=${sum}  indices=[${from}, ${to}]`;
  } catch (e) {
    output = (e as Error).message;
  }

  return (
    <div style={{ fontFamily: "monospace" }}>
      <p style={{ margin: "0 0 4px" }}>
        <strong>Problem:</strong> Find the contiguous subarray with the largest sum
        (Kadane's algorithm). Return sum and start/end indices. Time O(n), space O(1).
      </p>
      <p style={{ margin: "0 0 8px", color: "#888", fontSize: 13 }}>
        Example: [-2,1,-3,4,-1,2,1,-5,4] → sum=6, indices=[3,6]
      </p>
      <label>
        nums:{" "}
        <input
          value={numsInput}
          onChange={(e) => setNumsInput(e.target.value)}
          style={{ width: 300 }}
        />
      </label>
      <span style={{ marginLeft: 12 }}>→ {output}</span>
    </div>
  );
}
