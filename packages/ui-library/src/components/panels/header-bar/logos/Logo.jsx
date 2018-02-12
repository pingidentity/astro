import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Logo = props => (
    <div {...props} className={classnames("logo-"+props.id, props.className)}/>
);

Logo.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string
};

Logo.defaultProps = {
    className: "",
    id: "pingone"
};

export default Logo;
