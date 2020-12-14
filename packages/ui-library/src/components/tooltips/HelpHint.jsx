import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import Tippy from "@tippyjs/react";
import Link from "../general/Link";

/**
 * @enum {string}
 * @alias HelpHint.Placements
 */
const Placements = {
    /** top */
    TOP: "top",
    /** top-start */
    TOP_START: "top-start",
    /** top-end */
    TOP_END: "top-end",
    /** bottom */
    BOTTOM: "bottom",
    /** bottom-start */
    BOTTOM_START: "bottom-start",
    /** bottom-end */
    BOTTOM_END: "bottom-end",
    /** left */
    LEFT: "left",
    /** left-start */
    LEFT_START: "left-start",
    /** left-end */
    LEFT_END: "left-end",
    /** right */
    RIGHT: "right",
    /** right-start */
    RIGHT_START: "right-start",
    /** right-end */
    RIGHT_END: "right-end",
};

/**
 * @enum {string}
 * @alias HelpHint.Types
 */
const Types = {
    DEFAULT: "",
    /** error */
    ERROR: "error",
    /** light */
    LIGHT: "light",
    /** success */
    SUCCESS: "success",
    /** warning */
    WARNING: "warning",
};


/**
 * @class HelpHint
 * @desc HelpHint can appear above, to the right, to the bottom or to the left of any DOM element.
 *     By default the hint appears to the upper right of the icon or target
 *     The following css classes may be added to effect the tooltip placement and state:
 *         'right': tooltip displays to the left of the icon instead of the right
 *         'bottom': tooltip displays under the help icon instead of above
 *         'show': keeps tooltip visible regardless of hover
 *     The following css classes maybe added to change the appearance of the tooltip:
 *         'error'/'warning': tooltip shows in red
 *         'success': tooltip shows in green
 *     Multiple rows of text are supported.
 *     HTML is supported.
 *
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {string} [data-id="helpHint"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {number} [delayHide=400]
 *     Sets the number of milliseconds to wait before hiding the tooltip.
 * @param {number} [delayShow=0]
 *     Sets the number of milliseconds to wait before showing the tooltip.
 *
 * @param {any} hintText
 *     Provides the text that will appear in the hint.
 *
 * @param {string} link
 *     Provides a URL for a "More on this topic" link at the bottom of the tooltip.
 * @param {Object} linkProps
 *     Props object that is passed into the Link node when link is present.
 * @param {HelpHint.Placements} [placement]
 *     How to place the help hint.
 * @param {HelpHint.Types} [type]
 *     Sets special styling for the help hint.
 * @param {bool} [unstyleTrigger=false]
 *     When set, don't apply any styling to the helphint trigger.
 *
 *  @example
 *     <HelpHint className="short-tooltip right" hintText="My first HelpHint!">SomeTextWithHelp</HelpHint>
 */

class HelpHint extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        containerClassName: PropTypes.string,
        "data-id": PropTypes.string,
        delayHide: PropTypes.number,
        delayShow: PropTypes.number,
        hintText: PropTypes.any.isRequired,
        iconName: PropTypes.string,
        leftMargin: PropTypes.bool,
        link: PropTypes.string,
        linkProps: PropTypes.shape({}),
        placement: PropTypes.oneOf(Object.values(Placements)),
        type: PropTypes.oneOf(Object.values(Types)),
        tooltipProps: PropTypes.object,
        unstyleTrigger: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "helpHint",
        delayHide: 400,
        delayShow: 0,
        className: "",
        leftMargin: false,
        unstyleTrigger: false,
        placement: "right",
    };

    _handleClick = (e) => {
        // Kill click event to prevent event from triggering label from checking a checkbox/radio
        e.preventDefault();
    };

    _getPlacement = () => {
        const { classNames, placement: propsPlacement } = this.props;
        let placement = "right";

        // use newer placement prop if present
        if (propsPlacement) {
            placement = propsPlacement;

        // otherwise try parsing it from the className prop
        // since react tooltip only has 4 postions, precedence is given to top/bottom over left/right
        } else if (classNames) {
            placement = classNames.indexOf("left") > -1 ? "left" : placement;
            placement = classNames.indexOf("top") > -1 ? "top" : placement;
            placement = classNames.indexOf("bottom") > -1 ? "bottom" : placement;
        }

        return placement;
    };

    _getTypeClass = () => {
        return this.props.type ? `help-tooltip--${this.props.type}` : null;
    }

    componentDidMount() {
        if (this.props.show || this.props.className.indexOf("show") > -1) {
            this.show();
        }
    }

    getIconName() {
        const {
            iconName,
            lock
        } = this.props;

        if (iconName) {
            return `icon-${iconName}`;
        } else {
            return lock
                ? "icon-lock"
                : "icon-help";
        }
    }

    maybeRenderLink() {
        const { link, linkProps } = this.props;
        return (link || linkProps) &&
            <Link title="More on this topic" url={link} icon="info" type="block" {...linkProps} />;
    }

    maybeRenderExtraContainer = children => (
        this.props.unstyleTrigger
            ? <div className="help-tooltip help-tooltip--extra">{children}</div>
            : children
    );

    tooltipClassName = this.props.link ? classnames("tooltip-text", "tooltip-text-link") : "tooltip-text";

    render() {
        const {
            "data-id": dataId,
            children,
            containerClassName,
            leftMargin,
            unstyleTrigger,
        } = this.props;

        const iconName = this.getIconName(),
            uid = _.uniqueId("rtt_"),
            display = children
                ? children
                : <span className={iconName} data-id={dataId + "-icon"} />;

        const containerClassNames = classnames("help-tooltip", {
            [containerClassName]: containerClassName !== undefined,
            "help-tooltip--left-margin": leftMargin,
        });

        const tippyClassNames = classnames(this._getTypeClass(), {
            "help-tooltip": !unstyleTrigger,

        });

        return (
            <div className={containerClassNames} data-id={dataId}>
                <Tippy
                    placement={this.props.placement}
                    className={tippyClassNames}
                    interactive
                    content={
                        <span
                            id={uid}
                            className={this.tooltipClassName}
                        >
                            {this.props.hintText}
                            {this.maybeRenderLink()}
                        </span>
                    }
                    appendTo={document.body}
                    theme={this.props.type}
                    delay={[this.props.delayShow, this.props.delayHide]}
                    {...this.props.tooltipProps}
                >
                    <div
                        data-id={dataId + "-target"}
                        className={classnames(this.props.className, "help-tooltip-target", {
                            "inline": (!children && !this.props.className), // make the icon inline if no other class is specified
                        })}
                        onClick={this._handleClick}
                        data-tip={true}
                        data-for={uid}
                        ref={(target) => { this.target = target; }}
                    >
                        {display}
                    </div>
                </Tippy>
            </div>
        );
    }
}

module.exports = HelpHint;
module.exports.Placements = Placements;
module.exports.Types = Types;
module.exports.placements = Placements;
module.exports.types = Types;
