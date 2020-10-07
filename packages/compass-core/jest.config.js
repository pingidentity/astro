const config = require('../../shared/test/jest.config');

// FIXME: Use shared to throw errors for console output
config.setupFilesAfterEnv = ['./src/setupTests.js'];

module.exports = config;
