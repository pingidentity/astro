/** This file will house common utility functions for use with Redux */

/** @function setAtPath
 * @desc this is a function that can be used to reduce redux boilerplate, especially on pages
 * with forms since most of what is done is setting values.  Using this function, you can create
 * on action to set a key/value, and ultimately call this function.  Then create a bunch of partials
 * to set each individual field
 * @param {object} state - The state object to modify
 * @param {string} path - The path to place the value
 * @param {object} val - The value
 * @example
 * var state = {};
 * setAtPath(state, 'path.to.val', 123);
 * console.log(state); //=> {path: {to: {val: 123} } }
 */
exports.setAtPath = function (state, path, val) {
    var parts = path.split(".");

    for (var i = 0; i < parts.length - 1; i += 1) {
        switch (typeof(state[parts[i]])) {
            case "undefined":
                state[parts[i]] = {};
                break;
            case "object":
                //this is okay
                break;
            default:
                console.warn("trying to set sub-state on non-object");
                break;
        }

        state = state[parts[i]];
    }

    state[parts[parts.length - 1]] = val;
};
