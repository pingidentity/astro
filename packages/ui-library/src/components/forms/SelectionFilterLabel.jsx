var React = require("react"),
    classnames = require("classnames");

 /**
 * @class SelectionFilterLabel
 * @desc Displays a label with the appearance of a select input, showing a count of the number of filters selected
 *
 * @param {array} props properties being displayed within the SelectionFilterLabel
 *
 * @example
 *     <SelectionFilterLabel
 *         data-id="filter-data-id"
 *         filterLabel="Selected Filters"
 *         className="filter-override"
 *     />
 *
 **/
var SelectionFilterLabel = function (props) {
    return (
        <div data-id={props["data-id"]}
             className={classnames("filter-container", props.className)}>
            {props.filterLabel}
            <span className="count">{props.count}</span>
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
    count: React.PropTypes.number.isRequired.affectsRendering
};

module.exports = SelectionFilterLabel;
