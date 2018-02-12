import React from "react";
import PropTypes from "prop-types";
import Popover from "./Popover";
import _ from "underscore";

import popsOver from "../../util/behaviors/popsOver";

const PopoverBase = Popover.Base;

class PopoverMenuBase extends PopoverBase {

    static propTypes = _.extend(PopoverBase.propTypes,
        {
            items: PropTypes.array,
            buttons: PropTypes.array
        });

    static defaultProps = _.extend(PopoverBase.defaultProps,
        {
            "data-id": "popover-menu",
            items: [],
            buttons: []
        });

    renderItem = (item, handleClick, index) => (
        <button
            data-id={`${this.props["data-id"]}-button-${index}`}
            key={item.label}
            className="button-menu__button"
            onClick={handleClick}
        >
            {item.label}
        </button>
    );

    renderContent = () => _.map(_.union(this.props.items, this.props.buttons), (item, index) => {
        const handleClick = () => {
            if (item.onClick) {
                item.onClick();
            }
            this.props.onClose();
        };

        return this.renderItem(item, handleClick, index);
    });
}

const PopoverMenu = popsOver(PopoverMenuBase);
PopoverMenu.Base = PopoverMenuBase;

module.exports = PopoverMenu;
