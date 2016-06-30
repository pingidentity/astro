"use strict";
var React = require("react"),
    classnames = require("classnames");

/**
 * @callback CollapsibleLink~callback
 * @param {bool} expanded - current expanded/collapsed state
 **/


/**
 * @class CollapsibleLink
 * @desc Simple link which expand/collapse on click. Link contains two states: expand and collapse. Default state of link is collapse.
 *
 * @param {string} [data-id="collapsible-link"] - used as data-id on top HTML element.
 * @param {string} [title] - Text of link.
 * @param {string} [toggledTitle] - Text of link when state change. When toggledTitle is specified, title becomes title of link if link is
 * collapsed and toggledTitle becomes title of link if link is expanded.
 * @param {string} [className] - class names for top level HTML element.
 * @param {CollapsibleLink.arrowPositions} [arrowPosition] - enum to specify where the arrow is positioned
 *  relative to the the title (default = CollapsibleLink.arrowPositions.RIGHT).
 * @param {bool} [expanded=false] - Indicate whether link is in expanded state or collapsed state. Default is in collapsed state (expanded = false)
 * @param {CollapsibleLink~callback} [onToggle] - callback to be executed when toggle state of link is changed.
 *
 * @example
 *            <CollapsibleLink
                    data-id="my-link"
 *                  title="Text when link is collapsed"
 *                  toggledTitle="Text when link is expanded"
 *                  onToggle={this._toggle}
 *                  expanded={this.state.isOpen}>
 *            </CollapsibleLink>
 **/

var CollapsibleLink = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        arrowPosition: React.PropTypes.oneOf(["left", "right"]),
        title: React.PropTypes.string,
        toggledTitle: React.PropTypes.string,
        expanded: React.PropTypes.bool,
        onToggle: React.PropTypes.func

    },

    getDefaultProps: function () {
        return {
            "data-id": "collapsible-link",
            arrowPosition: "right",
            expanded: false
        };
    },

    _onToggle: function () {
        if (this.props.onToggle) {
            // do callback in case it has passed callback function.
            this.props.onToggle();
        }
    },

    render: function () {
        var className= classnames(this.props.className, {
            open: this.props.expanded,
            "collapsible-link": true
        });
        className = classnames(className, this.props.arrowPosition);
        var title = this.props.title;
        if (this.props.toggledTitle) {
            var title = this.props.expanded ? this.props.toggledTitle : this.props.title;
        }
        return (
            <div data-id={this.props["data-id"]} className={className}
                onClick={this._onToggle} >
                {title}
            </div>
        );
    }
});

/**
 * @enum {string}
 * @desc Enum for the different options for CollapsibleLink arrow position.
 * Add className {CollapsibleLink.arrowPositions.LEFT} for positioning the toggle arrow to the left of the title.
 * Add className {CollapsibleLink.arrowPositions.RIGHT} for positioning the toggle arrow to the right of the title.
 **/
CollapsibleLink.arrowPositions = {
    LEFT: "left",
    RIGHT: "right"
};

module.exports = CollapsibleLink;
