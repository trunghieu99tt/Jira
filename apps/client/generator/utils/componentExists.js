const fs = require('fs');
const path = require('path');
const componentsDirectory = fs.readdirSync(
  path.join(__dirname, '../../src/components'),
);
const pagesDirectory = fs.readdirSync(path.join(__dirname, '../../src/pages'));

const components = componentsDirectory.concat(pagesDirectory);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
