import React from "react";
import PropTypes from "prop-types";
import HelpHint from "../tooltips/HelpHint";
import classnames from "classnames";
import Utils from "../../util/Utils";

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
    // IE doesn't support css grid, so we render a table instead
    const Tag = Utils.isIE() ? "td" : "div";

    const renderHint = () => (hintText &&
        <HelpHint
            className="inline label-value-pairs__help-hint"
            hintText={hintText}
            hintPlacement={hintPlacement}
            hintLink={hintLink}
        />
    );

    if (divider) {
        const HRTag = Utils.isIE() ? "td" : "hr";
        return <HRTag key={dividerIndex} colSpan="2" className="label-value-pairs__divider" />;
    } else if (title) {
        return (
            <Tag key={title} className="label-value-pairs__title" colSpan="2">
                {title}
                {renderHint()}
            </Tag>
        );
    } else {
        return [
            <Tag key={`${label}-${value}-${dividerIndex}`} className="label-value-pairs__label">{label}</Tag>,
            <Tag key={`${value}-${label}-${dividerIndex}`} className="label-value-pairs__value">
                {value}
                {renderHint()}
            </Tag>
        ];
    }
};

const LabelValuePairs = ({
    className,
    dataPairs,
    "data-id": dataId,
    pruneEmpty,
}) => {
    const Tag = Utils.isIE() ? "table" : "div";

    return (
        <Tag data-id={dataId} className={classnames("label-value-pairs", className)}>
            {(pruneEmpty ? pruneEmptyPairs(dataPairs) : dataPairs).map(
                Utils.isIE() ? (item => <tr>{renderLabel(item)}</tr>) : renderLabel
            )}
        </Tag>
    );
};

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
