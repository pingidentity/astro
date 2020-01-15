import React, { Fragment } from "react";
import PropTypes from "prop-types";
import CollapsibleLink from "../general/CollapsibleLink";
import { inStateContainer, toggleTransform } from "../utils/StateContainer";
import { defaultRender } from "../../util/PropUtils";
import { usesFragments } from "../../util/DependencyUtils";

usesFragments("ShowMore");

/**
* @class ShowMore
* @desc ShowMore and ShowSome are components to show only part of the data and then provide the option to see more.
*
* @param {string} [data-id="show-more"]
*     This is the data-id for the toggle link.
* @param {boolean} [expanded]
*     Whether the hidden content is revealed.
*     When not provided, the component will manage this value.
* @param {string} [hideLabel]
*     The text shown in the collapsible link when the action is to hide.
* @param {function} [onToggle]
*     Callback for the toggle event.
* @param {function} [renderToggle]
*     Render function that can be used to override how the CollapsibleLink is rendered.
*     The function receives an object of props.
* @param {string} [showLabel]
*     The text shown in the collapsible link when the action is to show.
*
*/

const ShowMoreStateless = ({
    children,
    "data-id": dataId,
    expanded,
    hideLabel,
    onToggle,
    renderToggle,
    showLabel,
}) => (
    expanded
        ? (
            <Fragment>
                {children}
                {renderToggle({
                    "data-id": dataId,
                    key: "toggle-link",
                    title: hideLabel,
                    expanded: true,
                    onToggle,
                    block: true,
                    noSpacing: true,
                }, CollapsibleLink)}
            </Fragment>
        )
        : renderToggle({
            "data-id": dataId,
            key: "toggle-link",
            title: showLabel,
            expanded: false,
            onToggle,
            block: true,
            noSpacing: true,
        }, CollapsibleLink)
);

const ShowMore = inStateContainer([
    {
        name: "expanded",
        initial: false,
        callbacks: [
            {
                name: "onToggle",
                transform: toggleTransform,
            }
        ],
    }
])(ShowMoreStateless);

ShowMoreStateless.propTypes = {
    "data-id": PropTypes.string,
    expanded: PropTypes.bool,
    renderToggle: PropTypes.func,
    showLabel: PropTypes.string,
    hideLabel: PropTypes.string,
};

ShowMoreStateless.defaultProps = {
    "data-id": "show-more",
    expanded: false,
    renderToggle: defaultRender,
    showLabel: "Show More",
    hideLabel: "Show Less",
};

/**
* @class ShowSome
* @desc ShowSome uses ShowMore to show only a few items in a list, along with a link to see the rest.
* @memberof ShowMore
*
* @param {number} [count=10]
*     The number of items that will be shown initially.
* @param {string} [data-id="show-some"]
*     This is the data-id for the toggle link.
* @param {boolean} [expanded]
*     Whether the hidden content is revealed.
*     When not provided, the component will manage this value.
* @param {string} [hideLabel]
*     The text shown in the collapsible link when the action is to hide.
* @param {array} [items]
*     List of all the items that should be rendered.
* @param {function} [onToggle]
*     Callback for the toggle event.
* @param {function} [renderToggle]
*     Render function that can be used to override how the CollapsibleLink is rendered.
*     The function receives an object of props.
* @param {string} [showLabel]
*     The text shown in the collapsible link when the action is to show.
*
*/

export const ShowSome = ({
    count,
    "data-id": dataId,
    expanded,
    hideLabel,
    items,
    onToggle,
    renderMore,
    renderToggle,
    showLabel,
}) => (
    <>
        {items.map((item, index) => index < count ? item : null)}
        {items.length >= count &&
            renderMore(
                {
                    children: items.map((item, index) => index < count ? null : item),
                    "data-id": dataId,
                    expanded,
                    hideLabel,
                    onToggle,
                    renderToggle,
                    showLabel,
                },
                ShowMore
            )
        }
    </>
);

ShowSome.propTypes = {
    count: PropTypes.number,
    "data-id": PropTypes.string,
    hideLabel: PropTypes.string,
    items: PropTypes.array,
    renderMore: PropTypes.func,
    showLabel: PropTypes.string,
};

ShowSome.defaultProps = {
    count: 10,
    "data-id": "show-some",
    hideLabel: "Show Fewer",
    items: [],
    renderMore: defaultRender,
};

export default ShowMore;