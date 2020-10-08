# `schema-form`

## Developing

`yarn` to install dependencies.
`yarn build:end-user` to generate the end-user source locally. Do this every time a change is made to end-user which needs to be pulled into schema forms.
`yarn start` starts a webpack dev server which performs hot reloading.

NOTE: If you get "not found" errors for components from end-user, go to the root folder, `pingux`, and run `lerna link` to get the correct symlink.

## Pre-release Publishing (pre-1.0.0)
`npm version prerelease` (yarn doesn't do the cool stuff npm does here)
`yarn dist`
`cd dist`
`npm publish`

You need to be signed in to the private npm account. This publishes to npm rather than artifactory.
