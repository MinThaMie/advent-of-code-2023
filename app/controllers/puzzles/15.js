/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles15Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day15-solution1
  hash(string) {
    let currentValue = 0;
    string.split('').map((char) => {
      currentValue += char.charCodeAt();
      currentValue *= 17;
      currentValue = currentValue % 256;
      console.log(currentValue);
    });
    return currentValue;
  }

  solve1(input) {
    let solution = 0;
    input.map((seq) => {
      solution += this.hash(seq);
    });
    return solution;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day15-solution2
  solve2(input) {
    return 'Solution 1';
  }
  // END-SNIPPET
}
