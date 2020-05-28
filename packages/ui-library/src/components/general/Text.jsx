import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Text.textTypes
 * @desc Enum for the different types of Text
 */
export const textTypes = {
    /** page-title */
    PAGETITLE: "page-title",
    /** section-title */
    SECTIONTITLE: "section-title",
    /** parent-label */
    PARENTLABEL: "parent-label",
    /** body */
    BODY: "body",
    /** label */
    LABEL: "label",
    /** normal-case-label */
    NORMALCASELABEL: "normal-case-label",
    /** note */
    NOTE: "note",
    /** no-value */
    NOVALUE: "no-value",
    /** page-subtitle */
    PAGESUBTITLE: "page-subtitle",
    /** placeholder */
    PLACEHOLDER: "placeholder",
    /** primary */
    PRIMARY: "primary",
    /** value */
    VALUE: "value",
    /** error */
    ERROR: "error",
    /** success */
    SUCCESS: "success",
    /** warning */
    WARNING: "warning",
};

/**
 * @enum {string}
 * @alias Text.textVariants
 * @desc Enum for the different types that can be overlaid on another type
 */
export const textVariants = {
    /** success */
    SUCCESS: "success",
    /** error */
    ERROR: "error",
    /** warning */
    WARNING: "warning",
};

/**
 * @enum {string}
 * @alias Text.overflowTypes
 */
const overflowTypes = {
    /** wrap */
    WRAP: "wrap",
    /** ellipsis */
    ELLIPSIS: "ellipsis"
};

/**
 * @enum {string}
 * @alias Text.alignments
 */
const alignments = {
    /** left */
    LEFT: "left",
    /** center */
    CENTER: "center",
    /** right */
    RIGHT: "right",
};

/**
 * @enum {string}
 * @alias Text.weights
 */
const weights = {
    /** normal */
    NORMAL: "normal",
    /** bold */
    BOLD: "bold",
    /** bold on hover */
    BOLD_ON_HOVER: "hover",
};

/**
* @class Text
* @desc A block of text
*
* @param {Text.alignments} [align=left]
*     Displays inline when true
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {string} [data-id=text-block]
*     The data-id of the component
* @param {boolean} [inline=false]
*     Displays inline when true
* @param {Text.overflowTypes} [overflow]
*     Way of showing overflowed text
* @param {Text.textTypes} [type]
*     Style of text
* @param {Text.textVariants} [variant]
*     Additional styles to add
* @param {Text.weights} [weight]
*     Font weight of text
*/

const Text = ({
    align,
    children,
    className,
    "data-id": dataId,
    inline,
    type,
    overflow,
    variant,
    weight,
}) => (
    <div
        className={classnames(
            "text-component",
            className,
            `text-${type}`,
            `text-component--overflow-${overflow}`,
            {
                [`text-${variant}`]: variant,
                "text-component--inline": inline,
                "text-component--center": align === alignments.CENTER,
                "text-component--left": align === alignments.LEFT,
                "text-component--right": align === alignments.RIGHT,
                "text-component--overflow-wrap": overflow === overflowTypes.WRAP,
                "text-weight--normal": weight === weights.NORMAL,
                "text-weight--bold": weight === weights.BOLD,
                "text-weight--hover": weight === weights.BOLD_ON_HOVER
            }
        )}
        data-id={dataId}
    >
        {children}
    </div>
);

Text.propTypes = {
    align: PropTypes.oneOf(Object.values(alignments)),
    className: PropTypes.string,
    "data-id": PropTypes.string,
    overflow: PropTypes.oneOf(Object.values(overflowTypes)),
    type: PropTypes.oneOf(Object.values(textTypes)),
    variant: PropTypes.oneOf(Object.values(textVariants)),
};

Text.defaultProps = {
    align: alignments.LEFT,
    "data-id": "styled-text",
    overflow: overflowTypes.WRAP,
    type: textTypes.BODY,
    weight: weights.NORMAL,
};

Text.textTypes = textTypes;
Text.textVariants = textVariants;
Text.overflowTypes = overflowTypes;
Text.alignments = alignments;
Text.weights = weights;

export default Text;
