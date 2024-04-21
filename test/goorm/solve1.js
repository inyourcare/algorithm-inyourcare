// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let cnt = 0
	let N = 0	// 사용자 수
	let M = 0	// 관계 수
	const userMap = {}
	// const userComFriendMap = {}

	for await (const line of rl) {
		console.log(cnt, 'Hello Goorm! Your input is', line);
		rl.close();

		if (cnt === 0) {
			let temp = line.split(' ')
			N = Number(temp[0])
			M = Number(temp[1])
		} else if (cnt === 1) {
			let temp = line.split(' ')
			for (let i = 0; i < temp.length; i++) {
				const name = temp[i];
				// const user = new User(name,[])
				// console.log(user)
				userMap[name] = new Set()
			}
		} else {
			let temp = line.split(' ')
			let f1 = temp[0]
			let f2 = temp[1]
			// console.log(f1, f2, userMap[f1], userMap[f2])
			userMap[f1].add(f2)
			userMap[f2].add(f1)
		}
		cnt++
	}
	// console.log('after loop')
	// console.log(N, M)
	// console.log(userMap)
	// A 랑 친구관계 많은 애들 서칭 -> max 기록
	// B 랑 친구관계 많은 애들 서칭 -> max 기록
	// userComFriendMap 에 AB 는 몇명 이런식으로 기록하자
	let max = 0
	let resultStr = ''
	const keys = Object.keys(userMap)
	for (let i = 0; i < keys.length; i++) {
		const f1Key = keys[i];
		for (let j = i + 1; j < keys.length; j++) {
			const f2key = keys[j];
			const f1Friends = userMap[f1Key]
			const f2Friends = userMap[f2key]
			// console.log(f1Key + ' ' + f2key, f1Friends, f2Friends)
			const commonFriendCnt = [...f1Friends].filter(x => f2Friends.has(x)).length
			if (max < commonFriendCnt) {
				resultStr = f1Key + ' ' + f2key
				max = commonFriendCnt
			}
		}
	}
	console.log(resultStr)
	console.log(max)

	process.exit();
})();
