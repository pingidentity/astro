const backstop = require("backstopjs");
const backstopConfig = require("./backstopConfig");
const fetch = require("node-fetch");

const isApprovalRun = process.argv.includes("--approve");

fetch("http://localhost:8085/")
    .then(response => {
        if (response.ok) {
            backstop(isApprovalRun ? "approve" : "test", { config: backstopConfig })
                .then(() => console.log("Backstop tests passed!"));
        }
    });
//.catch((err) => throw new Error("Could not get response from server at localhost:8082; error ", err));
