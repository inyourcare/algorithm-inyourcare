"use strict";

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString: string = "";
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on("data", function (inputStdin: string): void {
  inputString += inputStdin;
});

process.stdin.on("end", function (): void {
  inputLines = inputString.split("\n");
  inputString = "";

  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

/*
 * Complete the 'primality' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER n as parameter.
 */

function primality(n: number): string {
  // Write your code here
  // No need to try to divide n by over n/2
  // 1 2 3 4(2) 5 6(2) 7 8(2)
  // console.log("n is ", n);
  const PrimeReturn = "Prime";
  const NotPrimeReturn = "Not prime";
  let primeArr = [2, 3];
  if (primeArr.includes(n)) return PrimeReturn;
  if (n === 1 || isNewPrime(n, primeArr) === false) return NotPrimeReturn;
  let i = primeArr[primeArr.length - 1] + 1;
  while (i <= Math.floor(n / primeArr[primeArr.length - 1])) {
    if (isNewPrime(i, primeArr)) {
      if (n % i === 0) return NotPrimeReturn;
      primeArr.push(i);
    }
    i++;
  }
  return PrimeReturn;
}

function isNewPrime(n: number, primeArr: Array<number>) {
  for (let i = 0; i < primeArr.length; i++) {
    const prime = primeArr[i];
    if (n % prime === 0) return false;
  }
  return true;
}
// function main() {
//   const ws: WriteStream = createWriteStream("output.txt");
//   let primeCnt = 0;
//   // for (let i = 0; i < 7920; i++) {
//   //   if (primality(i) === "Prime") {
//   //     ws.write(i + " ");
//   //     if (primeCnt % 20 === 0) ws.write("\n");
//   //     primeCnt++;
//   //   }
//   // }2000000000
//   console.log(primality(1))
//   ws.end();
// }

function main() {
  const ws: WriteStream = createWriteStream("output.txt");

  const p: number = parseInt(readLine().trim(), 10);

  for (let pItr: number = 0; pItr < p; pItr++) {
    const n: number = parseInt(readLine().trim(), 10);

    const result: string = primality(n);

    ws.write(result + "\n");
  }

  ws.end();
}
