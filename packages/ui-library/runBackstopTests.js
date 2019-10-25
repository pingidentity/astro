const backstop = require("backstopjs");
const backstopConfig = require("./backstopConfig");
const fetch = require("node-fetch");

fetch("http://localhost:8080/")
    .then(response => {
        if (response.ok) {
            backstop("test", { config: backstopConfig })
                .then(() => console.log("Backstop tests passed!"));
        }
    })
    .catch((err) => throw new Error("Could not get response from server at localhost:8080; error ", err));
