import Route from '@ember/routing/route';

export default class Puzzles8Route extends Route {
  parseInput(file) {
    let [inst, network] = file.split('\n\n');
    let procNetwork = {};
    let endInA = [];
    network.split('\n').map((line) => {
      let [node, left, right] = line.match(/[A-Z]{3}/g);
      if (node.slice(-1) == 'A') {
        endInA.push(node);
      }
      procNetwork[node] = [left, right];
    });

    return [inst, procNetwork, endInA];
  }

  async model() {
    const resIntro = await fetch('/inputs/day8/intro.txt');
    const introFile = await resIntro.text();
    const resMinThamie = await fetch('/inputs/day8/full-minthamie.txt');
    const resLiuLangZhe = await fetch('/inputs/day8/full-liulangzhe.txt');
    const fullMinThamieFile = await resMinThamie.text();
    const fullLiuLangzheFile = await resLiuLangZhe.text();
    return {
      example: this.parseInput(introFile),
      fullMinThaMie: this.parseInput(fullMinThamieFile),
      fullLiuLangzhe: this.parseInput(fullLiuLangzheFile),
    };
  }
}
