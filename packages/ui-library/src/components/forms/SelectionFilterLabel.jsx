var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
    FormLabel = require("./FormLabel");

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
* @param {bool} [required=false]
*     When true the required styling is applied to the component
* @param {object} [style]
*     A react-style style object used to inject hard-coded styles into the parent label container.
*     *** Note that this prop should be used sparingly and only with the consent of the UX dev team. ***
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

class SelectionFilterLabel extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        count: PropTypes.number,
        filterLabel: PropTypes.string.isRequired,
        labelText: PropTypes.string,
        required: PropTypes.bool,
        style: PropTypes.object
    };

    static defaultProps = {
        "data-id": "selection-filter"
    };

    _renderSelectionFilter = () => {
        var classNames = {
            required: this.props.required
        };
        return (
            <div
                data-id={this.props["data-id"]}
                className={classnames("selection-filter-label", this.props.className, classNames)}
                style={this.props.style}>
                {this.props.filterLabel}
                {this.props.count >= 0 && (
                    <span data-id={this.props["data-id"] + "-count"} className="count">
                        {this.props.count}
                    </span>
                )}
            </div>
        );
    };

    render() {
        return this.props.labelText ? (
                <FormLabel data-id={this.props["data-id"] + "-label"} value={this.props.labelText}>
                    {this._renderSelectionFilter()}
                </FormLabel>
            ) : this._renderSelectionFilter();
    }
}

module.exports = SelectionFilterLabel;
