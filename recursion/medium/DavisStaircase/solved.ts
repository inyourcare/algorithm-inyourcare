"use strict";

import { WriteStream, createWriteStream } from "fs";
import { factorial } from "../../../common/MathUtil";
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
 * Complete the 'stepPerms' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER n as parameter.
 */

function stepPerms(n: number): number {
  // Write your code here
  let result = 0;
  1; // 1
  2; // 11 2
  3; // 111 12 21 3
  4; // 1111 112 121 211 13 31 22
  5; // 11111 1112 1121 1211 2111 122 212 221
  6; // 2211
  // 2가 하나만 들어가는 경우 1, 2, 3 즉 나머지 1의 개수만큼 증가 곧 n - 2 + 1개만큼 존재
  // 2가 두개 들어가는 경우 4!/(2!2!) = 6
  // 즉, 구성하는 숫자를 모두 알면 각각의 개수를 알 수 있다.
  // 1-> 1!/(1!)
  // 2 -> 2!/(2!) + 1!/(1!)
  // 3 -> 3!/(3!) + 2!/(1!1!) + 1!/(1!)
  // 4 -> 4!/(4!) + 3!/(2!1!) + 2!/(1!1!) + 2!/(2!)
  // const quotientStep3 = Math.floor(n/3)
  // const quotientStep2 = Math.floor(n/2)
  let stairsByStep3 = 0;
  let step3 = 0;
  // console.log(n, "is being calculated");
  while (stairsByStep3 <= n) {
    // for (let i = 0; i < quotientStep3; i++) {
    let stairsByStep2 = stairsByStep3;
    let step2 = 0;
    while (stairsByStep2 <= n) {
      const step1 = n - stairsByStep2;
      // console.log(step1, step2, step3);
      const dividend = factorial(step1 + step2 + step3)
      const divisor = factorial(step1) * factorial(step2) * factorial(step3)
      // console.log(dividend,divisor,dividend/divisor)
      result += dividend/divisor
      step2++;
      stairsByStep2 += 2;
    }
    stairsByStep3 += 3;
    step3++;
  }
  // return quotientStep3 % 10000000007
  return result;
}

function main() {
  const ws: WriteStream = createWriteStream("output.txt");

  const s: number = parseInt(readLine().trim(), 10);

  for (let sItr: number = 0; sItr < s; sItr++) {
    const n: number = parseInt(readLine().trim(), 10);

    const res: number = stepPerms(n);

    ws.write(res + "\n");
  }

  ws.end();
}


