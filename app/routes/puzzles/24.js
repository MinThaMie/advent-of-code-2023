import Route from '@ember/routing/route';

export default class Puzzles24Route extends Route {
  parseInput(file) {
    return file.split('\n');
  }

  async model() {
    const resIntro = await fetch('/inputs/day24/intro.txt');
    const introFile = await resIntro.text();
    const resMinThamie = await fetch('/inputs/day24/full-minthamie.txt');
    const resLiuLangZhe = await fetch('/inputs/day24/full-liulangzhe.txt');
    const fullMinThamieFile = await resMinThamie.text();
    const fullLiuLangzheFile = await resLiuLangZhe.text();
    return {
      example: this.parseInput(introFile),
      fullMinThaMie: this.parseInput(fullMinThamieFile),
      fullLiuLangzhe: this.parseInput(fullLiuLangzheFile),
    };
  }
}
