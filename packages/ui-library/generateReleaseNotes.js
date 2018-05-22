const fetch = require("node-fetch");
const fs = require("fs");

const parseIssue = ({
    key,
    fields: {
        summary
    }
}) => `- [${key} ${summary}](https://jira.pingidentity.com/browse/${key})`;

const version = process.argv[2];
const user = process.argv[3];
const pass = process.argv[4];

if (version === undefined || version.length < 1) {
    console.log("Please supply a version number");
    return;
}

if (user === undefined || pass === undefined) {
    console.log("Please supply a username and password");
}

const requestUri = `https://jira.pingidentity.com/rest/api/2/search?jql=project=UIP%20and%20fixversion=${version}%20and%20status=closed`;

fetch(requestUri, {
    method: "GET",
    headers: {
        Authorization: `Basic ${Buffer(user + ":" + pass).toString("base64")}`,
        "Content-Type": "application/json"
    }
})
.then(data => data.json())
.then(({ issues }) => {
    if (issues === undefined || issues.length < 1) {
        console.log(`No issues found matching the version number you entered, "${version}".`);
        return;
    }

    const content =
        issues
        .map(parseIssue)
        .sort((a, b) => a > b ? 1 : -1)
        .join("\r\n");

    const parsedVersion = version.split(".").join("-");
    const path = `src/demo/components/docs/release-notes/v${parsedVersion}.md`;

    if (fs.existsSync(path)) {
        console.log(`File ${path} already exists. Please delete the file before continuing.`);
        return;
    }

    fs.writeFile(
        path,
        content,
        err => console.log("Could not write to file: ", err)
    );
})
.catch(err => console.log(err));