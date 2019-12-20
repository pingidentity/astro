import React from "react";
import classnames from "classnames";

/**
 * @class ContentArea
 * @desc The main content area below the HeaderBar and next to the LeftNavBar
 *
 * @param {string} [data-id]
 *      To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *     Class name(s) to add to the top-level container/div.
 */

const ContentArea = ({
    children,
    className,
    "data-id": dataId,
}) => (<div data-id={dataId} className={classnames("content-area", className)}>{children}</div>);

export default ContentArea;