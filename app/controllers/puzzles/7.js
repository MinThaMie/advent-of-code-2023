/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles7Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day7-solution1
  // eslint-disable-next-line prettier/prettier
  cardValues = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  compareCards(a, b) {
    let aMap = {};
    let bMap = {};
    a.split('').map((char) => {
      if (aMap[char]) {
        aMap[char] = aMap[char] + 1;
      } else {
        aMap[char] = 1;
      }
    });
    b.split('').map((char) => {
      if (bMap[char]) {
        bMap[char] = bMap[char] + 1;
      } else {
        bMap[char] = 1;
      }
    });
    if (Object.keys(aMap).length !== Object.keys(bMap).length) {
      return Object.keys(aMap).length < Object.keys(bMap).length ? 1 : -1;
    } else {
      if (
        Math.max(...Object.values(aMap)) !== Math.max(...Object.values(bMap))
      ) {
        return Math.max(...Object.values(aMap)) >
          Math.max(...Object.values(bMap))
          ? 1
          : -1;
      }
      for (let i = 0; i < a.length; ) {
        if (
          this.cardValues.indexOf(a.charAt(i)) !==
          this.cardValues.indexOf(b.charAt(i))
        ) {
          return this.cardValues.indexOf(a.charAt(i)) <
            this.cardValues.indexOf(b.charAt(i))
            ? 1
            : -1;
        }
        i++;
      }
    }
  }

  solve1(input) {
    let [cardMap, cards] = input;
    let ranks = cards.sort((a, b) => this.compareCards(a, b));
    let solution = 0;
    ranks.map((num, i) => {
      solution += cardMap[num] * (i + 1);
    });
    return solution;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day7-solution2
  // eslint-disable-next-line prettier/prettier
  cardValues2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
  compareCards2(a, b) {
    let aMap = {};
    let bMap = {};
    a.split('').map((char) => {
      if (aMap[char]) {
        aMap[char] = aMap[char] + 1;
      } else {
        aMap[char] = 1;
      }
    });
    b.split('').map((char) => {
      if (bMap[char]) {
        bMap[char] = bMap[char] + 1;
      } else {
        bMap[char] = 1;
      }
    });
    if (a.includes('J') && a !== 'JJJJJ') {
      let addTo = Object.keys(aMap)
        .filter((i) => i !== 'J')
        .reduce((a, b) => (aMap[a] > aMap[b] ? a : b));
      aMap[addTo] = aMap[addTo] + aMap['J'];
      delete aMap['J'];
    }
    if (b.includes('J') && b !== 'JJJJJ') {
      let addTo = Object.keys(bMap)
        .filter((i) => i !== 'J')
        .reduce((a, b) => (bMap[a] > bMap[b] ? a : b));
      bMap[addTo] = bMap[addTo] + bMap['J'];
      delete bMap['J'];
    }
    if (Object.keys(aMap).length !== Object.keys(bMap).length) {
      return Object.keys(aMap).length < Object.keys(bMap).length ? 1 : -1;
    } else {
      if (
        Math.max(...Object.values(aMap)) !== Math.max(...Object.values(bMap))
      ) {
        return Math.max(...Object.values(aMap)) >
          Math.max(...Object.values(bMap))
          ? 1
          : -1;
      }
      for (let i = 0; i < a.length; ) {
        if (
          this.cardValues2.indexOf(a.charAt(i)) !==
          this.cardValues2.indexOf(b.charAt(i))
        ) {
          return this.cardValues2.indexOf(a.charAt(i)) <
            this.cardValues2.indexOf(b.charAt(i))
            ? 1
            : -1;
        }
        i++;
      }
    }
  }
  solve2(input) {
    let [cardMap, cards] = input;
    let ranks = cards.sort((a, b) => this.compareCards2(a, b));
    let solution = 0;
    ranks.map((num, i) => {
      solution += cardMap[num] * (i + 1);
    });
    return solution;
  }
  // END-SNIPPET
}
