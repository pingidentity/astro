import React from "react";
import PropTypes from "prop-types";
import TextField from "./FormTextField";

/**
* @class InlineTextField
* @desc An inline text field component.
*
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
* @param {string} [data-id="form-text-field"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {boolean} [disabled=false]
*     If true, the text field will be disabled.
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {boolean} [inline]
*     When true, text field is inline.
* @param {InlineTextField~onValueChange} [onValueChange]
*     Callback to be triggered when the field value changes. It will receive the component's value.
* @param {number} [size]
*     Maximum character length supported by the text field.
* @param {string|number} [value=""]
*     Current text field value.
*     When not provided, the component will manage this value.
* @example
*     <InlineTextField
*         data-id="my-data-id"
*         value="default value"
*         onValueChange={myFunction}
*         size={5}
*         errorMessage="oops"
*     />
*/

function InlineTextField({
    className,
    "data-id": dataId,
    disabled,
    errorMessage,
    inline,
    onValueChange,
    size,
    value
}) {
    return (
        <TextField
            className={className}
            data-id={dataId}
            disabled={disabled}
            errorMessage={errorMessage}
            inline={inline}
            onValueChange={onValueChange}
            size={size}
            value={value}
        />
    );
}

InlineTextField.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    inline: PropTypes.bool,
    onValueChange: PropTypes.func,
    size: PropTypes.number,
    value: PropTypes.string,

};

InlineTextField.defaultProps = {
    "data-id": "inline-text-field",
    inline: true,
};

export default InlineTextField;