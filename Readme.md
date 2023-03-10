# 기타 링크
- [백준온라인저지](https://www.acmicpc.net)

# 정렬
## 선택정렬
- 가장작은것을 앞으로 보낸다
- 연산횟수 (N*(N+1))/2 -> 시간복잡도 O(N^2)
## 버블정렬
- 옆에있는 값과 비교해서 작은것을 앞으로 보낸다
- 연산횟수 (N*(N+1))/2 -> 시간복잡도 O(N^2) :: 실제수행시간은 스와핑이 많아서 더 느림
## 삽입정렬
- 원소의 앞에것과 비교하여 더 작은 녀석 만날때까지 스왑
- 연산횟수 (N*(N+1))/2 -> 시간복잡도 O(N^2) :: 필요한만큼 이동하므로 O(N^2) 정렬 알고리즘 중에서는 가장 빠른편 -> 특히 거의 정렬된 상태라면 가장 효율적인 정렬방법이기도 하다.
## 퀵정렬
- 피벗(기준값) 사용. 일반적으로 가장 앞에 있는 값을 피벗값으로 사용
- 오른쪽과 왼쪽에서 동시 진행하고 왼쪽은 피벗 보다 큰 값 오른쪽은 피벗보다 작은 값으로 찾으면 바꿔준다. 바꿔줄 값이 더 이상 없을때까지 수행하고 바꿔줄 값이 없으면 마지막에 찾은 더 작은 값을 피벗과 바꿔준다. 이제 피벗값을 빼고 나눠진 두 집단에서 다시 같은 수행반복
- 시간복잡도 평균 O(N*logN) -> 아래 코드를 보며 설명,

N = 2^k 개의 원소를 정렬한다고 가정할 때, 

최선의 경우, 배열이 균등하게 이등분 되어 순환 호출의 깊이는 k가 된다. 각각의 단계에서 pivot을 올바르게 위치시키기 위한 비교 연산 횟수는 평균적으로 N번 이루어지므로 총 연산횟수는 O(kN)이다. 이때, k = logN 이므로 O(kN) = O(NlogN)이다. 

* 이미 정렬이 된 경우 N^2 의 시간복잡도로 최악이다.

```
void quickSort(int st, int en) {

    if (en <= st+1) return ;
	
    // 피벗을 올바른 위치로 이동시키기
    int pivot = arr[st];
    int l = st+1; //왼쪽에서 오른쪽으로 이동
    int r = en-1; //오른쪽에서 왼쪽으로 이동

    while (1) {
        while (l <= r && arr[l] <= pivot) l++;
        while (l <= r && arr[r] >= pivot) r--;
        if (l > r) break;
        swap(arr[l], arr[r]);
    }
    swap(arr[st], arr[r]);
    
    //배열을 두 배열로 분할하여 재귀적으로 정렬
    quickSort(st, r); 
    quickSort(r+1, en);
}
```
## 병합정렬
- 퀵정렬의 단점을 보완하여 어떤 경우에도 시간복잡도 O(N*logN) 보장
- 항상 반으로 쪼갠다
- 메모리 활용이 비효율적인 단점(새로운 배열 사용하니까)
```
// i: 정렬된 왼쪽 리스트에 대한 인덱스
// j: 정렬된 오른쪽 리스트에 대한 인덱스
// k: 정렬될 리스트에 대한 인덱스
/* 2개의 인접한 배열 list[left...mid]와 list[mid+1...right]의 합병 과정 */
/* (실제로 숫자들이 정렬되는 과정) */
void merge(int list[], int left, int mid, int right){
  int i, j, k, l;
  i = left;
  j = mid+1;
  k = left;

  /* 분할 정렬된 list의 합병 */
  while(i<=mid && j<=right){
    if(list[i]<=list[j])
      sorted[k++] = list[i++];
    else
      sorted[k++] = list[j++];
  }

  // 남아 있는 값들을 일괄 복사
  if(i>mid){
    for(l=j; l<=right; l++)
      sorted[k++] = list[l];
  }
  // 남아 있는 값들을 일괄 복사
  else{
    for(l=i; l<=mid; l++)
      sorted[k++] = list[l];
  }

  // 배열 sorted[](임시 배열)의 리스트를 배열 list[]로 재복사
  for(l=left; l<=right; l++){
    list[l] = sorted[l];
  }
}

// 합병 정렬
void merge_sort(int list[], int left, int right){
  int mid;

  if(left<right){
    mid = (left+right)/2 // 중간 위치를 계산하여 리스트를 균등 분할 -분할(Divide)
    merge_sort(list, left, mid); // 앞쪽 부분 리스트 정렬 -정복(Conquer)
    merge_sort(list, mid+1, right); // 뒤쪽 부분 리스트 정렬 -정복(Conquer)
    merge(list, left, mid, right); // 정렬된 2개의 부분 배열을 합병하는 과정 -결합(Combine)
  }
}

void main(){
  int i;
  int n = MAX_SIZE;
  int list[n] = {21, 10, 12, 20, 25, 13, 15, 22};

  // 합병 정렬 수행(left: 배열의 시작 = 0, right: 배열의 끝 = 7)
  merge_sort(list, 0, n-1);

  // 정렬 결과 출력
  for(i=0; i<n; i++){
    printf("%d\n", list[i]);
  }
}
``` 

## 라이브러리 정렬 sort 함수 사용
- 정렬 기준 설정 가능
```
bool compare(int a, int b) {
  return a<b;
}

sort(a,a+10,compare)
```

## 힙정렬
- 시간복잡도: O(N*logN)
- 완전이진트리: 왼쪽부터 데이터 들어감
- 힙: 부모가 더 큰 값을 가지는 이진트리 
- Heapify: 힙구조가 무너진것을 바로세움 
- Heapify 의 시간복잡도: O(N) -> 잎사귀 노드를 제외하고 연산하므로 (N/2) * logN 이고 logN 이 2보다 클 수 없으므로
- Heapify 를 통해 최대값 또는 최소값을 계속 계산하고 정렬함(index상 가장 뒤로 보낸다.) -> 시간복잡도가 N번만큼 수행하므로 O(N*logN)

## 계수 정렬
- 범위조건이 있는 경우에 한해 빠른 알고리즘 : O(N)
- 카운팅하여 재조합

# 탐색
## 너비 우선 탐색
- 최단 경로, 최단 길이 보장
- 자료구조: 큐
- 시작점: 루트
- 큐에서 꺼내면서 미탐색 노드를 입력

## 깊이 우선 탐색
- 자료구조: 스택 (상관없음)
- 시작점: 루트
- 스택에 넣으면서 방문하지 않은 인접노드 중 낮은값으로 간다.
- 인접 노드가 없으면 스택에서 뺀다.

# 그래프
## 합집합 찾기 (서로소 집합 알고리즘)
- 최종부모를 찾아서 같으면 같은 그래프에 있다는 알고리즘

## 크루스칼 알고리즘
- 적은 비용으로 모든 노드 연결
- 여러 도시가 있을때 각 도시를 적은 비용으로 연결
- 노드 = 정점 = 도시
- 간선 = 거리 = 비용
- 간선 정보를 오름차순 정렬하여 비용이 적은 간선부터 그래프에 포함
- 사이클을 형성시키면 그래프에 포함하지 않는다.
- 노드보다 한개 적은 간선이 그래프에 연결 될 때까지 수행
- 사이클 테이블을 합집합 찾기 알고리즘으로 각 노드 별 부모를 찾아 넣는다. 이를 통해 사이클이 일어나는지, 노드가 모두 하나의 그래프에 속했는지 확인 가능하다.

## 이진트리
### 전위순회
- 자기 왼 오
### 중위순회
- 왼 자기 오 
### 후위순회
- 왼 오 자기
- 많이쓰임

## 다이나믹 프로그래밍
- 하나의 문제를 단 한번만 푼다
- 피보나치 - 단순 분산계산은 2^N 만큼 연산해야함, 그래서 이미 구한 수를 저장할 저장공간을 만들어 같은 계산을 다시 하지 않게 해준다.
- 필요한 가정 : 
- - 큰 문제를 작은 문제로 나눌 수 있다.
- - 작은 문제에서 구한 정ㄷ바은 그것을 포함하는 큰 문제에서도 동일
### 타일링
- 점화식 구해서 계산

### 에라토스테네스의 체
- 만들어진 수 범위 내에서 적은수부터 하나씩 지우면서 소수 판별

### 다익스트라 최단경로 알고리즘
- 다이나믹 프로그래밍을 활용해서 최단 경로를 탐색하는 탐색 알고리즘
- 순서
```
0. 2차원 행렬로 시작점 도착점 기록
1. 출발 노드 설정
2. 출발 노드 기준 각 노드의 최소비용 저장
3. 방문하지 않은 노드 중 가장 비용이 적은 노드 선택(힙정렬로 뽑아냄)
4. 해당 노드를 거쳐서 특정한 노드로 가는 경우를 고려하여 최소비용 갱신
5. 모두 방문할때까지 반복(닿을 수 있을 때)
```

### 플로이드 와샬 알고리즘
- 모든 정점에서 모든 정점으로 최단 경로를 구하는 경우 사용
- 2차원 배열로 거쳐가는 노드마다 거쳐가는 경우를 각 행마다 구해서 갱신 

# 위상 정렬
- 순서가 정해져있는 작업을 차례로 수행해야할 때 그 순서를 결정하는 알고리즘
- 사이클이 없는 그래프에만 적용 가능
- 1. 위상정렬이 가능한가? 2. 가능하다면 결과는 무엇인가?
- 스택과 큐가 사용 가능, 큐를 선호
- 진입차수가 0 인 노드에서 시작해서 진입차수가 0인 경우를 반복 처리

# 강한 결합 요소
- 서로가 서로에게 갈 수 있는 노드들의 집합
- 코사라주 알고리즘과 타잔 알고리즘 사용
- 타잔 알고리즘: DFS 수행해서 부모를 찾아서 그룹화
- 그룹화 후 위상정렬 수행 가능

# 네트워크 플로우
- 교통 체증, 네트워크 데이터 전송 등 사용
- 유량 / 용량으로 표현
- 너비우선탐색(BFS)를 사용하는 포드-풀커슨 알고리즘 사용
- 음의 유량으로 숨어있는 경로도찾아냄

# 이분매칭
- 사람과 노트북을 매칭해주는 알고리즘

# 단순 문자열 매칭 알고리즘
# KMP 문자열 매칭 알고리즘
- 접두사로 접미사 찾는다. (접두사:찾을단어)

# 라빈카프 문자열 매칭 알고리즘
- 문자열 해시값 일치하는지 보고 일치하면 정밀검사

# 그리디 알고리즘
- 거스름돈 문제: 무조건 더 큰 화폐 단위부터 거슬러 준다.