var Actions = require("./GridActions.js"),
    update = require("re-mutable"),
    clone = require("clone");

var initialState = {};

function set (state, action) {
    return update.set(state, action.path, action.value);
}

function toggleRow (state, action) {
    var expanded = !state[action.id].rows[action.index].expanded;
    return update.set(state, [action.id, "rows", action.index, "expanded"], expanded);
}

function init (state, action) {
    return update.set(state, [action.id], clone(action.data));
}

function setAll (state, action) {
    var chain = update(state);

    state[action.id].rows.forEach(function (row, index) {
        chain = chain.set([action.id, "rows", index, action.fieldName], action.value);
    });

    return chain.end();
}

function setPagination (state, action) {
    return update(state)
        .set([action.id, "firstColumn"], action.firstColumn)
        .set([action.id, "lastColumn"], action.lastColumn)
        .set([action.id, "currentPage"], action.currentPage)
        .end();
}

var reducer = function (state, action) {
    switch (action.type) {
        case Actions.Types.GRID_SET_PAGINATION:
            return setPagination(state, action);
        case Actions.Types.GRID_SET:
            return set(state, action);
        case Actions.Types.GRID_TOGGLE_ROW:
            return toggleRow(state, action);
        case Actions.Types.GRID_INIT:
            return init(state, action);
        case Actions.Types.GRID_SET_ALL:
            return setAll(state, action);
        default:
            return state || initialState;
    }
};

module.exports = reducer;
