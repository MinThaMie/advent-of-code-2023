import Controller from '@ember/controller';
import { htmlSafe } from '@ember/template';

export default class PuzzlesBaseController extends Controller {
  get example1() {
    return this.solve1(this.model.example);
  }
  get solution1() {
    return htmlSafe(
      `<ul><li>MinThaMie's solution: ${this.solve1(
        this.model.fullMinThaMie,
      )}</li><li>LiuLangZhe's solution: </li></ul>`,
    );
  }
  get example2() {
    return this.solve2(this.model.example);
  }
  get solution2() {
    return htmlSafe(
      `<ul><li>MinThaMie's solution: ${this.solve2(
        this.model.fullMinThaMie,
      )}</li><li>LiuLangZhe's solution: </li></ul>`,
    );
  }
}
