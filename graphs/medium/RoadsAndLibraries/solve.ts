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
 * Complete the 'roadsAndLibraries' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER c_lib
 *  3. INTEGER c_road
 *  4. 2D_INTEGER_ARRAY cities
 */

function roadsAndLibraries(
  n: number, // the number of cities
  c_lib: number, // lib cost
  c_road: number, // road cost
  cities: number[][] // path
): number {
  // Write your code here
  console.log(n, c_lib, c_road, cities);
  return 0;
}

function main() {
  const ws: WriteStream = createWriteStream("output.txt");

  const q: number = parseInt(readLine().trim(), 10);

  for (let qItr: number = 0; qItr < q; qItr++) {
    const firstMultipleInput: string[] = readLine()
      .replace(/\s+$/g, "")
      .split(" ");

    const n: number = parseInt(firstMultipleInput[0], 10);

    const m: number = parseInt(firstMultipleInput[1], 10);

    const c_lib: number = parseInt(firstMultipleInput[2], 10);

    const c_road: number = parseInt(firstMultipleInput[3], 10);

    let cities: number[][] = Array(m);

    for (let i: number = 0; i < m; i++) {
      cities[i] = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((citiesTemp) => parseInt(citiesTemp, 10));
    }

    const result: number = roadsAndLibraries(n, c_lib, c_road, cities);

    ws.write(result + "\n");
  }

  ws.end();
}
