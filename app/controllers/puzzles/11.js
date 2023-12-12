/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles11Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day11-solution1
  transposeMatrix(array) {
    return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
  }

  pairs = (arr) =>
    arr.map((v, i) => arr.slice(i + 1).map((w) => [v, w])).flat();

  solve1(input) {
    let expandedRows = [];
    input.forEach((line) => {
      if (line.every((x) => x === '.')) {
        expandedRows.push(line, line);
      } else {
        expandedRows.push(line);
      }
    });
    let vertical = this.transposeMatrix(expandedRows);
    let expanded = [];
    vertical.forEach((line) => {
      if (line.every((x) => x === '.')) {
        expanded.push(line, line);
      } else {
        expanded.push(line);
      }
    });
    expanded = this.transposeMatrix(expanded);
    let galaxies = [];
    expanded.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell == '#') {
          galaxies.push([x, y]);
        }
      });
    });
    let galaxyPairs = this.pairs(galaxies);
    let count = 0;
    galaxyPairs.forEach(([[x1, y1], [x2, y2]]) => {
      count += Math.abs(x1 - x2) + Math.abs(y1 - y2);
    });
    return count;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day11-solution2
  solve2(input) {
    let expandedY = [];
    input.forEach((line, y) => {
      if (line.every((x) => x === '.')) {
        expandedY.push(y);
      }
    });
    let vertical = this.transposeMatrix(input);
    let expandedX = [];
    vertical.forEach((line, x) => {
      if (line.every((x) => x === '.')) {
        expandedX.push(x);
      }
    });
    let galaxies = [];
    input.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell == '#') {
          galaxies.push([x, y]);
        }
      });
    });
    let galaxyPairs = this.pairs(galaxies);
    let count = 0;
    galaxyPairs.forEach(([[x1, y1], [x2, y2]]) => {
      let x1Index;
      let x2Index;
      let y1Index;
      let y2Index;
      for (let i = 0; i < expandedX.length; i++) {
        if (x1 < expandedX[0]) {
          x1Index = 0;
        }
        if (x1 > expandedX[i]) {
          x1Index = i + 1;
        }
        if (x1 > expandedX.slice(-1)) {
          x1Index = expandedX.length;
        }
        if (x2 < expandedX[0]) {
          x2Index = 0;
        }
        if (x2 > expandedX[i]) {
          x2Index = i + 1;
        }
        if (x2 > expandedX.slice(-1)) {
          x2Index = expandedX.length;
        }
      }
      for (let i = 0; i < expandedY.length; i++) {
        if (y1 < expandedY[0]) {
          y1Index = 0;
        }
        if (y1 > expandedY[i]) {
          y1Index = i + 1;
        }
        if (y1 > expandedY.slice(-1)) {
          y1Index = expandedY.length;
        }
        if (y2 < expandedY[0]) {
          y2Index = 0;
        }
        if (y2 > expandedY[i]) {
          y2Index = i + 1;
        }
        if (y2 > expandedY.slice(-1)) {
          y2Index = expandedY.length;
        }
      }
      let result =
        Math.abs(x1 - x2) +
        Math.abs(x1Index - x2Index) * (1000000 - 1) +
        Math.abs(y1 - y2) +
        Math.abs(y1Index - y2Index) * (1000000 - 1);
      count += result;
    });
    return count;
  }
  // END-SNIPPET
}
