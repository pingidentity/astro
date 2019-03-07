import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

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
    type: PropTypes.string,
};

Text.defaultProps = {
    "data-id": "styled-text",
    type: "body",
};

export default Text;