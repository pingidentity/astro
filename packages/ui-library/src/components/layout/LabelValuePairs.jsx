import React from "react";
import PropTypes from "prop-types";

/**
 * @class LabelValuePairs
 * @desc list form of data
 *
 * @param {array} dataPairs
 *          an array of strings to define label and value for each item in the list.
 * @param {string} [data-id="label-display"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      css paramanter
 * @example <LabelValuePairs data=id="label-display" />
 */

const LabelValuePairs = ({
    dataPairs,
    "data-id": dataId
}) => {
    const renderLabel = ({
        label,
        value,
        divider,
    },
        indexLabel,
        indexValue

    ) => {
        return divider
            ? <hr className="label-value-pairs__divider" />
            : [
                <div key={indexLabel} className="label-value-pairs__label">{label + ":"}</div>,
                <div key={indexValue} className="label-value-pairs__value">{value}</div>
            ];
    };

    return (
        <div data-id={dataId} className="label-value-pairs">
            {dataPairs.map(renderLabel)}
        </div>
    );
};

LabelValuePairs.defaultProps = {
    "data-id": "label-value-pairs"
};

LabelValuePairs.PropTypes = {
    "data-id": PropTypes.string,
    dataPairs: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
            }),
            PropTypes.shape({
                divider: PropTypes.bool,
            })
        ])
    ).isRequired
};


module.exports = LabelValuePairs;
