var PropTypes = require("prop-types");
var React = require("react");
var Link = require("../general/Link");
var ReactTooltip = require("react-tooltip");
var classnames = require("classnames");
var _ = require("underscore");


/**
 * @enum {string}
 * @alias HelpHint.Placements
 */
const Placements = {
    /** top */
    TOP: "top",
    /** bottom */
    BOTTOM: "bottom",
    /** left */
    LEFT: "left",
    /** right */
    RIGHT: "right"
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
    };

    _handleClick = (e) => {
        // kill click event to prevent event from triggering label from checking a checkbox/radio
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
        const { link } = this.props;
        return link && <Link title="More on this topic" url={link} icon="info" type="block" />;
    }

    maybeRenderExtraContainer = children => (
        this.props.unstyleTrigger
            ? <div className="help-tooltip help-tooltip--extra">{children}</div>
            : children
    );

    show = () => {
        ReactTooltip.show(this.target);
    };

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

        const containerClassNames = classnames(
            this._getTypeClass(),
            {
                "help-tooltip": !unstyleTrigger,
                "help-tooltip--left-margin": leftMargin,
                [containerClassName]: containerClassName !== undefined
            }
        );

        return (
            <div className={containerClassNames} data-id={dataId}>
                <div
                    data-id={dataId + "-target"}
                    className={classnames(this.props.className, "help-tooltip-target", {
                        "inline": (!children && !this.props.className), // make the icon inline if no other class is specified
                    })}
                    onClick={this._handleClick}
                    data-tip={true}
                    data-for={uid}
                    ref={(target) => { this.target = target; }}>
                    {display}
                </div>
                {this.maybeRenderExtraContainer(
                    <ReactTooltip
                        id={uid}
                        place={this._getPlacement()}
                        className={this.tooltipClassName}
                        effect="solid"
                        delayShow={this.props.delayShow}
                        delayHide={this.props.delayHide}
                        {...this.props.tooltipProps}>
                        {this.props.hintText}
                        {this.maybeRenderLink()}
                    </ReactTooltip>
                )}
            </div>
        );
    }
}

module.exports = HelpHint;
module.exports.Placements = Placements;
module.exports.Types = Types;
module.exports.placements = Placements;
module.exports.types = Types;
