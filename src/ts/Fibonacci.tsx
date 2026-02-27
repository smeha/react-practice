import { useState } from "react";

function fibonacci(n: number): bigint {
  if (!Number.isInteger(n) || n < 0){
    throw new Error("n have to be integer and non-negative");
  }
  let a = 0n, b=1n;
  for (let i=0; i<n; i++){
    [a,b]=[b,a+b];
  }
  return a;
}

export function FibonacciList({ count = 30 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => fibonacci(i).toString());
  return <p>{items.join(", ")}</p>;
}

export function Fibonacci() {
  const [n, setN] = useState(0);

  let result: string;
  try {
    result = fibonacci(n).toString();
  } catch (e) {
    result = (e as Error).message;
  }

  return (
    <div>
      <input
        // type="number"
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        min={0}
      />
      <p>Fibonacci({n}) = {result}</p>
    </div>
  );
}