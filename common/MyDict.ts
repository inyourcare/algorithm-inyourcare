export type MyDict<T> = {
  [key: string | number]: T;
};

// export class MyDictWrapper<T> {
//   dict: MyDict<T>;
//   insert: (key: string | number, val: T) => void;
//   constructor(insert: (key: string | number, val: T) => void) {
//     this.dict = {};
//     this.insert = insert;
//   }
// }
