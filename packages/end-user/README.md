This project provides static HTML and CSS to build end-user pages.

#### Install

You can install the module from Ping's Artifactory.

```
npm i @pingux/end-user
```

The module consists of a `package.json` file and `end-user.css` + assets at the root. The source `css` folder is also included.

#### Demo Site

You can see the styles in action with code examples at http://uilibrary.ping-eng.com/end-user/

#### Scripts

You can also pull down the repo and view the catalog of components locally by running the server.
```
yarn
yarn server
```

or

```
npm i
npm run server
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

1. `git fetch`, `git checkout master`, and `git pull` to make sure you've got the latest code.
2. Update the version number in `package.json` (in the root folder)
3. `npm run build` to produce the distributable code
4. `cd dist` (Publishing from the root folder won't work)
5. `npm login` with your corp credentials
6. `npm publish`

One way to confirm your release was good is to look at the archive that is generated. You can do that by using `npm show @pingux/end-user dist.tarball` and then downloading from the URL that command shows you.

### Test

Test