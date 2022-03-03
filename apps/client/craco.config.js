// craco.config.js
const path = require(`path`);
const alias = require(`./src/config/alias`);

const aliases = alias('./src');

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ]),
);

module.exports = {
  webpack: {
    alias: resolvedAliases,
    module: {
      loaders: [
        {
          test: /plugin\.css$/,
          loaders: ['style-loader', 'css'],
        },
      ],
      rules: [
        {
          type: 'javascript/auto',
          test: /\.mjs$/,
          include: /node_modules/,
        },
      ],
    },
  },
  babel: {
    plugins: [['babel-plugin-styled-components']],
  },
};
