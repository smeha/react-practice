import { useState } from "react";

function toMinutes(timeStr) {
  const s = timeStr.trim().toLowerCase();
  const meridian = s.slice(-2);
  const timePart = s.slice(0, -2);
  let [h, m] = timePart.split(":").map(Number);
  if (h === 12) h = 0;
  if (meridian === "pm") h += 12;
  return h * 60 + m;
}

export function stringChallenge(str) {
  const parts = str.trim().split("-");
  if (parts.length !== 2) return null;
  try {
    const start = toMinutes(parts[0]);
    const end = toMinutes(parts[1]);
    if (isNaN(start) || isNaN(end)) return null;
    let diff = end - start;
    if (diff < 0) diff += 24 * 60;
    return diff;
  } catch {
    return null;
  }
}

export function TimeDifference() {
  const [str, setStr] = useState("12:30pm-12:00am");
  const result = stringChallenge(str);

  return (
    <div>
      <input
        value={str}
        onChange={(e) => setStr(e.target.value)}
        placeholder="e.g. 1:00am-11:00am"
      />
      <p>
        Minutes between:{" "}
        <strong>{result === null ? "invalid format" : result}</strong>
      </p>
    </div>
  );
}
