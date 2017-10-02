var React = require("react"),
    classnames = require("classnames"),
    FormLabel = require("./FormLabel.jsx");

 /**
 * @class SelectionFilterLabel
 * @desc Displays a label with the appearance of a select input, showing a count of the number of filters selected
 *
 * @param {string} [data-id="selection-filter"]
 *     The "data-id" attribute for top-level HTML container.
 * @param {string} [className]
 *     Additional CSS classes that are added to the top-level HTML container
 * @param {number} [count]
 *     The number that is displayed to the right of the filterLabel
 * @param {string} filterLabel
 *     The text to display inside of the SelectionFilterLabel
 * @param {string} labelText
 *     The text to display as an input label above the SelectionFilterLabel
 *
 * @example
 *     <SelectionFilterLabel
 *         data-id="filter-data-id"
 *         filterLabel="Selected Filters"
 *         labelText="My Label"
 *         count={count}
 *         className="custom-css-class"
 *     />
 *
 **/

var SelectionFilterLabel = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string.affectsRendering,
        count: React.PropTypes.number.affectsRendering,
        filterLabel: React.PropTypes.string.isRequired.affectsRendering,
        labelText: React.PropTypes.string.affectsRendering
    },

    getDefaultProps: function () {
        return {
            "data-id": "selection-filter"
        };
    },

    _renderSelectionFilter: function () {
        return (
            <div
                data-id={this.props["data-id"]}
                className={classnames("selection-filter-label", this.props.className)}>
                {this.props.filterLabel}
                {this.props.count >= 0 && (
                    <span data-id={this.props["data-id"] + "-count"} className="count">
                        {this.props.count}
                    </span>
                )}
            </div>
        );
    },

    render: function () {
        return this.props.labelText ? (
                <FormLabel data-id={this.props["data-id"] + "-label"} value={this.props.labelText}>
                    {this._renderSelectionFilter()}
                </FormLabel>
            ) : this._renderSelectionFilter();
    }
});

module.exports = SelectionFilterLabel;
