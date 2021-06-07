const {utils: {getPackages}} = require('@commitlint/config-lerna-scopes');

module.exports = {
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-lerna-scopes"
  ],
  rules: {
    'scope-enum': async ctx =>
      [2, 'always', [...(await getPackages(ctx)),
        // Insert custom scopes below:
        'release'
      ]],
    'subject-case': [0],
    'header-case': [0],
    'body-case': [0]
   },
  ignores: [
    (message) => {
      const regex = new RegExp(/^(WIP|\[WIP\]).*/);
      return regex.test(message);
    }
  ]
};
