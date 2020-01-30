const backstop = require("backstopjs");
const fetch = require("node-fetch");
const fs = require("fs");
const httpServer = require("http-server");
const webpack = require("webpack");

const backstopConfig = require("./backstopConfig");
const webpackProd = require("./webpack.prod");

const port = 8080;

const startServer = (portNumber) => {
    const server = httpServer.createServer({
        root: "./build"
    });

    server.listen(portNumber);

    return server;
};

const exitWithError = (server, e) => {
    if (server) {
        server.close();
    }
    console.error(e ? e : "An unexpected error occurred.");
    process.exitCode = 1;
};

const isApprovalRun = process.argv.includes("--approve");
const isCIRun = process.argv.includes("--ci");

const runTests = server => backstop(isApprovalRun ? "approve" : "test", {
    docker: !isCIRun })
    .then(() => {
        if (server) {
            server.close();
        }
        process.exitCode = 0;
    }) // Exit with success code
    .catch(e => exitWithError(server, e));

const packAndRunTests = () => {
    webpack(webpackProd, (err) => {
        if (err) {
            exitWithError(null, "Webpack failed to pack. Please check your configuration");
        }
        const server = startServer(port);

        fetch(`http://localhost:${port}/`)
            .then(response => {
                if (response.ok) {
                    runTests(server);
                } else {
                    exitWithError(server, "Unable to get response from started server.");
                }
            })
            .catch(e => exitWithError(server, e));
    });
};

const checkForServer = () => fetch("http://localhost:8080/")
    .then(response => {
        if (response.ok) {
            runTests();
        } else {
            exitWithError(null, "Unable to get response from running server.");
        }
    })
    .catch(() => {
        packAndRunTests();
    });


// Have to write out a backstop.json file in order to have Docker get the right config
fs.writeFileSync("backstop.json", JSON.stringify(backstopConfig(isCIRun ? "ci" : "local", port)));

if (isCIRun) {
    packAndRunTests();
} else {
    checkForServer();
}
