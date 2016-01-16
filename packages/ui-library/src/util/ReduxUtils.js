/** This file will house common utility functions for use with Redux */
var _ = require("underscore");

/** @function setAtPath
 * @desc this is a function that can be used to reduce redux boilerplate, especially on pages
 * with forms since most of what is done is setting values.  Using this function, you can create
 * on action to set a key/value, and ultimately call this function.  Then create a bunch of partials
 * to set each individual field
 * @param {object} state - The state object to modify
 * @param {string} path - The path to place the value
 * @param {object} val - The value
 * @returns {object} the object that was passed in
 * @example
 * var state = {};
 * setAtPath(state, "path.to.val", 123);
 * console.log(state); //=> {path: {to: {val: 123} } }
 */
exports.setAtPath = function (state, path, val) {
    var parts = path.split(".");
    var original = state;

    state.dirty = true;

    for (var i = 0; i < parts.length - 1; i += 1) {
        switch (typeof(state[parts[i]])) {
            case "undefined":
                state[parts[i]] = {};
                break;
            case "object":
                state[parts[i]] = _.clone(state[parts[i]]);
                break;
            default:
                console.warn("trying to set sub-state on non-object");
                return;
        }

        state = state[parts[i]];
    }

    state[parts[parts.length - 1]] = val;

    return original;
};

/** @function rollback
 * @desc On a page with save/discard, we will want to keep a snapshot of the last saved state to revert to when clicking
 * discard.  This simple function will reload the snapshot without overwriting variables which didnt exist at the time
 * of the snapshot.  Also, the dirty bit will be reset.
 * @param {object} state - The _next_ state (it will be mutated)
 */
exports.rollback = function (state) {
    for (var k in state.snapshot) {
        state[k] = state.snapshot[k];
    }
    state.dirty = false;
};

/** @function commit
 * @desc Will set the snapshot property of the state to a clone of the state itself.  The dirty bit will also be reset
 * @param {object} state - The _next_ state (it will be mutated)
 */
exports.commit = function (state) {
    state.snapshot = _.omit(_.clone(state), "snapshot");
    state.dirty = false;
};
