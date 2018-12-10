import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Form = ({ children, margin }) => {
    const classNames = classnames('form', {
        'form--margin-small': margin === 'small',
    });

    return (
        <form className={classNames}>{children}</form>
    );
};


Form.propTypes = {
    margin: PropTypes.oneOf(['small']),
};


export default Form;
