'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the countTriplets function below.
function countTriplets(arr, r) {
  // every elem can be a
  // if a*r, a*r^2 is found, count++, while checking indices orders.
  const aDic = {}
  const arDic = {}
  const arrDic = {}
  const rr = r * r
  let ans = 0
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const arDicElem = element / r
    const arrDicElem = element / rr
    aDic[element] === undefined ? aDic[element] = 1 : aDic[element] += 1
    arDicElem % 1 === 0 ? (arDic[arDicElem] === undefined ? arDic[arDicElem] = 1 : arDic[arDicElem] += 1) : false
    arrDicElem % 1 === 0 ? (arrDic[arrDicElem] === undefined ? arrDic[arrDicElem] = 1 : arrDic[arrDicElem] += 1) : false
  }
  // console.log(aDic, arDic, arrDic)
  // console.log(Object.keys(aDic))
  for (var key in aDic) {
    // console.log(key, aDic[key]);
    if (aDic[key] !== undefined && arDic[key] !== undefined && arrDic[key] != undefined)
      // console.log(aDic[key] * arDic[key] * arrDic[key])
      ans += aDic[key] * arDic[key] * arrDic[key]
  }
  return ans
}

function main() {
  const ws = fs.createWriteStream('output.txt');

  const nr = readLine().replace(/\s+$/g, '').split(' ');

  const n = parseInt(nr[0], 10);

  const r = parseInt(nr[1], 10);

  const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

  const ans = countTriplets(arr, r);

  ws.write(ans + '\n');

  ws.end();
}
