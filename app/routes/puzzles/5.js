import Route from '@ember/routing/route';

export default class Puzzles5Route extends Route {
  parseInput(file) {
    let blocks = file.split('\n\n');
    let seeds = blocks[0]
      .split(': ')[1]
      .split(' ')
      .map((str) => parseInt(str));
    let converters = blocks.slice(1).map((block) => {
      return block
        .split('\n')
        .splice(1)
        .map((line) => line.split(' ').map((str) => parseInt(str)));
    });
    return [seeds, converters];
  }

  async model() {
    const resIntro = await fetch('/inputs/day5/intro.txt');
    const introFile = await resIntro.text();
    const resMinThamie = await fetch('/inputs/day5/full-minthamie.txt');
    const resLiuLangZhe = await fetch('/inputs/day5/full-liulangzhe.txt');
    const fullMinThamieFile = await resMinThamie.text();
    const fullLiuLangzheFile = await resLiuLangZhe.text();
    return {
      example: this.parseInput(introFile),
      fullMinThaMie: this.parseInput(fullMinThamieFile),
      fullLiuLangzhe: this.parseInput(fullLiuLangzheFile),
    };
  }
}
