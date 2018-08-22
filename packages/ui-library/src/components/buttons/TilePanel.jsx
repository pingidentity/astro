import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "./Button";

const renderOptions = options => options.map(({
    buttonLabel,
    content,
    label
}, idx) => (
    <div className="tile-panel__option" key={`${label}-${idx}`}>
        <div>
            <div className="tile-panel__option__label">{label}</div>
            <div className="tile-panel__option__content">{content}</div>
        </div>
        <Button className="tile-panel__option__button" label={buttonLabel} />
    </div>
));

/**
 * @class TilePanel
 * @desc A panel that shows under the Tile Selector.
 *
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {string} [data-id="tile-selector-panel"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [label]
 *    The text at the top of the panel.
 * @param {object} [options]
 *    An array of objects to display on the panel, each with a label, content and a button label
 * @param {string} [position]
 *     The position of the panel. Can be either "left" or "right".
 *
 * @example
 * <TileButton title="Non-Interactive" iconName="server">
 *     Cloud-based apps that are accessed within a browser.
 * </TileButton>
 *
 */
const TilePanel = ({
    "data-id": dataId,
    className,
    label,
    options,
    position
}) => {
    return (
        <div
            className={classnames("tile-panel", `tile-panel--${position.toLowerCase()}`, className)}
            data-id={dataId}
        >
            {label && <div className="tile-panel__label">{label}</div>}
            {Array.isArray(options) && options.some(({ content }) => content !== undefined)
                ? renderOptions(options)
                : options}
        </div>
    );
};

TilePanel.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                buttonLabel: PropTypes.string.isRequired,
                content: PropTypes.node.isRequired,
                label: PropTypes.string.isRequired,
            })
        ),
        PropTypes.node
    ]),
    position: PropTypes.oneOf([
        "left",
        "right"
    ])
};

TilePanel.defaultProps = {
    "data-id": "tile-selector-panel",
    position: "left"
};

export default TilePanel;