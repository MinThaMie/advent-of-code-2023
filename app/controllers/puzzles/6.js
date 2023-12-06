/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles6Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day6-solution1
  solve1(input) {
    let [time, record] = input;
    let possible = 1;
    for (let i = 0; i < time.length; i++) {
      let minH = (time[i] - Math.sqrt(time[i] * time[i] - 4 * record[i])) / 2;
      let maxH = (time[i] + Math.sqrt(time[i] * time[i] - 4 * record[i])) / 2;
      if (minH % 1 === 0) {
        minH += 1;
      } else {
        minH = Math.ceil(minH);
      }
      if (maxH % 1 === 0) {
        maxH = maxH - 1;
      } else {
        maxH = Math.floor(maxH);
      }
      possible *= maxH - minH + 1;
    }
    return possible;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day6-solution2
  solve2(input) {
    let [time, record] = input;
    time = parseInt(time.join(''));
    record = parseInt(record.join(''));
    let minH = (time - Math.sqrt(time * time - 4 * record)) / 2;
    let maxH = (time + Math.sqrt(time * time - 4 * record)) / 2;
    if (minH % 1 === 0) {
      minH += 1;
    } else {
      minH = Math.ceil(minH);
    }
    if (maxH % 1 === 0) {
      maxH = maxH - 1;
    } else {
      maxH = Math.floor(maxH);
    }
    return maxH - minH + 1;
  }
  // END-SNIPPET
}
