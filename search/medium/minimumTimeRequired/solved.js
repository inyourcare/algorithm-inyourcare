'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function getItemMadeAt(items, keys, day) {
  let i = 0
  let itemMade = 0
  // let nextStep = Math.floor(step / 2)
  while (keys[i] <= day) {
    // console.log(day,keys[i])
    itemMade += Math.floor((day / keys[i])) * items[keys[i]]
    // console.log(keys[i], (day / keys[i]), items[keys[i]], (day / keys[i]) * items[keys[i]])
    i++
  }
  return itemMade
}
function searchMinimumDay(items, keys, goal, day, step, cnt, daysArr) {
  const itemMade = getItemMadeAt(items, keys, day)
  // console.log(day, itemMade, step, cnt)
  // if (itemMade === goal || cnt === 0) {
  if (cnt >= 0 && cnt <= 10) {
    if (itemMade >= goal)
      daysArr.push(day)
    if (cnt === 0) {
      return
    }
  }
  if (itemMade > goal) {
    return searchMinimumDay(items, keys, goal, day - step, Math.round(step / 2), --cnt, daysArr)
  } else if (itemMade < goal) {
    return searchMinimumDay(items, keys, goal, day + step, Math.round(step / 2), --cnt, daysArr)
  } else if (itemMade === goal) {
    // daysArr.push(day)
    return searchMinimumDay(items, keys, goal, day - step, Math.round(step / 2), --cnt, daysArr)
  }
}
// Complete the minTime function below.
function minTime(machines, goal) {
  // console.log(machines, goal)
  const items = {};
  for (let i = 0; i < machines.length; i++) {
    const day = machines[i];
    if (items[day] === undefined) {
      items[day] = 1
    } else {
      items[day] += 1
    }
  }
  const keys = Object.keys(items)
  // console.log(items,keys[0])
  let result = 0
  let maxDay = goal * keys[0]
  let day = Math.floor((maxDay) / 2) // 10 -> 5 , 11 -> 5.5 -> 5
  let cnt = Math.floor(Math.log2(maxDay))
  // result = searchMinimumDay(items, keys, goal, day, Math.floor(day / 2))
  const daysArr = []
  result = searchMinimumDay(items, keys, goal, day, Math.round(day / 2), cnt, daysArr)
  // console.log(daysArr)
  result = daysArr.reduce((acc, cur) => acc > cur ? cur : acc, daysArr[0])
  return result
}

function main() {
  const ws = fs.createWriteStream('output.txt');

  const nGoal = readLine().split(' ');

  const n = parseInt(nGoal[0], 10);

  const goal = parseInt(nGoal[1], 10);

  const machines = readLine().split(' ').map(machinesTemp => parseInt(machinesTemp, 10));

  const ans = minTime(machines, goal);

  ws.write(ans + '\n');

  ws.end();
}
