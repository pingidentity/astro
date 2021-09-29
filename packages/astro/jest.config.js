const config = require('../../shared/test/jest.config.js');

config.coveragePathIgnorePatterns.push('/styles/', '/utils/');

config.setupFilesAfterEnv.push('./src/utils/testUtils/axeSetup.js');

module.exports = config;
