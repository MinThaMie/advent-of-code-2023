/* eslint-disable no-unused-vars */

import PuzzlesBaseController from './base';

export default class Puzzles1Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day1-solution1
  solve1(input) {
    const solution = input.reduce(
      (accumulator, currentValue) =>
        accumulator +
        parseInt(
          `${currentValue.replace(/\D/g, '').slice(0, 1)}${currentValue
            .replace(/\D/g, '')
            .slice(-1)}`,
        ),
      0,
    );
    return solution;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day1-solution2
  solve2(input) {
    const digits = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ];
    let solution = 0;
    input.map((e) => {
      let numbers = {};
      let positions = [];
      let realDigits = e.replace(/\D/g, '').split('');
      realDigits.forEach((d) => {
        let pos = e.indexOf(d);
        if (positions.includes(pos)) {
          pos = e.lastIndexOf(d);
        }
        positions.push(pos);
        numbers[pos] = d;
      });
      digits.forEach((v, i) => {
        if (e.includes(v)) {
          let firstPos = e.indexOf(v);
          let lastPos = e.lastIndexOf(v);
          if (firstPos !== lastPos) {
            numbers[lastPos] = i + 1;
            positions.push(lastPos);
          }
          positions.push(firstPos);
          numbers[firstPos] = i + 1;
        }
      });
      positions.sort((a, b) => a > b);
      solution += parseInt(
        `${numbers[positions.slice(0, 1)]}${numbers[positions.slice(-1)]}`,
      );
    });
    return solution;
  }
  // END-SNIPPET
}
