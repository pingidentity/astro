import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../buttons/Button";
import HR, { spacings } from "../general/HR";
import { defaultRender } from "../../util/PropUtils";
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
 * @param {object} [collapsedContent]
 *      Element(s) to be shown when the card is collapsed.
 * @param {object} [cardAccessories]
 *      Element(s) to be displayed in top-right of card.
 * @param {object} [cardControls]
 *      Element(s) to be displayed in top-left of card.
 * @param {string} [data-id='expandable-card']
 *      The data-id attribute value applied to the element.
 * @param {function} renderToggle
 *      Render prop for the toggle button
 * @param {boolean} [expanded]
 *      Sets the card's expanded state.
 * @param {function} [onToggle]
 *      Callback for when the card is open/closed.
 * @param {string} [title]
 *      The title text.
 */
class ExpandableCardStateless extends Component {
    card = null;

    componentDidUpdate = (prevProps) => {
        /* istanbul ignore else */
        if (prevProps.expanded !== this.props.expanded && this.props.expanded) {
            setTimeout(() => {
                this.card.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }, 100);
        }
    }

    render() {
        const {
            "data-id": dataId,
            renderToggle,
            title,
            collapsedContent,
            cardControls,
            cardAccessories,
            expanded,
            onToggle,
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
                    <div className="expandable-card__info">
                        <div>
                            {title}
                            <div
                                className="expandable-card__description"
                                data-testid="expandable-card-collapsed-content"
                            >
                                {collapsedContent}
                            </div>
                            <div
                                className="expandable-card__cardAccessories"
                            >
                                {cardAccessories}
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
                        <div className="expandable-card__controls">
                            {cardControls}
                        </div>
                        <div className="expandable-card__expand">
                            {renderToggle({
                                iconName: "expand",
                                "data-id": "expand-btn",
                                onClick: onToggle,
                                inline: true,
                                noSpacing: true
                            }, Button)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ExpandableCardStateless.propTypes = {
    "data-id": PropTypes.string,
    cardControls: PropTypes.node,
    collapsedContent: PropTypes.node,
    title: PropTypes.node,
    cardAccessories: PropTypes.node,
    onToggle: PropTypes.func,
    expanded: PropTypes.bool,
    renderToggle: PropTypes.func,
};

ExpandableCardStateless.defaultProps = {
    "data-id": "expandable-card",
    onToggle: _.noop,
    renderToggle: defaultRender,
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
