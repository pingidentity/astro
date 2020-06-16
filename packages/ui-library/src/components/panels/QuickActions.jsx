import React from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";
import classnames from "classnames";
import Button from "../buttons/Button";
import { Title } from "../layout/NavCard";
import FlexRow, { alignments, wrapOptions } from "../layout/FlexRow";
import Icon from "../general/Icon";
import Text, { textTypes } from "../general/Text";

export { default as Container, Title } from "../layout/NavCard";

/**
 * @class Divider
 * @desc A divider to put between QuickActions.Section components.
 *
 * @param {bool} [invertColor]
 *   Whether the divider has its color inverted
 */


export const Divider = ({ className, invertColor }) => {

    return (
        <div
            className={
                classnames("quick-actions__divider", className, {
                    "quick-actions__divider--inverted": invertColor
                })
            }
        />
    );
};

/**
 * @class Action
 * @desc An individual Quick Action, specifically the icon and label
 *
 * @param {string} [className]
 *   A class name applied at the component's top level.
 * @param {string} [data-id]
 *   A data-id test hook applied at the root element.
 * @param {string} iconName
 *   The name of the icon for the action.
 * @param {bool} [invertColor]
 *   Whether the action has its color inverted
 * @param {Object} [label]
 *   The label for the action.
 *
 */

/**
 * @callback Action~onClick
 * @param {Object} event
 *   The click event object.
 */

export const Action = ({
    className,
    "data-id": dataId,
    iconName,
    invertColor,
    label,
    onClick
}) => {
    return (
        <div
            className={
                classnames("quick-actions__action-card", className, {
                    "quick-actions__action-card--inverted": invertColor
                })
            }
            data-id={dataId}
        >
            <div className="quick-actions__action-icon-base">
                <Icon
                    className="quick-actions__action-icon"
                    data-id="quick-action"
                    iconName={iconName}
                    onClick={onClick}
                />
            </div>
            <Text
                className="quick-actions__action-label"
                type={textTypes.NORMALCASELABEL}
                align={Text.alignments.CENTER}
            >
                {label}
            </Text>
        </div>
    );
};

Action.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    iconName: PropTypes.string.isRequired,
    invertColor: PropTypes.bool,
    label: PropTypes.node,
    onClick: PropTypes.func
};

Action.defaultProps = {
    "data-id": "quick-action",
    onClick: noop
};

/**
 * @class EditButton
 * @desc An edit button for the QuickActions.
 *
 * @param {string} [className]
 *   A class name applied at the component's top level.
 * @param {string} [data-id]
 *   A data-id test hook applied at the root element.
 * @param {bool} [invertColor]
 *   Whether the edit button has its color inverted
 */

/**
 * @callback EditButton~onClick
 * @param {Object} event
 *   The click event object.
 */

export const EditButton = ({
    className,
    "data-id": dataId,
    invertColor,
    onClick,
}) => {
    return (
        <Button
            className={classnames("quick-actions__edit-button", className, {
                "quick-actions__edit-button--inverted": invertColor,
            })}
            data-id={dataId}
            iconName="edit"
            inline
            onClick={onClick}
        />
    );
};

/**
 * @class Section
 * @desc A section containing multiple Quick Actions.
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
 * @param {bool} [invertColor]
 *   Whether the section has its color inverted
 * @param {Object} [title]
 *   The title for the section.
 *
 */

export const Section = ({
    children: propsChildren,
    className,
    "data-id": dataId,
    invertColor,
    title,
}) => {
    const children = React.Children.map(propsChildren, (child) => {
        return React.cloneElement(child, { invertColor });
    });

    return (
        <div className={classnames("quick-actions__section", className)} data-id={dataId}>
            <Title invertColor={invertColor}>{title}</Title>
            <FlexRow
                alignment={alignments.TOP}
                className="quick-actions__section-actions"
                wrap={wrapOptions.WRAP}
            >
                {children}
            </FlexRow>
        </div>
    );
};

Section.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    invertColor: PropTypes.bool,
    title: PropTypes.node
};
