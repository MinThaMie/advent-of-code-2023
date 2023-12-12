import Route from '@ember/routing/route';

export default class Puzzles10Route extends Route {
  parseInput(file) {
    let coordinates = {};
    let starting = '';
    let maxY = 0;
    let maxX = 0;
    file.split('\n').map((line, y) => {
      let tiles = line.split('');
      maxX = tiles.length - 1;
      tiles.forEach((tile, x) => {
        if (tile !== '.') {
          coordinates[`${x}.${y}`] = tile;
        }
        if (tile == 'S') {
          starting = `${x}.${y}`;
        }
      });
      maxY = y;
    });
    return [starting, coordinates, maxX, maxY];
  }

  async model() {
    const resIntro = await fetch('/inputs/day10/intro.txt');
    const introFile = await resIntro.text();
    const resMinThamie = await fetch('/inputs/day10/full-minthamie.txt');
    const resLiuLangZhe = await fetch('/inputs/day10/full-liulangzhe.txt');
    const fullMinThamieFile = await resMinThamie.text();
    const fullLiuLangzheFile = await resLiuLangZhe.text();
    return {
      example: this.parseInput(introFile),
      fullMinThaMie: this.parseInput(fullMinThamieFile),
      fullLiuLangzhe: this.parseInput(fullLiuLangzheFile),
    };
  }
}
