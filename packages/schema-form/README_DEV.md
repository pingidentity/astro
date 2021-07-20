# `schema-form`

## Developing

`yarn` to install dependencies.
`yarn build:end-user` to generate the End User package for local development. Do this every time a change is made to end-user which needs to be pulled into schema forms.
`yarn build:astro` to generate the Astro package for local development. Do this every time a change is made to end-user which needs to be pulled into schema forms.
`yarn start` starts a webpack dev server which performs hot reloading.

NOTE: If you get "not found" errors for components from end-user, go to the root folder, `pingux`, and run `lerna link` to get the correct symlink.

## Publishing to Private NPM
This should be done as part of the Jenkins release process.

If done locally, you need to be signed in to the private npm account. This publishes to NPM rather than Artifactory.