import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class FloatLabel
 * @desc Form label that includes an input element
 *
 * @param {node} [children]
 *      Elements to display after the input
 * @param {string} [data-id]
 *      Sets a data-id property on the FloatLabel element to be used as a test hook
 * @param {string} [id]
 *      ID for the input element
 * @param {node} [InputType]
 *      Sets the input element to be used
 * @param {string} [inputClassName]
 *      Sets the classname for the input
 *
 */
const FloatLabel = ({
    label, id, InputType, inputClassName, children, 'data-id': dataId, ...props
}) => {
    const inputClassNames = classnames('float-label__input', inputClassName);

    return (
        <div className="float-label" data-id={dataId}>
            <InputType className={inputClassNames} placeholder={label} id={id} {...props} />
            <label className="float-label__label" htmlFor={id}>
                {label}
            </label>
            {children}
        </div>
    );
};

FloatLabel.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    InputType: PropTypes.func,
    inputClassName: PropTypes.string,
    'data-id': PropTypes.string,
};

PropTypes.defaultProps = {
    'data-id': 'floatlabel',
};

export default FloatLabel;
