import React from "react";
import PropTypes from "prop-types";
import HelpHint from "../tooltips/HelpHint";
import classnames from "classnames";

/**
 * @class LabelValuePairs
 * @desc list form of data
 *
 * @param {array} dataPairs
 *          an array of strings to define label and value for each item in the list.
 * @param {string} [data-id="label-display"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      css parameter
 * @param {boolean} [pruneEmpty=false]
 *      When true, empty values will not be listed at all.
 * @example <LabelValuePairs data=id="label-display" />
 */

/**
 * @typedef {object} LabelValuePairs#Row
 * @desc An object describing a leaf in the LeftNav
 * @property {string} label
 *              The label (left column)
 * @property {node} value
 *              The value (right column)
 * @property {string} hintText
 *              Optional contents of a help hint on the value
 * @property {boolean} divider
 *              If set to true, this row is a divider line
 * @property {string} title
 *              If defined, this row is a title
 */

const pruneEmptyPairs = (dataPairs) => dataPairs.filter(pair => !!pair.value || pair.value === 0);

const renderLabel = ({
    label,
    value,
    hintText,
    hintPlacement,
    hintLink,
    divider,
    title,
}, dividerIndex) => {
    const renderHint = () => (hintText &&
        <HelpHint
            className="inline label-value-pairs__help-hint"
            hintText={hintText}
            hintPlacement={hintPlacement}
            hintLink={hintLink}
        />
    );

    if (divider) {
        return <hr key={dividerIndex} className="label-value-pairs__divider" />;
    } else if (title) {
        return (
            <div key={title} className="label-value-pairs__title">
                {title}
                {renderHint()}
            </div>
        );
    } else {
        return [
            <div key={`${label}-${value}-${dividerIndex}`} className="label-value-pairs__label">{label}</div>,
            <div key={`${value}-${label}-${dividerIndex}`}className="label-value-pairs__value">
                {value}
                {renderHint()}
            </div>
        ];
    }
};

const LabelValuePairs = ({
    className,
    dataPairs,
    "data-id": dataId,
    pruneEmpty,
}) => (
    <div data-id={dataId} className={classnames("label-value-pairs", className)}>
        {(pruneEmpty ? pruneEmptyPairs(dataPairs) : dataPairs).map(renderLabel)}
    </div>
);

LabelValuePairs.defaultProps = {
    "data-id": "label-value-pairs",
    pruneEmpty: false,
};

LabelValuePairs.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    dataPairs: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.node,
                hintText: PropTypes.string,
                hintPlacement: PropTypes.string,
                hintLink: PropTypes.string,
            }),
            PropTypes.shape({
                divider: PropTypes.bool.isRequired,
            }),
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                hintText: PropTypes.string,
                hintPlacement: PropTypes.string,
                hintLink: PropTypes.string,
            })
        ])
    ).isRequired,
    pruneEmpty: PropTypes.bool,
};

module.exports = LabelValuePairs;
