var keyMirror = require("fbjs/lib/keyMirror"),
    fetch = require("isomorphic-fetch"),
    // isomorphic-fetch need a Promise polyfill for older browsers.
    // Promise use inside of fetch, fetch should go with Promise to avoid page crashing in IE.
    Promise = require("es6-promise").Promise; // eslint-disable-line

exports.Types = keyMirror({
    SET: null,
    TOGGLE_NAVMODE: null,
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
    /*
    Prep demo file name
    Examples:
        1) ButtonBar.jsx --> ButtonBarDemo.jsx
        2) toggle/v2.jsx --> ToggleDemo.jsx
        3) form-text-field/v2.jsx --> FormTextFieldDemo.jsx
    */
    function parseDemoFile (ptd) {
        var path = ptd.replace(/(\.jsx|\.js|\/v2.jsx)/, "Demo.jsx").split("/");
        return path
            .map(function (dir, i) {
                // preps example 3 (v2 file in sub directory with dashes)
                if ((dir.indexOf("-") > -1) && (i === path.length - 1)) {
                    return dir.split("-").map(function (dirPart) {
                        return dirPart.charAt(0).toUpperCase() + dirPart.slice(1);
                    }).join("");

                // preps example 2 (v2 file in sub directory without dashes)
                } else if (path.length-1 === i) {
                    return dir.charAt(0).toUpperCase() + dir.slice(1);

                // example 1 (all others)
                } else {
                    return dir;
                }
            })
            .join("/");
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

exports.toggleNavMode = path => ({
    type: exports.Types.TOGGLE_NAVMODE,
    path,
});

exports.setActiveView = exports.set.bind(null, "activeView");
