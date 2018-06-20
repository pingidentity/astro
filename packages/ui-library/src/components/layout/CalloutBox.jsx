import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @class CalloutBox
 * @desc box with dotted border
 *
 * @param {string} [data-id="callout-box"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      css paramanter
 */

const CalloutBox = ({
    children,
    className,
    "data-id": dataId,
}) => (
    <div className={classnames("callout-box", className)} data-id={dataId}>
        <div className="callout-box__content">{children}</div>
    </div>
);

CalloutBox.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
};

CalloutBox.defaultProps = {
    "data-id": "callout-box",
};

export default CalloutBox;