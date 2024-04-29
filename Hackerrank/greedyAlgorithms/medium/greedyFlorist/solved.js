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

// Complete the getMinimumCost function below.
function getMinimumCost(k, c) {
  // k is the number of buyers , c is an array of flower prices.
  // console.log(k, c)
  let cost = 0
  c.sort((a,b)=>a-b)
  console.log(c)
  for (let i = c.length - 1; i >= 0; i--) {
    const price = c[i];
    cost += price * (1 + Math.floor((c.length - i - 1)/k))
    // console.log(price)
  }
  return cost
}

function main() {
  const ws = fs.createWriteStream('output.txt');

  const nk = readLine().split(' ');

  const n = parseInt(nk[0], 10);

  const k = parseInt(nk[1], 10);

  const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

  const minimumCost = getMinimumCost(k, c);

  ws.write(minimumCost + '\n');

  ws.end();
}
