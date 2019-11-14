const backstop = require("backstopjs");
const backstopConfig = require("./backstopConfig");
const fetch = require("node-fetch");
const fs = require("fs");

const isApprovalRun = process.argv.includes("--approve");
const isCIRun = process.argv.includes("--ci");

// Have to write out a backstop.json file in order to have Docker get the right config
fs.writeFileSync("backstop.json", JSON.stringify(backstopConfig(isCIRun ? "ci" : "local")));

fetch("http://localhost:8085/")
    .then(response => {
        if (response.ok) {
            backstop(isApprovalRun ? "approve" : "test", {
                docker: !isCIRun })
                .then(() => console.log("Backstop tests passed!"));
        }
    });
