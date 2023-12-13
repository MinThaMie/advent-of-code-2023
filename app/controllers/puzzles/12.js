/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles12Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day12-solution1
  solve1(input) {
    let solution = 0;
    input.forEach(([springs, cont]) => {
      let springLength = springs.length - 1;
      springs.map((a) => (springLength += a.length));
      let contLength = cont.reduce((a, b) => a + b) + cont.length - 1;
      if (springLength == contLength) {
        solution += 1;
      } else if (springs.length == cont.length) {
        // console.log(springs, cont);
        let toCheckSprings = springs.filter((spring, i) => {
          return spring.length !== cont[i];
        });
        let toCheckCont = cont.filter((cont, i) => {
          return springs[i].length !== cont;
        });
        console.log(toCheckSprings, toCheckCont);
      } else {
        console.log('rest');
      }
    });
    return solution;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day12-solution2
  solve2(input) {
    return 'Solution 1';
  }
  // END-SNIPPET
}
