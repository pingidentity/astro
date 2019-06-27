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
 * @param {string} [align=rowAlignments.BOTTOM]
 *      whether to align elements to the top or the bottom
 * @example
<InputRow>
    <FormTextField
        labelText="First Name"
        width={InputWidths.SM}
        data-id="firstName"
        required={true}
    />
    <FormTextField
        labelText="Last Name"
        width={InputWidths.SM}
        data-id="firstName"
        required={true}
    />
</InputRow>
 */

const rowAlignments = {
    TOP: "top",
    BOTTOM: "bottom",
};

const InputRow = ({
    alignment,
    children,
    className,
    "data-id": dataId,
    strict
}) => {
    const classNames = classnames(
        "input-row input-row--line-height",
        className,
        {
            "input-row--strict": strict,
            "input-row--top": alignment === rowAlignments.TOP,
        }
    );

    return (
        <div
            data-id={dataId}
            className={classNames}
        >
            {children}
        </div>
    );
};


/**
 * @class InputRow.InputRowAccessories
 * @desc A wrapper for text, buttons, etc to ensure it vertically aligns with the input portion of a FormTextField
 *
 * @param {string} [data-id="input-row"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @example
<InputRow>
    <FormTextField
        labelText="First Name"
        width={InputWidths.SM}
        data-id="firstName"
        required={true}
    />
    <RowAccessories>
        <Button inline>This will be vertically aligned</Button>
    </RowAccessories>
</InputRow>
 */
InputRow.InputRowAccessories = ({
    children,
    "data-id": dataId,
}) => <div className="input-row__accessories" data-id={dataId}>{children}</div>;

InputRow.propTypes = {
    alignment: PropTypes.oneOf(Object.values(rowAlignments)),
    "data-id": PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    strict: PropTypes.bool
};

InputRow.defaultProps = {
    alignment: rowAlignments.BOTTOM,
    "data-id": "input-row"
};

InputRow.rowAlignments = rowAlignments;

export default InputRow;
