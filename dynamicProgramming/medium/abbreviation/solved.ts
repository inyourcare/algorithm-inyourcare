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
  // a 의 대문자를 모두 찾는다. 찾으면서 대문자의 index 배열을 같이 생성
  // b 에서 a 의 대문자에 대응하는 index 조합을 구한다.
  // a 의 대문자가 ABAD 일 경우
  // b 가 ACVBBDABBD 라면 => [0,3,6,9] [0,4,6,9] 두가지가 가능하다.
  // a 대문자 사이 글자를 substring 으로 만들고 string.includes(substring) 으로 구한다.
  // console.log("abcde".substring(1,2)) => b
  // console.log("abcde".substring(1)) => bcde
  // a 의 대문자 사이의 값에서 index 조합 사이의 b 문자를 찾으면 YES
  let substring = "";
  let caps = "";
  const substringArr = new Array<string>();
  for (let i = 0; i < a.length; i++) {
    const ch = a[i];
    if (isCapital(ch)) {
      caps += ch;
      substringArr.push(substring);
      substring = "";
    } else substring += ch;
  }
  // console.log(substringArr, caps);
  // console.log(b.indexOf("A", -1));
  // console.log(b.indexOf("A", 0));
  // console.log(b.indexOf("A", 2));
  // console.log(b.substring(-1, 3));
  let bIdx = -1;
  // let prevBIdx = -1;
  // let prevPossible = new Array<number[]>();
  let prevPossible = new Set<string>();

  // console.log("start", caps);
  for (let i = 0; i < caps.length; i++) {
    const cap = caps[i];
    const prevSubstring = substringArr[i];
    // console.log("cap is", cap, prevSubstring, prevPossible);
    // if (i === 0) break;
    let possible = new Set<string>();
    while (true) {
      // console.log(bIdx)
      bIdx = b.indexOf(cap, bIdx + 1);
      if (bIdx === -1) break;
      if (i === 0) {
        // console.log(prevSubstring, sub, bIdx);

        let sub = b.substring(0, bIdx);
        let possibleStr = sub + b[bIdx];
        // if (possible.has(possibleStr))
        if (isAbbreviationFrom(sub, prevSubstring)) possible.add(possibleStr);
        else break;
      }
      if (i !== 0) {
        let impossible = new Array<string>();
        prevPossible.forEach((elem) => {
          if (elem.length <= bIdx) {
            let sub = b.substring(elem.length, bIdx);
            let possibleStr = elem + sub + b[bIdx];
            // if (!possible.has(possibleStr))
            if (isAbbreviationFrom(sub, prevSubstring)) {
              possible.add(possibleStr);
            } else {
              impossible.push(elem);
            }
          }
        });
        impossible.forEach((imp) => {
          prevPossible.delete(imp);
        });
      }
    }
    bIdx = 0;
    // console.log("possible is", possible);
    prevPossible = possible;
  }
  // console.log(prevPossible, substring);
  if (substring.length > 0) {
    let result = "NO";
    // console.log(1, prevPossible.size, isAbbreviationFrom(b, substring));
    if (prevPossible.size === 0 && isAbbreviationFrom(b, substring)) {
      result = "YES";
    }
    prevPossible.forEach((elem) => {
      let sub = b.substring(elem.length);
      if (isAbbreviationFrom(sub, substring)) {
        result = "YES";
      }
    });
    return result;
  } else {
    let result = "NO";
    prevPossible.forEach((elem) => {
      if (elem === b) result = "YES";
    });
    return result;
  }
}
function isAbbreviationFrom(a: string, b: string) {
  const abbreviation = a.toUpperCase();
  const from = b.toUpperCase();
  // console.log("isAbbreviationFrom", abbreviation, from);
  if (abbreviation.length > from.length) return false;
  let fromIdx = -1;
  for (let i = 0; i < abbreviation.length; i++) {
    const element = abbreviation[i];
    fromIdx = from.indexOf(element, fromIdx + 1);
    if (fromIdx === -1) return false;
  }

  return true;
}
function isCapital(a: string) {
  return (
    "A".charCodeAt(0) <= a.charCodeAt(0) && "Z".charCodeAt(0) >= a.charCodeAt(0)
  );
}
function isSameCharacter(a: string, b: string) {
  return a.toLowerCase().charCodeAt(0) === b.toLowerCase().charCodeAt(0);
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
