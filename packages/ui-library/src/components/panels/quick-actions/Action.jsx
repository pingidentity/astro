import React, { useContext } from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";
import classnames from "classnames";
import { useFocusOutline } from "../../../util/KeyboardUtils";
import { getClickableA11yProps } from "../../../util/PropUtils";
import Icon, { iconTypes } from "../../general/Icon";
import Text, { textTypes } from "../../general/Text";
import QuickActionsContext, { actionColorSchemes } from "./context/QuickActionsContext";

/**
 * @callback Action~onClick
 * @param {string} id
 *   The ID of the Action.
 * @param {Object} event
 *   The click event object.
 */

/**
 * @callback Action~onMouseLeave
 * @param {string} id
 *   The ID of the Action.
 * @param {Object} event
 *   The mouseleave event object.
 */

/**
 * @callback Action~onMouseOver
 * @param {string} id
 *   The ID of the Action.
 * @param {Object} event
 *   The mouseover event object.
 */

/**
 * @class Action
 * @desc An individual Quick Action, specifically the icon and label
 * @memberof QuickActions
 *
 * @param {string} [className]
 *   A class name applied at the component's top level.
 * @param {string} [cornerIcon]
 *   If provided, shows an icon in the upper-right corner of the Action.
 * @param {string} [data-id]
 *   A data-id test hook applied at the root element.
 * @param {string} iconName
 *   The name of the icon for the action.
 * @param {Object} [label]
 *   The label for the action.
 * @param {QuickActions~onClick} [onClick]
 *   Callback triggered when an Action is clicked.
 * @param {QuickActions~onMouseEnter} [onMouseEnter]
 *   Callback triggered when the mouse enters an Action.
 * @param {QuickActions~onMouseLeave} [onMouseLeave]
 *   Callback triggered when the mouse leaves an Action.
 */

export default function Action({
    className,
    cornerIcon,
    "data-id": dataId,
    iconName,
    id,
    label,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) {
    useFocusOutline();

    const handleClick = e => onClick(id, e);
    const colorScheme = useContext(QuickActionsContext);
    const isInverted = colorScheme === actionColorSchemes.INVERTED;

    return (
        <div
            className={classnames("quick-actions__action-card", "focusable-element", className)}
            data-id={dataId}
            onClick={handleClick}
            {...getClickableA11yProps(handleClick)}
            onMouseEnter={e => onMouseEnter(id, e)}
            onMouseLeave={e => onMouseLeave(id, e)}
        >
            <div
                className={classnames(
                    "quick-actions__action-icon-base",
                    {
                        "quick-actions__action-icon-base--inverted": isInverted
                    }
                )}>
                {cornerIcon &&
                    <Icon
                        className="quick-actions__corner-icon"
                        iconName={cornerIcon}
                        type={iconTypes.INLINE}
                    />
                }
                <Icon
                    className={classnames(
                        "quick-actions__action-icon",
                        {
                            "quick-actions__action-icon--inverted": isInverted
                        }
                    )}
                    data-id="quick-action"
                    iconName={iconName}
                />
            </div>
            <Text
                align={Text.alignments.CENTER}
                className={classnames(
                    "quick-actions__action-label",
                    {
                        "quick-actions__action-label--inverted": isInverted
                    }
                )}
                type={textTypes.NORMALCASELABEL}
            >
                {label}
            </Text>
        </div>
    );
}

Action.propTypes = {
    className: PropTypes.string,
    cornerIcon: PropTypes.string,
    "data-id": PropTypes.string,
    disabled: PropTypes.bool,
    iconName: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.node,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

Action.defaultProps = {
    "data-id": "quick-action",
    disabled: false,
    onClick: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
};
