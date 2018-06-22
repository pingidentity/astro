import update from "re-mutable";
import _ from "underscore";
import { userList } from "./data";
import actions from "./Actions";

const initialState = {
    users: userList,
    filters: {
        "population": [],
        "status": [],
        "pwStatus": [],
    },
    customFilters: [ {} ],
    appliedCustomFilters: [],
    customFiltersCondition: "All",
    search: "",
    firstRecord: 0,
    showFilters: false,
};

module.exports = function (state = initialState, action) {
    switch (action.type) {
        case actions.SET_FILTER:
            return update.set(state, ["filters", action.name], action.values);
        case actions.SET_SEARCH:
            return update.set(state, ["search"], action.search);
        case actions.ADD_FILTER: {
            const { customFilters } = state;

            if (customFilters.length < 1 || customFilters[customFilters.length - 1].type) {
                return update.push(state, ["customFilters"], { type: action.name, operator: "=" });
            }

            return state;
        }
        case actions.REMOVE_FILTER: {
            const { customFilters } = state;
            const { index } = action;

            if (state.customFilters.length > 1) {
                return update.set(
                    state,
                    ["customFilters"],
                    customFilters.slice(0, index).concat(customFilters.slice(index + 1))
                );
            } else {
                return update.set(state, ["customFilters"], [{ operator: "=" }]);
            }
        }
        case actions.UPDATE_FILTER:
            const filter = state.customFilters[action.index];
            return update.set(state, ["customFilters", action.index], _.defaults(action.update, filter));
        case actions.APPLY_FILTERS:
            return update.set(state, ["appliedCustomFilters"], state.customFilters);
        case actions.CLEAR_FILTERS:
            return update(state).set(["customFilters"], [{}]).set(["appliedCustomFilters"], [])
                .set(["filters", "population"], [])
                    .set(["filters", "status"], [])
                        .set(["filters", "pwStatus"], []).end();
        case actions.SET_FIRST:
            return update.set(state, ["firstRecord"], action.first);
        case actions.MOVE_FIRST:
            return update.set(state, ["firstRecord"], state.firstRecord + action.offset);
        case actions.TOGGLE_FILTERS:
            return update.set(state, ["showFilters"], !state.showFilters);
        case actions.SET_CUSTOM_FILTERS_CONDITION:
            return update.set(state, ["customFiltersCondition"], action.condition);
    }

    return state;
};
