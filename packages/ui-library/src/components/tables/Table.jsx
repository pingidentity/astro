import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";

/**
 * @class Table
 *
 * @desc A stateless component for displaying tabular data
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
 *          CSS class name for Table
 */


const getHeadData = data => _.reduce(data, (headings, item) => _.union(headings, _.keys(item)), []);
const getBodyData = (data, headData) => _.map(data, item => _.map(headData, heading => item[heading]));

const Table = ({
    cellRenderers,
    className,
    data = [],
    "data-id": dataId,
    lines,
    rowLabels,
    headData = getHeadData(data),
    bodyData = getBodyData(data, headData),
}) => {
    const classes = classnames("grid", className, {
        "grid--no-lines": !lines
    });

    // if we're showing labels along the left side of the table, make sure the first column heading is empty
    if (rowLabels && headData) {
        if (headData.length < bodyData[0].length) {
            headData.splice(0,"");
        } else {
            headData[0] = "";
        }
    }

    return (
        <table className={classes} data-id={dataId}>
            {headData &&
                <thead>
                    <tr>{_.map(headData, heading => <th key={heading}>{heading}</th>)}</tr>
                </thead>
            }
            <tbody>
                {_.map(bodyData, (item, index) => (
                    <tr key={index}>
                    {_.map(item, (entry, entryIndex) => {
                        const isLabel = rowLabels && entryIndex === 0;
                        const Cell = isLabel ? "th" : "td";
                        const cellValue = cellRenderers[entryIndex]
                            ? cellRenderers[entryIndex](entry, item)
                            : entry;

                        return <Cell key={index+"-"+entryIndex}>{cellValue}{isLabel && ":"}</Cell>;
                    })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    bodyData: PropTypes.array,
    cellRenderers: PropTypes.arrayOf(PropTypes.func),
    className: PropTypes.string,
    data: PropTypes.array,
    "data-id": PropTypes.string,
    headData: PropTypes.array,
    line: PropTypes.bool,
    rowLabels: PropTypes.bool,
};

Table.defaultProps = {
    cellRenderers: [],
    "data-id": "table",
    lines: true,
    rowLabels: false,
};

module.exports = Table;
