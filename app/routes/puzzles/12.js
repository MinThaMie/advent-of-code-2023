import Route from '@ember/routing/route';

export default class Puzzles12Route extends Route {
  parseInput(file) {
    return file.split('\n').map((line) => {
      let [springs, cont] = line.split(' ');
      springs = springs.split('.').filter((res) => res !== '');
      cont = cont.split(',').map((n) => parseInt(n));
      return [springs, cont];
    });
  }

  async model() {
    const resIntro = await fetch('/inputs/day12/intro.txt');
    const introFile = await resIntro.text();
    const resMinThamie = await fetch('/inputs/day12/full-minthamie.txt');
    const resLiuLangZhe = await fetch('/inputs/day12/full-liulangzhe.txt');
    const fullMinThamieFile = await resMinThamie.text();
    const fullLiuLangzheFile = await resLiuLangZhe.text();
    return {
      example: this.parseInput(introFile),
      fullMinThaMie: this.parseInput(fullMinThamieFile),
      fullLiuLangzhe: this.parseInput(fullLiuLangzheFile),
    };
  }
}
