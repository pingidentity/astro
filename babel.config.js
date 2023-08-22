const presets = [
  [
    '@babel/preset-env',
    {
      'modules': process.env.BABEL_ENV === 'esm' ? false : 'commonjs',
    },
  ],
  '@babel/preset-react',
  '@babel/preset-typescript',
  '@emotion/babel-preset-css-prop',
];

const plugins = [
  [
    '@babel/plugin-transform-spread',
    {
      'loose': true,
    },
  ],
];

module.exports = {
  presets,
  plugins,
  env: {
    cjs: {
      plugins: [...plugins, ['@babel/plugin-transform-runtime', { corejs: 3 }]],
    },
    esm: {
      plugins: [...plugins, ['@babel/plugin-transform-runtime', { corejs: 3, useESModules: true }]],
    },
  },
};
