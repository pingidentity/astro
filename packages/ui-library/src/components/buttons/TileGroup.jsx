import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FlexRow, { alignments } from "../layout/FlexRow";

const selectorTypes = {
    ROW: "row",
    SQUARE: "square",
    STACKED: "stacked",
};

function TileGroup({
    children,
    className,
    "data-id": dataId,
    title,
    type
}) {
    return (
        <FlexRow
            className={
                classnames(
                    "tile-selector__group",
                    className,
                    {
                        // Have to set flex grow based on number of buttons because
                        // buttons in different groups will be different sizes otherwise.
                        [`tile-selector__group--grow-${React.Children.count(children)}`]: type === selectorTypes.ROW,
                        "tile-selector__group--stacked": type === selectorTypes.STACKED,
                        "tile-selector__group--square": type === selectorTypes.SQUARE
                    }
                )
            }
            data-id={dataId}
        >
            <div
                className="tile-selector__group-title"
            >
                {title}
            </div>
            <FlexRow
                alignment={alignments.STRETCH}
                className={
                    classnames(
                        "tile-selector__group-tiles",
                        {
                            "tile-selector__group-tiles--stacked": type === selectorTypes.STACKED
                        }
                    )
                }
            >
                {children}
            </FlexRow>
        </FlexRow>
    );
}

TileGroup.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.node,
    type: PropTypes.oneOf(Object.values(selectorTypes))
};

TileGroup.defaultProps ={
    "data-id": "tile-group",
    type: selectorTypes.ROW
};

TileGroup.selectorTypes = selectorTypes;
export default TileGroup;
