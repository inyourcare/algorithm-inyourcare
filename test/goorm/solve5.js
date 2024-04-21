// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let L = 0
  let R = 0

  for await (const line of rl) {
    console.log('Hello Goorm! Your input is', line);
    rl.close();
    let temp = line.trim().split(' ')
    L = Number(temp[0])
    R = Number(temp[1])
  }

  let n1 = 1
  let n1prev = 0
  let n2 = 1
  let n2prev = 0
  // let minus = 0
  let sum = 0
  // let sumTest = 0
  // let t = 70
  let t = 1000000007
  if (L === 1) sum = 2
  if (L === 2) sum = 1
  for (let i = 0; i + 2 < R; i++) {
    let n3 = (n1 + n2)
    // console.log(i, n1prev, n1, n2prev, n2, n3) // i => 피보나치 i+3
    if (i + 3 >= L) {
      sum += n3 % t
      // sumTest += n3 % t
    }
    let temp = n1prev
    n1prev = n2prev
    n1 = n2
    n2 = n3 % t
    n2prev += temp + Math.floor(n3 / t)
  }
  console.log(sum % t)
  process.exit();
})();
