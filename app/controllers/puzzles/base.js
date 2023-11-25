import Controller from '@ember/controller';

export default class PuzzlesBaseController extends Controller {
  get example1() {
    return this.solve1(this.model.example);
  }
  get solution1() {
    return `MinThaMie's solution: ${this.solve1(this.model.fullMinThaMie)} <br><br> LiuLangZhe's solution: ${this.solve1(this.model.fullLiuLangzhe)}`;;
  }
  get example2() {
    return this.solve2(this.model.example);
  }
  get solution2() {
    return `MinThaMie's solution: ${this.solve2(this.model.fullMinThaMie)} <br><br> LiuLangZhe's solution: ${this.solve2(this.model.fullLiuLangzhe)}`;
  }
}
