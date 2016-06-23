"use strict";

var React = require("react");

/**
 * @class ButtonCell
 *
 * @desc ButtonCell displays a button to a cell where users can click it inside a cell.
 *
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [data-id] - it is used for a unique data-id
 * @param {number} [value] - label to display on the button
 * @param {ButtonCell~onClickCallback} [onCallBack] - callback to be triggered when button is clicked
 **/
var ButtonCell = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        onCallBack: React.PropTypes.func,
        value: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            "data-id": "grid-button-cell",
        };
    },

    render: function () {
        return (
            <button className={this.props.className} data-id={this.props["data-id"]} onClick={this.props.onCallBack}>
            </button>
        );
    }
});

module.exports = ButtonCell;