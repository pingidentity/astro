import React from "react";
import PropTypes from "prop-types";
import Popover from "./Popover";
import _ from "underscore";

import popsOver from "../../util/behaviors/popsOver";

const PopoverBase = Popover.Base;

/**
 * @class PopoverMenu
 * @desc Menu of buttons that appears in a popover.
 *
 * @param {string} [data-id="popover-menu"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {array} [buttons]
 *     Objects that define the buttons. Accepts "label" and "onClick"
 * @param {string} [triggerClassName]
 *     CSS classes to set on the link that triggers the popover.
 *
 * @param {object|string} [label]
 *     A string or JSX object that serves as the trigger label.
 *
 * @param {string} [placement]
 *     Placement using keywords top, left, right. (Default is bottom center)
 *
 * @param {boolean} [open=false]
 *     If true, tooltip is open or else closed.
 * @param {function} [onToggle]
 *     Callback to be triggered when trigger is clicked.
 */

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
            data-id={
                `${this.props["data-id"]}-button-${
                    _.isString(item.label)
                        ? item.label.toLowerCase().replace(/[^0-9a-z]/gi, "")
                        : index
                }`
            }
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
