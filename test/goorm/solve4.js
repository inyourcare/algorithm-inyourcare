// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let cnt = 0
  let N = 0
  let M = 0
  let falseCnt = 0

  const map = new Array()
  for await (const line of rl) {
    rl.close();
    if (cnt === 0) {
      let temp = line.split(' ')
      N = Number(temp[0])
      M = Number(temp[1])
      for (let i = 0; i < N; i++) {
        const row = new Array()
        for (let j = 0; j < M; j++) {
          row.push(false)
          falseCnt++
        }
        map.push(row)
      }
    } else {
      // console.log(line)
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '*')
          map[cnt - 1][i] = true
      }
    }
    cnt++
  }
  // console.log(map)
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === false) {
        const localMap = getLocalMap(N, map)
        searchWay(i, j, localMap, falseCnt)
      }
    }
  }
  process.exit();
})();

function searchWay(i, j, map, falseCnt) {
  console.log('searchWay', i, j, map[i][j], falseCnt)
  if (map[i + 1][j] && map[i + 1][j + 1] === false) // sd
  {
    const localMap = getLocalMap(map.length,map)
    localMap[i][j] = true
  }
  if (map[i + 1][j] && map[i + 1][j - 1] === false) // sa
  {
    
  }
  if (map[i - 1][j] && map[i - 1][j + 1] === false) // wd
  {
    
  }
  if (map[i - 1][j] && map[i - 1][j - 1] === false) // wa
  {
    
  }
  if (map[i][j + 1] && map[i + 1][j + 1] === false) // ds
  {
    
  }
  if (map[i][j + 1] && map[i - 1][j + 1] === false) // dw
  {
    
  }
  if (ap[i][j - 1] && map[i + 1][j - 1] === false) // as
  {
    
  }
  if (map[i][j - 1] && map[i - 1][j - 1] === false) // aw
  {
    
  }
  // const possibleWay
  // map[i + 1][j] && map[i + 1][j + 1]  // sd
  // map[i + 1][j] && map[i + 1][j - 1]  // sa

  // map[i - 1][j] && map[i - 1][j + 1]  // wd
  // map[i - 1][j] && map[i - 1][j - 1]  // wa

  // map[i][j + 1] && map[i + 1][j + 1]  // ds
  // map[i][j + 1] && map[i - 1][j + 1]  // dw

  // map[i][j - 1] && map[i + 1][j - 1]  // as
  // map[i][j - 1] && map[i - 1][j - 1]  // aw
}
function getLocalMap(N, map) {
  const localMap = new Array(N)
  for (var k = 0; k < localMap.length; k++) {
    localMap[k] = new Array(...map[k]);
  }
  return localMap
}