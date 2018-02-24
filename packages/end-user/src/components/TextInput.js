import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInput = ({
    placeholder, id, className, error,
}) => {
    const classNames = classnames('text-input', className, {
        'text-input--error': error,
    });

    return <input className={classNames} id={id} name={id} placeholder={placeholder} type="text" />;
};

TextInput.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.string,
};

export default TextInput;
