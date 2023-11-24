import EmberRouter from '@ember/routing/router';
import config from 'advent-of-code-2023/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('puzzles', function () {
    this.route('1');
    this.route('2');
    this.route('3');
    this.route('4');
    this.route('5');
    this.route('6');
    this.route('7');
    this.route('8');
    this.route('9');
    this.route('10');
    this.route('11');
    this.route('12');
    this.route('13');
    this.route('14');
    this.route('15');
    this.route('16');
    this.route('17');
    this.route('18');
    this.route('19');
    this.route('20');
    this.route('21');
    this.route('22');
    this.route('23');
    this.route('24');
    this.route('25');
  });
});
