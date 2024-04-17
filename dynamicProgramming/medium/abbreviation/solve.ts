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
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function abbreviation(a: string, b: string): string {
  // Write your code here
  console.log(a, b); // a:97 A:65
  let aIdx = 0;
  for (let i = 0; i < b.length; i++) {
    if (aIdx >= a.length) return "NO";
    const ch = b[i];
    const chAscii = ch.charCodeAt(0);
    // console.log(ch, ch.charCodeAt(0));
    while (
      a[aIdx].charCodeAt(0) !== chAscii &&
      a[aIdx].charCodeAt(0) - 32 !== chAscii
    ) {
      if (65 <= a[aIdx].charCodeAt(0) && 96 >= a[aIdx].charCodeAt(0))
        return "NO";
      aIdx++;
      if (aIdx >= a.length) return "NO";
    }
    console.log(ch, a[aIdx]);
    aIdx++;
  }
  for (let i = aIdx; i < a.length; i++) {
    if (65 <= a[i].charCodeAt(0) && 96 >= a[i].charCodeAt(0)) return "NO";
  }
  return "YES";
}

function main() {
  const ws: WriteStream = createWriteStream("output.txt");

  const q: number = parseInt(readLine().trim(), 10);

  for (let qItr: number = 0; qItr < q; qItr++) {
    const a: string = readLine();

    const b: string = readLine();

    const result: string = abbreviation(a, b);

    ws.write(result + "\n");
  }

  ws.end();
}
