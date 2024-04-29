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