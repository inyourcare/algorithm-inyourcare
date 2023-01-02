#!/bin/python3

import math
import os
import random
import re
import sys
from traceback import print_tb

# Complete the maxSubsetSum function below.
def maxSubsetSum(arr):
    arrLen = len(arr)
    maxSumAtPosition = dict()
    maxSum = 0
    for i in range(arrLen):
      maxSum = max(arr[i], maxSumAtPosition[i-2]+arr[i] if i-2 in maxSumAtPosition else 0,maxSum)
      maxSumAtPosition[i] = maxSum
        
    return maxSum

if __name__ == '__main__':

    f = open(r'C:\Users\Kihoon\Desktop\workspace\code-test\MaxArraySumInput00.txt')
    lines = f.readlines()
    f.close()
    # arr = [3,5,-7,8,10]
    arr = list(map(int,lines[1].rstrip().split()))
    # print('123')
    res = maxSubsetSum(arr)
    print(res)
