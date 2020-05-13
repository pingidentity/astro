import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { DashboardCard } from "../general/charting/Cards";
import FlexRow, { alignments, spacingOptions } from "../layout/FlexRow";
import Text, { textTypes } from "../general/Text";

/**
 * @class Divider
 * @desc A divider to put between card sections.
 *
 */

export const Divider = () => (
    <span className="nav-card__divider"/>
);

/**
 * @class Title
 * @desc The title for a card or section in a card.
 *
 * @param {string} [className]
 *   A class name applied at the component's top level.
 * @param {string} [data-id]
 *   A data-id test hook applied at the root element.
 * @param {Object} [children]
 *   The title to be displayed, along with any other elements
 *   like edit buttons.
 *
 */

export const Title = ({
    children,
    className,
    "data-id": dataId
}) => {
    return (
        <Text
            data-id={dataId}
            inline
            className={classnames("nav-card__title", className)}
            type={textTypes.PAGETITLE}

        >
            {children}
        </Text>
    );
};

Title.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
};

/**
 * @class NavCard
 * @desc A card container for layout out inside of the NavFrame component.
 *
 * @param {string} [className]
 *   A class name applied at the component's top level.
 * @param {string} [data-id]
 *   A data-id test hook applied at the root element.
 * @param {Object} [children]
 *   The elements to be displayed inside the card. This uses a flex
 *   display, so passing in multiple components wrapped in another component
 *   may cause an unexpected layout.
 *
 */

export default function NavCard({
    children,
    className,
    "data-id": dataId,
}) {
    return (
        <DashboardCard
            className={classnames("nav-card", className)}
            data-id={dataId}
            front={
                <FlexRow
                    alignment={alignments.STRETCH}
                    spacing={spacingOptions.MD}
                >
                    {children}
                </FlexRow>
            }
        />
    );
}

NavCard.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
};
