import React from "react";
import PropTypes from "prop-types";
import { getIconClassName } from "../../util/PropUtils";
import classnames from "classnames";
import Link from "../general/Link";


const handleMouseDown = (e) => e.preventDefault(); //prevent focus halo when clicking
export const types = {
    SIDEICON: "side-icon",
    SQUARE: "square",
    TOPICON: "top-icon"
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
 * @param {string} [type]
 *     Format of the tile can be "top-icon" or "side-icon"
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
    panel,
    selected,
    title,
    type,
    ...props
}) => {
    const isSquare = type === types.SQUARE;
    const isSideIcon = type === types.SIDEICON;
    const iconClassName = getIconClassName(props);
    const renderedIcon = iconClassName
        ? <div className={classnames("tile-button__icon", iconClassName)}/>
        : props.icon;

    const classNames = classnames("tile-button", className, {
        "tile-button--selected": selected,
        "tile-button--side-icon": isSideIcon,
        "tile-button--square": isSquare
    },
    (panel && selected) ? "tile-button--panel" : ""
    );

    const renderedDetails = (
        details && [
            <div className="tile-button__divider" key="divider" />,
            <ul key="details" className="tile-button__details">
                {details.map(detail => <li key={detail}>{detail}</li>)}
            </ul>
        ]
    );

    const renderedNote = (
        note && <div className="tile-button__note">{note}</div>
    );

    const renderedTitle = (
        title &&
            <div
                key="title"
                className={classnames(
                    "tile-button__title",
                    isSquare ? "tile-button__title--square" : ""
                )}
            >
                {title}
                {renderedNote}
            </div>
    );

    const renderedContent = (
        <div key="content" className="tile-button__content">
            {children}
        </div>
    );

    const renderLink = (
        link && <Link className="tile-button__link" onClick={link.onClick} data-id={`${dataId}-link`}>{link.text}</Link>
    );

    return (
        <button className={classNames} data-id={dataId} onClick={onClick} onMouseDown={handleMouseDown}>
            {renderedIcon &&
                <div
                    className={classnames(
                        "tile-button__icon-container",
                        isSquare ? "tile-button__icon-container--square" : ""
                    )}
                >
                    {renderedIcon}
                </div>
            }
            {isSideIcon
                ? (
                    <div className="tile-button__content-container">
                        {renderedTitle}
                        {renderedContent}
                        {renderLink}
                        {renderedDetails}
                    </div>
                ) : (
                    [renderedContent, renderedDetails, renderedTitle]
                )
            }
        </button>
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
    type: types.TOPICON,
};

export default TileButton;
