#!/bin/python3

import math
import os
import random
import re
import sys
from traceback import print_tb

def isBalanced(s):
    # Write your code here
    # parentheses () / square brackets [] / curly brackets {} / angle brackets <>
    # stack -> list append,pop / queue -> pop(0)
    # print(s)
    leftBracketStack = list()
    leftBrackets = {'(','[','{'}
    righttBrackets = {')',']','}'}
    # print(ord('('),ord(')'),ord('['),ord(']'))
    for c in s :
      if c in leftBrackets:
        leftBracketStack.append(c)
      else:
        if len(leftBracketStack) <= 0:
          return 'NO'
        partner = leftBracketStack.pop()
        # print(c,'\'s partner is',partner)
        if (partner == '(' and c != ')') or (partner == '[' and c != ']') or (partner == '{' and c != '}'):
          return 'NO'
    
    return 'YES' if len(leftBracketStack) <=0 else 'No'
  
if __name__ == '__main__':

    f = open(r'C:\Users\Kihoon\Desktop\workspace\code-test\BalancedBranketInput004.txt')
    lines = f.readlines()
    f.close()
    # arr = list(map(int,lines[1].rstrip().split()))
    # print(lines[0])
    for i in range(1,int(lines[0])+1):
    # for i in range(1,2):
      result = isBalanced(lines[i].strip())
      print(result)
      
    # s = '[()][{}()][](){}([{}(())([[{}]])][])[]([][])(){}{{}{[](){}}}()[]({})[{}{{}([{}][])}]'
    # result = isBalanced(s)
    # print(result)

