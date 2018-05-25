import Actions from "./Actions.js";
import _ from "underscore";
import update from "re-mutable";
import Messages from "ui-library/lib/components/general/messages";
import { combineReducers } from "redux";

var initialState = {
    draftStep: {},
    policies: [
        {
            id: "sign-on-mfa",
            name: "Sign-on + Multi-factor Authentication",
            steps: [
                {
                    id: "sign-on",
                    name: "Sign-on",
                    settings: [
                        "Username Password"
                    ],
                    conditions: {
                        type: "any"
                    }
                },
                {
                    id: "mfa",
                    name: "Multi-factor Authentication",
                    settings: [
                        "SMS OTP",
                        "Email OTP"
                    ],
                    conditions: {
                        type: "any",
                        list: [
                            {
                                type: "last-authn",
                                range: "30 days"
                            },
                            {
                                type: "ip-address",
                                range: "161.0.0.1/24"
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: "sign-on",
            name: "Sign-on",
            steps: [
                {
                    id: "sign-on",
                    name: "Sign-on",
                    settings: [
                        "Username Password"
                    ],
                    conditions: {
                        type: "all",
                        list: [
                            {
                                type: "last-sign-on",
                                range: "24 hours"
                            }
                        ]
                    }
                }
            ]
        }
    ]
};

const getPolicyIndex = (state, id) => _.findIndex(state.policies, policy => policy.id === id);

const getStepIndex = (policy, id) => _.findIndex(policy.steps, step => step.id === id);

const AuthnPolicyReducer = function (state, action) {
    switch (action.type) {
        case Actions.Types.EDIT_STEP:
            {
                const policyIndex = getPolicyIndex(state, action.policy);
                const stepIndex = getStepIndex(state.policies[policyIndex], action.step);

                const formData = update.set(
                    state.policies[policyIndex].steps[stepIndex],
                    ["policyId"],
                    action.policy
                );

                return update.set(state, ["draftStep"], formData);
            }
            break;
        case Actions.Types.CANCEL_EDIT_STEP:
            return update.set(state, ["draftStep"], {});
        case Actions.Types.SAVE_STEP:
            {
                const newStep = _.omit(state.draftStep, ["policyId", "dirty"]);
                const policyIndex = getPolicyIndex(state, state.draftStep.policyId);
                const stepIndex = getStepIndex(state.policies[policyIndex], action.step);

                return update.set(
                    update.set(
                        state, ["policies", policyIndex, "steps", stepIndex], newStep
                    ), "draftStep", {}
                );
            }
            break;
        case Actions.Types.CHANGE_VALUE:
            const path = ["draftStep"].concat(action.path);
            return update.set(
                update.set(state, path, action.value),
                ["draftStep", "dirty"],
                true
            );
        default:
            return state || initialState;
    }

    return state;
};

export default combineReducers({ authn: AuthnPolicyReducer, messages: Messages.Reducer });
