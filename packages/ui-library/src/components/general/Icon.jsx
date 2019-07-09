"use strict";

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getIconClassName } from "../../util/PropUtils";
import { cannonballChangeWarning } from "../../util/DeprecationUtils";


/**
 * @class Icon
 * @desc A component for displaying an icon by itself or next to next.
 *
 * @param {string} [data-id="icon"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [iconName]
 *     The name of the icon.
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {string} [type]
 *     Set to "leading" or "inline" to either provide extra spacing or not.
 * @param {string} [title]
 *     Title for the label within a stack gap.
 * @param {string} [iconSize]
 *     Size of the icon, XS, SM, MD, LG, XL, or XXL
 *     When iconSize is defined there needs to be 2 child elements for it to look right.
 *     Example on how to use the new props below
 *
 * @example
 * <Icon iconName="cog">
 *    Some text or other content that appears next to the icon.
 * </Icon>
 *
 * <Icon iconName="globe" iconSize={iconSizes.XL} title="hello">'
 *       <Stack gap="ZERO">
 *           <Text type="value">5 maximum</Text>
 *           <Text type="value">Sandbox only</Text>
 *       </Stack>
 *   </Icon>
 *
 */

const iconSizes = {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
    XXL: "xxl"
};


const Icon = ({
    className,
    children,
    "data-id": dataId,
    type,
    iconSize,
    title,
    ...props
}) => {

    const iconClassName = classnames(
        "icon__graphic",
        getIconClassName(props),
        className, {
            "icon__graphic--size-sm": iconSize === iconSizes.SM,
            "icon__graphic--size-md": iconSize === iconSizes.MD,
            "icon__graphic--size-lg": iconSize === iconSizes.LG,
            "icon__graphic--size-xl": iconSize === iconSizes.XL,
            "icon__graphic--size-xxl": iconSize === iconSizes.XXL,
        });

    if (type === "inline") {
        return <span data-id={dataId} className={getIconClassName(props)} />;
    } else if (type !== "leading" && !children) {
        cannonballChangeWarning({
            message: (
                `By default, Icon will display a simple icon when no children are provided. ` +
                `You can use this rendering behavior now by setting the 'type' prop to 'inline'. ` +
                `To display a leading icon that includes the right margin, set 'type' to 'leading'.`
            ),
        });
    }

    return (
        iconSize
            ? <div className="icon icon__container" data-id={dataId}>
                <div
                    className={iconClassName}
                    data-id={`${dataId}-graphic`}
                />
                {children && (
                    <div className="icon__content" data-id={`${dataId}-content`}>
                        <label>{title}</label>
                        {children}
                    </div>
                )}
            </div>
            : <div className="icon" data-id={dataId}>
                <div
                    className={iconClassName}
                    data-id={`${dataId}-graphic`}
                />
                {children && (
                    <div className="icon__content" data-id={`${dataId}-content`}>
                        {children}
                    </div>
                )}
            </div>
    );
};

Icon.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    iconName: PropTypes.string,
    textType: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(["leading", "inline"]),

    iconSize: PropTypes.oneOf([
        iconSizes.SM,
        iconSizes.MD,
        iconSizes.LG,
        iconSizes.XL,
        iconSizes.XXL
    ]),
};

Icon.defaultProps = {
    "data-id": "icon",
};

Icon.iconSizes = iconSizes;
export default Icon;