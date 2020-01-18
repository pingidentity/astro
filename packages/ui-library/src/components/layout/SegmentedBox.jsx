import React from "react";
import PropTypes from "prop-types";
import ScrollBox from "../layout/ScrollBox";
import classnames from "classnames";
import { MessageTypes } from "../general/messages/MessagesConstants";

/**
 * @enum {string}
 * @alias SegmentedBox.boxSizes
 */
export const boxSizes = {
    /** none */
    AUTO: "none",
    /** 220 */
    XS: 220,
    /** 440 */
    SM: 440,
    /** 660 */
    MD: 660,
    /** 1100 */
    LG: 1100,
    /** full */
    FULL: "full",
};

/**
 * @class SegmentedBox
 * @desc A layout component to create a bounded scrolling box with optional content above and below.
 *       Used to create the SelectionList component.
 *
 * @param {string} [className]
 *     Class name(s) to add to the top-level container/div.
 * @param {string} [data-id]
 *     Defines the "data-id" for top-level HTML container.
 * @param {boolean} [border=false]
 *     Draws a border around the box.
 * @param {node} [bottomPanel]
 *     Content that goes below the scrolling box.
 * @param {SegmentedBox.boxSizes} [height="none"]
 *     Bounds the height of the whole box.
 * @param {number} [innerHeight]
 *     Bounds the height of the scrolling box.
 * @param {string} [scroll-box-data-id]
 *     Set the data-id for the scrolling box.
 * @param {node} [topPanel]
 *     Content that goes above the scrolling box.
 * @param {SegmentedBox.boxSizes} [width="none"]
 *     Bounds the width of the whole box.
 *
 */

/**
 * @class SegmentedBoxMessage
 * @desc A special message component that goes in the top panel.
 *
 * @param {string} [className]
 *     Class name(s) to add to the top-level container/div.
 * @param {string} [data-id]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [message]
 *     Text of the message.
 * @param {Messages.MessageTypes} [type=WARNING]
 *     Color of message box.
 *
 */

export const SegmentedBoxMessage = ({ "data-id": dataId, children, type }) => (
    <div
        data-id={dataId}
        className={classnames("segmented-box__message", `segmented-box__message--${type}`)}
    >
        {children}
    </div>
);

SegmentedBoxMessage.propTypes = {
    "data-id": PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.oneOf(Object.values(MessageTypes)),
};

SegmentedBoxMessage.defaultProps = {
    message: "",
    type: MessageTypes.WARNING,
};

class SegmentedBox extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        border: PropTypes.bool,
        bottomPanel: PropTypes.node,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        innerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        "scroll-box-data-id": PropTypes.string,
        topPanel: PropTypes.node,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    static defaultProps = {
        border: false,
        height: "none",
        width: "none",
    }

    _setSize() {
        const { lockMinSize } = this.props;

        if (lockMinSize || (lockMinSize !== false && !this._inPopover)) {
            if (this.boxEl) {
                if (!this._height || this._height < this.boxEl.clientHeight) {
                    this._height = this.boxEl.clientHeight;
                }
                if (!this._width || this._width < this.boxEl.clientWidth) {
                    this._width = this.boxEl.clientWidth;
                }
            }
        }
    }

    componentDidMount() {
        // if this code causes problems, tell Tyler
        // if it doesn't until at least 2021-01-01, buy Tyler a beer
        const isInPopover = ({ classList = [], parentNode } = { classList: [] }) => {
            if (classList.contains) {
                if (classList.contains("details-content") || classList.contains("popover-display")) {
                    return true;
                }
            }
            return parentNode ? isInPopover(parentNode) : false;
        };
        this._inPopover = isInPopover(this.boxEl);

        this._setSize();
    }

    componentDidUpdate() {
        this._setSize();
    }

    render () {
        const {
            "data-id": dataId,
            border = false,
            bottomPanel,
            children,
            height,
            innerHeight,
            "scroll-box-data-id": scrollBoxDataId, // for backward compatibility
            topPanel,
            width,
        } = this.props;

        return (
            <div
                data-id={dataId}
                className={classnames("segmented-box", {
                    "segmented-box--border": border,
                    "segmented-box--full-width": width === "full",
                })}
                style={{
                    maxWidth: width,
                    maxHeight: height,
                    minWidth: this._width || "auto",
                    minHeight: this._height || "auto",
                }}
                ref={el => this.boxEl = el}
            >
                {topPanel &&
                    <div className="segmented-box__top-panel">{topPanel}</div>
                }
                <ScrollBox className="segmented-box__scroll-box" height={innerHeight} data-id={scrollBoxDataId}>
                    <div className="segmented-box__content">
                        {children}
                    </div>
                </ScrollBox>
                {bottomPanel &&
                    <div className="segmented-box__bottom-panel">{bottomPanel}</div>
                }
            </div>
        );
    }
}

export default SegmentedBox;