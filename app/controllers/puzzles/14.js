/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles14Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day14-solution1
  solve1(input) {
    let newField = input.map((field) => {
      return field.map((cell) => {
        if (cell == 'O') {
          return '.';
        } else {
          return cell;
        }
      });
    });
    console.log(input);
    console.log(newField);
    return 'Solution 1';
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day14-solution2
  solve2(input) {
    return 'Solution 1';
  }
  // END-SNIPPET
}
