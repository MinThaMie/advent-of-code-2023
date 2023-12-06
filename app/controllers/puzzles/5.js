/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles5Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day5-solution1
  solve1(input) {
    let [seeds, converters] = input;
    let currentValues = seeds;
    converters.forEach((converter) => {
      let convertedValues = [];
      let mapped = [];
      converter.map(([dest, source, range]) => {
        currentValues.map((value) => {
          if (value >= source && value < source + range) {
            convertedValues.push(dest + (value - source));
            mapped.push(value);
          }
        });
      });
      let notMapped = currentValues.filter((x) => !mapped.includes(x));
      currentValues = [...convertedValues, ...notMapped];
    });
    return currentValues.sort((a, b) => a > b)[0];
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day5-solution2
  completeRange(map, minmax) {
    let newMap = { ...map };
    let newMinMax = [...minmax];
    let firstNum = minmax[0];
    let lastNum = minmax[minmax.length - 1];
    if (firstNum > 0) {
      newMinMax.push(0, firstNum - 1);
      newMap[0] = 0;
      newMap[firstNum - 1] = 0;
    }
    let sliceIndex = 1;
    while (sliceIndex < minmax.length - 2) {
      let [prevMax, nextMin] = minmax.slice(sliceIndex, sliceIndex + 2);
      if (prevMax - nextMin !== -1) {
        newMinMax.push(prevMax + 1, nextMin - 1);
        newMap[prevMax + 1] = 0;
        newMap[nextMin - 1] = 0;
      }
      sliceIndex += 2;
    }
    newMinMax.push(lastNum + 1, Number.MAX_SAFE_INTEGER);
    newMap[lastNum + 1] = 0;
    newMap[Number.MAX_SAFE_INTEGER] = 0;
    return [newMap, newMinMax.sort((a, b) => a > b)];
  }

  solve2(input) {
    let [seedRanges, converters] = input;
    let ranges = [];
    for (let i = 0; i < seedRanges.length - 1; ) {
      ranges.push([seedRanges[i], seedRanges[i] + seedRanges[i + 1] - 1]);
      i += 2;
    }
    converters.forEach((converter) => {
      let conMap = {};
      let conMinMax = [];
      converter.map(([dest, source, range]) => {
        conMap[source] = dest - source;
        conMap[source + range - 1] = dest - source;
        conMinMax.push(source, source + range - 1);
      });
      let updated = this.completeRange(
        conMap,
        conMinMax.sort((a, b) => a > b),
      );
      conMap = updated[0];
      conMinMax = updated[1];
      let newRanges = [];
      for (let i = 0; i < conMinMax.length - 1; ) {
        for (let [min, max] of ranges) {
          if (conMinMax[i] <= min && max <= conMinMax[i + 1]) {
            newRanges.push([
              min + conMap[conMinMax[i]],
              max + conMap[conMinMax[i]],
            ]);
          } else if (
            min < conMinMax[i] &&
            max <= conMinMax[i + 1] &&
            max > conMinMax[i]
          ) {
            newRanges.push([
              conMinMax[i] + conMap[conMinMax[i]],
              max + conMap[conMinMax[i]],
            ]);
          } else if (conMinMax[i] <= min && min <= conMinMax[i + 1]) {
            newRanges.push([
              min + conMap[conMinMax[i]],
              conMinMax[i + 1] + conMap[conMinMax[i]],
            ]);
          }
        }
        i += 2;
      }
      ranges = [...newRanges];
    });
    return ranges.flat().sort((a, b) => a > b)[0];
  }
  // END-SNIPPET
}
