import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import PopperContainer from "./PopperContainer";

import popsOver from "../../util/behaviors/popsOver";

/**
 * @typedef Popover.renderPopoverChildren
 * @param {object} props
 * @param {function} props.onToggle
 */

/**
 * @class Popover
 * @desc Popover creates a trigger component that controls the visibility of the content.
 *
 * @param {string} [data-id="popover"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {node|Popover.renderPopoverChildren} [children]
 *     Children can be passed as usual or as a function that renders the
 *     children with the provided onToggle callback.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
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
* @param {bool} [noHoverEffect=false]
 *     If there should be a hover effect
 * @param {boolean} [open=false]
 *     If true, tooltip is open or else closed.
 * @param {function} [onToggle]
 *     Callback to be triggered when trigger is clicked.
 * @param {function} [onPopperClick]
 *     If using a portal, the callback that's triggered then the PopperContainer is clicked
 * @param {string} [popperClassName]
 *     If using a portal, a className that's added to the PopperContainer
 */

class PopoverBase extends React.Component {
    static displayName = "Popover";

    static propTypes = {
        "data-id": PropTypes.string,
        "data-parent": PropTypes.string,
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        className: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        onPopperClick: PropTypes.func,
        onKeyDown: PropTypes.func,
        onToggle: PropTypes.func,
        padded: PropTypes.bool,
        noHoverEffect: PropTypes.bool,
        open: PropTypes.bool,
        placement: PropTypes.string,
        triggerClassName: PropTypes.string,
        popperClassName: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "popover",
        label: "Link",
        onPopperClick: _.noop,
        onKeyDown: _.noop,
        onToggle: _.noop,
        noHoverEffect: false,
        placement: "",
        triggerClassName: "",
        popperClassName: "",
        padded: false,
    };

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

    renderContent = () => {
        const { children = null, onToggle } = this.props;
        if (typeof children === "function") {
            return children({ onToggle });
        }
        return children;
    }

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

        return (
            <PopperContainer
                data-parent={this.props["data-id"]}
                className={classnames("popover-display", this.props.popperClassName)}
                data-id="popup-frame"
                data-parent={this.props["data-id"]}
                getReference={this._getReference}
                pointerClassName="popup-frame__pointer"
                placement={getPlacement()}
                ref={el => this.popperContainer = el}
                onClick={this.props.onPopperClick}
            >
                {contents}
            </PopperContainer>
        );
    };

    _getReference = () => this.reference;

    render() {
        var containerClassName = classnames(
            "popover",
            this.props.className,
            this._getModifiers("popover"),
            "popover--use-portal",
        );

        return (
            <div className={containerClassName} data-id={this.props["data-id"]}>
                <a
                    className={classnames(
                        "popover__trigger",
                        this.props.triggerClassName,
                        {
                            active: this.props.open,
                            "popover__trigger--no-hover": this.props.noHoverEffect,
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
