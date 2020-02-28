import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../buttons/Button";
import HR, { spacings } from "../general/HR";
import Chip, { chipColors, chipTypes } from "../layout/Chip";
import { inStateContainer, toggleTransform } from "../utils/StateContainer";
import _ from "underscore";

/**
 * @enum { string }
 * @alias ExpandableCard.statusTypes
 * @desc An enum of expandable card statuses.
 */
export const statusTypes = {
    /** info */
    INFO: "info",
    /** error */
    ERROR: "error",
};

export function ExpandableCardRow({
    children,
}) {
    return (
        <div className="expandable-card">
            <div className="expandable-card__row">
                {children}
            </div>
        </div>
    );
}

/**
 * @class ExpandableCard
 * @description Basic expandable row component.
 * @param {object} [cardAccessories]
 *      Element(s) to be displayed in top-right of card.
 * @param {object} [cardControls]
 *      Element(s) to be displayed in top-left of card.
 * @param {string} [data-id='expandable-card']
 *      The data-id attribute value applied to the element.
 * @param {object} [deleteButton]
 *      The node to be rendered as the delete button.
 * @param {string} description
 *      The description text.
 * @param {object} [editButton]
 *      The node to be rendered as the edit button.
 * @param {boolean} [isEditEnabled=true]
 *      If the edit button should be enabled or not.
 * @param {function} onDelete
 *      Function to be called when the delete button is clicked.
 * @param {function} onEditButtonClick
 *      Function to be called when the edit button is clicked.
 * @param {boolean} [showDelete=true]
 *      If the delete button should be visible or not.
 * @param {boolean} [showEdit=true]
 *      If the edit button should be visible or not.
 * @param {ExpandableCard.statusTypes} [status]
 *      The ExpandableCard.statusTypes status to show below the description.
 * @param {string} [statusText]
 *      The text to display in the status badge.
 * @param {string} subtitle
 *      Text placed immediately below the title.
 * @param {string} title
 *      The title text.
 */
class ExpandableCardStateless extends Component {
    card = null;

    _getStatusBadge(status, content) {
        switch (status) {
            case statusTypes.ERROR:
                return (
                    <Chip type={chipTypes.OUTLINE} color={chipColors.RED} data-id="status-badge">
                        {content}
                    </Chip>
                );
            case statusTypes.INFO:
                return (
                    <Chip type={chipTypes.OUTLINE} color={chipColors.DARKGREY} data-id="status-badge">
                        {content}
                    </Chip>
                );
            default:
                return null;
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.expanded !== this.props.expanded && this.props.expanded) {
            setTimeout(() => {
                this.card.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }, 100);
        }
    }

    render() {
        const {
            "data-id": dataId,

            title,
            subtitle,
            description,
            status,
            statusText,

            cardAccessories,
            cardControls,
            expanded,
            onToggle,

            onDelete,
            showDelete,
            deleteButton,

            isEditEnabled,
            showEdit,
            editButton,
            onEditButtonClick,
        } = this.props;

        const holderClassNames = classnames("expandable-card__holder", {
            "expandable-card__holder--expanded": expanded,
        });

        const classNames = classnames("expandable-card__card", {
            "expandable-card__card--expanded": expanded,
        });

        const contentClassNames = classnames("expandable-card__content", {
            "expandable-card__content--expanded": expanded,
        });

        return (
            <div className={holderClassNames} data-id={dataId}>
                <div className={classNames} ref={(ref) => this.card = ref}>
                    {expanded &&
                        <div className="expandable-card__cardControls">
                            {cardControls}
                        </div>
                    }
                    <div className="expandable-card__info">
                        <div>
                            <div className="expandable-card__title">
                                {title}
                            </div>
                            <div className="expandable-card__subtitle">
                                {subtitle}
                            </div>
                            <div className="expandable-card__description">
                                {description}
                            </div>
                            <div className="expandable-card__cardAccessories">
                                {cardAccessories}
                            </div>
                        </div>
                        <div>
                            <div className="expandable-card__chip">
                                {this._getStatusBadge(status, statusText)}
                            </div>
                        </div>
                    </div>
                    <HR spacing={spacings.MD} solid />
                    <div className="expandable-card__content-holder">
                        <div className={contentClassNames}>
                            {this.props.children}
                        </div>
                    </div>
                    <div className="expandable-card__footer">
                        <Button
                            iconName="download-box"
                            inline
                        />
                        {showDelete && (deleteButton || (
                            <Button
                                iconName="delete"
                                data-id="delete-btn"
                                inline
                                onClick={onDelete}
                            />
                        ))}
                        {showEdit && (editButton || (
                            <Button
                                iconName="edit"
                                data-id="edit-btn"
                                inline
                                onClick={onEditButtonClick}
                                disabled={!isEditEnabled}
                            />
                        ))}
                        <div className="expandable-card__expand">
                            <Button
                                iconName="expand"
                                data-id="expand-btn"
                                onClick={onToggle}
                                inline
                                noSpacing
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ExpandableCardStateless.propTypes = {
    "data-id": PropTypes.string,
    title: PropTypes.node,
    subtitle: PropTypes.node,
    description: PropTypes.node,
    status: PropTypes.oneOf(Object.values(statusTypes)),
    statusText: PropTypes.node,
    cardAccessories: PropTypes.node,
    cardControls: PropTypes.node,
    onDelete: PropTypes.func,
    showDelete: PropTypes.bool,
    deleteButton: PropTypes.node,
    isEditEnabled: PropTypes.bool,
    showEdit: PropTypes.bool,
    editButton: PropTypes.node,
    onEditButtonClick: PropTypes.func,
    expanded: PropTypes.bool,
};

ExpandableCardStateless.defaultProps = {
    "data-id": "expandable-card",
    onToggle: _.noop,
    onDelete: _.noop,
    onEditButtonClick: _.noop,
    showDelete: true,
    showEdit: true,
    isEditEnabled: true,
};

const ExpandableCard = inStateContainer([
    {
        name: "expanded",
        initial: false,
        callbacks: [
            {
                name: "onToggle",
                transform: toggleTransform
            }
        ]
    },
])(ExpandableCardStateless);

ExpandableCard.displayName = "ExpandableCard";

export default ExpandableCard;