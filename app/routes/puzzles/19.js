import Route from '@ember/routing/route';

export default class Puzzles19Route extends Route {
  parseInput(file) {
    return file.split('\n');
  }

  async model() {
    const resIntro = await fetch('/inputs/day19/intro.txt');
    const introFile = await resIntro.text();
    const res = await fetch('/inputs/day19/full.txt');
    const fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
