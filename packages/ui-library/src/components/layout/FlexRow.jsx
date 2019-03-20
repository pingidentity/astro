import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const alignments = {
    BOTTOM: "bottom",
    TOP: "TOP",
    CENTER: "CENTER"
};

export const justifyOptions = {
    CENTER: "center",
    END: "end",
    SPACEBETWEEN: "spacebetween",
    START: "start"
};

const getAlignmentClass = alignment => {
    switch (alignment) {
        case alignments.CENTER:
            return "flex-row--center-aligned";
        case alignments.TOP:
            return "flex-row--top-aligned";
        case alignments.BOTTOM:
        default:
            return "flex-row--bottom-aligned";
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
    className,
    inline,
    justify
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
        >
            {children}
        </div>
    );
}

FlexRow.propTypes = {
    alignment: PropTypes.oneOf([
        alignments.BOTTOM,
        alignments.CENTER,
        alignments.TOP
    ]),
    inline: PropTypes.bool,
    justify: PropTypes.oneOf([
        justifyOptions.CENTER,
        justifyOptions.START,
        justifyOptions.SPACEBETWEEN,
        justifyOptions.END,
    ])
};

FlexRow.defaultProps = {
    alignment: alignments.BOTTOM,
    inline: false,
    justify: justifyOptions.START
};

export default FlexRow;