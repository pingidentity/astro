import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FlexRow, { alignments, wrapOptions } from "../layout/FlexRow";
import TileSelectorContext, { selectorTypes } from "./TileSelectorContext";

function TileGroup({
    children,
    className,
    "data-id": dataId,
    title,
    type: propsType
}) {
    const type = propsType || useContext(TileSelectorContext) || selectorTypes.ROW;
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
                        "tile-selector__group--square": type === selectorTypes.SQUARE,
                        "tile-selector__group--action": type === selectorTypes.ACTION,
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
                wrap={type === selectorTypes.SQUARE ? wrapOptions.WRAP : wrapOptions.NOWRAP}
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
    "data-id": "tile-group"
};

TileGroup.selectorTypes = selectorTypes;
export default TileGroup;
