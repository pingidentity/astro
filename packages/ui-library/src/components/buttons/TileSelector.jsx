import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import TileButton from "./TileButton";
import TilePanel from "./TilePanel";

const getPanelPosition = (options, selected) => {
    const selectedPosition = options.findIndex(({ id }) => id === selected);
    return (selectedPosition + 1) <= Math.ceil(options.length / 2)
        ? "left"
        : "right";
};

/**
 * @typedef {Object} TileSelector~ButtonData
 * @param {string} [description]
 *     The blob of text between the icon and the title
 * @param {string} [iconName]
 *     The name of the icon
 * @param {string} [id]
 *     Identifier for this option
 * @param {string} [title]
 *     Title of the button
 *
 * @class TileSelector
 * @desc A single-selection component with big icons and titles.
 *
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {string} [data-id="tile-selector"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {function} [onValueChange]
 *     Handler for when the value changes. The first argument is the new chosen id.
 *     The second argument is the event object.
 * @param {Array.TileSelector~ButtonData} [options]
 *     List of options
 * @param {string} [selected]
 *     Id of the selected option.
 *
 * @example
 * <TileSelector
 *     onValueChange={value => this.setState({selected: value})}
 *     selected={this.state.selected}
 *     options={[
 *         {
 *             id: "webapp",
 *             title: "Web App",
 *             iconName: "network",
 *             description: "Cloud-based apps that are accessed within a browser."
 *         },
 *         {
 *             id: "native",
 *             title: "Native App",
 *             iconName: "device",
 *             description: "Applications that are stored and run from a device or desktop."
 *         },
 * />
 *
 */

const TileSelector = ({
    "data-id": dataId,
    className,
    children,
    onValueChange,
    options,
    selected
}) => {
    const [buttons, panel] = options.reduce((
        [buttonsAcc, activePanel],
        {
            description,
            iconName,
            id,
            title,
            panel: optionPanel
        }
    ) => {
        const handleChange = e => onValueChange(id, e);
        const isSelected = selected === id;

        return [
            [
                ...buttonsAcc,
                (
                <TileButton
                    key={id}
                    data-id={`${dataId}-button-${id}`}
                    title={title}
                    iconName={iconName}
                    selected={isSelected}
                    onClick={handleChange}
                    panel={optionPanel ? true : false}
                >
                    {description}
                </TileButton>
                )
            ],
            (optionPanel && isSelected)
                ? <TilePanel
                    {...optionPanel}
                    tileId={id}
                    position={getPanelPosition(options, selected)}
                />
                : activePanel
        ];
    }, [[], null]);

    return (
        <div data-id={dataId}>
            <div className={classnames("tile-selector", className)}>
                {children}
                {buttons}
            </div>
            {panel}
        </div>
    );
};

TileSelector.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    onValueChange: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            iconName: PropTypes.string,
            panel: PropTypes.shape({
                className: PropTypes.string,
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                ]),
                label: PropTypes.string,
                options: PropTypes.oneOfType([
                    PropTypes.arrayOf(
                        PropTypes.shape({
                            buttonLabel: PropTypes.string.isRequired,
                            content: PropTypes.node.isRequired,
                            id: PropTypes.oneOfType([
                                PropTypes.number,
                                PropTypes.string,
                            ]),
                            label: PropTypes.string.isRequired,
                            onButtonClick: PropTypes.func
                        })
                    ),
                    PropTypes.node
                ])
            }),
            title: PropTypes.string
        })
    ),
    selected: PropTypes.string
};

TileSelector.defaultProps = {
    "data-id": "tile-selector",
    options: []
};

TileSelector.TileButton = TileButton;

export default TileSelector;
