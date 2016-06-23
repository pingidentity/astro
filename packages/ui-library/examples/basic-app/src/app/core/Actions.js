var keyMirror = require("fbjs/lib/keyMirror");

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
