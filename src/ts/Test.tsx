import { useState } from "react";

function fibonacci(num: number): bigint{
  let a=0n, b=1n;
  for(let i=0; i<num; i++){
    [a,b] = [b, a+b];
  }

  return a;
}

export function Test(){
  const [num, setNum] = useState(0);
  
  let output: string;
  try{
    output = fibonacci(num).toString();
  }catch(e){
    output = (e as Error).message;
  }

  return(
    <>
      <input
        value={num}
        onChange={(e)=> setNum(Number(e.target.value))}
      />
      <p>Fibonacci result: {output}</p>
    </>

  );
}
