const config = require('../../shared/test/jest.config.js');

config.coveragePathIgnorePatterns.push('/styles/', '/utils/');

module.exports = config;
