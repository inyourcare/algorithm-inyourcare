"use strict";

import {
  BinarySearchTree,
  NumbersComparator,
} from "../../../../common/typesciprt/BinarySearchTree";

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
  //   console.log(main());
  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

function main() {
  // Enter your code here
  let nodeCnt = readLine();
  let nodeVals = readLine();
  let children = readLine();
  //   process.stdout.write(nodeCnt);
  //   process.stdout.write(nodeVals);
  //   process.stdout.write(children);
  const bst = new BinarySearchTree(NumbersComparator);

  let nodeValNumbers = nodeVals.split(" ").map((val) => Number(val));
  for (let index = 0; index < nodeValNumbers.length; index++) {
    const element = nodeValNumbers[index];
    bst.insert(element);
  }

  let targetNodeVals = children
    .split(" ")
    .map((val) => Number(val))
    .sort(function (a, b) {
      return a - b;
    });
  let current = bst.root;
  const [prev, post] = targetNodeVals;
  let curData;
  while (current !== undefined) {
    curData = current.data;
    if (prev < curData && post < curData) current = current.leftNode;
    else if (prev > curData && post > curData) current = current.rightNode;
    else {
        console.log(current.data)
        return
    }
  }
  //   bst.inOrderTraversal(bst.root);
  //   console.log("result::", curData, prev, post, current?.data);
}
