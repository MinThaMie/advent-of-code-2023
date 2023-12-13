import Route from '@ember/routing/route';

export default class Puzzles13Route extends Route {
  parseInput(file) {
    return file
      .split('\n\n')
      .map((valley) => valley.split('\n').map((line) => line.split('')));
  }

  async model() {
    const resIntro = await fetch('/inputs/day13/intro.txt');
    const introFile = await resIntro.text();
    const resMinThamie = await fetch('/inputs/day13/full-minthamie.txt');
    const resLiuLangZhe = await fetch('/inputs/day13/full-liulangzhe.txt');
    const fullMinThamieFile = await resMinThamie.text();
    const fullLiuLangzheFile = await resLiuLangZhe.text();
    return {
      example: this.parseInput(introFile),
      fullMinThaMie: this.parseInput(fullMinThamieFile),
      fullLiuLangzhe: this.parseInput(fullLiuLangzheFile),
    };
  }
}
