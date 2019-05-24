import React from "react";
import PropTypes from "prop-types";
import Padding, { sizes as paddingSizes } from "../layout/Padding";
import classnames from "classnames";

export const alignments = {
    BOTTOM: "bottom",
    TOP: "TOP",
    CENTER: "CENTER",
    STRETCH: "STRETCH"
};

export const justifyOptions = {
    CENTER: "center",
    END: "end",
    SPACEBETWEEN: "spacebetween",
    START: "start"
};

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
        case justifyOptions.START:
        default:
            return "flex-row--justify-start";
    }
};

const getSpacedChildren = (children, spacing) => React.Children.map(children, (child, idx) =>
    idx === children.length - 1
        ? child
        : (
            <Padding
                right={spacing}
            >
                {child}
            </Padding>
        )
);

function FlexRow({
    alignment,
    children,
    "data-id": dataId,
    className,
    inline,
    justify,
    spacing
}) {
    return (
        <div
            className={classnames(
                "flex-row",
                className,
                getAlignmentClass(alignment),
                getJustifyClass(justify),
                {
                    "flex-row--inline": inline
                }
            )}
            data-id={dataId}
        >
            {spacing
                ? getSpacedChildren(children, spacing)
                : children
            }
        </div>
    );
}

FlexRow.propTypes = {
    alignment: PropTypes.oneOf(
        Object.values(alignments)
    ),
    "data-id": PropTypes.string,
    inline: PropTypes.bool,
    justify: PropTypes.oneOf(
        Object.values(justifyOptions)
    ),
    spacing: PropTypes.oneOf(
        Object.values(spacingOptions)
    )
};

FlexRow.defaultProps = {
    alignment: alignments.BOTTOM,
    "data-id": "flex-row",
    inline: false,
    justify: justifyOptions.START
};

export default FlexRow;