import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class Form
 * @desc Form component to hold inputs
 *
 * @param {node} [children]
 *      Form elements
 * @param {string} [data-id]
 *      Sets a data-id property on the Form element to be used as a test hook
 * @param {string} [margin]
 *      Define margins for the Form (small)
 * @param {string} [spacing]
 *      Define spacing for the Form (large)
 *
 */
const Form = ({
    children,
    margin,
    spacing,
    'data-id': dataId,
}) => {
    const classNames = classnames('form', {
        'form--margin-small': margin === 'small',
        'form--spacing-lg': spacing === 'large',
    });

    return (
        <form className={classNames} data-id={dataId}>{children}</form>
    );
};

Form.propTypes = {
    margin: PropTypes.oneOf(['small']),
    spacing: PropTypes.oneOf(['large']),
    'data-id': PropTypes.string,
};

Form.defaultProps = {
    'data-id': 'form',
};

export default Form;
