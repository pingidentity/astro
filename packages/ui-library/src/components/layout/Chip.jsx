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
    /** Midnight */
    DARKBLUE: "dark-blue"
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
* @param {(string | object)} [color]
*      An object that holds all of the styling information for the chip color.
* @param {string} [color.background ]
*     Changes the backgroundColor to whatever the user specifies.
* @param {string} [color.text]
*     Changes the text color to whatever the user specifies.
* @param {Chip.chipTypes} [type]
*     The type of the chip.
* @param {boolean} [fullWidth=false]
*     Whether the component takes up the full width of the container.
*/


const getColor = ({ background, text } = {}) => {
    if (background && text !== undefined) {
        return {
            backgroundColor: background,
            color: text
        };
    } else {
        return null;
    }
};

const isValidColor = (color) => Object.values(chipColors).includes(color);

function Chip({
    color,
    children,
    className,
    "data-id": dataId,
    fullWidth,
    type,
}) {
    let colorToUse; // to fix UIP-3495 preserving backward compatibility for default color value
    if (color) {
        colorToUse = color;
    } else if (type === chipTypes.CONDENSED) {
        colorToUse = chipColors.DARKGREY;
    } else {
        colorToUse = chipColors.LIGHTGREY;
    }
    return (
        <div
            style={getColor(colorToUse)}
            className={
                classnames(
                    className,
                    {
                        "chip-component": type !== chipTypes.COUNT,
                        "chip-component--condensed": type === chipTypes.CONDENSED,
                        "chip-component--outline": type === chipTypes.OUTLINE,
                        [`chip-component--color-${colorToUse}`]: type !== chipTypes.COUNT && isValidColor(colorToUse),
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
    color: PropTypes.oneOfType([
        PropTypes.shape({
            background: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }),
        PropTypes.oneOf(Object.values(chipColors))
    ])
};

Chip.defaultProps = {
    "data-id": "chip-component",
    color: null, // we need to set this conditionally, see UIP-3495
    fullWidth: false,
};

export default Chip;
