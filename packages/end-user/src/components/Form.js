import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Form = ({ children, margin, spacing }) => {
    const classNames = classnames('form', {
        'form--margin-small': margin === 'small',
        'form--spacing-lg': spacing === 'large',
    });

    return (
        <form className={classNames}>{children}</form>
    );
};


Form.propTypes = {
    margin: PropTypes.oneOf(['small']),
    spacing: PropTypes.oneOf(['large']),
};


export default Form;
