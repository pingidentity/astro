var PropTypes = require("prop-types");
var React = require("react");
var Utils = require("../../util/Utils");
var Link = require("../general/Link");
var ReactTooltip = require("react-tooltip");
var classnames = require("classnames");
var _ = require("underscore");


/**
 * @enum {string}
 * @alias HelpHint.Positions
 */
var Placements = {
    TOP: "top",
    BOTTOM: "bottom",
    LEFT: "left",
    RIGHT: "right"
};


/**
 * @class HelpHint
 * @desc HelpHint can appear above, to the right, to the bottom or to the left of any DOM element.
 *     By default the hint appears to the upper right of the icon or target
 *     The following css classes may be added to effect the tooltip placement and state:
 *         'right': tooltip displays to the left of the icon instead of the right
 *         'bottom': tooltip displays under the help icon instead of above
 *         'show': keeps tooltip visible regardless of hover
 *     The following css classes maybe added to change the appearace of the tooltip:
 *         'error'/'warning': tooltip shows in red
 *         'success': tooltip shows in green
 *     Multiple rows of text are supported.
 *     HTML is supported.
 *
 * @param {string} [data-id="helpHint"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {number} [delayHide=400]
 *     Sets the number of milliseconds to wait before hiding the tooltip.
 *
 * @param {any} hintText
 *     Provides the text that will appear in the hint.
 *
 * @param {string} link
 *     Provides a URL for a "More on this topic" link at the bottom of the tooltip.
 *
 *  @example
 *     <HelpHint className="short-tooltip right" hintText="My first HelpHint!">SomeTextWithHelp</HelpHint>
 */

class HelpHint extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        delayHide: PropTypes.number,
        placement: PropTypes.oneOf([
            Placements.TOP,
            Placements.BOTTOM,
            Placements.LEFT,
            Placements.RIGHT
        ]),
        hintText: PropTypes.any.isRequired,
        link: PropTypes.string
    };

    static defaultProps = {
        "data-id": "helpHint",
        delayHide: 400,
        className: ""
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

            if (!Utils.isProduction() && placement !== "right") {
                console.warn(Utils.deprecatePropError("className css positioning", "position"));
            }
        }

        return placement;
    };

    componentWillMount() {
        if (!Utils.isProduction() && this.props.id) {
            throw new Error(Utils.deprecatePropError("id", "data-id"));
        }
    }

    componentDidMount() {
        if (this.props.show || this.props.className.indexOf("show") > -1) {
            this.show();
        }
    }

    maybeRenderLink() {
        const { link } = this.props;
        return link && <Link title="More on this topic" url={link} icon="info"/>;
    }

    show = () => {
        ReactTooltip.show(this.target);
    };

    targetClassName = classnames(this.props.className, "help-tooltip-target");
    tooltipClassName = this.props.link ? classnames("tooltip-text", "tooltip-text-link") : "tooltip-text";

    render() {
        const {
            ["data-id"]: dataId,
            children
        } = this.props;

        const iconName = this.props.lock ? "icon-lock" : "icon-help",
            uid = _.uniqueId("rtt_"),
            display = children
                ? children
                : <span className={iconName} data-id={dataId + "-icon"} />;

        return (
            <div className="help-tooltip" data-id={dataId}>
                <div
                    data-id={dataId + "-target"}
                    className={classnames(this.props.className, "help-tooltip-target")}
                    onClick={this._handleClick}
                    data-tip={true}
                    data-for={uid}
                    ref={((target) => { this.target = target; }).bind(this)}>
                    {display}
                </div>
                <ReactTooltip
                    id={uid}
                    place={this._getPlacement()}
                    className={this.tooltipClassName}
                    effect="solid"
                    delayHide={this.props.delayHide}>
                    {this.props.hintText}
                    {this.maybeRenderLink()}
                </ReactTooltip>
            </div>
        );
    }
}

module.exports = HelpHint;
module.exports.Placements = Placements;
