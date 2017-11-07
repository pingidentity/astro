var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
    uuid = require("uuid");
/**
 * @class CondensedTable
 *
 * @desc A stateless component for displaying condensed data
 *
 * @param {array} [data-id]
 *          data-id for the component
 * @param {array} [data]
 *          An array of objects with data in key value pairs
 * @param {array} [headData]
 *          An array of values for the table head
 * @param {array} [bodyData]
 *          An array of arrays for the body that are ordered in the same was as the headData
 * @param {string} [className]
 *          CSS class name for CondensedTable
 *
 * <CondensedTable
 *      headData={this.state.headings}
 *      bodyData={this.state.rows} />
 *
 */

var ObjectTable = function (props) {
    return (
        <div>
            {props.data.map(function (item) {
                return (
                    <div key={uuid.v1()} className="data-group data-section" data-id="section">
                        {Object.keys(item).map(function (key) {
                            return (
                                <div className="data-item" key={key} data-id="item">
                                    <label>{key}</label>
                                    <span>{item[key]}</span>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

var ArrayTable = function (props) {
    return (
        <div>
            {props.bodyData.map(function (item) {
                return (
                    <div key={uuid.v1()} className="data-group data-section" data-id="section">
                        {item.map(function (entry, entryIndex) {
                            return (
                                <div className="data-item" key={entry.toString()} data-id="item">
                                    <label>{props.headData[entryIndex]}</label>
                                    <span>{entry}</span>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

var CondensedTable = function (props) {
    return (
        <div className={classnames("data", "condensed", props.className)} data-id={props["data-id"]}>
            {
                props.data
                ? <ObjectTable data={props.data} />
                : <ArrayTable headData={props.headData} bodyData={props.bodyData} />
            }
        </div>
    );
};

CondensedTable.propTypes = {
    "data-id": PropTypes.string,
    data: PropTypes.array,
    headData: PropTypes.array,
    bodyData: PropTypes.array,
    className: PropTypes.string,
};

CondensedTable.defaultProps = {
    "data-id": "condensedTable"
};

module.exports = CondensedTable;
