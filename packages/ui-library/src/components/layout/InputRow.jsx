import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @class InputRow
 * @desc A single horizontal line for one or more inputs
 *
 * @param {string} [data-id="input-row"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      css parameter
 * @param {boolean} [strict]
 *      adds flexbox styling to row
 * @example
<InputRow>
    <FormTextField
        labelText="First Name"
        className="input-width-small"
        data-id="firstName"
        required={true}
    />
    <FormTextField
        labelText="Last Name"
        className="input-width-small"
        data-id="firstName"
        required={true}
    />
</InputRow>
 */

const InputRow = ({
    children,
    className,
    "data-id": dataId,
    strict
}) => {

    return (
        <div data-id={dataId} className={classnames("input-row", className, { "input-row--strict": strict })}>
            {children}
        </div>
    );
};

InputRow.propTypes = {
    "data-id": PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};

InputRow.defaultProps = {
    "data-id": "input-row"
};

export default InputRow;