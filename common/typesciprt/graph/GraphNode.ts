export class GraphNode {
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

export class Graph {
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

// 너비 우선 탐색
export function bfs(startNode: GraphNode) {
  const visited: Set<GraphNode> = new Set();
  const queue: GraphNode[] = [];

  visited.add(startNode);
  queue.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    console.log(currentNode.value);

    for (const neighbor of currentNode.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// 깊이우선
export function dfs(startNode: GraphNode) {
  const visited: Set<GraphNode> = new Set();
  const stack: GraphNode[] = [];

  stack.push(startNode);

  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    if (!visited.has(currentNode)) {
      console.log(currentNode.value);
      visited.add(currentNode);

      for (const neighbor of currentNode.neighbors) {
        stack.push(neighbor);
      }
    }
  }
}

// 최소경로
export function shortestPath(graph: Graph, start: GraphNode, target: GraphNode) {
  const visited: Set<GraphNode> = new Set();
  const queue: [GraphNode, GraphNode[]][] = [];

  queue.push([start, [start]]);

  while (queue.length > 0) {
    const [currentNode, currentPath] = queue.shift()!;

    if (currentNode === target) {
      return currentPath;
    }

    visited.add(currentNode);

    for (const neighbor of currentNode.neighbors) {
      if (!visited.has(neighbor)) {
        queue.push([neighbor, [...currentPath, neighbor]]);
      }
    }
  }
  return null;
}

