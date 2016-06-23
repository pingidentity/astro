#!/usr/bin/env bash

path="./node_modules/ui-library"

./clean-ui-lib.js;

mkdir -p ./src/ui-lib-assets
cp -R $path/src/css ./src/ui-lib-assets/css
cp -R $path/src/fonts ./src/ui-lib-assets/fonts
cp -R $path/src/images ./src/ui-lib-assets/images