var React = require("react");

/**
 * @class HelpHint
 * @desc HelpHint can appear above, to the right, to the bottom or to the left of any DOM element.
 *      By default the hint appears to the upper right of the icon or target
 *      The following css classes may be added to effect the tooltip placement and state:
 *          'right': tooltip displays to the left of the icon instead of the right
 *          'bottom': tooltip displays under the help icon instead of above
 *          'show': keeps tooltip visible regardless of hover
 *      The following css classes maybe added to change the appearace of the tooltip:
 *          'error'/'warning': tooltip shows in red
 *          'success': tooltip shows in green
 *      Multiple rows of text are supported.
 *      HTML is supported.
 * @param {any} hintText - provides the text that will appear in the hint.( required )
 * @param {string} className - extra CSS classes to be applied on the top level HTML
 * @param {string} id - attribute of rendered tooltip text.
 *
 *
 *  @example
 *      <HelpHint hintStyle='error show' hintText='My first HelpHint!'>SomeTextWithHelp</HelpHint>
 */

var HelpHint = React.createClass({
    propTypes: {
        // prop validations
        hintText: React.PropTypes.any.isRequired,
        className: React.PropTypes.string,
        id: React.PropTypes.string,
    },

    getDefaultProps: function () {
        return {
            id: "helpHint"
        };
    },

    render: function () {
        var hintStyles = "help-tooltip";

        if (this.props.className) {
            hintStyles += " " + this.props.className;
        }

        return (
            <div className={hintStyles} data-id={this.props.id}>
                {this.props.children} <div className="tooltip-text">{this.props.hintText}</div>
            </div>
        );
    }
});

module.exports = HelpHint;
