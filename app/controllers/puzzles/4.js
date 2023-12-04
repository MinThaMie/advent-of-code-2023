/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles4Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day4-solution1
  solve1(input) {
    let solution = 0;
    input.forEach(([winning, your]) => {
      let intersec = your.filter((x) => winning.includes(x)).length;
      if (intersec > 0) {
        solution += Math.pow(2, intersec - 1);
      }
    });
    return solution;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day4-solution2
  solve2(input) {
    let total = [];
    for (let i = input.length - 1; i >= 0; i--) {
      let [winning, your] = input[i];
      let intersec = your.filter((x) => winning.includes(x)).length;
      if (intersec > 0) {
        const value = total.slice(-intersec).reduce((a, b) => a + b);
        total.push(value + 1);
      } else {
        total.push(1);
      }
    }
    return total.reduce((a, b) => a + b);
  }
  // END-SNIPPET
}
