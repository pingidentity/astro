import PropTypes from "prop-types";

export const allFlags = [
    "p-stateful",
    "use-portal",
    "add-button-margin",
    "expandable-row-class",
    "fix-discard-button",
    "fix-message-constants",
];

export const flagsPropType = PropTypes.arrayOf(PropTypes.oneOf(allFlags));