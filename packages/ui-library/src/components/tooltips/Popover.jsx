import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classnames from "classnames";
import _ from "underscore";
import EventUtils from "../../util/EventUtils";
const callIfOutsideOfContainer = EventUtils.callIfOutsideOfContainer;

/**
 * @class Popover
 * @desc Popover creates a trigger component that controls the visibility of the content.
 *
 * @param {string} [data-id="popover"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
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
 **/

class Popover extends React.Component {
    static displayName = "Popover";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        placement: PropTypes.string,
        open: PropTypes.bool,
        onToggle: PropTypes.func,
        children: PropTypes.node
    };

    static defaultProps = {
        "data-id": "popover",
        placement: "",
        onToggle: _.noop,
        open: false,
        label: "Link"
    };

    _handleGlobalClick = e => {
        // handle click outside of container
        if (this.props.open) {
            callIfOutsideOfContainer(
                ReactDOM.findDOMNode(this.refs.content),
                this.props.onToggle,
                e
            );
        }
    };

    _handleGlobalKeyDown = e => {
        // handle escape key
        if (e.keyCode === 27 && this.props.open) {
            callIfOutsideOfContainer(
                ReactDOM.findDOMNode(this.refs.content),
                this.props.onToggle,
                e
            );
        }
    };

    _bindWindowsEvents = () => {
        // bind once current execution stack is cleared (e.g. current window event processed).
        // to avoid possible false positive triggers if tooltip was open as result of click outside of it (e.g. some link outside)
        _.defer(
            function() {
                window.addEventListener("click", this._handleGlobalClick);
                window.addEventListener("keydown", this._handleGlobalKeyDown);
            }.bind(this)
        );
    };

    _removeWindowsEvents = () => {
        window.removeEventListener("click", this._handleGlobalClick);
        window.removeEventListener("keydown", this._handleGlobalKeyDown);
    };

    componentWillReceiveProps(nextProps) {
        if (!this.props.open && nextProps.open) {
            this._bindWindowsEvents();
        } else if (this.props.open && !nextProps.open) {
            this._removeWindowsEvents();
        }
    }

    componentDidMount() {
        if (this.props.open) {
            this._bindWindowsEvents();
        }
    }

    componentWillUnmount() {
        this._removeWindowsEvents();
    }

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

    /*
     * Return of content based on props.open.
     *
     * @return {React.Component} the React component to be used as tooltip content
     */
    _content = () => {
        var frameClassName = classnames(
            "popup-frame popup-frame--pointer",
            this.props.className,
            this._getModifiers("popup-frame")
        );

        return this.props.open ? (
            <div className="popover__container">
                <div className={frameClassName}>{this.props.children}</div>
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
            <div ref="content" date-id={this.props["data-id"]} className={containerClassName}>
                <a
                    data-id={`${this.props["data-id"]}-trigger`}
                    className="popover__target"
                    onClick={this.props.onToggle}
                >
                    {this.props.label}
                </a>
                {this._content()}
            </div>
        );
    }
}

module.exports = Popover;
