#!/bin/python3

import math
import os
import random
import re
import sys

def roadsAndLibraries(n, c_lib, c_road, cities:list[list]):
    # Write your code here
    # n = cities , c_lib = cost of lib , c_road = cost to build a road , cities = possible road connection
    class CityNode:
      def __init__(self, citiNum):
        self.cityNum = citiNum
        self.roads = []
        self.connectableCities = set()
      def appendRoad(self, road:list):
        self.roads.append(road)
        self.connectableCities.update(road)
    
    roads = cities
    lenRoads = len(roads)
    if lenRoads <= 0:
      return n * c_lib
    
    citiesList = [CityNode(x) for x in range(1,n+1)]
    # cityRoads = dict()
    for city in citiesList:
      for road in roads:
        if city.cityNum in road:
          city.appendRoad(road)
    # if True in list(map(lambda cIdx: cIdx in connectedCities[0], road)):
    
    mask = set()
    cityGroupList = list()
    for city in citiesList:
      if city.cityNum not in mask:
        # print(city.cityNum)
        result = set()
        result.update(city.connectableCities)
        while True:
          prevResultLen = len(result)
          tempResult = set()
          for connectableIdx in result:
            tempResult.update(citiesList[connectableIdx-1].connectableCities)
          result.update(tempResult)
          if len(result) == prevResultLen:
            break
        mask.update(result)
        cityGroupList.append(result)
      # print(city.cityNum,city.connectableCities,result)
    
    print(cityGroupList)
  
if __name__ == '__main__':

    f = open(r'C:\Users\USER\Desktop\workspace\codeTest\RoadsAndLibrariesInputEx.txt')
    # lines = f.readlines()
    # f.close()
    # arr = list(map(int,lines[1].rstrip().split()))
    # print(lines[0])
    # print(f.readline())
    q = int(f.readline().strip())

    for q_itr in range(q):
        first_multiple_input = f.readline().rstrip().split()

        n = int(first_multiple_input[0])

        m = int(first_multiple_input[1])

        c_lib = int(first_multiple_input[2])

        c_road = int(first_multiple_input[3])

        cities = []

        for _ in range(m):
            cities.append(list(map(int, f.readline().rstrip().split())))

        result = roadsAndLibraries(n, c_lib, c_road, cities)
        # print(first_multiple_input, cities)
        
    f.close()

