import Route from '@ember/routing/route';

export default class Puzzles2Route extends Route {
  parseInput(file) {
    return file.split('\n').map((e) => e.match(/(\d+) (?:red|green|blue)/g));
  }

  async model() {
    const resIntro = await fetch('/inputs/day2/intro.txt');
    const introFile = await resIntro.text();
    const resMinThamie = await fetch('/inputs/day2/full-minthamie.txt');
    const resLiuLangZhe = await fetch('/inputs/day2/full-liulangzhe.txt');
    const fullMinThamieFile = await resMinThamie.text();
    const fullLiuLangzheFile = await resLiuLangZhe.text();
    return {
      example: this.parseInput(introFile),
      fullMinThaMie: this.parseInput(fullMinThamieFile),
      fullLiuLangzhe: this.parseInput(fullLiuLangzheFile),
    };
  }
}
