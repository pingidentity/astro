import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Legend.alignments
 * @desc Enum for the different types of Legend alignments
 */
export const alignments = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right",
};

/**
 * @class LegendItem
 * @desc LegendItem with a label, value, and color.
 *
 * @param {Legend.alignments} [alignment]
 *     Determines the alignment of the Legend item content.
 * @param {string} [color]
 *      Color for the LegendItem.
 * @param {string} [label]
 *      Label for the LegendItem.
 * @param {string} [value]
 *      Value for the LegendItem.
 */
export const LegendItem = ({
    color,
    label,
    value,
    alignment,
}) => {
    const classNames = classnames("legend__item", {
        "legend__item-left": alignment === alignments.LEFT,
        "legend__item-center": alignment === alignments.CENTER,
        "legend__item-right": alignment === alignments.RIGHT,
    });

    return (
        <div className={classNames}>
            <div className="legend__item-info">
                <div
                    className="legend__item-badge"
                    style={{
                        backgroundColor: color,
                    }}
                />
                <div className="legend__item-label">
                    {label}
                </div>
            </div>
            <div className="legend__item-value">
                { value ? value : (
                    <div className="legend__item-novalue"/>
                )}
            </div>
        </div>
    );
};

/**
 * @class Legend
 * @desc Legend with labels, values, and colors.
 *
 * @param {Legend.alignments} [alignment]
 *     Determines the alignment of the Legend item content.
 * @param {string} [className]
 *      CSS class(es) applied to the Legend element.
 * @param {array} data
 *     Array of objects with {label, value, and color} for the LegendItems.
 * @param {string} data-id
 *     Data-id for the top-most container.
 */
const Legend = ({
    className,
    "data-id": dataId,
    alignment,
    data,
}) => {
    const classNames = classnames("legend", className);

    return (
        <div data-id={dataId} className={classNames}>
            {
                data.map((item) => (
                    <LegendItem
                        key={item.label}
                        color={item.color}
                        label={item.label}
                        value={item.value}
                        alignment={alignment}
                    />
                ))
            }
        </div>
    );
};

Legend.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    alignment: PropTypes.oneOf(Object.values(alignments)),
    data: PropTypes.array,
};

Legend.defaultProps = {
    alignment: alignments.LEFT,
    data: [],
};

export default Legend;