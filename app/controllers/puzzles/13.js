/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles13Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day13-solution1
  transposeMatrix(array) {
    return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
  }

  isEqual(a, b) {
    return a.every((val, index) => val === b[index]);
  }

  findMirror(valley) {
    let result;
    for (let j = 1; j < valley.length; j++) {
      let mirrorFound = true;
      for (let i = 0; i + j < valley.length && j - i - 1 >= 0; i++) {
        if (!this.isEqual(valley[j + i], valley[j - i - 1])) {
          mirrorFound = false;
          break;
        }
      }
      if (mirrorFound) {
        result = 100 * j;
      }
    }
    valley = this.transposeMatrix(valley);
    for (let j = 1; j < valley.length; j++) {
      let mirrorFound = true;
      for (let i = 0; i + j < valley.length && j - i - 1 >= 0; i++) {
        if (!this.isEqual(valley[j + i], valley[j - i - 1])) {
          mirrorFound = false;
          break;
        }
      }
      if (mirrorFound) {
        result = j;
      }
    }
    return result;
  }

  solve1(input) {
    let solution = 0;
    input.forEach((valley, i) => {
      solution += this.findMirror(valley);
    });
    return solution;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day13-solution2
  findMirrorSmudge(valley) {
    let mirrors = [];
    for (let j = 1; j < valley.length; j++) {
      let mirrorFound = true;
      for (let i = 0; i + j < valley.length && j - i - 1 >= 0; i++) {
        if (
          !this.isEqual(valley[j + i], valley[j - i - 1]) &&
          !this.couldSmudge(valley[j + i], valley[j - i - 1])
        ) {
          mirrorFound = false;
          break;
        }
      }
      if (mirrorFound) {
        if (j !== this.findMirror(valley) / 100) {
          mirrors.push(j * 100);
        }
      }
    }
    valley = this.transposeMatrix(valley);
    for (let j = 1; j < valley.length; j++) {
      let mirrorFound = true;
      for (let i = 0; i + j < valley.length && j - i - 1 >= 0; i++) {
        if (
          !this.isEqual(valley[j + i], valley[j - i - 1]) &&
          !this.couldSmudge(valley[j + i], valley[j - i - 1])
        ) {
          mirrorFound = false;
          break;
        }
      }
      if (mirrorFound) {
        if (j !== this.findMirror(valley) / 100) {
          mirrors.push(j);
        }
      }
    }
    return mirrors[0];
  }

  couldSmudge(a, b) {
    return a.filter((n, i) => n !== b[i]).length == 1;
  }

  solve2(input) {
    let solution = 0;
    input.forEach((valley) => {
      solution += this.findMirrorSmudge(valley);
    });
    return solution;
  }
  // END-SNIPPET
}
