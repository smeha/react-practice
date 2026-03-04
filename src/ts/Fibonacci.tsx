import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export function fibonacci(n: number): bigint {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer");
  }
  let a = 0n, b = 1n;
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}

export function FibonacciList({ count = 30 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => fibonacci(i).toString());
  return <p>{items.join(", ")}</p>;
}

export function Fibonacci() {
  const [input, setInput] = useState("0");

  const n = Number(input);
  const invalid = input.trim() === "" || isNaN(n) || !Number.isInteger(n) || n < 0;

  let result: string;
  if (invalid) {
    result = "enter a non-negative integer";
  } else {
    try {
      result = fibonacci(n).toString();
    } catch (e) {
      result = (e as Error).message;
    }
  }

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>Fibonacci({input || "?"}) = {result}</p>
    </div>
  );
}
