/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles9Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day9-solution1
  calculateNext(array) {
    if (array.every((x) => x === array[0])) {
      return array[0];
    } else {
      let newArray = [];
      for (let i = 1; i < array.length; i++) {
        newArray.push(array[i] - array[i - 1]);
      }
      return array[array.length - 1] + this.calculateNext(newArray);
    }
  }

  solve1(input) {
    return input.map((row) => this.calculateNext(row)).reduce((a, b) => a + b);
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day9-solution2
  calculatePrev(array) {
    if (array.every((x) => x === array[0])) {
      return array[0];
    } else {
      let newArray = [];
      for (let i = 1; i < array.length; i++) {
        newArray.push(array[i] - array[i - 1]);
      }
      return array[0] - this.calculatePrev(newArray);
    }
  }
  solve2(input) {
    return input.map((row) => this.calculatePrev(row)).reduce((a, b) => a + b);
  }
  // END-SNIPPET
}
