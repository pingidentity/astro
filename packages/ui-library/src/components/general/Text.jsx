import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Text.textTypes
 */
const textTypes = {
    /** body */
    BODY: "body",
    /** error */
    ERROR: "error",
    /** label */
    LABEL: "label",
    /** note */
    NOTE: "note",
    /** no-value */
    NOVALUE: "no-value",
    /** page-subtitle */
    PAGESUBTITLE: "page-subtitle",
    /** page-title */
    PAGETITLE: "page-title",
    /** parent-label */
    PARENTLABEL: "parent-label",
    /** placeholder */
    PLACEHOLDER: "placeholder",
    /** primary */
    PRIMARY: "primary",
    /** section-title */
    SECTIONTITLE: "section-title",
    /** success */
    SUCCESS: "success",
    /** value */
    VALUE: "value",
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
*/

const Text = ({
    align,
    children,
    className,
    "data-id": dataId,
    inline,
    type,
    overflow,
}) => (
    <div
        className={classnames(
            "text-component",
            className,
            `text-${type}`,
            `text-component--overflow-${overflow}`,
            {
                "text-component--inline": inline,
                "text-component--center": align === alignments.CENTER,
                "text-component--right": align === alignments.RIGHT,
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
};

Text.defaultProps = {
    align: alignments.LEFT,
    "data-id": "styled-text",
    overflow: overflowTypes.WRAP,
    type: textTypes.BODY,
};

Text.textTypes = textTypes;
Text.overflowTypes = overflowTypes;
Text.alignments = alignments;

export default Text;
