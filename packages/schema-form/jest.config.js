const config = require('../../shared/test/jest.config.js');

config.moduleNameMapper = {
  '\\.(css|scss)$': '<rootDir>/src/styles/__mocks__/styleMock.js',
};

module.exports = config;
