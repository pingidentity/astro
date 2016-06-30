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
    return function (dispatch) {
        fetch("src/demo/" + pathToDoc.replace(/(\.jsx|\.js)/, "Demo.jsx"))
            .then(function (resp) {
                return resp.text();
            })
            .then(function (text) {
                dispatch(exports.receiveCode(id, text));
            }.bind(this));
    };
};

exports.setActiveView = exports.set.bind(null, "activeView");
