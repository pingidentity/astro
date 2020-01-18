import editForm, { actions as formActions, getRecord } from "./editForm";
import { pick, uniq } from "underscore";

export const actions = {
    NEXT: "NEXT",
    MOVE: "MOVE",
};

const putKeysInStep = (steps, index, keys) => {
    let newSteps = steps;
    while (newSteps.length <= index) {
        newSteps = [...newSteps, []];
    }

    return [
        ...newSteps.slice(0, index),
        uniq([...newSteps[index], ...keys]),
        ...newSteps.slice(index + 1),
    ];
};

const moveStep = ({ form, data, steps, active, ...state }, newStep) => ({
    ...state,
    steps: putKeysInStep(steps, active, Object.keys(form)),
    active: newStep,
    form: pick(data, steps[newStep]),
    data: { ...data, ...form, _saved: undefined }
});

export const populateSteps = (record, schema) => schema.map(
    step => step.reduce((data, field) => ({
        ...data,
        [field]: record[field],
    }), {})
);

export const wizardNext = { type: actions.NEXT };
export const wizardMove = step => ({ type: actions.MOVE, step });

export const emptyWizard = { steps: [], active: 0, form: {}, data: {} };

const wizard = (state = emptyWizard, action) => {
    switch (action.type) {
        case actions.NEXT: return moveStep(state, state.active + 1);
        case actions.MOVE: return moveStep(state, action.step);
        case formActions.SAVE: return {
            ...state,
            steps: [
                ...state.steps.slice(0, state.active),
                getRecord(state.form),
                ...state.steps.slice(state.active + 1),
            ],
            form: editForm(state.form, action),
        };
        default: return {
            ...state,
            form: editForm(state.form, action),
        };
    }
};

export default wizard;