var keyMirror = require("fbjs/lib/keyMirror");

const types = keyMirror({
    SET_FILTER: null,
    SET_SEARCH: null,
    ADD_FILTER: null,
    UPDATE_FILTER: null,
    REMOVE_FILTER: null,
    APPLY_FILTERS: null,
    CLEAR_FILTERS: null,
    SET_FIRST: null,
    MOVE_FIRST: null,
    TOGGLE_FILTERS: null,
    SET_CUSTOM_FILTERS_CONDITION: null,
});

export const setFilter = function (name, values) {
    return {
        type: types.SET_FILTER,
        name, values
    };
};

export const setSearch = function (search) {
    return {
        type: types.SET_SEARCH,
        search
    };
};

export const addFilter = function (name) {
    return {
        type: types.ADD_FILTER,
        name
    };
};

export const updateFilter = function (index, update) {
    return {
        type: types.UPDATE_FILTER,
        index, update
    };
};

export const removeFilter = function (index) {
    return {
        type: types.REMOVE_FILTER,
        index
    };
};

export const applyFilters = function() {
    return { type: types.APPLY_FILTERS };
};

export const clearFilters = () => ({ type: types.CLEAR_FILTERS });

export const setFirst = function(first) {
    return {
        type: types.SET_FILTER,
        first
    };
};

export const moveFirst = function(offset) {
    return {
        type: types.MOVE_FIRST,
        offset
    };
};

export const toggleFilters = () => ({ type: types.TOGGLE_FILTERS });

export const setCustomFiltersCondition = condition => ({
    type: types.SET_CUSTOM_FILTERS_CONDITION,
    condition
});

export default types;