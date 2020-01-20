import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withFocusOutline } from "../../util/KeyboardUtils";
import { getClickableA11yProps, getIconClassName } from "../../util/PropUtils";


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
 * @param {Icon.iconColors} [color]
 *     Use one of our semantic colors on the icon.
 * @param {Icon.iconTypes} [type]
 *     Set to Icon.iconTypes.LEADING or Icon.iconTypes.INLINE to either provide extra spacing or not.
 * @param {string} [title]
 *     Title for the label within a stack gap.
 * @param {Icon.iconSizes} [iconSize]
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

/**
 * @enum {string}
 * @alias Icon.iconsizes
 */
const iconSizes = {
    /** sm */
    SM: "sm",
    /** md */
    MD: "md",
    /** lg */
    LG: "lg",
    /** xl */
    XL: "xl",
    /** xxl */
    XXL: "xxl",
    /** alias for xxl */
    XX: "xxl"
};

/**
 * @enum {string}
 * @alias Icon.iconTypes
 * @description Simple or block-level icon
 */
const iconTypes = {
    /** inline */
    INLINE: "inline",
    /** leading */
    LEADING: "leading",
};

/**
 * @enum {string}
 * @alias Icon.iconColors
 * @description Simple or block-level icon
 */
const iconColors = {
    /** error */
    ERROR: "error",
    /** warning */
    WARNING: "warning",
    /** success */
    SUCCESS: "success",
};


const Icon = withFocusOutline(({
    className,
    color,
    containerClassName,
    children,
    "data-id": dataId,
    iconSize,
    onClick,
    title,
    type,
    ...props
}) => {

    //using camelCase instead of BEM standard because icon- is reserved by iconfont
    const baseClassName = "iconComponent";
    const graphicClassName = classnames(
        [`${baseClassName}__graphic`],
        getIconClassName(props),
        className, {
            [`${baseClassName}__graphic--size-sm`]: iconSize === iconSizes.SM,
            [`${baseClassName}__graphic--size-md`]: iconSize === iconSizes.MD,
            [`${baseClassName}__graphic--size-lg`]: iconSize === iconSizes.LG,
            [`${baseClassName}__graphic--size-xl`]: iconSize === iconSizes.XL,
            [`${baseClassName}__graphic--size-xxl`]: iconSize === iconSizes.XXL,
        });

    const onClickProps = onClick ? {
        onClick,
        // Prevent focus on click
        ...getClickableA11yProps(onClick)
    } : {};

    if ((type !== iconTypes.LEADING && !children) || (type === iconTypes.INLINE)) {
        return (
            <span
                data-id={dataId}
                className={classnames(
                    className,
                    containerClassName,
                    getIconClassName(props),
                    {
                        [`${baseClassName}--clickable`]: onClick,
                        [`${baseClassName}--size-sm`]: iconSize === iconSizes.SM,
                        [`${baseClassName}--size-md`]: iconSize === iconSizes.MD,
                        [`${baseClassName}--size-lg`]: iconSize === iconSizes.LG,
                        [`${baseClassName}--size-xl`]: iconSize === iconSizes.XL,
                        [`${baseClassName}--size-xxl`]: iconSize === iconSizes.XXL,
                        [`${baseClassName}--${color}`]: color,
                    }
                )}
                {...onClickProps}
            />
        );
    }

    return (
        <div
            className={classnames(
                containerClassName,
                baseClassName,
                "icon",
                {
                    [`${baseClassName}--clickable`]: onClick,
                    [`${baseClassName}--${color}`]: color,
                }
            )}
            data-id={dataId}
            {...onClickProps}
        >
            <div
                className={graphicClassName}
                data-id={`${dataId}-graphic`}
            />
            {(children || title) && (
                <div className={`${baseClassName}__content`} data-id={`${dataId}-content`}>
                    {title && <label>{title}</label>}
                    {children}
                </div>
            )}
        </div>
    );
});

Icon.displayName = "Icon";

Icon.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    iconName: PropTypes.string,
    textType: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(Object.values(iconTypes)),
    iconSize: PropTypes.oneOf(Object.values(iconSizes)),
};

Icon.defaultProps = {
    "data-id": "icon",
};

Icon.iconSizes = iconSizes;
Icon.iconTypes = iconTypes;
Icon.iconColors = iconColors;

export default Icon ;
