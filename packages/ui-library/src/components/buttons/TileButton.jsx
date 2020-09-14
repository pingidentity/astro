import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import Link from "../general/Link";
import Text, { textTypes } from "../general/Text";
import TileSelectorContext from "./TileSelectorContext";
import FlexRow, { alignments, flexDirectionOptions, spacingOptions } from "../layout/FlexRow";

import { getClickableA11yProps, getIconClassName } from "../../util/PropUtils";

export const types = {
    SIDEICON: "side-icon",
    SQUARE: "square",
    TOPICON: "top-icon",
    // Types below are here to match the TileSelector and TileGroup types to avoid confusion
    STACKED: "side-icon",
    ROW: "top-icon",
    STACKEDSMALL: "stacked-small",
};

const TileButtonContent = ({
    children,
    className
}) => !React.Children.toArray(children).every(child => child === undefined) ? (
    <div className={classnames("tile-button__content", className)}>
        {children}
    </div>
) : null;

const TileButtonIcon = ({
    className,
    iconClassName,
    icon,
}) => {
    if (!icon) {
        return null;
    }
    const renderedIcon = _.isString(icon)
        ? <div className={classnames("tile-button__icon", icon, iconClassName)}/>
        : icon;

    return (
        <div
            className={classnames(
                "tile-button__icon-container",
                className
            )}
        >
            {renderedIcon}
        </div>
    );
};

const TileButtonTitle = ({
    children,
    className,
    note
    // If all children are undefined, don't create a div
}) => !React.Children.toArray(children).every(child => child === undefined) ? (
    <div
        className={classnames(
            "tile-button__title",
            className
        )}
    >
        {children}
        {note}
    </div>
) : null;

export const SquareButton = ({
    children,
    className,
    "data-id": dataId,
    details,
    icon,
    note,
    onClick,
    onMouseEnter,
    onMouseLeave,
    title
}) => {
    const classNames = classnames("tile-button--square", className);

    return (
        <button
            className={classNames}
            data-id={dataId}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...getClickableA11yProps(onClick)}
        >
            <TileButtonIcon
                className="tile-button__icon-container--square"
                icon={icon}
            />
            <TileButtonContent>
                {children}
            </TileButtonContent>
            {details}
            <TileButtonTitle className="tile-button__title--square">
                {title}
                {note}
            </TileButtonTitle>
        </button>
    );
};

export const RowButton = ({
    children,
    className,
    "data-id": dataId,
    details,
    icon,
    note,
    onClick,
    onMouseEnter,
    onMouseLeave,
    title
}) => {
    return (
        <div
            className={className}
            data-id={dataId}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...getClickableA11yProps(onClick)}
        >
            <TileButtonIcon
                icon={icon}
            />
            <TileButtonContent>
                {children}
            </TileButtonContent>
            {details}
            <TileButtonTitle>
                {title}
                {note}
            </TileButtonTitle>
        </div>
    );
};

export const StackedButton = ({
    children,
    className,
    "data-id": dataId,
    details,
    icon,
    link,
    note,
    onClick,
    onMouseEnter,
    onMouseLeave,
    title,
}) => {
    const classNames = classnames("tile-button--side-icon", className);

    return (
        <div
            className={classNames}
            data-id={dataId}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...getClickableA11yProps(onClick)}
        >
            <TileButtonIcon
                icon={icon}
            />
            <div className="tile-button__content-container">
                <FlexRow
                    alignment={alignments.STRETCH}
                    flexDirection={flexDirectionOptions.COLUMN}
                    spacing={spacingOptions.SM}
                >
                    <TileButtonTitle>
                        {title}
                        {note}
                    </TileButtonTitle>
                    <TileButtonContent>
                        {children}
                    </TileButtonContent>
                    {link}
                </FlexRow>
                {details}
            </div>
        </div>
    );
};

export const StackedSmallButton = ({ className, ...others }) => (
    <StackedButton
        className={[className, "tile-button--stacked-small"].filter(Boolean).join(" ")}
        {...others}
    />
);

export const ActionButton = ({
    children,
    className,
    "data-id": dataId,
    icon,
    onClick,
    onMouseEnter,
    onMouseLeave,
    title,
}) => {
    const classNames = classnames("tile-button--action", className);
    const renderedIcon = _.isString(icon)
        ? <div className={classnames("tile-button__icon", "tile-button__icon--action", icon)}/>
        : icon;

    return (
        <div
            className={classNames}
            data-id={dataId}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...getClickableA11yProps(onClick)}
        >
            {renderedIcon}
            <Text
                align={Text.alignments.CENTER}
                className="tile-button__action-title"
                type={textTypes.PRIMARY}
            >
                {title}
            </Text>
            <Text
                align={Text.alignments.CENTER}
                type={textTypes.BODY}
            >
                {children}
            </Text>
        </div>
    );
};

const selectorButtonTypes = {
    row: RowButton,
    square: SquareButton,
    stacked: StackedButton,
    "stacked-small": StackedSmallButton,
    action: ActionButton,
    // These are only necessary because the TileButton does not use the same
    // keyword values as the TileSelector.
    "side-icon": StackedButton,
    "top-icon": RowButton
};

/**
 * @class TileButton
 * @desc A single-selection component with big icons and titles.
 *
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {string} [data-id="tile-button"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [description]
 *     The blob of text between the icon and the title
 * @param {string[]} [details]
 *     A list of details displayed below the main content.
 * @param {string} [iconName]
 *     The name of the icon
 * @param {node} [icon]
 *     Node for Icon
 * @param {function} [onClick]
 *     Click handler
 * @param {bool} [panel]
 *     A boolean that indicates whether to show an arrow for the TilePanel
 * @param {string} [title]
 *     Title of the button
 * @param {string} type="top-icon"
 *     Format of the tile can be "top-icon", "side-icon" or "square"
 * @param {object} [link]
 *     Object with text and onClick that becomes a link below the content
 * @param {string} [note]
 *     A bit of gray text that shows up in the top-right corner of a side-icon tile
 *
 * @example
 * <TileButton title="Non-Interactive" iconName="server">
 *     Cloud-based apps that are accessed within a browser.
 * </TileButton>
 *
 */
const TileButton = ({
    children,
    className,
    "data-id": dataId,
    details,
    link,
    note,
    onClick,
    onMouseEnter,
    onMouseLeave,
    panel,
    renderButton,
    selected,
    title,
    type,
    ...props
}) => {
    const typeFromContext = useContext(TileSelectorContext);

    // For backwards compatibility, look to see if type is defined first. If it's not,
    // check for context and use that context if it's defined. Otherwise, just default to a row button.
    const ButtonToRender = selectorButtonTypes[type || typeFromContext || types.ROW];
    const iconClassName = getIconClassName(props);

    const classNames = classnames("tile-button", className, {
        "tile-button--selected": selected,
    },
    (panel && selected) ? "tile-button--panel" : ""
    );

    const renderedDetails = (
        details && <>
            <div className="tile-button__divider" key="divider" />
            <ul className="tile-button__details">
                {details.map(detail => <li key={detail}>{detail}</li>)}
            </ul>
        </>
    );

    const renderedNote = (
        note && <div className="tile-button__note">{note}</div>
    );

    const renderedLink = (
        link && <Link className="tile-button__link" onClick={link.onClick} data-id={`${dataId}-link`}>{link.text}</Link>
    );

    return (
        <ButtonToRender
            className={classNames}
            data-id={dataId}
            details={renderedDetails}
            icon={iconClassName || props.icon}
            link={renderedLink}
            note={renderedNote}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            title={title}
        >
            {children}
        </ButtonToRender>
    );
};

TileButton.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    description: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.string),
    icon: PropTypes.node,
    iconName: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    panel: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.oneOf(Object.values(types)),
    note: PropTypes.string,
    link: PropTypes.shape({
        text: PropTypes.string,
        onClick: PropTypes.func,
    })
};


TileButton.defaultProps = {
    "data-id": "tile-button",
    onClick: _.noop,
};

export const TopContent = ({
    left,
    right,
}) => (
    <div className="tile-button__top" onClick={(e) => e.stopPropagation()}>
        <div className="tile-button__top-left">{left}</div>
        <div className="tile-button__top-right">{right}</div>
    </div>
);

TopContent.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
};

export const TileGrid = ({
    children,
    columns,
}) => (
    <div className={classnames("tile-button__grid", {
        "tile-button__grid--2-cols": columns === 2,
    })}>
        {children}
    </div>
);

export const Badge = ({
    expanded,
    "data-id": dataId,
    icon,
    active,
    label,
    onClick,
}) => {
    const classNames = classnames("feature-badge", {
        "feature-badge--expanded": expanded,
        "feature-badge--inactive": !active,
    });

    const iconClassNames = classnames("feature-badge__icon", `icon-${icon}`);

    return (
        <div
            data-id={dataId}
            className={classNames}
            onClick={onClick}
        >
            <div className={iconClassNames}></div>
            { active && <div className="feature-badge__label">{label}</div> }
        </div>
    );
};

Badge.propTypes = {
    "data-id": PropTypes.string,
    expanded: PropTypes.bool,
    active: PropTypes.bool,
    icon: PropTypes.node,
    label: PropTypes.node,
    onClick: PropTypes.func,
};

Badge.defaultProps = {
    "data-id": "badge",
    expanded: false,
    active: false,
    onClick: _.noop,
};

export default TileButton;
