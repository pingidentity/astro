import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import PopperContainer from "./PopperContainer";

import popsOver from "../../util/behaviors/popsOver";
import { flagsPropType } from "../../util/FlagUtils";

/**
 * @class Popover
 * @desc Popover creates a trigger component that controls the visibility of the content.
 *
 * @param {string} [data-id="popover"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {array} [flags]
 *     Set the flag for "use-portal" to render with popper.js and react-portal
 * @param {string} [triggerClassName]
 *     CSS classes to set on the link that triggers the popover.
 *
 * @param {object|string} [label]
 *     A string or JSX object that serves as the trigger label.
 *
 * @param {string} [placement]
 *     Placement using keywords top, left, right. (Default is bottom center)
 *
 * @param {boolean} [padded=false]
 *     If true, the content will be padded from the frame.
 *
 * @param {boolean} [open=false]
 *     If true, tooltip is open or else closed.
 * @param {function} [onToggle]
 *     Callback to be triggered when trigger is clicked.
 * @param {function} [onPopperClick]
 *     If using a portal, the callback that's triggered then the PopperContainer is clicked
 * @param {string} [popperClassName]
 *     If using a portal, a className that's added to the PopperContainer
 **/

class PopoverBase extends React.Component {
    static displayName = "Popover";

    static propTypes = {
        "data-id": PropTypes.string,
        children: PropTypes.node,
        className: PropTypes.string,
        flags: flagsPropType,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        onPopperClick: PropTypes.func,
        onKeyDown: PropTypes.func,
        onToggle: PropTypes.func,
        padded: PropTypes.bool,
        open: PropTypes.bool,
        placement: PropTypes.string,
        triggerClassName: PropTypes.string,
        popperClassName: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "popover",
        flags: [],
        label: "Link",
        onPopperClick: _.noop,
        onKeyDown: _.noop,
        onToggle: _.noop,
        placement: "",
        triggerClassName: "",
        popperClassName: "",
        padded: false,
    };

    _usePortal = () => this.props.flags.findIndex(item => item === "use-portal") >= 0;

    /*
     * Check if placement contains a word (like top, right, or left)
     */
    _hasPlacement = word =>
        this.props.placement && this.props.placement.search(word) >= 0;

    /*
     * Create object for classnames to add modifiers to a block
     */
    _getModifiers = block => {
        const modifiers = {};
        modifiers[`${block}--top`] = this._hasPlacement("top");
        modifiers[`${block}--left`] = this._hasPlacement("left");
        modifiers[`${block}--right`] = this._hasPlacement("right");

        return modifiers;
    }

    renderContent = () => this.props.children;

    /*
     * Return of content based on props.open.
     *
     * @return {React.Component} the React component to be used as tooltip content
     */
    _content = () => {
        if (!this.props.open) {
            return null;
        }

        var frameClassName = classnames(
            "popup-frame",
            this.props.className,
            this._getModifiers("popup-frame"), {
                "popup-frame--padded": this.props.padded,
            }, {
                "popup-frame--pointer": !this._usePortal(),
            }
        );

        const contents = <div className={frameClassName}>{this.renderContent()}</div>;

        const positionList = (this.props.placement).split(" ");

        const getHorizontalPlacement = vertical => {
            if (_.find(positionList, v => v === "left")) {
                return vertical + "-end";
            } else if (_.find(positionList, v => v === "center")) {
                return vertical;
            } else {
                return vertical + "-start";
            }
        };

        const getPlacement = () => {
            if (_.find(positionList, v => v === "top")) {
                return getHorizontalPlacement("top");
            } else {
                return getHorizontalPlacement("bottom");
            }
        };

        return this._usePortal() ? (
            <PopperContainer
                className={classnames("popover-display", this.props.popperClassName)}
                getReference={this._getReference}
                pointerClassName="popup-frame__pointer"
                placement={getPlacement()}
                ref={el => this.popperContainer = el}
                onClick={this.props.onPopperClick}
            >
                {contents}
            </PopperContainer>
        ) : (
            <div className="popover__container">{contents}</div>
        );
    };

    _getReference = () => this.reference;

    render() {
        var containerClassName = classnames(
            "popover",
            this.props.className,
            this._getModifiers("popover"),
            {
                "popover--use-portal": this._usePortal(),
            }
        );

        return (
            <div className={containerClassName} data-id={this.props["data-id"]} ref="content">
                <a
                    className={classnames(
                        "popover__trigger",
                        this.props.triggerClassName,
                        {
                            active: this.props.open
                        }
                    )}
                    data-id={`${this.props["data-id"]}-trigger`}
                    onClick={this.props.onToggle}
                    onKeyDown={this.props.onKeyDown}
                    title={this.props.title}
                    ref={el => this.reference = el}
                >
                    {this.props.label}
                </a>
                {this._content()}
            </div>
        );
    }
}

const Popover = popsOver(PopoverBase);
Popover.Base = PopoverBase;

module.exports = Popover;
