import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Chip.chipColors
 */
export const chipColors = {
    /** cyan */
    CYAN: "cyan",
    /** faint-grey */
    FAINTGREY: "faint-grey",
    /** light-grey */
    LIGHTGREY: "light-grey",
    /** dark-grey */
    DARKGREY: "dark-grey",
    /** transparent */
    TRANSPARENT: "transparent",
    /** white */
    WHITE: "white",
    /** red */
    RED: "red",
};

/**
 * @enum {string}
 * @alias Chip.chipTypes
 */
export const chipTypes = {
    /** condensed */
    CONDENSED: "condensed",
    /** count */
    COUNT: "count",
    /** outline */
    OUTLINE: "outline"
};

/**
* @class Chip
* @desc A small text "chip" with a background color.
*
* @param {string} [data-id=chip-component]
*     The data-id of the component.
* @param {string} [className]
*     Class name(s) to add to the top-level container/div.
* @param {Chip.chipColors} [color]
*     The background color of the component.
* @param {Chip.chipTypes} [type]
*     The type of the chip.
* @param {boolean} [fullWidth=false]
*     Whether the component takes up the full width of the container.
*/

function Chip({
    color,
    children,
    className,
    "data-id": dataId,
    fullWidth,
    type,
}) {
    return (
        <div
            className={
                classnames(
                    className,
                    {
                        "chip-component": type !== chipTypes.COUNT,
                        "chip-component--condensed": type === chipTypes.CONDENSED,
                        "chip-component--outline": type === chipTypes.OUTLINE,
                        [`chip-component--color-${color}`]: type !== chipTypes.COUNT,
                        "chip-component--full-width": fullWidth,
                        "count": type === chipTypes.COUNT,
                    }

                )
            }
            data-id={dataId}
        >
            {children}
        </div>
    );
}

Chip.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    fullWidth: PropTypes.bool,
};

Chip.defaultProps = {
    "data-id": "chip-component",
    color: chipColors.LIGHTGREY,
    fullWidth: false,
};

export default Chip;
