import { omit } from "underscore";

export const actions = {
    CHANGE: "CHANGE",
    DISCARD: "DISCARD",
    SAVE: "SAVE",
};

export const change = (key, value) => ({
    type: actions.CHANGE,
    key, value,
});

export const discard = { type: actions.DISCARD };

export const save = { type: actions.SAVE };

export const isDirty = state => Object.keys(state).reduce((result, key) => {
    if (!result && !(/\_/.test(key)) && state._saved) {
        return state[key] !== state._saved[key];
    }
    return result;
}, false);

export const getRecord = state => omit(state, "_saved");

const editForm = (state, action) => {
    switch (action.type) {
        case actions.CHANGE: return {
            ...state,
            [action.key]: action.value,
            _saved: state._saved || state,
        };
        case actions.DISCARD: return state._saved ? {
            ...state._saved,
        } : state;
        case actions.SAVE: return omit(state, "_saved");
    }

    return state;
};

export default editForm;
