import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FlexRow from "./FlexRow";
import Icon from "../general/Icon";

/**
 * @class Linking Arrow
 * @desc A component that adds a linking arrow next to a given title.
 *
 * @param {string} [title]
 *      A title that will be shown to the left of the arrow.
 * @param {string} [data-id="label-display"]
 *      Data-id attribute set on the top-level element; used as a test hook.
 * @param {string} [className]
 *      CSS class set on the top-level element.
 * @example <LinkingArrow title="A title" />
 */

export default function LinkingArrow({
    className,
    "data-id": dataId,
    title
}) {
    return (
        <FlexRow
            className={classnames("linking-arrow", className)}
            data-id={dataId}
        >
            <span className="linking-arrow__title">
                {title}
            </span>
            <Icon
                className="linking-arrow__icon"
                iconName="link"
            />
            <div className="linking-arrow__line"/>
        </FlexRow>
    );
}

LinkingArrow.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    title: PropTypes.node.isRequired
};
