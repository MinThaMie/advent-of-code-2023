/* eslint-disable no-unused-vars */
import PuzzlesBaseController from './base';

export default class Puzzles13Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day13-solution1
  transposeMatrix(array) {
    return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
  }

  isEqual(a, b) {
    return a.every((val, index) => val === b[index]);
  }

  checkForMirror(array, indexA, indexB, point) {
    let compareA = array[indexA];
    let compareB = array[indexB];
    let reflectionPoint = point;
    if (this.isEqual(compareA, compareB)) {
      if (reflectionPoint == undefined) {
        reflectionPoint = indexB;
      }
      if (indexA - 1 < 0 || indexB + 1 > array.length - 1) {
        return reflectionPoint;
      } else {
        return this.checkForMirror(
          array,
          indexA - 1,
          indexB + 1,
          reflectionPoint,
        );
      }
    } else if (reflectionPoint) {
      return this.checkForMirror(
        array,
        reflectionPoint,
        reflectionPoint + 1,
        undefined,
      );
    } else if (indexB + 1 !== array.length) {
      return this.checkForMirror(array, indexA + 1, indexB + 1, undefined);
    } else {
      return false;
    }
  }

  solve1(input) {
    let solution = 0;
    input.forEach((valley, i) => {
      solution += 100 * this.checkForMirror(valley, 0, 1, undefined);
      solution += this.checkForMirror(
        this.transposeMatrix(valley),
        0,
        1,
        undefined,
      );
    });
    return solution;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day13-solution2
  couldSmudge(a, b) {
    // // console.log(a, b);
    // console.log(a.filter((n, i) => n !== b[i]));
    return a.filter((n, i) => n !== b[i]).length == 1;
  }
  checkForMirrorWithSmudge(array, indexA, indexB, point, smudge) {
    let compareA = array[indexA];
    let compareB = array[indexB];
    let reflectionPoint = point;
    // console.log(indexA, indexB, point, smudge);
    if (this.isEqual(compareA, compareB)) {
      // console.log("equal", indexA, indexB);
      if (reflectionPoint == undefined) {
        reflectionPoint = indexB;
      }
      if (indexA - 1 < 0 || indexB + 1 > array.length - 1) {
        return [reflectionPoint, smudge];
      } else {
        return this.checkForMirrorWithSmudge(
          array,
          indexA - 1,
          indexB + 1,
          reflectionPoint,
          smudge,
        );
      }
    } else if (!smudge) {
      // console.log("could smudge", indexA, indexB);
      if (this.couldSmudge(compareA, compareB)) {
        // console.log("smudge");
        if (reflectionPoint == undefined) {
          reflectionPoint = indexB;
        }
        if (indexA - 1 < 0 || indexB + 1 > array.length - 1) {
          return [reflectionPoint, true];
        } else {
          return this.checkForMirrorWithSmudge(
            array,
            indexA - 1,
            indexB + 1,
            reflectionPoint,
            true,
          );
        }
      } else if (indexB + 1 !== array.length) {
        return this.checkForMirrorWithSmudge(array, indexA + 1, indexB + 1, undefined, smudge);
      } else {
        return [false, false];
      }
    } else if (reflectionPoint) {
      return this.checkForMirrorWithSmudge(
        array,
        reflectionPoint,
        reflectionPoint + 1,
        undefined,
        smudge,
      );
    } else if (indexB + 1 !== array.length) {
      return this.checkForMirrorWithSmudge(array, indexA + 1, indexB + 1, undefined, smudge);
    } else {
      return [false, false];
    }
  }
  solve2(input) {
    let solution = 0;
    let stuff = [];
    input.forEach((valley, i) => {
      console.log(i);
      let [res, smudge] = this.checkForMirrorWithSmudge(valley, 0, 1, undefined, false);
      // console.log(res, smudge, valley.length, this.checkForMirror(valley, 0, 1, undefined));
      // if (res > 0 && res == this.checkForMirror(valley, 0, 1, undefined) && res < valley.length - 1) {
      //   console.log("res is same, no smudge", res);
      //   [res, smudge] = this.checkForMirrorWithSmudge(valley, res, res + 1, undefined, false)
      // }
      if (smudge) {
        console.log("hor");
        stuff.push(i);
        solution += 100 * res;
      } else {
        let [verres, versmudge] = this.checkForMirrorWithSmudge(
          this.transposeMatrix(valley),
          0,
          1,
          undefined,
          false,
        );
        // console.log(verres, versmudge, this.checkForMirror(this.transposeMatrix(valley), 0, 1, undefined));
        // if (verres == this.checkForMirror(this.transposeMatrix(valley), 0, 1, undefined)) {
        //   console.log("vres is same, no smudge", verres);
        //   [verres, versmudge] = this.checkForMirrorWithSmudge(this.transposeMatrix(valley), verres, verres + 1, undefined, false)
        // }
        if (versmudge) {
          console.log("ver");
          stuff.push(i);
          solution += verres;
        } else {
          console.log("did not do", i, res, verres, this.checkForMirror(valley, 0, 1, undefined), this.checkForMirror(this.transposeMatrix(valley), 0, 1, undefined) )
        }
      }
    });
    console.log(stuff);
    return solution;
  }
  // END-SNIPPET
}
