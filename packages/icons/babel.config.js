const presets = [
    [
        '@babel/preset-env',
        {
            'modules': process.env.BABEL_ENV === 'esm' ?  false : 'commonjs'
        },
    ],
    '@babel/preset-react'
];

const plugins = [
    [
        '@babel/plugin-transform-spread',
        {
            'loose': true
        }
    ],
];

module.exports = {
    presets: presets,
    plugins: plugins,
    env: {
        cjs: {
            plugins: [...plugins, ['@babel/plugin-transform-runtime']],
        },
        esm: {
            plugins: [...plugins, ['@babel/plugin-transform-runtime', { useESModules: true}]]
        }
    }

}
