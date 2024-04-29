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

class QueueFiFo {
  private queue: Array<number>;
  constructor() {
    this.queue = new Array<number>();
  }
  enqueue(a: number) {
    this.queue.push(a);
  }
  dequeue() {
    this.queue.shift();
  }
  print() {
    console.log(this.queue[0]);
  }
}
class QueueLiFo {
  private queue: Array<number>;
  constructor() {
    this.queue = new Array<number>();
  }
  enqueue(a: number) {
    this.queue.splice(0, 0, a);
  }
  dequeue() {
    this.queue.pop();
  }
  print() {
    console.log(this.queue[this.queue.length - 1]);
  }
}
function main() {
  // Enter your code here
  const queriesCnt = Number(inputLines.shift());
  const queueFiFo = new QueueFiFo();
  const queueLiFo = new QueueLiFo();
  while (inputLines.length > 0) {
    const query = inputLines.shift();
    if (query) {
      const queryElements = query.split(" ").map((elem) => Number(elem));

      if (queryElements[0] === 1) {
        queueFiFo.enqueue(queryElements[1]);
        queueLiFo.enqueue(queryElements[1]);
      } else if (queryElements[0] === 2) {
        queueFiFo.dequeue();
        queueLiFo.dequeue();
      } else if (queryElements[0] === 3) {
        queueFiFo.print();
        // queueLiFo.print();
      }
    }
    // console.log(queueFiFo);
  }
}
