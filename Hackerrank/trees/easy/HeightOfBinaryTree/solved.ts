"use strict";

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

function main() {
  // Enter your code here
  let n = Number(readLine());
  const leaves = readLine()
    .split(" ")
    .map((leaf) => Number(leaf));
  // console.log(n, leaves);
  const bst = new BinarySearchTree(NumbersComparator);
  for (let leaf of leaves) {
    // console.log(leaf);
    bst.insert(leaf);
  }

  let current = bst.root;
  // bst.inOrderTraversal(current);
  const depthSet = new Set<number>();
  inOrderTraversal(current, 0, depthSet);
  console.log(
    Array.from(depthSet.values()).reduce(
      (acc, cur) => (cur > acc ? cur : acc),
      0
    )
  );
  //daysArr.reduce((acc, cur) => acc > cur ? cur : acc, daysArr[0])
}

function inOrderTraversal(
  node: BinarySearchTreeNode<number> | undefined,
  depth: number,
  depthSet: Set<number>
): void {
  if (node) {
    inOrderTraversal(node.leftNode, depth + 1, depthSet);
    // console.log(node.data, depth);
    depthSet.add(depth);
    inOrderTraversal(node.rightNode, depth + 1, depthSet);
  }
}

export class BinarySearchTreeNode<T> {
  data: T;
  leftNode?: BinarySearchTreeNode<T>;
  rightNode?: BinarySearchTreeNode<T>;

  constructor(data: T) {
    this.data = data;
  }
}

export class BinarySearchTree<T> {
  root?: BinarySearchTreeNode<T>;
  comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  insert(data: T): BinarySearchTreeNode<T> | undefined {
    if (!this.root) {
      this.root = new BinarySearchTreeNode(data);
      return this.root;
    }

    let current = this.root;

    while (true) {
      // comparator returns 1 when data is bigger.
      // returns 0 when data is equal
      if (this.comparator(data, current.data) === 1) {
        if (current.rightNode) {
          current = current.rightNode;
        } else {
          current.rightNode = new BinarySearchTreeNode(data);
          return current.rightNode;
        }
      } else {
        if (current.leftNode) {
          current = current.leftNode;
        } else {
          current.leftNode = new BinarySearchTreeNode(data);
          return current.leftNode;
        }
      }
    }
  }

  search(data: T): BinarySearchTreeNode<T> | undefined {
    if (!this.root) return undefined;

    let current = this.root;

    while (this.comparator(data, current.data) !== 0) {
      if (this.comparator(data, current.data) === 1) {
        if (!current.rightNode) return;

        current = current.rightNode;
      } else {
        if (!current.leftNode) return;

        current = current.leftNode;
      }
    }

    return current;
  }

  // /\
  inOrderTraversal(node: BinarySearchTreeNode<T> | undefined): void {
    if (node) {
      this.inOrderTraversal(node.leftNode);
      console.log(node.data);
      this.inOrderTraversal(node.rightNode);
    }
  }
  // /_
  preOrderTraversal(node: BinarySearchTreeNode<T> | undefined): void {
    if (node) {
      console.log(node.data);
      this.preOrderTraversal(node.leftNode);
      this.preOrderTraversal(node.rightNode);
    }
  }
  // _\
  postOrderTraversal(node: BinarySearchTreeNode<T> | undefined): void {
    if (node) {
      this.postOrderTraversal(node.leftNode);
      this.postOrderTraversal(node.rightNode);
      console.log(node.data);
    }
  }
}

export function NumbersComparator(a: number, b: number) {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
}
