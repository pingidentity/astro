import PropTypes from "prop-types";

export const allFlags = [
    "pass-value",
    // v4 flags
    "p-stateful",
    "use-portal",
    "add-button-margin",
    "expandable-row-class",
    "fix-discard-button",
    "fixed-messages-constants",
    "true-default",
    "v4",
    "new-alert-modal",
];

export const flagsPropType = PropTypes.arrayOf(PropTypes.oneOf(allFlags));

export const getFlags = ({ props, context }) => props.flags || (context && context.flags) || [];

export const hasFlag = (component, flag) => {
    const flags = getFlags(component);
    return flags.includes(flag);
};
