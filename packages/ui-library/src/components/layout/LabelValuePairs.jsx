import React from "react";
import PropTypes from "prop-types";
import HelpHint from "../tooltips/HelpHint";

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
        hintText,
        hintPlacement,
        hintLink,
        divider,
    }, dividerIndex) => {
        return divider
            ? <hr key={dividerIndex} className="label-value-pairs__divider" />
            : [
                <div key={label} className="label-value-pairs__label">{label}</div>,
                (hintText) ? <div key={value} className="label-value-pairs__value">
                    {value}
                    <HelpHint
                        className="inline"
                        hintText={hintText}
                        hintPlacement={hintPlacement}
                        hintLink={hintLink}
                    />
                </div>
                : <div key={value} className="label-value-pairs__value">{value}</div>
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

LabelValuePairs.propTypes = {
    "data-id": PropTypes.string,
    dataPairs: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
                hintText: PropTypes.string,
                hintPlacement: PropTypes.string,
                hintLink: PropTypes.string,
            }),
            PropTypes.shape({
                divider: PropTypes.bool,
            })
        ])
    ).isRequired
};


module.exports = LabelValuePairs;
