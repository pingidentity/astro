const backstop = require("backstopjs");
const fetch = require("node-fetch");
const fs = require("fs");
const httpServer = require("http-server");
const webpack = require("webpack");

const backstopConfig = require("./backstopConfig");
const webpackProd = require("./webpack.prod");

const port = 8085;

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
const filter = process.argv.includes("--filterTests") ? process.argv[process.argv.indexOf("--filterTests") + 1] : "";

const runTests = server => backstop(
    "test",
    {
        docker: !isCIRun,
        filter: filter
    })
    .then(() => {
        if (server) {
            server.close();
        }
        process.exitCode = 0;
    }) // Exit with success code
    .catch(e => exitWithError(server, e));

const startServerAndRunTests = () => {
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
};

const packAndRunTests = () => {
    webpack({
        ...webpackProd,
        plugins: [
            ...webpackProd.plugins,
            new webpack.DefinePlugin({
                "process.env.FIX_TIME": '"yes"', // this will override components that use the current time
            }),
        ],
    }, (err) => {
        if (err) {
            exitWithError(null, "Webpack failed to pack. Please check your configuration");
        }
        startServerAndRunTests();
    });

};

// Have to write out a backstop.json file in order to have Docker get the right config
fs.writeFileSync("backstop.json", JSON.stringify(backstopConfig(isCIRun ? "ci" : "local", port)));

// Approve just promotes saved images, so there's no need to kick up a server.
if (isApprovalRun) {
    backstop("approve", { docker: true });
} else if (isCIRun) {
    // Gitlab has already packed everything, so just run the tests.
    startServerAndRunTests();
} else {
    packAndRunTests();
}
