import { useState } from "react";

export function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0, right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}

export function PalindromeChecker() {
  const [s, setS] = useState("A man a plan a canal Panama");
  const result = isPalindrome(s);

  return (
    <div>
      <input value={s} onChange={(e) => setS(e.target.value)} placeholder="Enter string..." />
      <p>Palindrome: <strong>{result ? "true" : "false"}</strong></p>
    </div>
  );
}
