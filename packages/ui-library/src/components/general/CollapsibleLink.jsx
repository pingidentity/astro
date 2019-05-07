"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    classnames = require("classnames");

/**
 * @callback CollapsibleLink~onToggle
 * @param {boolean} expanded
 *     Current expanded/collapsed state
 */

/**
 * @class CollapsibleLink
 * @desc Simple link which expand/collapse on click. Link contains two states: expand and collapse.
 * Default state of link is collapse.
 *
 * @param {string} [data-id="collapsible-link"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {object|string} [title]
 *     Text of link.
 * @param {string} [toggledTitle]
 *     Text of link when state change. When toggledTitle is specified, title becomes title of link if link is
 *     collapsed and toggledTitle becomes title of link if link is expanded.
 *
 * @param {CollapsibleLink.arrowPositions} [arrowPosition=CollapsibleLink.arrowPositions.RIGHT]
 *     Enum to specify where the arrow is positioned relative to the the title.
 *
 * @param {boolean} [expanded=false]
 *     Indicate whether link is in expanded state or collapsed state. Default is in collapsed state.
 *
 * @param {boolean} [disabled=false]
 *     Grays out link and doesn't accept clicks
 *
 * @param {CollapsibleLink~onToggle} [onToggle]
 *     Callback to be executed when toggle state of link is changed.
 *
 * @example
 *     <CollapsibleLink
 *           data-id="my-link"
 *           title="Text when link is collapsed"
 *           toggledTitle="Text when link is expanded"
 *           onToggle={this._toggle}
 *           expanded={this.state.isOpen}>
 *     </CollapsibleLink>
 */

class CollapsibleLink extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object]),
        toggledTitle: PropTypes.string,
        arrowPosition: PropTypes.oneOf(["left", "right"]),
        expanded: PropTypes.bool,
        disabled: PropTypes.bool,
        onToggle: PropTypes.func

    };

    static defaultProps = {
        "data-id": "collapsible-link",
        arrowPosition: "right",
        expanded: false,
        disabled: false,
    };

    _handleToggle = () => {
        if (this.props.onToggle) {
            // do callback in case it has passed callback function.
            this.props.onToggle();
        }
    };

    render() {
        var className= classnames("collapsible-link", this.props.className, {
            open: this.props.expanded,
            "collapsible-link--disabled": this.props.disabled,
        });
        className = classnames(className, this.props.arrowPosition);
        var title = this.props.title;
        if (this.props.toggledTitle) {
            var title = this.props.expanded ? this.props.toggledTitle : this.props.title;
        }
        return (
            <div data-id={this.props["data-id"]} className={className}
                onClick={this._handleToggle} >
                {title}
            </div>
        );
    }
}

/**
 * @enum {string}
 * @desc Enum for the different options for CollapsibleLink arrow position.
 * Add className {CollapsibleLink.arrowPositions.LEFT} for positioning the toggle arrow to the left of the title.
 * Add className {CollapsibleLink.arrowPositions.RIGHT} for positioning the toggle arrow to the right of the title.
 */
CollapsibleLink.arrowPositions = {
    LEFT: "left",
    RIGHT: "right"
};

module.exports = CollapsibleLink;
