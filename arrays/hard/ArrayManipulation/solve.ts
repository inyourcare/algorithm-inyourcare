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
 * Complete the 'arrayManipulation' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

// function arrayManipulation(n: number, queries: number[][]): number {
//   // Write your code here
//   // console.log('given n is' , n)
//   const arr = new Array(n).fill(0);
//   let max = 0
//   // console.log('arr created ',arr)
//   for (let i = 0; i < queries.length; i++) {
//     const [start,end,val] = queries[i];
//     // console.log(start,end,val)
//     for (let j = start-1; j < end; j++) {
//       arr[j]+=val;
//       if (arr[j]>max)
//         max = arr[j]
//     }
//     // console.log(i,'operaction done, arr is',arr)
//   }
//   // return Math.max(...arr);
//   return max;
// }

function arrayManipulation(n: number, queries: number[][]): number {
  const indicesValArr = [[1, n, 0]];
  let max = 0;
  for (let i = 0; i < queries.length; i++) {
    const [qsi, qei, qVal] = queries[i];
    // console.log("indicesValArr is", indicesValArr);
    // console.log("query is", queries[i]);
    let j = 0;
    // for (let j = 0; j < indiceValArr.length; j++) {
    while (j < indicesValArr.length) {
      const [dsi, dei, dVal] = indicesValArr[j];
      let tmpVal = 0;
      if ((qsi === dsi && qei === dei) || (qsi <= dsi && qei >= dei)) {
        tmpVal = indicesValArr[j][2] + qVal;
        indicesValArr[j][2] = tmpVal;
      } else if (!((qsi < dsi && qei < dsi) || (qsi > dei && qei > dei))) {
        // const orderedIndice = [qsi, dsi, dei, qei].sort().reverse();
        const orderedIndices = [qsi, dsi, dei, qei].filter((e, index) => {
          return e <= dei && e >= dsi;
        }).sort((a, b) => a - b);
        // orderedIndices.sort((a, b) => a - b);
        // console.log("orderedIndices is", orderedIndices);
        const tmpArr = new Array<number[]>();
        for (let k = 0; k < orderedIndices.length - 1; k++) {
          let start = orderedIndices[k];
          let end = orderedIndices[k + 1];
          if (start === qei && end > qei) start += 1;
          if (end === qsi && start < qsi) end -= 1;
          const tmp = dVal + (start >= qsi && end <= qei ? qVal : 0);
          tmpArr.push([start, end, tmp]);
          if (tmp > tmpVal) tmpVal = tmp;
        }
        indicesValArr.splice(j, 1, ...tmpArr);
        j += tmpArr.length - 1;
      }
      // console.log(j, indicesValArr);
      if (max < tmpVal) max = tmpVal;
      j++;
    }
  }
  return max;
}
// function arrayManipulation(n: number, queries: number[][]): number {
//   // index 경우의 수
//   // qsi < dsi , qei < dei / qsi < dsi , qei > dei / qsi < dsi , qei = dei
//   // qsi > dsi , qei < dei / qsi > dsi , qei > dei / qsi > dsi , qei = dei
//   // qsi = dsi , qei < dei / qsi = dsi , qei > dei / qsi = dsi , qei = dei
//   return 0
// }

function main() {
  const ws: WriteStream = createWriteStream("output.txt");

  const firstMultipleInput: string[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ");

  const n: number = parseInt(firstMultipleInput[0], 10);

  const m: number = parseInt(firstMultipleInput[1], 10);

  let queries: number[][] = Array(m);

  for (let i: number = 0; i < m; i++) {
    queries[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((queriesTemp) => parseInt(queriesTemp, 10));
  }

  const result: number = arrayManipulation(n, queries);

  ws.write(result + "\n");

  ws.end();
}
