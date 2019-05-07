"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    Grid = require("./Grid");

/**
 * @callback Grid#Column~onSelectAllChange
 */

/**
 * @class Grid#Column
 * @desc Column stores necessary properties to render Grid.
 *
 * @param {string} [data-id="grid-column-header"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {Grid.ColumnSizes} [width=Grid.ColumnSizes.M]
 *     Enum to set the column width.
 * @param {Grid.Alignments} [align=Grid.Alignments.LEFT]
 *     Enum to set the alignment.
 *
 * @param {string} field
 *     Identifies the field in data object be mapped to this column
 * @param {string|object} [headerText]
 *     Data to display on header of the table
 *
 * @param {boolean} [fixed=false]
 *     If this column can be pageable
 * @param {boolean} [hasSelectAll=false]
 *     If this column has select all checkbox
 * @param {boolean} [selectAllValue=false]
 *     Value of select all checkbox. If true, select all checkbox will be checked.
 * @param {Grid#Column~onSelectAllChange} [onSelectAllChange]
 *     Callback to be trigered when select all checkbox is checked or unchecked.
 */

class Column extends React.Component {
    static displayName = "Column";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        width: PropTypes.oneOf([
            Grid.ColumnSizes.XS,
            Grid.ColumnSizes.S,
            Grid.ColumnSizes.M,
            Grid.ColumnSizes.L,
            Grid.ColumnSizes.XL
        ]),
        align: PropTypes.oneOf([
            Grid.Alignments.LEFT,
            Grid.Alignments.RIGHT,
            Grid.Alignments.CENTER
        ]),
        headerText: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        isLeftHeader: PropTypes.bool,
        fixed: PropTypes.bool,
        field: PropTypes.string.isRequired,
        hasSelectAll: PropTypes.bool,
        selectAllValue: PropTypes.bool,
        onSelectAllChange: PropTypes.func
    };

    static defaultProps = {
        "data-id": "grid-column-header",
        width: Grid.ColumnSizes.M,
        align: Grid.Alignments.LEFT,
        fixed: false,
        hasSelectAll: false,
        selectAllValue: false
    };

    // this component is only used to store properties so no value returned.
    render() {
        return null;
    }
}

module.exports = Column;
