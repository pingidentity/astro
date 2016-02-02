UI library
==========
A library made of reusable React components, util functions and static assets
(e.g. CSS).



Prerequisites
-------------
* node v0.10.35: https://nodejs.org/en/download/releases/
* Fix the npm permissions, as described here under Option 1:
https://docs.npmjs.com/getting-started/fixing-npm-permissions
* npm v2.7.0: `$ npm install -g npm@2.7.0`
* eslint v1.6.0 (only if you have eslint installed globally):
`$ npm install -g eslint@1.6.0`
* jest-cli v0.4.19 (only if you have eslint installed globally):
`$ npm install -g jest-cli@0.4.19`

To verify if a package is installed globally, run:
`$ npm list -g package-name`



Resources
---------
See this Confluence page
(https://docs.corp.pingidentity.com/display/ID/UI+library) for details on
various topics:
* how to contribute to the library
* how to integrate the library into other npm based projects
* how to build/release the library



Running the library
-------------------
Run
`npm install && npm run start`
and open http://localhost:8080/index.html in the browser.



Verifying the local changes
---------------------------
`npm run verify`
runs the linting and the testing using the global node/npm installation.

`make verify`
runs the build (just like on the build machine); it downloads node and npm
locally, installs the required node modules, and runs the linting and testing.



TODO
----

* configure jest for code coverage w/ istanbul:
https://facebook.github.io/jest/docs/api.html#config-collectcoverage-boolean
* enforce the code coverage in Jenkins

* include the main/demo file content into the index page
* include the relevant code from demo into the index page



References
----------
* http://learnjs.io/blog/2014/01/20/rework-npm-myth-clean-css/
* https://www.npmjs.com/package/npm-css

* https://github.com/petehunt/webpack-howto
* https://github.com/shanewilson/react-webpack-example
* http://simonsmith.io/using-webpack-to-build-react-components-and-their-assets/
* http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html

* http://blog.siftscience.com/blog/2015/best-practices-for-building-large-react-applications

* https://docs.npmjs.com/misc/scripts
* http://krasimirtsonev.com/blog/article/Fun-playing-with-npm-dependencies-and-postinstall-script

