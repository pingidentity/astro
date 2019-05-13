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

            return props.renderNavItem({
                "data-id": option.label.replace(/\W/g, "") + "-label",
                className: classnames("header-nav__item", {
                    "header-nav__item--selected":
                        option.id === props.currentNav || option.label === props.currentNav
                }),
                onClick: handleClick,
                option,
                key: option.label + "-" + i,
                children: <span className="header-nav__item-label">{option.label}</span>
            }, Anchor);
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
    onNavChange: _.noop,
};

export default HeaderNav;
