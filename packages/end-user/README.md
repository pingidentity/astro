This project provides static HTML and CSS to build end-user pages.

#### Install

You can install the module from Ping's Artifactory.

```
yarn add @pingux/end-user
```

The module consists of a `package.json` file and `end-user.css` + assets at the root. The source `css` folder is also included.

#### Demo Site

You can see the styles in action with code examples at http://uilibrary.ping-eng.com/end-user/

#### Scripts

You can also pull down the repo and view the catalog of components locally by running the server.
```
yarn
yarn start
```

or

```
npm i
npm run start
```

Then you can see demos at these urls:
```
localhost:4040
localhost:4040/mfa.html
localhost:4040/signon.html
localhost:4040/branded.html
localhost:4040/changepw.html
localhost:4040/signingon.html
```

#### Release Process (for UX devs)

Once the latest changes you want to release are in `master`:

1. Go to the Jenkins Ice Cream
2. Click `End_user-release_Pipeline`
3. Click `Build with Paramaters`
4. Set your properties
5. Click Build