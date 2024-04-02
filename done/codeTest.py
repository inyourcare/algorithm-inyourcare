import math
import os
import random
import re
import sys

def testFunction():
  # N = 5
  # trees = [[4,3],[3,1],[2,2],[1,4]]

  # 1[] 3 [4 ] 9 [ 10 12 13 ] 27 [28 30 31 36 37 39 40] 
  # 1 , 3 , 6 , 10 , 15
  # sum = 1
  # for i in range(1,3123213+1):
  #   sum *= i
  # sum = math.factorial(313+1)

  # print(sum)
  # cnt = 0
  # while sum % 10 == 0:
  #   cnt +=1
  #   sum = sum / 10
  # print(cnt)
  # test = 30
  # fCnt = 0
  # tCnt = 0
  # tenCnt = 0
  # # for i in range(1,3123213+1):
  # for i in range(1,test + 1):
  #   t = i% 10
  #   if t == 5:
  #     fCnt += 1
  #   if t == 2:
  #     tCnt += 1
  #   if t == 0:
  #     t2 = i
  #     while t2 % 10 == 0:
  #       tenCnt += 1
  #       t2 = t2/10
  #     print(i,tenCnt)
  
  # print(math.factorial(test))
  # print(tenCnt ,fCnt,tCnt)

  # table = ['XOXO', 'OXXO' , 'XXOX' , 'XOOO']
  # iTotal = len(table[0])
  # print(iTotal)
  # https://art-map.co.kr/exhibition/view.php?idx=1784&p=1&a=2
  # t = re.compile(r'/^\=[a-z,A-Z,0-9]+\&$/')
  t = re.compile(r'idx=[0-9]*&')
  # t = re.compile(r'=[a-z,A-Z,0-9]+&')
  r = t.findall('https://art-map.co.kr/exhibition/view.php?idx=1784&p=1&a=2')
  # r = t.findall('https://art-map.co.kr/exhibition/view.php?p=1&a=2d=&')
  # r[0]
  if r:
    print('hi')
  print(r)

  # pattern = r"ca"
  # text = "caabsacasca"
  # matchOB = re.search(pattern , text)

  # if matchOB:
  #   print (matchOB)
  #   print (matchOB.group()) # 매칭된 문자열 # ca
  #   print (matchOB.start()) # 매칭된 문자열 시작 위치 # 0
  #   print (matchOB.end())   # 매칭된 문자열 종료 위치 # 2
  #   print (matchOB.span())  # 매칭된 문자열 시작,종료 위치 # (0, 2)

  

if __name__ == '__main__':
  result = testFunction()