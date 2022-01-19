/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const { execSync } = require('child_process');
const componentGenerator = require('./component/index.js');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setActionType('prettify', () => {
    try {
      execSync(`yarn format`);
    } catch (err) {
      throw err;
    }
  });
};
