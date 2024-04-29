// "use strict";

// process.stdin.resume();
// process.stdin.setEncoding("utf-8");
// let inputString: string = "";
// let inputLines: string[] = [];
// let currentLine: number = 0;
// process.stdin.on("data", function (inputStdin: string): void {
//   inputString += inputStdin;
// });

// process.stdin.on("end", function (): void {
//   inputLines = inputString.split("\n");
//   inputString = "";
//   main();
// });

// function readLine(): string {
//   return inputLines[currentLine++];
// }

// function main() {
//   // Enter your code here
//   console.log(inputLines);
// }

export class QueueFiFo {
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
export class QueueLiFo {
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
