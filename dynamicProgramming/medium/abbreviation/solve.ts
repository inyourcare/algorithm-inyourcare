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
  // console.log(a, b); // a:97 A:65
  // let aIdx = 0;
  // let prevAIdx = -1;
  // for (let i = 0; i < b.length; i++) {
  //   if (aIdx >= a.length) return "NO";
  //   const ch = b[i];
  //   const chAscii = ch.charCodeAt(0);
  //   // console.log(ch, ch.charCodeAt(0));
  //   while (
  //     a[aIdx].charCodeAt(0) !== chAscii &&
  //     a[aIdx].charCodeAt(0) - 32 !== chAscii
  //   ) {
  //     if (65 <= a[aIdx].charCodeAt(0) && 96 >= a[aIdx].charCodeAt(0)) {
  //       if (
  //         prevAIdx !== -1 &&
  //         a[prevAIdx].charCodeAt(0) !== a[aIdx].charCodeAt(0) + 32
  //       )
  //         return "NO";
  //     }
  //     aIdx++;
  //     if (aIdx >= a.length) return "NO";
  //   }
  //   console.log(ch, a[aIdx]);
  //   prevAIdx = aIdx;
  //   aIdx++;
  // }
  // if (65 <= a[prevAIdx].charCodeAt(0) && 96 >= a[prevAIdx].charCodeAt(0)) {
  //   for (let i = aIdx; i < a.length; i++) {
  //     if (65 <= a[i].charCodeAt(0) && 96 >= a[i].charCodeAt(0)) return "NO";
  //   }
  // } else {
  //   let capitalCnt = 0;
  //   for (let i = aIdx; i < a.length; i++) {
  //     if (a[i].charCodeAt(0) === a[prevAIdx].charCodeAt(0) - 32) capitalCnt++;
  //     else if (65 <= a[i].charCodeAt(0) && 96 >= a[i].charCodeAt(0)) {
  //       return "NO";
  //     }
  //   }
  //   if (capitalCnt > 1) return "NO";
  // }
  // return "YES";

  // let aIdx = 0;
  // let prevAIdx = -1;
  // for (let i = 0; i < b.length; i++) {
  //   if (aIdx >= a.length) return "NO";
  //   const ch = b[i];
  //   let capCnt = 0;
  //   while (!isSameCharacter(a[aIdx], ch)) {
  //     // if (prevAIdx !== -1 && !isCapital(a[prevAIdx])) {
  //     //   if (isSameCharacter(a[aIdx], a[prevAIdx]) && isCapital(a[aIdx])) {
  //     //     capCnt++;
  //     //     if (capCnt > 1) return "NO";
  //     //   }
  //     // }
  //     // No case 1:: -> aIdx >= a.length before i < b.length
  //     // No case 2:: -> any capital letter before find a[idx] === b[i]
  //     // No case 2 exception:: -> if the capital letter is same with a[prev] and a[prev] is small letter
  //     // No case 2 exception exception:: -> the number of found same capital letter is more than 1
  //     // No case 3:: after for loop, a string left after idx, there should not be any capital
  //     // No case 3 exception:: if the last a[idx] is small letter and there is only one same capital
  //     aIdx++;
  //     if (aIdx >= a.length) return "NO";
  //   }
  //   prevAIdx = aIdx++;
  // }
  // return "YES";

  // 먼저 a 에서 대문자가 나올때까지 찾고
  // b 의 글자에 매칭되는 소문자가 있었는지 체크한다.
  // 대문자가 b의 글자와 같은 경우 또는 b의 글자와 다르더라도 매칭 소문자가 있을경우 통과

  // let aIdx = 0;
  // for (let i = 0; i < b.length; i++) {
  //   const ch = b[i];
  //   let sameSmallLetter = false;
  //   // while (!isSameCharacter(a[aIdx], ch)) {
  //   while (!isCapital(a[aIdx])) {
  //     if (isSameCharacter(a[aIdx], ch)) sameSmallLetter = true;
  //     aIdx++;
  //     if (aIdx >= a.length) return "NO";
  //   }
  //   if (!sameSmallLetter && !isSameCharacter(a[aIdx], ch)) return "NO";
  // }

  // 먼저 a 의 대문자를 찾는다.
  // 대문자가 나오면 b에서 해당 대문자의 index 를 찾는다.
  // 못찾으면 NO
  // 찾았으면 b 의 해당 index 이전의 letter 들이 a의 대문자 이전에 있었는지 찾는다.
  // 몾찾거나 순서가 다르면 NO
  // let prevBStart = 0;
  // let prevAString = "";
  // // let prevAStart = 0;
  // // let test = "aaaBccccD"
  // // console.log(test.indexOf('B',4)) 3 -> 3 , 4 -> -1
  // for (let i = 0; i < a.length; i++) {
  //   if (isCapital(a[i])) {
  //     // console.log(b.indexOf(a[i]))
  //     // console.log(b.indexOf(a[i],8))
  //     const bIdx = b.indexOf(a[i], prevBStart);
  //     if (bIdx === -1) return "NO";
  //     // console.log(prevAString, prevBStart, bIdx);
  //     let prevAStringIdx = 0;
  //     console.log("Capital searching", i, a[i]);
  //     console.log(prevAString, prevBStart, bIdx, prevAStringIdx);
  //     for (let j = prevBStart; j < bIdx; j++) {
  //       prevAStringIdx = prevAString.indexOf(
  //         b[j].toLowerCase(),
  //         prevAStringIdx
  //       );
  //       if (prevAStringIdx === -1) return "NO";
  //     }
  //     // prevAStart = i + 1;
  //     prevBStart = bIdx + 1;
  //     prevAString = "";
  //     // a 의 모든 스트링을 찾았는데 b 스트링이 남을 경우 처리
  //     if (i === a.length - 1 && prevBStart < b.length) return "NO";
  //   } else if (i === a.length - 1) {
  //     // 대문자 없이 종료되기 전 찾고 종료
  //     prevAString += a[i];
  //     let prevAStringIdx = 0;
  //     console.log("Last searching");
  //     console.log(prevAString, prevBStart, prevAStringIdx);
  //     for (let j = prevBStart; j < b.length; j++) {
  //       prevAStringIdx = prevAString.indexOf(
  //         b[j].toLowerCase(),
  //         prevAStringIdx
  //       );
  //       console.log(b[j], prevAStringIdx);
  //       if (prevAStringIdx === -1) return "NO";
  //     }
  //   } else {
  //     prevAString += a[i];
  //   }
  // }

  // 결국 b 와 같은 순서로 배열 가능한 a 의 조합을 먼저 구해야한다.
  // a 의 남은 string 에 대문자가 있거나 찾은 조합 사이의 index 에 대문자 있는 경우를 제외하고
  // 하나라도 가능성이 있다면 YES
  // type MyDict<T> = {
  //   [key: string | number]: T;
  // };
  // const aStrIdxDict: MyDict<Array<number>> = {};
  // const caseDict: MyDict<Array<Array<number>>> = {};
  // for (let i = 0; i < a.length; i++) {
  //   const key = a[i].toUpperCase()
  //   if (aStrIdxDict[key] === undefined) {
  //     aStrIdxDict[key] = [i];
  //   } else {
  //     aStrIdxDict[key].push(i);
  //   }
  // }
  // console.log(aStrIdxDict);
  // console.log('start filtering')
  // for (let i = 0; i < b.length; i++) {
  //   // b 스트링 각각에 대해
  //   if (aStrIdxDict[b[i]] === undefined) {
  //     // a 에 글자가 없다면 NO
  //     // console.log(i,b[i],'has no letter in a')
  //     return "NO";
  //   } else {
  //     // 글자가 있다면 순서쌍을 생성
  //     if (caseDict[i] === undefined) {
  //       caseDict[i] = [];
  //     }
  //     // 0 일 때 [idx] 생성
  //     if (i === 0)
  //       aStrIdxDict[b[i]].forEach((idx) => {
  //         caseDict[i].push([idx]);
  //       });
  //     else {
  //       // 1 이상부터는 그 이전 값을 기반으로 수정
  //       const prevCase = caseDict[i - 1]; // [[1],[26],[118]...]
  //       const aIndices = aStrIdxDict[b[i]]; // [1,2,34]
  //       prevCase.forEach((each) => {
  //         const lastIdx = each[i - 1];
  //         aIndices.forEach((aIdx) => {
  //           if (lastIdx < aIdx) {
  //             let isCapitalBetween = false;
  //             for (let j = lastIdx + 1; j < aIdx; j++) {
  //               if (isCapital(a[j])) {
  //                 isCapitalBetween = true;
  //                 break;
  //               }
  //             }
  //             if (isCapitalBetween === false) caseDict[i].push([...each, aIdx]);
  //           }
  //         });
  //       });
  //     }
  //     if (caseDict[i].length === 0) return "NO";
  //   }
  // }
  // // console.log(aStrIdxDict, caseDict);
  // let lastCapitalCheckCnt = 0
  // caseDict[b.length - 1].forEach((each) => {
  //   // console.log(each);
  //   for (let i = each[b.length - 1] + 1; i < a.length; i++) {
  //     // console.log(i, a[i], isCapital(a[i]));
  //     if (isCapital(a[i])) {
  //       lastCapitalCheckCnt++
  //       break;
  //     }
  //   }
  // });
  // if (caseDict[b.length - 1].length === lastCapitalCheckCnt)
  //   return "NO"
  // // console.log(aStrIdxDict, caseDict);
  // return "YES";

  // b 의 각 문자에 대해 a 의 가능한 index 를 찾고
  // 사이사이에 대문자가 없고 검색이 끝나고 a 끝에 대문자가 없는 경우를 찾으면 된다.
  // 결국 가능한 index 중 가장 작은 것에 대해서 체크 했을 때 NO 이면 NO 이지 않을까
  // 그러니까 b 의 1 번 글자와 2번 글자 의 경우들 중 a 스트링 사이에 대문자가 없는
  // index 의 최소 값을 계속 체크한다면 그리고 그런 최소값이 없다면 NO 인 것이 아닐까
  // 아니다 b 의 2번 글자가 100, 150 인덱스를 가지고 있다면 100 150 사이에 대문자가 있고
  // 150 과 3번 글자 사이에 대문자가 없어서 가능한 경우가 있을 수 있다.

  // // aCntMap,bCntMap 초기화
  // type MyDict<T> = {
  //   [key: string | number]: T;
  // };
  // const aCntMap: MyDict<number> = {};
  // const bCntMap: MyDict<number> = {};
  // for (let i = 0; i < a.length; i++) {
  //   const key = a[i].toUpperCase();
  //   if (aCntMap[key] === undefined) {
  //     aCntMap[key] = 1;
  //   } else {
  //     aCntMap[key]++;
  //   }
  // }
  // for (let i = 0; i < b.length; i++) {
  //   const key = b[i].toUpperCase();
  //   if (bCntMap[key] === undefined) {
  //     bCntMap[key] = 1;
  //   } else {
  //     bCntMap[key]++;
  //   }
  // }
  // console.log("Map initialized");
  // console.log(aCntMap, bCntMap);

  // let prev = new Array<number[]>();
  // let possible = new Array<number[]>();
  // // let firCapLetterCnt = 0;
  // // possible 초기화 loop
  // for (let i = 0; i < a.length; i++) {
  //   if (isSameCharacter(b[0], a[i])) {
  //     // 첫번째는 가능한 모든 지점을 넣는다.
  //     possible.push([i]);
  //     // 만약 같은 글자 중 대문자가 나왔다면 그 다음은 있을 수 없으니 break
  //     if (isCapital(a[i])) {
  //       // firCapLetterCnt++;
  //       // if (firCapLetterCnt > 1) break;
  //       break;
  //     }
  //   } else {
  //     if (isCapital(a[i])) {
  //       // 첫번째인데 같지 않은 글자 중 대문자가 나오면 break
  //       break;
  //     }
  //   }
  // }
  // bCntMap[b[0].toUpperCase()]--;
  // prev = possible;
  // console.log("start loop");
  // for (let i = 1; i < b.length; i++) {
  //   // b 글자 하나씩
  //   possible = new Array<number[]>();
  //   // console.log(i, prev.length, bCntMap, aCntMap);
  //   console.log(i, prev.length);
  //   const aCntTempMap = { ...aCntMap };
  //   for (let j = 0; j < a.length; j++) {
  //     // a 글자 하나씩
  //     if (isSameCharacter(b[i], a[j])) {
  //       // a,b 같은 글자를 가리킬 때
  //       // 두번째부터는 이전에 찾은 index 의 맨 끝 값이 지금 찾은 index 보다 작으면
  //       // 배열에 추가한다.
  //       prev.forEach((elem) => {
  //         if (elem[i - 1] < j) {
  //           let pushFlag = true;
  //           for (let k = elem[i - 1] + 1; k < j; k++) {
  //             if (isCapital(a[k])) {
  //               pushFlag = false;
  //             }
  //           }
  //           pushFlag && possible.push([...elem, j]);
  //         }
  //       });
  //     }
  //     aCntTempMap[a[j].toUpperCase()]--;
  //     if (
  //       bCntMap[a[j].toUpperCase()] !== undefined &&
  //       aCntTempMap[a[j].toUpperCase()] < bCntMap[a[j].toUpperCase()]
  //     ) {
  //       // console.log()
  //       break;
  //     }
  //   }
  //   // console.log("i possible", i, possible);
  //   prev = possible;
  //   bCntMap[b[i].toUpperCase()]--;
  // }
  // let aCapIdxArr = new Array();
  // for (let i = 0; i < a.length; i++) {
  //   if (isCapital(a[i])) {
  //     aCapIdxArr.push(i);
  //   }
  // }
  // for (let i = 0; i < possible.length; i++) {
  //   const elem = possible[i];
  //   if (
  //     aCapIdxArr.filter((idx) => elem.includes(idx)).length ===
  //     aCapIdxArr.length
  //   )
  //     return "YES";
  // }
  // return "NO";

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

  console.log("start", caps);
  for (let i = 0; i < caps.length; i++) {
    const cap = caps[i];
    const prevSubstring = substringArr[i];
    // console.log("cap is", cap, prevSubstring, prevPossible.size);

    // let possible = new Array<number[]>();
    let possible = new Set<string>();
    while (true) {
      // console.log(bIdx)
      bIdx = b.indexOf(cap, bIdx + 1);
      if (bIdx === -1) break;
      if (i === 0) {
        // console.log(prevSubstring, sub, bIdx);

        let sub = b.substring(0, bIdx);
        // if (prevSubstring.includes(sub))
        if (isAbbreviationFrom(sub, prevSubstring)) possible.add(sub + b[bIdx]);
      }
      if (i !== 0) {
        // prevPossible.forEach((elem) => {
        //   if (elem[i - 1] < bIdx) {
        //     let sub = b.substring(elem[i - 1] + 1, bIdx);
        //     // if (prevSubstring.includes(sub))
        //     if (isAbbreviationFrom(sub, prevSubstring))
        //       possible.push([...elem, bIdx]);
        //   }
        // });
        prevPossible.forEach((elem) => {
          if (elem.length <= bIdx) {
            let sub = b.substring(elem.length, bIdx);
            if (isAbbreviationFrom(sub, prevSubstring)) {
              possible.add(elem + sub + b[bIdx]);
            }
          }
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
