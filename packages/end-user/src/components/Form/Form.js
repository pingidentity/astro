import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Form component to hold inputs
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
    /**
     * Sets a data-id property on the Form element to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Define margins for the Form
     */
    margin: PropTypes.oneOf(['small']),
    /**
     * Define spacing for the Form
     */
    spacing: PropTypes.oneOf(['large']),
};

Form.defaultProps = {
    'data-id': 'form',
};

export default Form;
