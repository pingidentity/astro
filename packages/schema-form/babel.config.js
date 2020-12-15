const config = require('../../shared/babel.config');

config.plugins.push([
  '@babel/plugin-transform-runtime',
  {
    corejs: 3,
  },
]);

module.exports = config;
