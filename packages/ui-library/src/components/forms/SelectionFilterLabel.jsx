var React = require("react"),
    classnames = require("classnames");

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
 *     The label text that is displayed
 *
 * @example
 *     <SelectionFilterLabel
 *         data-id="filter-data-id"
 *         filterLabel="Selected Filters"
 *         count={count}
 *         className="custom-css-class"
 *     />
 *
 **/

var SelectionFilterLabel = function (props) {
    return (
        <div data-id={props["data-id"]}
             className={classnames("selection-filter-label", props.className)}>
            {props.filterLabel}
            {props.count && <span className="count">{props.count}</span>}
        </div>
    );
};

SelectionFilterLabel.defaultProps = {
    "data-id": "selection-filter"
};

SelectionFilterLabel.propTypes = {
    "data-id": React.PropTypes.string,
    className: React.PropTypes.string.affectsRendering,
    filterLabel: React.PropTypes.string.isRequired.affectsRendering,
    count: React.PropTypes.number.affectsRendering
};

module.exports = SelectionFilterLabel;
