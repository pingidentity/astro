import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const StretchContent = ({ children, className, scrollable, ...props }) => (
    <div {...props} className={classnames("stretch-content", className, {
        "stretch-content--scrollable": scrollable,
    })}>
        {children}
    </div>
);

StretchContent.propTypes = {
    scrollable: PropTypes.bool,
};

export default StretchContent;