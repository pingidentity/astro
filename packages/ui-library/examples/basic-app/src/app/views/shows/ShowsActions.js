var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    SHOWS_SET: null,
    SHOWS_FILTER: null,
    SHOWS_ADD: null,
    SHOWS_ADD_WIZARD_RESET: null,
    SHOWS_EDIT: null,
    SHOWS_EDIT_SAVE: null,
    SHOWS_EDIT_CANCEL: null
});

exports.set = function (path, value) {
    return {
        type: exports.Types.SHOWS_SET,
        path: path,
        value: value
    };
};

exports.setFilter = function (name, value) {
    return {
        type: exports.Types.SHOWS_FILTER,
        name: name,
        value: value
    };
};

/*
* This is where an API call should be made to the server to add the show.
* Then a separate action should be dispatched when API call to server is done to update the state.
* But we don't have a server so just dispatch this action to update state with the show.
*/
exports.add = function (title, genres, status, summary) {
    return {
        type: exports.Types.SHOWS_ADD,
        title: title,
        genres: genres,
        status: status,
        summary: summary
    };
};

exports.addReset = function () {
    return {
        type: exports.Types.SHOWS_ADD_WIZARD_RESET
    };
};

exports.edit = function (id) {
    return {
        type: exports.Types.SHOWS_EDIT,
        id: id
    };
};

/*
* This is where an API call should be made to the server to edit the show.
* Then a separate action should be dispatched when API call to server is done to update the state.
* But we don't have a server so just dispatch this action to update state with the edited show.
*/
exports.saveEdit = function (id, title, genres, status, summary) {
    return {
        type: exports.Types.SHOWS_EDIT_SAVE,
        id: id,
        title: title,
        genres: genres,
        status: status,
        summary: summary
    };
};

exports.cancelEdit = function () {
    return {
        type: exports.Types.SHOWS_EDIT_CANCEL
    };
};

exports.setActiveTab = exports.set.bind(null, "activeTab");
exports.setExpandedSearch = exports.set.bind(null, "advancedSearch");
exports.setPosition = exports.set.bind(null, "position");
