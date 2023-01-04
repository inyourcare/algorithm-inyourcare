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