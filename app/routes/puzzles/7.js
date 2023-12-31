import Route from '@ember/routing/route';

export default class Puzzles7Route extends Route {
  parseInput(file) {
    let cardMap = {};
    let cards = [];
    file.split('\n').map((line) => {
      let [card, bid] = line.split(' ');
      cardMap[card] = parseInt(bid);
      cards.push(card);
    });
    return [cardMap, cards];
  }

  async model() {
    const resIntro = await fetch('/inputs/day7/intro.txt');
    const introFile = await resIntro.text();
    const resMinThamie = await fetch('/inputs/day7/full-minthamie.txt');
    const resLiuLangZhe = await fetch('/inputs/day7/full-liulangzhe.txt');
    const fullMinThamieFile = await resMinThamie.text();
    const fullLiuLangzheFile = await resLiuLangZhe.text();
    return {
      example: this.parseInput(introFile),
      fullMinThaMie: this.parseInput(fullMinThamieFile),
      fullLiuLangzhe: this.parseInput(fullLiuLangzheFile),
    };
  }
}
