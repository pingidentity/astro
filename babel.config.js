module.exports = api => {
  const config = {
    "presets": [
      [
        "@babel/preset-env",
        {
          "modules": "commonjs"
        }
      ],
      "@babel/preset-react",
      "@emotion/babel-preset-css-prop"
    ],
    "plugins": [
      "@babel/plugin-proposal-class-properties",
      [
        "transform-es2015-spread",
        {
          "loose": true
        }
      ],
      [
        "add-module-exports",
        {
          "addDefaultProperty": true
        }
      ],
    ]
  };

  // @babel/plugin-transform-runtime interferes with jest.useFakeTimers()
  if (!api.env("test")) {
      config.plugins.push([
        "@babel/plugin-transform-runtime",
        {
          "corejs": 3
        }
      ]);
  }

  return config;
};
