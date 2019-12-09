# PingUX

[![pipeline status](https://gitlab.corp.pingidentity.com/ux/pingux/badges/master/pipeline.svg)](https://gitlab.corp.pingidentity.com/ux/pingux/commits/master)

This is the PingUX monorepo. 📦

Currently, it's used to manage both the `ui-library` (`admin`) and the `end-user` library.

## Install 

To get rolling with PingUX, first clone down the repository, make sure Lerna is installed, and run `lerna bootstrap` in the root directory.

## Developing

Each package's respective npm/yarn commands can be run out of their folder under `packages/`. Just cd into the package you want to work with and run the npm/yarn commands like normal.

## Testing

To run test for all the packages, you can just do `lerna run test` and it'll walk through `packages/` and run the test commands for each package.