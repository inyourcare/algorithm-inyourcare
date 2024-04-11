"use strict";

import { WriteStream, createWriteStream } from "fs";
import { MyDict } from "../../../common/MyDict";
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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */
function isValid(s: string): string {
  // Write your code here
  // console.log(s)
  const chCntDic: MyDict<number> = {};
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (chCntDic[ch] === undefined) {
      chCntDic[ch] = 1;
    } else {
      chCntDic[ch]++;
    }
  }
  // console.log(chCntDic);
  // console.log(Object.keys(chCntDic));

  // cnt === 1 => remove it and check all individuals are the same
  // [3,2,4] case 
  const keys = Object.keys(chCntDic);
  const firstCnt = chCntDic[keys[0]];
  for (let i = 1; i < keys.length; i++) {
    const cnt = chCntDic[keys[i]];
    const abs = Math.abs(firstCnt - cnt);
    if (abs > 1) return "NO";
    else if (abs === 1) {
      const higher = Math.max(firstCnt, cnt);
      if (keys.filter((k) => chCntDic[k] === higher).length > 1) return "NO";
    }
  }
  return "YES";
}

function main() {
  const ws: WriteStream = createWriteStream("output.txt");

  const s: string = readLine();

  const result: string = isValid(s);

  ws.write(result + "\n");

  ws.end();
}
