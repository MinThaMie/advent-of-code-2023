/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles3Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day3-solution1
  getBoundingBox(rowIndex, colIndex, length) {
    let topLayer = [];
    let middleLayer = [];
    let bottomLayer = [];
    middleLayer.push([rowIndex, colIndex - 1], [rowIndex, colIndex + length]);
    for (let i = colIndex - 1; i <= colIndex + length; i++) {
      topLayer.push([rowIndex - 1, i]);
      bottomLayer.push([rowIndex + 1, i]);
    }
    return [...topLayer, ...middleLayer, ...bottomLayer];
  }

  solve1(input) {
    let numbers = {};
    let symbols = {};
    input.map((row, rowIndex) => {
      numbers[rowIndex] = {};
      symbols[rowIndex] = {};
      let results = row.matchAll(/(\d+)|([^0-9.\s]+)/g);
      for (const result of results) {
        const number = parseInt(result[0]);
        const startIndex = result.index;
        if (number) {
          numbers[rowIndex][startIndex] = [number, result[0].length];
        } else {
          symbols[rowIndex][startIndex] = result[0];
        }
      }
    });
    let partNumbers = [];
    for (const [rowIndex, numObj] of Object.entries(numbers)) {
      if (Object.keys(numObj)) {
        for (const [index, [number, length]] of Object.entries(numObj)) {
          let bounding = this.getBoundingBox(
            parseInt(rowIndex),
            parseInt(index),
            parseInt(length),
          );
          for (let coor of bounding) {
            if (symbols[coor[0]]?.[coor[1]]) {
              partNumbers.push(number);
              break;
            }
          }
        }
      }
    }
    return partNumbers.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day3-solution2
  solve2(input) {
    let numbers = {};
    let gears = {};
    input.map((row, rowIndex) => {
      numbers[rowIndex] = {};
      gears[rowIndex] = {};
      let results = row.matchAll(/(\d+)|([^0-9.\s]+)/g);
      for (const result of results) {
        const number = parseInt(result[0]);
        const startIndex = result.index;
        if (number) {
          numbers[rowIndex][startIndex] = [number, result[0].length];
        } else {
          if (result[0] == '*') {
            gears[rowIndex][startIndex] = [];
          }
        }
      }
    });
    for (const [rowIndex, numObj] of Object.entries(numbers)) {
      if (Object.keys(numObj)) {
        for (const [index, [number, length]] of Object.entries(numObj)) {
          let bounding = this.getBoundingBox(
            parseInt(rowIndex),
            parseInt(index),
            parseInt(length),
          );
          for (let coor of bounding) {
            if (gears[coor[0]]?.[coor[1]]) {
              gears[coor[0]][coor[1]].push(number);
              break;
            }
          }
        }
      }
    }
    let solution = 0;
    Object.values(gears).forEach((gearRow) => {
      for (const [key, value] of Object.entries(gearRow)) {
        if (value.length == 2) {
          solution += value.reduce((m, n) => m * n);
        }
      }
    });
    return solution;
  }
  // END-SNIPPET
}
