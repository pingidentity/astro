import React from "react";
import PropTypes from "prop-types";
import { sizes as paddingSizes } from "../layout/Padding";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias FlexRow.alignments
 */
export const alignments = {
    BOTTOM: "bottom",
    TOP: "TOP",
    CENTER: "CENTER",
    STRETCH: "STRETCH"
};

/**
 * @enum {string}
 * @alias FlexRow.justifyOptions
 */
export const justifyOptions = {
    /** center */
    CENTER: "center",
    /** end */
    END: "end",
    /** spacebetween */
    SPACEBETWEEN: "spacebetween",
    /** spaceevenly */
    SPACEEVENLY: "spaceevenly",
    /** start */
    START: "start",
};

/**
 * @enum {string}
 * @alias FlexRow.flexDirectionOptions
 */
export const flexDirectionOptions = {
    /** row */
    ROW: "row",
    /** row-reverse */
    ROWREVERSE: "row-reverse",
    /** column */
    COLUMN: "column",
    /** column-reverse */
    COLUMNREVERSE: "column-reverse",
};

/**
 * @class FlexRow
 * @desc A row for wrapping components in a flexbox container
 *
 * @param {string} [data-id="flex-row"]
 *      To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      A class name to be applied to the row.
 * @param {FlexRow.alignments} [alignment=alignments.BOTTOM]
 *      The vertical alignment of the items.
 * @param {boolean} [inline=false]
 *      If true, makes the FlexRow inline.
 * @param {FlexRow.justifyOptions} [justify=justifyOptions.START]
 *      The horizontal justification of the items.
 * @param {Spacing.Sizes} [spacing]
 *      If supplied, with add spacing in between items.
 * @example
<FlexRow>
    <Button label="Button" noSpacing />
    <Button label="Another button" noSpacing />
    <Button
        inline
        label="Inline button"
        noSpacing
        type="primary"
    />
</FlexRow>
 */

export const spacingOptions = paddingSizes;

const getAlignmentClass = alignment => {
    switch (alignment) {
        case alignments.STRETCH:
            return "flex-row--align-stretch";
        case alignments.CENTER:
            return "flex-row--align-center";
        case alignments.TOP:
            return "flex-row--align-top";
        case alignments.BOTTOM:
        default:
            return "flex-row--align-bottom";
    }
};

const getJustifyClass = justify => {
    switch (justify) {
        case justifyOptions.CENTER:
            return "flex-row--justify-center";
        case justifyOptions.END:
            return "flex-row--justify-end";
        case justifyOptions.SPACEBETWEEN:
            return "flex-row--justify-between";
        case justifyOptions.SPACEEVENLY:
            return "flex-row--justify-evenly";
        case justifyOptions.START:
        default:
            return "flex-row--justify-start";
    }
};

const getFlexDirection = flexDirection => {
    switch (flexDirection) {
        case flexDirectionOptions.ROW:
            return "flex-row--flex-direction-row";
        case flexDirectionOptions.ROWREVERSE:
            return "flex-row--flex-direction-row-reverse";
        case flexDirectionOptions.COLUMN:
            return "flex-row--flex-direction-column";
        case flexDirectionOptions.COLUMNREVERSE:
            return "flex-row--flex-direction-column-reverse";
    }
};

function FlexRow({
    alignment,
    children,
    className,
    "data-id": dataId,
    flexDirection,
    inline,
    justify,
    spacing
}) {
    const isColumn =
        flexDirection === flexDirectionOptions.COLUMN || flexDirection === flexDirectionOptions.COLUMNREVERSE;
    return (
        <div
            className={classnames(
                "flex-row",
                className,
                getAlignmentClass(alignment),
                getJustifyClass(justify),
                getFlexDirection(flexDirection),
                {
                    [`flex-row--${isColumn ? "column" : "row" }-spacing-${spacing}`]: spacing !== undefined,
                    "flex-row--inline": inline
                }
            )}
            data-id={dataId}
        >
            {children}
        </div>
    );
}

FlexRow.propTypes = {
    alignment: PropTypes.oneOf(
        Object.values(alignments)
    ),
    "data-id": PropTypes.string,
    flexDirection: PropTypes.oneOf(
        Object.values(flexDirectionOptions)
    ),
    inline: PropTypes.bool,
    justify: PropTypes.oneOf(
        Object.values(justifyOptions)
    ),
    spacing: PropTypes.oneOf(
        Object.values(spacingOptions)
    ),
};

FlexRow.defaultProps = {
    alignment: alignments.BOTTOM,
    "data-id": "flex-row",
    inline: false,
    justify: justifyOptions.START,
};

FlexRow.alignments = alignments;
FlexRow.justifyOptions = justifyOptions;

export default FlexRow;