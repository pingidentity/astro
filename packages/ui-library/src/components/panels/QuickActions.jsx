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
 */


export const Divider = ({ className }) => {

    return (
        <div
            className={
                classnames("quick-actions__divider", className)
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
    label,
    onClick
}) => {
    return (
        <div
            className={classnames("quick-actions__action-card", className)}
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
 */

/**
 * @callback EditButton~onClick
 * @param {Object} event
 *   The click event object.
 */

export const EditButton = ({
    className,
    "data-id": dataId,
    onClick,
}) => {
    return (
        <Button
            className={classnames("quick-actions__edit-button", className)}
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
 * @param {Object} [title]
 *   The title for the section.
 *
 */

export const Section = ({
    children,
    className,
    "data-id": dataId,
    title,
}) => {
    return (
        <div className={classnames("quick-actions__section", className)} data-id={dataId}>
            <Title>{title}</Title>
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
    title: PropTypes.node
};
