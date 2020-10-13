const config = require('../../shared/test/jest.config.js');

module.exports = {
    ...config,
    coveragePathIgnorePatterns: [
        ...config.coveragePathIgnorePatterns,
        '/styles/',
    ],
};
