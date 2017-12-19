var keyMirror = require("fbjs/lib/keyMirror"),
    fetch = require("isomorphic-fetch"),
    // isomorphic-fetch need a Promise polyfill for older browsers.
    // Promise use inside of fetch, fetch should go with Promise to avoid page crashing in IE.
    Promise = require("es6-promise").Promise; // eslint-disable-line

exports.Types = keyMirror({
    SET: null
});

exports.set = function (path, value) {
    return {
        type: exports.Types.SET,
        path: path,
        value: value
    };
};

exports.receiveCode = function (id, markup) {
    return function (dispatch) {
        dispatch(exports.set(["code", id], markup));
    };
};

exports.fetchCode = function (id, pathToDoc) {

    // remove any directory dashes and capitalize the first letter of each word so that it can generate the Demo file
    // ButtonBar.jsx --> ButtonBarDemo.jsx
    // form-text-field/v2.jsx --> FormTextFieldDemo.jsx
    function parseDemoFile (ptd) {
        var path = ptd.split("/").map(function (word) {
            if (word.indexOf("-") > -1) {
                return word.split("-").map(function (wordPart) {
                    return wordPart.charAt(0).toUpperCase() + wordPart.slice(1);
                }).join("");
            } else {
                return word;
            }
        }).join("/");
        return path.replace(/(\.jsx|\.js|\/v2.jsx)/, "Demo.jsx");
    }

    return function (dispatch) {
        fetch("src/demo/" + parseDemoFile(pathToDoc))
            .then(function (resp) {
                return resp.text();
            })
            .then(function (text) {
                dispatch(exports.receiveCode(id, text));
            }.bind(this));
    };
};

exports.setActiveView = exports.set.bind(null, "activeView");
