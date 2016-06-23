var Actions = require("./MultiDragActions.js"),
    deepClone = require("clone"),
    update = require("re-mutable");

var initialState = {
    columns: []
};

function filterFieldStartsWith (field, filter, item) {
    return (field ? item[field] : item).match(new RegExp("^" + filter, "i"));
}
function filterField (field, filter, item) {
    return (field ? item[field] : item).match(new RegExp(filter, "i"));
}
var filterStartsWith = filterFieldStartsWith.bind(null, null);
var filter = filterField.bind(null, null);

function getFilterFn (fieldName, str) {
    if (str.length <= 3) {
        return fieldName
            ? filterFieldStartsWith.bind(null, fieldName, str)
            : filterStartsWith.bind(null, str);
    } else {
        return fieldName
            ? filterField.bind(null, fieldName, str)
            : filter.bind(null, str);
    }
}

function escapeForRegex (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function search (state, action) {
    var filterStr = action.filter || "";
    var filterFn = getFilterFn (action.fieldName, escapeForRegex(filterStr));

    var next = update(state)
        .set(["columns", action.column, "filter"], filterStr)
        .set(["columns", action.column, "filterFieldName"], action.fieldName)
        .end();

    if (filterStr.length > 0) {
        next = update.set(next, ["columns", action.column, "filteredRows"],
            state.columns[action.column].rows.filter(filterFn));
    } else {
        next = update.set(next, ["columns", action.column, "filteredRows"],
            state.columns[action.column].rows);
    }

    return next;
}

function move (state, action) {
    var row = state.columns[action.from.column].rows[action.from.index];

    return update(state)
        .unset(["columns", action.from.column, "rows", action.from.index])
        .splice(["columns", action.to.column, "rows"], action.to.index, 0, row)
        .unset(["placeholder"]).end();
}

function init (state, action) {
    return update.set(state, ["columns"], deepClone(action.data));
}

module.exports = function (state, action) {
    var next;

    switch (action.type) {
        case Actions.Types.MULTIDRAG_SET:
            next = update.set(state, action.path, action.value);
            break;
        case Actions.Types.MULTIDRAG_MOVE:
            next = move(state, action);
            break;
        case Actions.Types.MULTIDRAG_FILTER:
            next = search(state, action);
            break;
        case Actions.Types.MULTIDRAG_INIT:
            next = init(state, action);
            break;
        case Actions.Types.MULTIDRAG_APPEND:
            next = update.concat(state, ["columns", action.column, "rows"], action.data);
            break;
        case Actions.Types.MULTIDRAG_PREPEND:
            next = update.prepend(state, ["columns", action.column, "rows"], action.data);
            break;
        default:
            return state || initialState;
    }

    //since we render based on the filteredRows property, update them after a move.  If there is
    //no filter search() will return a reference to rows
    next.columns.forEach(function (column, index) {
        next = search(next, Actions.filterField(
              column.filterFieldName,
              index,
              column.filter));
    });

    return next;
};

