// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let cnt = 0
  let N = 0	// 추의 수
  let A = 0	// 무게
  let bWeighs

  for await (const line of rl) {
    // console.log('Hello Goorm! Your input is', line);
    rl.close();
    if (cnt === 0) {
      let temp = line.split(' ')
      N = Number(temp[0])
      A = Number(temp[1])
    } else {
      bWeighs = line.split(' ').map(x => Number(x))

    }
    cnt++
  }
  console.log('after loop')
  console.log(N, A, bWeighs)
  // 물건 올리고 오른쪽 전체 올리고 비교, 차이의 반만큼 뺄 수 있다면 
  // 차이가 4 이고 추가 1,1,2 가 있다면 => 이걸 하려면 차이만큼의 부분집합을 구하고 이것을
  // 반으로 나누는 경우의 수를 또 구해야 한다.


  process.exit();
})();

// 5: 5  / 5,2 : 5,2 / 5,2 : 5,2 / 5 : 1,2,2 /