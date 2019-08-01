import React from "react";
import PopoverMenu from "./PopoverMenu";
import Anchor from "../general/Anchor";

import popsOver from "../../util/behaviors/popsOver";
import _ from "underscore";
import classnames from "classnames";
import { getIconClassName } from "../../util/PropUtils";

const PopoverMenuBase = PopoverMenu.Base;

class PopoverNavMenuBase extends PopoverMenuBase {

    static defaultProps = _.extend(PopoverMenuBase.defaultProps,
        {
            "data-id": "popover-nav-menu",
        });

    _getIcon = item => {
        if (item.iconSrc) {
            return <img src={item.iconSrc} className="icon nav-menu__icon" />;
        } else {
            const iconClassName = getIconClassName(item);
            if (iconClassName) {
                return <span className={classnames("icon", "nav-menu__icon", iconClassName)} />;
            }
        }
    };

    _anyIcons = () => {
        return (
            this.props.items.reduce((result, item) => {
                if (result || getIconClassName(item)) {
                    return true;
                } else {
                    return false;
                }
            }, false)
        );
    }

    renderItem = (item, handleClick, index) => {
        const {
            url,
            href = url,
            label,
            target,
            "data-id": dataId = `${this.props["data-id"]}-link-${label ? label.toString() : index}`
        } = item;

        return (
            <Anchor
                data-id={dataId}
                href={href}
                key={label}
                className={classnames("nav-menu__link", { "nav-menu__link--w-icon": this._anyIcons() })}
                onClick={handleClick}
                target={target}
            >
                {this._getIcon(item)}
                {label}
            </Anchor>
        );
    };
}

const PopoverNavMenu = popsOver(PopoverNavMenuBase);

module.exports = PopoverNavMenu;
