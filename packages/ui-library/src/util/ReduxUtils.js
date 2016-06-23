var _ = require("underscore");

/**
 * @module util/ReduxUtils
 * @desc The module contains common utility functions for use with Redux
 */

/**
 * @function resolveAndClone
 * @private
 * @desc this function will go to the specified path in the passed in object, cloning
 * all parts along the path.
 * @param {object} state - the state to traverse
 * @param {string[]} parts - an array of keys to traverse
 * @returns {object} - The object found at the given path
 */
function resolveAndClone (state, parts) {
    for (var i = 0; i < parts.length - 1; i += 1) {
        switch (typeof(state[parts[i]])) {
            case "undefined":
                state[parts[i]] = {};
                break;
            case "object":
                state[parts[i]] = _.clone(state[parts[i]]);
                break;
            default:
                throw "trying to set sub-state on non-object";
        }

        state = state[parts[i]];
    }

    return state;
}

//NOTE: The setAtPath, deleteAtPath and pushAtPath could all be accomplished by using React Additions' update
//function but a) the additions are now deprecated and b) they require rebuilding the entire data structure
//to describe the path to update which introduces the overhead.

/**
 * @function setAtPath
 * @desc this is a function that can be used to reduce redux boilerplate, especially on pages
 * with forms since most of what is done is setting values.  Using this function, you can create
 * on action to set a key/value, and ultimately call this function.  Then create a bunch of partials
 * to set each individual field
 * @param {object} state - The state object to modify
 * @param {string|string[]} path - The path to place the value.  This can be period separated string or an
 * array if the keys contain a period.
 * @param {object} val - The value
 * @param {object} opts - Options
 * @param {bool} [opts.setDirty=true] - indicates whether the dirty flag should be set
 * @returns {object} the object that was passed in
 * @example
 * var state = {};
 * setAtPath(state, "path.to.val", 123);
 * console.log(state); //=> {path: {to: {val: 123} } }
 */
exports.setAtPath = function (state, path, val, opts) {
    var parts = _.isArray(path) ? path : path.split(".");
    var tip = resolveAndClone(state, parts);
    var lastKey = parts[parts.length - 1];

    if (!opts || opts.setDirty !== false) {
        state.dirty = true;
    }

    if (typeof(val) === "undefined") {
        if (_.isArray(tip)) {
            tip.splice(lastKey, 1);
        } else {
            delete tip[lastKey];
        }
    } else {
        tip[parts[parts.length - 1]] = val;
    }

    return state;
};

/**
 * @function deleteAtPath
 * @desc this is another function to reduce redux boilerplate for deleting a branch of the store at the given path
 * @param {object} state - The state
 * @param {string|string[]} path - The path to the key to delete
 * @returns {object} the object that was passed in
 */
exports.deleteAtPath = function (state, path) {
    return exports.setAtPath(state, path);
};

/**
 * @function pushAtPath
 * @desc this is yet another function to reduce redux boilerplate for pushing values to an array at the given path
 * @param {object} state - The state
 * @param {string|string[]} path - The path to the key
 * @param {string|number|object} val - The value to push at the given path
 * @param {object} opts - Options
 * @param {bool} [opts.setDirty=true] - indicates whether the dirty flag should be set
 * @returns {object} the object that was passed in
 */
exports.pushAtPath = function (state, path, val, opts) {
    var parts = _.isArray(path) ? path : path.split(".");
    var tip = resolveAndClone(state, parts);

    if (!opts || opts.setDirty !== false) {
        state.dirty = true;
    }

    tip[parts[parts.length - 1]] = _.clone(tip[parts[parts.length - 1]]);
    tip[parts[parts.length - 1]].push(val);

    return state;
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
    exports.commit(state);
};

/** @function commit
 * @desc Will set the snapshot property of the state to a clone of the state itself.  The dirty bit will also be reset
 * @param {object} state - The _next_ state (it will be mutated)
 */
exports.commit = function (state) {
    state.snapshot = _.omit(_.clone(state), "snapshot");
    state.dirty = false;
};
