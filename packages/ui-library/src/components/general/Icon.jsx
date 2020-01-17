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
 * @param {string} [type]
 *     Set to Icon.iconTypes.LEADING or Icon.iconTypes.INLINE to either provide extra spacing or not.
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

const iconTypes = {
    INLINE: "inline",
    LEADING: "leading",
};


const Icon = withFocusOutline(({
    className,
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
                <div className="icon__content" data-id={`${dataId}-content`}>
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

export default Icon ;
