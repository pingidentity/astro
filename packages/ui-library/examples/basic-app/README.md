Ping Basic UI library App
==========
A basic Ping application using the UI Library.



Prerequisites
-------------
* node version >= 3.7.x: https://nodejs.org/en/download/releases/
* Fix the npm permissions, as described here under Option 1:
https://docs.npmjs.com/getting-started/fixing-npm-permissions
* npm version >= 3.7.x: `$ npm install -g npm@3.7.x` or above
* eslint v1.10.3 (only if you have eslint installed globally):
`$ npm install -g eslint@1.10.3`

To verify if a package is installed globally, run:
`$ npm list -g package-name`



Resources
---------
See the UI Library demo app "Sample Application" tutorial for a step-by-step description on building this app.



Running the app
-------------------
Run
`npm install && npm run start`
and open http://localhost:8081/index.html in the browser.



Verifying the local changes
---------------------------
`npm run lint`
runs the linting



Building the UI library
-----------------------
The JS documentation is generated using `npm run doc`.
See the *scripts* section in package.json for more options.

