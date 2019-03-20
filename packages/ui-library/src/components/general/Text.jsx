import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const textTypes = {
    BODY: "body",
    ERROR: "error",
    LABEL: "label",
    NOTE: "note",
    NOVALUE: "no-value",
    PAGESUBTITLE: "page-subtitle",
    PAGETITLE: "page-title",
    PLACEHOLDER: "placeholder",
    PRIMARY: "primary",
    SECTIONTITLE: "section-title",
    SUCCESS: "success",
    VALUE: "value",
    WARNING: "warning",
};

/**
* @class Text
* @desc A block of text
*
* @param {string} [data-id=text-block]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {string} [type]
*     Style of text
*/

const Text = ({
    children,
    className,
    "data-id": dataId,
    type,
}) => (
    <div
        className={classnames("text-component", className, `text-${type}`)}
        data-id={dataId}
    >
        {children}
    </div>
);

Text.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    type: PropTypes.oneOf([
        textTypes.BODY,
        textTypes.ERROR,
        textTypes.LABEL,
        textTypes.NOTE,
        textTypes.NOVALUE,
        textTypes.PAGESUBTITLE,
        textTypes.PAGETITLE,
        textTypes.PLACEHOLDER,
        textTypes.PRIMARY,
        textTypes.SECTIONTITLE,
        textTypes.SUCCESS,
        textTypes.VALUE,
        textTypes.WARNING
    ]),
};

Text.defaultProps = {
    "data-id": "styled-text",
    type: textTypes.BODY,
};

Text.textTypes = textTypes;

export default Text;