import React from "react";
import PropTypes from "prop-types";
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

function FlexRow({
    alignment,
    children,
    "data-id": dataId,
    className,
    inline,
    justify,
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
            {children}
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
    )
};

FlexRow.defaultProps = {
    alignment: alignments.BOTTOM,
    "data-id": "flex-row",
    inline: false,
    justify: justifyOptions.START
};

export default FlexRow;