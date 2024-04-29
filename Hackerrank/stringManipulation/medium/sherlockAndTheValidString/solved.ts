"use strict";

import { WriteStream, createWriteStream } from "fs";
import { MyDict } from "../../../../common/typesciprt/MyDict";
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
  let prev = -1;
  let higher = -1;
  let lower = -1;
  for (let i = 0; i < keys.length; i++) {
    const cnt = chCntDic[keys[i]];
    if (prev !== cnt) {
      higher = Math.max(prev, cnt);
      lower = Math.min(prev, cnt);
    }
    prev = cnt;
  }
  const higherCnt = keys.filter((k) => chCntDic[k] === higher).length;
  const lowerCnt = keys.filter((k) => chCntDic[k] === lower).length;
  if (higherCnt === keys.length) return "YES";
  if (higherCnt === 1 && lowerCnt === keys.length - 1 && higher - lower === 1)
    return "YES";
  if (higherCnt === keys.length - 1 && lower === 1) return "YES";
  // if (higher - lower > 1) return "NO";

  return "NO";
}

function main() {
  const ws: WriteStream = createWriteStream("output.txt");

  const s: string = readLine();

  const result: string = isValid(s);

  ws.write(result + "\n");

  ws.end();
}
