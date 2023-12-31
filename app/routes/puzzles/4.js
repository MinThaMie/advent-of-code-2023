import Route from '@ember/routing/route';

export default class Puzzles4Route extends Route {
  parseInput(file) {
    return file.split('\n').map((line) =>
      line
        .split(': ')[1]
        .split([' | '])
        .map((numbers) => numbers.match(/\d+/g)),
    );
  }

  async model() {
    const resIntro = await fetch('/inputs/day4/intro.txt');
    const introFile = await resIntro.text();
    const resMinThamie = await fetch('/inputs/day4/full-minthamie.txt');
    const resLiuLangZhe = await fetch('/inputs/day4/full-liulangzhe.txt');
    const fullMinThamieFile = await resMinThamie.text();
    const fullLiuLangzheFile = await resLiuLangZhe.text();
    return {
      example: this.parseInput(introFile),
      fullMinThaMie: this.parseInput(fullMinThamieFile),
      fullLiuLangzhe: this.parseInput(fullLiuLangzheFile),
    };
  }
}
