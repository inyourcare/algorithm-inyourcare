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

// function arrayManipulation(n: number, queries: number[][]): number {
//   const indicesValArr = [[1, n, 0]];
//   let max = 0;
//   for (let i = 0; i < queries.length; i++) {
//     const [qsi, qei, qVal] = queries[i];
//     // console.log("indicesValArr is", indicesValArr);
//     // console.log("query is", queries[i]);
//     let j = 0;
//     // for (let j = 0; j < indiceValArr.length; j++) {
//     while (j < indicesValArr.length) {
//       const [dsi, dei, dVal] = indicesValArr[j];
//       let tmpVal = 0;
//       if ((qsi <= dsi && qei >= dei)) {
//         tmpVal = indicesValArr[j][2] + qVal;
//         indicesValArr[j][2] = tmpVal;
//       } else if (!((qsi < dsi && qei < dsi) || (qsi > dei && qei > dei))) {
//         // const orderedIndice = [qsi, dsi, dei, qei].sort().reverse();
//         const orderedIndices = [qsi, dsi, dei, qei].filter((e, index) => {
//           return e <= dei && e >= dsi;
//         }).sort((a, b) => a - b);
//         // orderedIndices.sort((a, b) => a - b);
//         // console.log("orderedIndices is", orderedIndices);
//         const tmpArr = new Array<number[]>();
//         for (let k = 0; k < orderedIndices.length - 1; k++) {
//           let start = orderedIndices[k];
//           let end = orderedIndices[k + 1];
//           if (start === qei && end > qei) start += 1;
//           if (end === qsi && start < qsi) end -= 1;
//           const tmp = dVal + (start >= qsi && end <= qei ? qVal : 0);
//           tmpArr.push([start, end, tmp]);
//           if (tmp > tmpVal) tmpVal = tmp;
//         }
//         indicesValArr.splice(j, 1, ...tmpArr);
//         j += tmpArr.length - 1;
//       }
//       // console.log(j, indicesValArr);
//       if (max < tmpVal) max = tmpVal;
//       j++;
//     }
//   }
//   return max;
// }

// type SumIndices = {
//   [key: number]: Set<number>;
// };
// function arrayManipulation(n: number, queries: number[][]): number {
//   // dictionary
//   // input 10 5 / 5 5 3 / 2 6 8 / 3 5 7 / 1 8 1 / 5 9 15
//   // 1 -> [3] : 5
//   // 2 -> [3] : / [8] 2 3 4 6 / [11] 5 -> [3] eliminated
//   // 3 -> [8] 2 6 / [15] 3 4 / [11] / [18] 5 / [7] -> [11] eliminated
//   // const SumDic = {};
//   // // for (let i = 0; i < queries.length; i++) {
//   // //   SumDic['']
//   // // }
//   // SumDic[100] = [1,2,3]
//   // console.log('SumDic=',SumDic[100])
//   const SumDic: SumIndices = {};
//   let max = 0;
//   // SumDic[1] = new Set<number>([1,2,3]);
//   // console.log('SumDic=',SumDic[1],SumDic[2])
//   for (let i = 0; i < queries.length; i++) {
//     // console.log("query is", queries[i]);
//     const [qsi, qei, qVal] = queries[i];
//     let numSet = new Set<number>();
//     for (let j = qsi; j <= qei; j++) numSet.add(j);
//     let keys = Object.keys(SumDic);
//     for (let j = 0; j < keys.length; j++) {
//       // console.log("SumDic", j, SumDic[Number(keys[j])]);
//       const key = Number(keys[j]);
//       let localSet = SumDic[key];
//       const commonSet = new Set(
//         [...localSet].filter((value) => numSet.has(value))
//       );
//       numSet = new Set([...numSet].filter((item) => !commonSet.has(item)));
//       SumDic[key] = new Set(
//         [...localSet].filter((item) => !commonSet.has(item))
//       );
//       SumDic[key].size === 0 ? delete SumDic[key] : true;
//       const newKey = key + qVal;
//       if (commonSet.size > 0) {
//         if (SumDic[newKey] === undefined) {
//           SumDic[newKey] = commonSet;
//           max < newKey ? (max = newKey) : true;
//         } else {
//           SumDic[newKey] = new Set([...SumDic[newKey], ...commonSet]);
//         }
//       }
//     }
//     if (SumDic[qVal] === undefined && numSet.size > 0) {
//       SumDic[qVal] = numSet;
//       max < qVal ? (max = qVal) : true;
//     }
//   }

//   return max;
// }

// function getMaximumIfExist(queries: number[][], max: number) {
//   // queries.pop()
//   // console.log('local queries',queries) -> pointer
//   let skip = -1;
//   // console.log("max is ", max);
//   while (skip < queries.length) {
//     let start = 0;
//     let end = 10000000; // a<b<n<10^7
//     for (let i = 0; i < queries.length; i++) {
//       if (i === skip) continue;
//       const element = queries[i];
//       if (element[0] > start) start = element[0];
//       if (element[1] < end) end = element[1];
//     }
//     // console.log(skip, start, end, skip === -1 ? max : max - queries[skip][2]);
//     if (start <= end) {
//       // console.log("found max is", skip === -1 ? max : max - queries[skip][2]);
//       return skip === -1 ? max : max - queries[skip][2];
//     }
//     skip++;
//   }

//   return 0;
// }
// function arrayManipulation(n: number, queries: number[][]): number {
//   // sort by query[2] value then find common set of indices in order of sums of query vals
//   // only calculating for comparing of ranges from two queries needed
//   queries.sort((a, b) => a[2] - b[2]);
//   console.log(queries);
//   let max = queries.reduce((acc, cur) => acc + cur[2], 0);
//   console.log("max is", max);
//   // while (queries.length > 0) {
//   //   // console.log(queries);
//   //   const result = getMaximumIfExist(queries, max);
//   //   if (result > 0) return result;
//   //   const lastQuery = queries.shift();
//   //   max = max - (lastQuery !== undefined ? lastQuery[2] : 0);
//   //   console.log("new max is", max);
//   // }
//   const skipSet = new Set<number>();
//   for (let i = -1; i < queries.length; i++) {
//     skipSet.add(i);
//     for (let j = i; j < queries.length; j++) {
//       // console.log(i, j, "skipSet", skipSet);
//       for (let k = j + 1; k < queries.length; k++) {
//         skipSet.add(k);
//         console.log(i, j, k, skipSet);
//         skipSet.delete(k);
//       }
//       skipSet.delete(j);
//       skipSet.add(j + 1 === queries.length ? i : j + 1);
//     }
//   }
//   return 0;
// }
function arrayManipulation(n: number, queries: number[][]): number {
  // const arr = new Array(n).fill(0).fill(1, 1, 2);
  // console.log(arr);
  // const max = queries.reduce((acc, cur) => acc + cur[2], 0);
  // let max = 0
  // const reduced = queries.reduce((acc, cur) => {
  //   // for (let i = cur[0] - 1; i < cur[1]; i++) {
  //   //   acc[i] += cur[2];
  //   //   // if (acc[i] > max)
  //   //   //   max = acc[i]
  //   // }
  //   acc[0] += cur[2];
  //   return acc;
  // }, new Array(n).fill(0));
  // console.log(reduced,max)

  // m*m doesn't work
  // const rangeMarker = new Array(n).fill(0); rangeMarker[0] = n
  // const valueMarker = new Array(n).fill(0);
  // queries.forEach((q, queryIdx) => {
  //   const [qsi,qei,qVal] = q
  //   let rangeIdx = 0
  //   while(true){
  //     let originalRage = rangeMarker[rangeIdx]
  //     if (originalRage > qsi){
  //       rangeMarker[rangeIdx] = qsi
  //       rangeMarker[qsi] = originalRage
  //       break;
  //     } else {
  //       rangeIdx = originalRage
  //     }
  //   }
  // });
  // console.log(rangeMarker)

  const startIndices = new Array(n).fill(0);
  const endIndices = new Array(n+1).fill(0); // +1 for qei is equal to the length
  queries.forEach((q, queryIdx) => {
    const [qsi,qei,qVal] = q
    startIndices[qsi-1] += qVal
    endIndices[qei] -= qVal
  })
  // console.log(startIndices,endIndices)
  let cur = 0
  let max = 0
  for (let i = 0; i < n; i++) {
    cur += startIndices[i] + endIndices[i]
    if (max < cur)
      max = cur
    // console.log(i,cur)
  }
  return max;
}
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
