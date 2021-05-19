const config = require('../../shared/test/jest.config.js');

config.moduleNameMapper = {
  '\\.(css|scss)$': '<rootDir>/src/styles/__mocks__/styleMock.js',
};

config.snapshotSerializers = ['@emotion/jest/serializer'];

module.exports = config;
