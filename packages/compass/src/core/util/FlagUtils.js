import PropTypes from 'prop-types';

export const allFlags = [
    'p-stateful',
    'use-portal',
    'add-button-margin',
    'expandable-row-class',
    'fix-discard-button',
    'fixed-messages-constants',
    'true-default',
    'v4',
];

export const flagsPropType = PropTypes.arrayOf(PropTypes.oneOf(allFlags));

export const getFlags = ({ props, context }) => props.flags || (context && context.flags) || [];

export const hasFlag = (component, flag) => {
    const flags = getFlags(component);
    return flags.includes(flag) || flags.includes('v4');
};
