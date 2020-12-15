const main = require('../../../shared/storybook/v6/main');

// NOTE: Emotion css prop does not get transpiled correctly unless this is specified locally
main.webpackFinal = async (config) => {
  const rules = config.module.rules;
  
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
    // Emotion preset must run BEFORE reacts preset to properly convert css-prop.
    // Babel preset-ordering runs reversed (from last to first). Emotion has to be after React preset.
    require.resolve('@emotion/babel-preset-css-prop'),
  ];

  rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
  });

  return config;
};

module.exports = main;
