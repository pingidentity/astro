import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class Stack
 * @desc Display a stack of elements
 *
 * @param {node} [children]
 *      Buttons to display in the set
 * @param {string} [data-id]
 *      To define the base "data-id" value for the card
 * @param {string} [size]
 *      Size of the stack container (xsmall|small|large)
 *
 */
const Stack = ({ children, size, 'data-id': dataId }) => {
    const classNames = classnames('stack', {
        'stack--small': size === 'small',
        'stack--xsmall': size === 'xsmall',
        'stack--large': size === 'large',
    });

    return <div className={classNames} data-id={dataId}>{children}</div>;
};

Stack.propTypes = {
    size: PropTypes.string,
    'data-id': PropTypes.string,
};

Stack.defaultProps = {
    'data-id': 'stack',
};

export default Stack;
