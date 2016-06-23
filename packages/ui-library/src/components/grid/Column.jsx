"use strict";

var React = require("react"),
    Grid = require("./Grid.jsx");

/**
 * @class Column
 *
 * @desc Column stores necessary properties to render Grid.
 *
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [data-id] - it is used for a unique data-id
 * @param {string} [headerText] - data to display on header of the table
 * @param {string} [width] - css class to determine width of columns
 * @param {string} [align] - css class to determine align of columns
 * @param {bool} [fixed] - it is to determine this column can be pageable
 * @param {string} field - it is to determine which field in data object be mapped to this column
 * @param {bool} [hasSelectAll] - it is to determine if this column has select all checkbox
 * @param {bool} [selectAllValue] - value of select all checkbox
 * @param {func} [onSelectAllChange] - it is to handle when select all checkbox is checked or unchecked
 */
var Column = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        headerText: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.string
        ]),
        isLeftHeader: React.PropTypes.bool,
        width: React.PropTypes.oneOf([
            Grid.ColumnSizes.XS,
            Grid.ColumnSizes.S,
            Grid.ColumnSizes.M,
            Grid.ColumnSizes.L,
            Grid.ColumnSizes.XL
        ]),
        align: React.PropTypes.oneOf([
            Grid.Alignments.LEFT,
            Grid.Alignments.RIGHT,
            Grid.Alignments.CENTER
        ]),
        fixed: React.PropTypes.bool,
        field: React.PropTypes.string.isRequired,
        hasSelectAll: React.PropTypes.bool,
        selectAllValue: React.PropTypes.bool,
        onSelectAllChange: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "grid-column-header",
            width: Grid.ColumnSizes.M,
            align: Grid.Alignments.LEFT
        };
    },

    // this component is only used to store properties so no value returned.
    render: function () {
        return null;
    }
});

module.exports = Column;