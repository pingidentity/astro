
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias FlexItem.flexPositions
 */
export const flexPositions = {
    /** forceStart */
    FORCESTART: "forceStart",
    /** forceEnd */
    FORCEEND: "forceEnd",
    /** forceCenter */
    FORCECENTER: "forceCenter",
};

/**
 * @class FlexItem
 * @desc displays a FlexItem to be nested inside of FlexRow
 *
 * @param {string} [data-id]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [className]
 *     Optional CSS classname(s) applied to top-level container.
 * @param {string} [grow]
 *    Specifies the proportions in which to distribute space.
 * @param {string} [shrink]
 *    Specifies the ratio of space an item should take up when the item is larger than it's parent container.
 * @param {string} [basis]
 *    Defines the inital size of a flex item.
 * @param {FlexItem.flexPositions} [flexPosition]
 *    Defines the placement of a flex item within its parent container.
 * @param {node} [children]
 *    A node that will appear in the component.
 * @example
 *     <FlexRow>
 *          <FlexItem> Lorem Ipsum </FlexItem>
 *     </FlexRow>
 */

export default function FlexItem({
    "data-id": dataId,
    className,
    children,
    grow,
    shrink,
    basis,
    flexPosition,
}) {

    return (
        <div
            className={classnames(
                "flex-item",
                className,
                {
                    "flex-item--force-end": flexPosition === flexPositions.FORCEEND,
                    "flex-item--force-start": flexPosition === flexPositions.FORCESTART,
                    "flex-item--force-center": flexPosition === flexPositions.FORCECENTER,
                }
            )}
            style={{
                flexGrow: grow ? grow : undefined,
                flexShrink: shrink ? shrink : undefined,
                flexBasis: basis ? basis : undefined,
            }}
            data-id={dataId}
        >
            {children}
        </div>
    );
}

FlexItem.propTypes = {
    "data-id": PropTypes.string,
    grow: PropTypes.string,
    shrink: PropTypes.string,
    basis: PropTypes.string,
    flexPosition: PropTypes.oneOf(Object.values(flexPositions)),
    className: PropTypes.string
};

