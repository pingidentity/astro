import React from "react";
// import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";

import popsOver from "../../util/behaviors/popsOver";

import PopoverMenu from "./PopoverMenu";
import Anchor from "../general/Anchor";

const PopoverMenuBase = PopoverMenu.Base;

class PopoverNavMenuBase extends PopoverMenuBase {

    static defaultProps = _.extend(PopoverMenuBase.defaultProps,
        {
            "data-id": "popover-nav-menu",
        });

    _getIcon = item => {
        let iconClassName = item.iconClassName;
        if (item.icon) {
            iconClassName = "icon-"+item.icon;
        }
        if (iconClassName) {
            return <span className={classnames("icon", "nav-menu__icon", iconClassName)} />;
        } else if (item.iconSrc) {
            return <img src={item.iconSrc} className="icon nav-menu__icon" />;
        }
    };

    _anyIcons = () => {
        return (
            this.props.items.reduce((result, item) => {
                if (result || item.icon || item.iconClassName || item.iconSrc) {
                    return true;
                } else {
                    return false;
                }
            }, false)
        );
    }

    renderItem = (item, handleClick, index) => {
        return (
            <Anchor
                data-id={item["data-id"] || `${this.props["data-id"]}-link-${index}`}
                href={item.href || item.url}
                key={item.label}
                className={classnames("nav-menu__link", { "nav-menu__link--w-icon": this._anyIcons() })}
                onClick={handleClick}
                target={item.target}
            >
                {this._getIcon(item)}
                {item.label}
            </Anchor>
        );
    };
}

const PopoverNavMenu = popsOver(PopoverNavMenuBase);

module.exports = PopoverNavMenu;
