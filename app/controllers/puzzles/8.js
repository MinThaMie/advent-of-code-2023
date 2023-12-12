/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles8Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day8-solution1
  solve1(input) {
    let [inst, network] = input;
    inst = inst.split('');
    let i = 0;
    let steps = 0;
    let curNode = 'AAA';
    while (curNode !== 'ZZZ') {
      if (inst[i] == 'L') {
        curNode = network[curNode][0];
      } else {
        curNode = network[curNode][1];
      }
      i++;
      steps++;
      if (i == inst.length) {
        i = 0;
      }
    }
    return steps;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day8-solution2
  solve2(input) {
    let [inst, network, endInA] = input;
    inst = inst.split('');
    let array = [];
    for (const [key, value] of Object.entries(network)) {
      array.push(key, ...value);
    }
    console.log(array);
    // let firstZZZ = array.indexOf('ZZZ');
    // let lastZZZ = array.lastIndexOf('ZZZ');
    // console.log(firstZZZ, lastZZZ);
    let zzzIndex = array.findIndex((num, idx, arr) => {
      // Without the arr argument, there's no way to easily access the
      // intermediate array without saving it to a variable.
      console.log(num, idx);
      return num == 'ZZZ' && idx % 3 == 0;
    });
    console.log(new Set(array), array.length);
    return 'Solution 2';
  }
  // END-SNIPPET
}
