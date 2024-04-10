"use strict";

import {
    BinarySearchTree,
    BinarySearchTreeNode,
} from "../../../common/BinarySearchTree";

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
  const nop = inputLines.shift(); // number of players
  console.log(nop, inputLines);
  const bst = new BinarySearchTree<Player>(PlayerComparator);
  for (let i = 0; i < inputLines.length; i++) {
    const element = inputLines[i];
    const [name, score] = element.split(" ");
    const player = new Player(name, Number(score));
    bst.insert(player);
    // player.print();
  }
  let current = bst.root;
  //   bst.inOrderTraversal(current);
  inOrderTraversal(current);
}
class Player {
  name: string;
  score: number;
  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
  print() {
    console.log(this.name, this.score);
  }
}
function PlayerComparator(p1: Player, p2: Player) {
  if (p1.score > p2.score) return -1;

  if (p1.score < p2.score) return 1;

  for (let i = 0; i < Math.min(p1.name.length, p2.name.length); i++) {
    // console.log(i,p1.name[i],p1.name[i].charCodeAt(0),p2.name[i],p2.name[i].charCodeAt(0))
    if (p1.name[i].charCodeAt(0) > p2.name[i].charCodeAt(0)) {
      return 1;
    }
    if (p1.name[i].charCodeAt(0) < p2.name[i].charCodeAt(0)) {
      return -1;
    }
  }

  if (p1.name.length > p2.name.length) {
    return 1;
  }
  if (p1.name.length < p2.name.length) {
    return -1;
  }

  return 0;
}

function inOrderTraversal(
  node: BinarySearchTreeNode<Player> | undefined
): void {
  if (node) {
    inOrderTraversal(node.leftNode);
    // console.log(node.data.name,node.data.score);
    node.data.print()
    inOrderTraversal(node.rightNode);
  }
}
