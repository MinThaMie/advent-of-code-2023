import PuzzlesBaseController from './base';

export default class Puzzles10Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day10-solution1
  isValidPipe([curX, curY], pipe, [pipeX, pipeY]) {
    switch (pipe) {
      case '|':
        return (
          `${pipeX}.${pipeY}` == `${curX}.${curY + 1}` ||
          `${pipeX}.${pipeY}` == `${curX}.${curY - 1}`
        );
      case '-':
        return (
          `${pipeX}.${pipeY}` == `${curX + 1}.${curY}` ||
          `${pipeX}.${pipeY}` == `${curX - 1}.${curY}`
        );
      case 'L':
        return (
          `${pipeX}.${pipeY}` == `${curX - 1}.${curY}` ||
          `${pipeX}.${pipeY}` == `${curX}.${curY + 1}`
        );
      case 'F':
        return (
          `${pipeX}.${pipeY}` == `${curX - 1}.${curY}` ||
          `${pipeX}.${pipeY}` == `${curX}.${curY - 1}`
        );
      case '7':
        return (
          `${pipeX}.${pipeY}` == `${curX + 1}.${curY}` ||
          `${pipeX}.${pipeY}` == `${curX}.${curY - 1}`
        );
      case 'J':
        return (
          `${pipeX}.${pipeY}` == `${curX + 1}.${curY}` ||
          `${pipeX}.${pipeY}` == `${curX}.${curY + 1}`
        );
      default:
    }
  }

  nextPipe([curX, curY], pipe, [pipeX, pipeY]) {
    switch (pipe) {
      case '|':
        return `${pipeX}.${pipeY}` == `${curX}.${curY + 1}`
          ? `${pipeX}.${pipeY + 1}`
          : `${pipeX}.${pipeY - 1}`;
      case '-':
        return `${pipeX}.${pipeY}` == `${curX + 1}.${curY}`
          ? `${pipeX + 1}.${pipeY}`
          : `${pipeX - 1}.${pipeY}`;
      case 'L':
        return `${pipeX}.${pipeY}` == `${curX}.${curY + 1}`
          ? `${pipeX + 1}.${pipeY}`
          : `${pipeX}.${pipeY - 1}`;
      case 'F':
        return `${pipeX}.${pipeY}` == `${curX - 1}.${curY}`
          ? `${pipeX}.${pipeY + 1}`
          : `${pipeX + 1}.${pipeY}`;
      case '7':
        return `${pipeX}.${pipeY}` == `${curX + 1}.${curY}`
          ? `${pipeX}.${pipeY + 1}`
          : `${pipeX - 1}.${pipeY}`;
      case 'J':
        return `${pipeX}.${pipeY}` == `${curX + 1}.${curY}`
          ? `${pipeX}.${pipeY - 1}`
          : `${pipeX - 1}.${pipeY}`;
      default:
    }
  }
  steps = [];
  solve1(input) {
    let [starting, coordinates] = input;
    let [startX, startY] = starting.split('.').map((n) => parseInt(n));
    let fromStartPipes = [
      [coordinates[`${startX - 1}.${startY}`], startX - 1, startY],
      [coordinates[`${startX}.${startY - 1}`], startX, startY - 1],
      [coordinates[`${startX}.${startY + 1}`], startX, startY + 1],
      [coordinates[`${startX + 1}.${startY}`], startX + 1, startY],
    ];
    let nextPipe = '';
    let prevPipe = [];
    this.steps = [];
    fromStartPipes.forEach((set) => {
      let [pipe, pipeX, pipeY] = set;
      if (pipe) {
        if (this.isValidPipe([startX, startY], pipe, [pipeX, pipeY])) {
          nextPipe = this.nextPipe([startX, startY], pipe, [pipeX, pipeY]);
          this.steps.push(`${pipeX}.${pipeY}`, nextPipe);
          prevPipe = [pipeX, pipeY];
        }
      }
    });
    while (nextPipe !== starting) {
      let coors = nextPipe.split('.').map((n) => parseInt(n));
      nextPipe = this.nextPipe(prevPipe, coordinates[nextPipe], coors);
      prevPipe = [coors[0], coors[1]];
      this.steps.push(nextPipe);
    }
    return this.steps.length / 2;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day10-solution2
  isWithinBoundaries([x, y], coordinates, maxY) {
    let count = 0;
    let hasStarted = '';
    if (this.steps.includes(`${x}.${y}`)) {
      return false;
    }
    for (let i = y + 1; i <= maxY; i++) {
      if (
        coordinates[`${x}.${i}`] == '|' ||
        !this.steps.includes(`${x}.${i}`)
      ) {
        // Do nothing
      } else if (coordinates[`${x}.${i}`] == '-') {
        count++;
      } else {
        // 7 & F begin J & L end
        if (
          coordinates[`${x}.${i}`] == '7' ||
          coordinates[`${x}.${i}`] == 'F'
        ) {
          hasStarted = coordinates[`${x}.${i}`];
        } else {
          let closing = coordinates[`${x}.${i}`];
          if (
            (hasStarted == '7' && closing == 'L') ||
            (hasStarted == 'F' && closing == 'J')
          ) {
            count++;
          }
        }
      }
    }
    return count % 2 !== 0;
  }

  solve2(input) {
    let [, coordinates, maxX, maxY] = input;
    let inside = 0;
    for (let y = 0; y <= maxY; y++) {
      for (let x = 0; x <= maxX; x++) {
        if (this.isWithinBoundaries([x, y], coordinates, maxY)) {
          inside++;
        }
      }
    }
    return inside;
  }
  // END-SNIPPET
}
