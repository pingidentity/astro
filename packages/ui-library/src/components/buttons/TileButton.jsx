import React from "react";
import PropTypes from "prop-types";
import { getIconClassName } from "../../util/PropUtils";
import classnames from "classnames";


const handleMouseDown = (e) => e.preventDefault(); //prevent focus halo when clicking

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
    onClick,
    panel,
    selected,
    title,
    ...props
}) => {
    const iconClassName = getIconClassName(props);
    const renderedIcon = iconClassName
        ? <div className={classnames("tile-button__icon", iconClassName)}/>
        : props.icon;

    const classNames = classnames("tile-button", className, {
        "tile-button--selected": selected
    },
    (panel && selected) ? "tile-button--panel" : ""
    );

    return (
        <button className={classNames} data-id={dataId} onClick={onClick} onMouseDown={handleMouseDown}>
            {renderedIcon &&
                <div className="tile-button__icon-container">
                    {renderedIcon}
                </div>
            }
            <div className="tile-button__content">
                {children}
            </div>
            {details && [
                <div className="tile-button__divider" key="divider" />,
                <ul key="details" className="tile-button__details">
                    {details.map(detail => <li>{detail}</li>)}
                </ul>
            ]}
            {title &&
                <div className="tile-button__title">
                    {title}
                </div>
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
    title: PropTypes.string
};

TileButton.defaultProps = {
    "data-id": "tile-button"
};

export default TileButton;
