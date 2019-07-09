import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const chipColors = {
    CYAN: "cyan",
    FAINTGREY: "faint-grey",
    LIGHTGREY: "light-grey",
    DARKGREY: "dark-grey",
    TRANSPARENT: "transparent",
    WHITE: "white"
};

export const chipTypes = {
    CONDENSED: "condensed"
};

/**
* @class Chip
* @desc A small text "chip" with a background color.
*
* @param {string} [data-id=chip-component]
*     The data-id of the component.
* @param {string} [className]
*     Class name(s) to add to the top-level container/div.
* @param {string} [color]
*     The background color of the component.
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
                    "chip-component",
                    className,
                    {
                        "chip-component--condensed": type === chipTypes.CONDENSED
                    },
                    `chip-component--color-${color}`,
                    {
                        "chip-component--full-width": fullWidth
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
