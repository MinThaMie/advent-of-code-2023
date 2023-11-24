'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const EmberRouterGenerator = require('ember-router-generator');

module.exports = {
  description: '',

  shouldEntityTouchRouter: function (name) {
    const isIndex = name === 'index';
    const isBasic = name === 'basic';
    const isApplication = name === 'application';

    return !isBasic && !isIndex && !isApplication;
  },

  shouldTouchRouter: function (name, options) {
    const entityTouchesRouter = this.shouldEntityTouchRouter(name);
    const isDummy = Boolean(options.dummy);
    const isAddon = Boolean(options.project.isEmberCLIAddon());
    const isAddonDummyOrApp = isDummy === isAddon;

    return (
      entityTouchesRouter &&
      isAddonDummyOrApp &&
      !options.dryRun &&
      !options.inRepoAddon &&
      !options.skipRouter
    );
  },

  afterInstall: function (options) {
    this.insertIntoFile(
      'app/templates/application.hbs',
      `    <LinkTo @route="puzzles.${options.entity.name}">Day ${options.entity.name}</LinkTo>`,
      {
        after: `Day ${options.entity.name - 1}</LinkTo>\n`,
      }
    );
    updateRouter.call(this, 'add', options);
  },

  afterUninstall: function (options) {
    updateRouter.call(this, 'remove', options);
  },
};

function updateRouter(action, options) {
  const entity = options.entity;
  const actionColorMap = {
    add: 'green',
    remove: 'red',
  };
  const color = actionColorMap[action] || 'gray';

  if (this.shouldTouchRouter(entity.name, options)) {
    writeRoute(action, `puzzles/${entity.name}`, options);

    this.ui.writeLine('updating router');
    this._writeStatusToUI(chalk[color], action + ' route', entity.name);
  }
}

function findRouter(options) {
  let routerPathParts = [options.project.root];
  const root = 'app';

  if (options.dummy && options.project.isEmberCLIAddon()) {
    routerPathParts = routerPathParts.concat([
      'tests',
      'dummy',
      root,
      'router.js',
    ]);
  } else {
    routerPathParts = routerPathParts.concat([root, 'router.js']);
  }

  return routerPathParts;
}

function writeRoute(action, name, options) {
  const routerPath = path.join.apply(null, findRouter(options));
  const source = fs.readFileSync(routerPath, 'utf-8');

  const routes = new EmberRouterGenerator(source);
  const newRoutes = routes[action](name, options);

  fs.writeFileSync(routerPath, newRoutes.code());
}
