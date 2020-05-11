const fetch = require("node-fetch");
const fs = require("fs");
const moment = require("moment");

const parseIssue = ({
    key,
    fields: {
        summary
    }
}) => `- [${key} ${summary}](https://jira.pingidentity.com/browse/${key})`;

const version = process.argv[2];
const userPass = process.argv[3];

if (version === undefined || version.length < 1) {
    console.log("Please supply a version number");
    return;
}

if (userPass === undefined) {
    console.log("Please supply a username:password");
}

const params = `project = "UIP" AND fixversion =  ${version} AND status = "Ready for Release" `;
const requestUri = `https://jira.pingidentity.com/rest/api/2/search?jql=${encodeURIComponent(params)}`;

function addNotesToDoc(v, p) {
    const notePath = "./src/demo/components/docs/notes.json";
    const previousNotes = require(`${notePath}`);

    const noteTemplate = {
        title: `v${v}`,
        date: moment().format("MM/DD/YY"),
        file: `./release-notes/${p}`
    };

    const newNotes = [noteTemplate, ...previousNotes];


    fs.writeFile(
        notePath,
        JSON.stringify(newNotes, null, 4),
        err => err ? console.log("Could not write to file: ", err) : console.log(`${notePath} write success`)
    );
}

fetch(requestUri, {
    method: "GET",
    headers: {
        Authorization: `Basic ${Buffer(userPass).toString("base64")}`,
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
        const fileName = `v${parsedVersion}.md`;
        const path = `src/demo/components/docs/release-notes/${fileName}`;

        if (fs.existsSync(path)) {
            console.log(`File ${path} already exists. Please delete the file before continuing.`);
            return;
        }

        fs.writeFile(
            path,
            content,
            err => err ? console.log("Could not write to file: ", err) : console.log(`${path} write success`)
        );

        addNotesToDoc(version, fileName);
    })
    .catch(err => console.log(err));
