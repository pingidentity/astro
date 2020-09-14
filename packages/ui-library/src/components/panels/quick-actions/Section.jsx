import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Title } from "../../layout/NavCard";
import FlexRow, { alignments, wrapOptions } from "../../layout/FlexRow";
import QuickActionsContext, { actionColorSchemes } from "./context/QuickActionsContext";

/**
 * @class Section
 * @desc A section containing multiple Quick Actions.
 * @memberof QuickActions
 *
 * @param {string} [className]
 *   A class name applied at the component's top level.
 * @param {string} [data-id]
 *   A data-id test hook applied at the root element.
 * @param {Object} [children]
 *   The Quick Actions displayed in the section. This is set
 *   up with a flex display, so multiple Quick Actions put into
 *   a separate container element and then passed as children here
 *   may not lay out as expected.
 * @param {boolean} invertColors=false
 *   If set to true, inverts the colors of all child Action components.
 * @param {Object} [title]
 *   The title for the section.
 *
 */

export default function Section({
    children,
    className,
    "data-id": dataId,
    invertColors,
    title,
}) {

    return (
        <div className={classnames("quick-actions__section", className)} data-id={dataId}>
            <QuickActionsContext.Provider
                value={invertColors ? actionColorSchemes.INVERTED : actionColorSchemes.NORMAL}
            >
                <Title>{title}</Title>
                <FlexRow
                    alignment={alignments.TOP}
                    className="quick-actions__section-actions"
                    wrap={wrapOptions.WRAP}
                >
                    {children}
                </FlexRow>
            </QuickActionsContext.Provider>
        </div>
    );
}

Section.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    title: PropTypes.node
};

Section.defaultProps = {
    invertColors: false,
};