const backstop = require("backstopjs");
const backstopConfig = require("./backstopConfig");
const fetch = require("node-fetch");
const fs = require("fs");

const isApprovalRun = process.argv.includes("--approve");

// Have to write out a backstop.json file in order to have Docker get the right config
fs.writeFileSync("backstop.json", JSON.stringify(backstopConfig));

fetch("http://localhost:8085/")
    .then(response => {
        if (response.ok) {
            backstop(isApprovalRun ? "approve" : "test", { docker: true, config: backstopConfig })
                .then(() => console.log("Backstop tests passed!"));
        }
    });
