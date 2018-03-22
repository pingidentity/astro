import React from "react";
import PropTypes from "prop-types";

import Anchor from "../../general/Anchor";

import classnames from "classnames";
import _ from "underscore";

const HeaderNav = props => (
    <div className="header-nav" data-id={props["data-id"]}>
        {props.options.map((option, i) => {
            const handleClick = () =>
                props.onNavChange(option.id || option.label);

            return (
                <Anchor
                    className={classnames("header-nav__item", {
                        "header-nav__item--selected":
                            option.id === props.currentNav || option.label === props.currentNav
                    })}
                    data-id={option.label.replace(/\W/g, "") + "-label"}
                    key={option.label + "-" + i}
                    onClick={handleClick}
                >
                    <span className="header-nav__item-label">
                        {option.label}
                    </span>
                </Anchor>
            );
        })}
    </div>
);

HeaderNav.propTypes = {
    currentNav: PropTypes.string,
    "data-id": PropTypes.string,
    options: PropTypes.array,
    onNavChange: PropTypes.func,
};

HeaderNav.defaultProps = {
    currentNav: "",
    "data-id": "header-nav",
    onNavChange: _.noop
};

export default HeaderNav;
