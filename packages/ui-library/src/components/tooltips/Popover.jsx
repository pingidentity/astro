import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";

import popsOver from "../../util/behaviors/popsOver";

/**
 * @class Popover
 * @desc Popover creates a trigger component that controls the visibility of the content.
 *
 * @param {string} [data-id="popover"]
 *     To define the base "data-id" value for top-level HTML container.
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
 *
 * @param {boolean} [open=false]
 *     If true, tooltip is open or else closed.
 * @param {function} [onToggle]
 *     Callback to be triggered when trigger is clicked.
 **/

class PopoverBase extends React.Component {
    static displayName = "Popover";

    static propTypes = {
        "data-id": PropTypes.string,
        children: PropTypes.node,
        className: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        onKeyDown: PropTypes.func,
        onToggle: PropTypes.func,
        padded: PropTypes.bool,
        open: PropTypes.bool,
        placement: PropTypes.string,
        triggerClassName: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "popover",
        label: "Link",
        onKeyDown: _.noop,
        onToggle: _.noop,
        placement: "",
        triggerClassName: "",
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

    renderContent = () => this.props.children;

    /*
     * Return of content based on props.open.
     *
     * @return {React.Component} the React component to be used as tooltip content
     */
    _content = () => {
        var frameClassName = classnames(
            "popup-frame popup-frame--pointer",
            this.props.className,
            this._getModifiers("popup-frame"), {
                "popup-frame--padded": this.props.padded,
            }
        );

        return this.props.open ? (
            <div className="popover__container">
                <div className={frameClassName}>{this.renderContent()}</div>
            </div>
        ) : null;
    };

    render() {
        var containerClassName = classnames(
            "popover",
            this.props.className,
            this._getModifiers("popover")
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
