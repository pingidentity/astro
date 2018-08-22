import React from "react";
import PropTypes from "prop-types";
import { getIconClassName } from "../../util/PropUtils";
import classnames from "classnames";


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
 * @param {string} [iconName]
 *     The name of the icon
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
const TileButton = (props) => {
    const {
        panel,
        selected,
        title
    } = props;
    const iconClassName = getIconClassName(props);
    const classNames = classnames("tile-button", props.className, {
        "tile-button--selected": selected
    },
    (panel && selected) ? "tile-button--panel" : ""
    );

    return (
        <button className={classNames} data-id={props["data-id"]} onClick={props.onClick}>
            {iconClassName &&
                <div className={classnames("tile-button__icon", iconClassName)}/>
            }
            <div className="tile-button__content">
                {props.children}
            </div>
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
    iconName: PropTypes.string,
    onClick: PropTypes.func,
    panel: PropTypes.bool,
    title: PropTypes.string
};

TileButton.defaultProps = {
    "data-id": "tile-button"
};

export default TileButton;
