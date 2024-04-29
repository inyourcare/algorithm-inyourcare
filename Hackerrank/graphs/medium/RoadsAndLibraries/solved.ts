"use strict";

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString: string = "";
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on("data", function (inputStdin: string): void {
  inputString += inputStdin;
});

process.stdin.on("end", function (): void {
  inputLines = inputString.split("\n");
  inputString = "";

  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

/*
 * Complete the 'roadsAndLibraries' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER c_lib
 *  3. INTEGER c_road
 *  4. 2D_INTEGER_ARRAY cities
 */
class GraphNode {
  value: any;
  neighbors: GraphNode[];

  constructor(value: any) {
    this.value = value;
    this.neighbors = [];
  }

  addNeighbor(node: GraphNode) {
    this.neighbors.push(node);
  }
}

class Graph {
  nodes: GraphNode[];

  constructor() {
    this.nodes = [];
  }

  addNode(value: any) {
    const node = new GraphNode(value);
    this.nodes.push(node);
  }

  addEdge(source: GraphNode, destination: GraphNode) {
    source.addNeighbor(destination);
    destination.addNeighbor(source);
  }
}

function bfs(startNode: GraphNode): Set<GraphNode> {
  const visited: Set<GraphNode> = new Set();
  const queue: GraphNode[] = [];

  visited.add(startNode);
  queue.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    // console.log(currentNode.value);

    for (const neighbor of currentNode.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return visited;
}

function roadsAndLibraries(
  n: number, // the number of cities
  c_lib: number, // lib cost
  c_road: number, // road cost
  cities: number[][] // path
): number {
  // Write your code here
  // console.log(n, c_lib, c_road, cities);
  const graph = new Graph();
  for (let i = 0; i < n; i++) {
    graph.addNode(i + 1);
  }
  for (let city of cities) {
    let [prevIdx, rearIdx] = city;
    // console.log(prevIdx, rearIdx);
    graph.addEdge(graph.nodes[prevIdx - 1], graph.nodes[rearIdx - 1]);
  }
  // console.log(graph.nodes[0]);

  const globalVisited: Set<GraphNode> = new Set();
  // visitedArray.length must be the number of libraries
  const visitedArray: Array<Set<GraphNode>> = [];
  // entireVisitCnt must be the least number of road to build
  // let entireVisitCnt = 0;
  graph.nodes.forEach((n) => {
    if (!globalVisited.has(n)) {
      const visited = bfs(n);
      visited.forEach((visitedNode) => {
        globalVisited.add(visitedNode);
      });
      // entireVisitCnt += visitCnt;
      // isolatedAreaCnt++;
      visitedArray.push(visited);
    }
  });

  // console.log(n, c_lib, c_road, visitedArray.length, n - visitedArray.length);
  return Math.min(
    visitedArray.length * c_lib + (n - visitedArray.length) * c_road,
    n * c_lib
  );
}

function main() {
  const ws: WriteStream = createWriteStream("output.txt");

  const q: number = parseInt(readLine().trim(), 10);

  for (let qItr: number = 0; qItr < q; qItr++) {
    const firstMultipleInput: string[] = readLine()
      .replace(/\s+$/g, "")
      .split(" ");

    const n: number = parseInt(firstMultipleInput[0], 10);

    const m: number = parseInt(firstMultipleInput[1], 10);

    const c_lib: number = parseInt(firstMultipleInput[2], 10);

    const c_road: number = parseInt(firstMultipleInput[3], 10);

    let cities: number[][] = Array(m);

    for (let i: number = 0; i < m; i++) {
      cities[i] = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((citiesTemp) => parseInt(citiesTemp, 10));
    }

    const result: number = roadsAndLibraries(n, c_lib, c_road, cities);

    ws.write(result + "\n");
  }

  ws.end();
}
