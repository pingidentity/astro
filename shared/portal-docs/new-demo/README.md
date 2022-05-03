# Overview
This doc covers how to upload a new Storybook demo to [our internal portal](https://uilibrary.ping-eng.com/). You're welcome!

**NOTE: Be careful when touching contents on the server. No one wants to be \*that person\* who deletes an entire server's contents by accident.**

# Configuration
The steps below outline how to configure the release files for the initial upload.

1. Create a new branch and switch to it.
2. Copy `hosting/*` and `Makefile` to the package which needs to be uploaded.
3. In the copied files from the above step, find and replace all instances of `<pkg>` with the new package name. This must match the name of the package directory within the monorepo.
4. Copy `Jenkinsfile.ping-eng.sample` to the root of the `pingux` monorepo and rename it to `Jenkinsfile.general.release`, overwriting the existing file there.
5. Add and commit these changes, then push the new branch to the remote.

# Running the Release Script
This section covers how to run the actual release script to handle the initial upload.

1. Open the Jenkins UI for [the existing release pipeline](https://jenkins-icecream.pingdev.tools/job/devtools-controlled-pipelines/job/PingOne/job/UI-Library/job/generic-release/).
2. Click on _Build with Parameters_ and update the _RELEASE\_BRANCH_ parameter to the name of the newly created branch.
3. Click the _Build_ button on this page.

If it succeeded, **that's it!** The branch may now be deleted.

If it failed, see below for debugging tips.

# Debugging
If an error causes the script to fail, here are some tips to navigate the problem.

- Ensure the package name is correct
- If any script was updated, check that the commands are valid
- There are two file locations that need to be addressed when editing the `Makefile`. The "local" files which are created as part of the pipeline and the "server" files which exist on the remote web server. Every command for the server needs to run as part of an `ssh`, `scp`, or similar remote connection command. If concatenating a complex command with `>>`, `&&`, etc. then the whole command needs to be wrapped in quotes.