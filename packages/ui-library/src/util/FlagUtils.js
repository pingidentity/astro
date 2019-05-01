import PropTypes from "prop-types";

export const allFlags = [
    "p-stateful",
    "use-portal",
    "add-button-margin",
    "expandable-row-class",
    "fix-discard-button",
    "fixed-messages-constants",
    "true-default",
];

export const flagsPropType = PropTypes.arrayOf(PropTypes.oneOf(allFlags));

export const getFlags = ({ props }) => props.flags || [];

export const hasFlag = (component, flag) => getFlags(component).includes(flag);