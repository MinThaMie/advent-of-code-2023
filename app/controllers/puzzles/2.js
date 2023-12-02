/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles2Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day2-solution1
  solve1(input) {
    const maxCubes = {
      red: 12,
      green: 13,
      blue: 14,
    };
    let solution = 0;
    input.map((game, i) => {
      let currentGame = i + 1;
      let isPossible = true;
      game.forEach((set) => {
        let [number, color] = set.split(' ');
        if (maxCubes[color] < parseInt(number)) {
          isPossible = false;
          return;
        }
      });
      if (isPossible) {
        solution += currentGame;
      }
    });
    return solution;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day2-solution2
  solve2(input) {
    let solution = 0;
    input.map((game) => {
      const minCubes = {
        red: 0,
        green: 0,
        blue: 0,
      };
      game.forEach((set) => {
        let [number, color] = set.split(' ');
        if (minCubes[color] < parseInt(number)) {
          minCubes[color] = parseInt(number);
        }
      });
      solution += minCubes['red'] * minCubes['green'] * minCubes['blue'];
    });
    return solution;
  }
  // END-SNIPPET
}
