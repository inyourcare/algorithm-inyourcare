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
// function countTriplets(arr, r) {
//   // every elem can be a
//   // if a*r, a*r^2 is found, count++, while checking indices orders.
//   // not sorted
//   // aaaa bbbb cccc => aaaa bbccbb cc / when found b after c, n(a)*nbefore(c) => 4*2+4*2
//   // aa bbaabb cccc 
//   const aDic = {}
//   const arDic = {}
//   const arrDic = {}
//   const rr = r * r
//   let ans = 0
//   for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];
//     const arDicElem = element / r
//     const arrDicElem = element / rr
//     aDic[element] === undefined ? aDic[element] = 1 : aDic[element] += 1
//     aDic[element] === undefined ? aDic[element] = 1 : aDic[element] += 1
//     arDicElem % 1 === 0 ? (arDic[arDicElem] === undefined ? arDic[arDicElem] = 1 : arDic[arDicElem] += 1) : false
//     arrDicElem % 1 === 0 ? (arrDic[arrDicElem] === undefined ? arrDic[arrDicElem] = 1 : arrDic[arrDicElem] += 1) : false
//   }

//   // console.log(aDic, arDic, arrDic)
//   // console.log(Object.keys(aDic))
//   for (var key in aDic) {
//     // console.log(key, aDic[key]);
//     if (aDic[key] !== undefined && arDic[key] !== undefined && arrDic[key] != undefined)
//       // console.log(aDic[key] * arDic[key] * arrDic[key])
//       ans += aDic[key] * arDic[key] * arrDic[key]
//   }
//   return ans
// }
function manageKeyList(keyListDic, key, val) {
  if (keyListDic[key] === undefined) {
    keyListDic[key] = new Array()
  }
  keyListDic[key].push(val)
}
function lengthOfSameVal(list, idx) {
  let i = idx
  let startIdx = idx
  let startVal = list[startIdx]
  // console.log(list)
  // console.log('lengthOfSameVal',startIdx,startVal,i)
  while (i < list.length && list[i] === startVal) {
    // console.log(list[i])
    i++
  }
  // console.log('lengthOfSameVal',startIdx,startVal,i)
  return i - startIdx
}

function countTriplets(arr, r) {
  const keyListDic = {}
  const rr = r * r
  let ans = 0
  for (let i = 0; i < arr.length; i++) {
    const aKey = arr[i];
    const arKey = aKey / r
    const arrKey = aKey / rr
    manageKeyList(keyListDic, aKey, 0)
    if (arKey % 1 === 0)
      manageKeyList(keyListDic, arKey, 1)
    if (arrKey % 1 === 0)
      manageKeyList(keyListDic, arrKey, 2)
  }
  console.log(keyListDic)
  for (var listKey in keyListDic) {
    // list is like [0,1,1,2,1]
    const list = keyListDic[listKey]
    // console.log('list is ',list)
    let zeros = 0
    let ones = 0
    let twos = 0
    let prev = -1
    const zerosBeforeOne = []
    for (let i = 0; i < list.length; i++) {
      const val = list[i];
      if (val === 0)
        zeros++
      else if (val === 1 && prev !== 1) { zerosBeforeOne.push(zeros) }
      prev = val
    }
    // console.log('zerosBeforeOne->',zerosBeforeOne)
    // console.log('before', zerosBeforeOne.length)
    let oneCnt = 0
    for (let i = list.length - 1; i >= 0; i--) {
      const val = list[i];
      if ((oneCnt > 0 && val !== 1) || (i === 0 && zerosBeforeOne.length > 0)) {
        const zerosBeforeThisOne = zerosBeforeOne.pop()
        ans += twos * zerosBeforeThisOne * oneCnt
        // console.log('pop->',zerosBeforeThisOne,twos,oneCnt,'index:',i)
        // twos = 0
        oneCnt = 0
      }
      
      if (val === 2)
        twos++
      else if (val === 1) {
        oneCnt++
      }
    }

    // console.log('after', zerosBeforeOne.length)
  }
  return ans
}

// function countTriplets(arr, r) {
//   const keyListDic = {}
//   const rr = r * r
//   for (let i = 0; i < arr.length; i++) {
//     const aKey = arr[i];
//     const arKey = aKey / r
//     const arrKey = aKey / rr
//     manageKeyList(keyListDic, aKey, 0)
//     if (arKey % 1 === 0)
//       manageKeyList(keyListDic, arKey, 1)
//     if (arrKey % 1 === 0)
//       manageKeyList(keyListDic, arrKey, 2)
//   }
//   // console.log(keyListDic)
//   for (var listKey in keyListDic) {
//     // list is like [0,1,1,2,1]
//     const list = keyListDic[listKey]
//     let zeros = 0;
//     let ones = 0;
//     let twos = 0;
//     // console.log('list', list)
//     let startIdx = 0
//     // while (startIdx < list.length && list[startIdx] !== 0) startIdx++
//     // for (let i = startIdx; i < list.length; i++) {
//     //   const val = list[i]
//     //   val === 0 && zeros++ || val === 1 && ones++ || val === 2 && twos++
//     // }
//     // console.log(list, zeros, ones, twos)
//     let targetVal = 0
//     let curIdx = 0
//     // let prevIdx = -1
//     // console.log(list)
//     console.log('###################')
//     while (curIdx !== -1) {
//       curIdx = list.indexOf(targetVal, curIdx)
//       const cnt = lengthOfSameVal(list, curIdx)
//       console.log(curIdx, list[curIdx], cnt, targetVal)
//       if (curIdx !== -1) {
//         if (targetVal === 0) zeros += cnt
//         else if (targetVal === 1) ones += cnt
//         else if (targetVal === 2) twos += cnt
//       }
//       // console.log(curIdx,targetVal,cnt)
//       // console.log(targetVal, prevIdx, curIdx)
//       // if (prevIdx != -1) {
//       //   const curIdxVal = (curIdx === -1 ? list.length - 1 : curIdx)
//       //   if (targetVal === 0) twos += curIdxVal - prevIdx
//       //   else if (targetVal === 1) zeros += curIdxVal - prevIdx
//       //   else if (targetVal === 2) ones += curIdxVal - prevIdx
//       // }
//       targetVal = (targetVal + 1) % 3
//       // prevIdx = curIdx
//     }
//     console.log(list, zeros, ones, twos)
//   }
//   return 0
// }

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
