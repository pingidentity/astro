var React = require("react");
var classnames = require("classnames");
var Utils = require("../../util/Utils");

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
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead. To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {any} hintText
 *     Provides the text that will appear in the hint.
 *
 *  @example
 *     <HelpHint className="short-tooltip right" hintText="My first HelpHint!">SomeTextWithHelp</HelpHint>
 */

var HelpHint = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        hintText: React.PropTypes.any.isRequired
    },

    getDefaultProps: function () {
        return {
            "data-id": "helpHint"
        };
    },

    _handleClick: function (e) {
        // kill click event to prevent event from triggering label from checking a checkbox/radio
        e.preventDefault();
    },

    componentWillMount: function () {
        if (this.props.id && !Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
    },
    
    render: function () {
        var dataId = this.props.id || this.props["data-id"],
            iconName = this.props.lock ? "icon-lock" : "icon-help";
        return (
            <div
                className={classnames("help-tooltip", this.props.className)}
                data-id={dataId}
                onClick={this._handleClick}>
                {this.props.children || (<div><span className={iconName}></span></div>)}
                <div className="tooltip-text"><div className="tooltip-text-content">{this.props.hintText}</div></div>
            </div>
        );
    }
});

module.exports = HelpHint;
