const config = require('../../shared/babel.config');

module.exports = {
    ...config,
    plugins: [
        ...config.plugins,
        [
            '@babel/plugin-proposal-class-properties',
            {
                'loose': true,
            },
        ],
    ],
};
