# PingUX

[![pipeline status](https://gitlab.corp.pingidentity.com/ux/pingux/badges/master/pipeline.svg)](https://gitlab.corp.pingidentity.com/ux/pingux/commits/master)

This is the PingUX monorepo. 📦

Packages:
- Astro (`@pingux/astro` - [Demo](https://uilibrary.ping-eng.com/astro))
- Branding Themes (`@pingux/branding-themes`)
- Charting (`@pingux/charting`)
- End-User (`@pingux/end-user` - [Demo](https://ux.ping-eng.com/end-user/0.36.1))
- Flow Diagram (`@pingux/flow-diagram` - [Demo](https://ux.ping-eng.com/flow-diagram))
- Icons (`@pingux/icons`)
- Schema Form (`@pingux/schema-form`)
- UI Library (`ui-library` - [Demo](https://uilibrary.ping-eng.com/latest))

## Install

To get rolling with PingUX, first clone down the repository, make sure Lerna is installed, and run `lerna bootstrap` in the root directory. The monorepo works well with `node@10`.

## Developing

Each package's respective npm/yarn commands can be run out of their folder under `packages/`. Just navigate into the package you want to work with and run the yarn commands like normal.

## Testing

Commands can be run from each respective package's directory _or_ the top level if prefixed with `lerna` instead of `yarn`.

Testing: `yarn run test`

Coverage: `yarn run coverage`

Linting: `yarn run lint`

## Deployment

We use a single Jenkins pipeline for deployments of all of the packages in the monorepo. You can see it [here](https://jenkins-icecream.pingdev.tools/job/devtools-controlled-pipelines/job/PingOne/job/UI-Library/job/generic-release/).