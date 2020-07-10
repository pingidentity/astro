import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Legend.boxAlignments
 * @desc Enum for the different types of Legend alignments
 */
export const boxAlignments = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right",
};

/**
 * @enum {string}
 * @alias Legend.alignments
 * @desc Enum for the different types of Legend item internal alignments
 */
export const alignments = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right",
};

/**
 * @enum {string}
 * @alias Legend.valueSizes
 * @desc Enum for the different types of Legend valueSizes
 */
export const valueSizes = {
    SM: "sm",
};

/**
 * @enum {string}
 * @alias Legend.spacings
 * @desc Enum for the different types of Legend spacings
 */
export const spacings = {
    SM: "sm",
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
    textColor,
    label,
    value,
    alignment,
    valueSize,
}) => {
    const classNames = classnames("legend__item", {
        "legend__item--left": alignment === alignments.LEFT,
        "legend__item--center": alignment === alignments.CENTER,
        "legend__item--right": alignment === alignments.RIGHT,
    });

    const valueClassNames = classnames("legend__item-value", {
        "legend__item-value--sm": valueSize === valueSizes.SM,
    });

    return (
        <div className={classNames}>
            { label ? (
                <div className="legend__item-info">
                    { color ? (
                        <div className="legend__item-badge" style={{ backgroundColor: color }} />
                    ) : null }
                    <div className="legend__item-label" style={{ color: textColor }}>
                        {label}
                    </div>
                </div>
            ) : null }
            <div className={valueClassNames} style={{ color: textColor }}>
                { value !== undefined && value !== null ? value : (
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
    boxAlignment,
    data,
}) => {
    const classNames = classnames("legend", className, {
        "legend--left": boxAlignment === boxAlignments.LEFT,
        "legend--center": boxAlignment === boxAlignments.CENTER,
        "legend--right": boxAlignment === boxAlignments.RIGHT,
    });

    return (
        <div data-id={dataId} className={classNames}>
            {
                data.map((item) => (
                    <LegendItem
                        key={item.label}
                        color={item.color}
                        textColor={item.textColor}
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
