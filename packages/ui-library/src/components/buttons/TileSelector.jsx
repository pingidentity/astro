import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";
import TileButton from "./TileButton";

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

const TileSelector = props => (
    <div className={classnames("tile-selector", props.className)} data-id={props["data-id"]}>
        {props.children}
        {props.options &&
            _.map(props.options, option => {
                const handleChange = e => props.onValueChange(option.id, e);

                return (
                    <TileButton
                        key={option.id}
                        data-id={`${props["data-id"]}-button-${option.id}`}
                        title={option.title}
                        iconName={option.iconName}
                        selected={props.selected === option.id}
                        onClick={handleChange}
                    >
                        {option.description}
                    </TileButton>
                );
            })}
    </div>
);

TileSelector.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    onValueChange: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            iconName: PropTypes.string,
            id: PropTypes.string,
            title: PropTypes.string
        })
    ),
    selected: PropTypes.string
};

TileSelector.defaultProps = {
    "data-id": "tile-selector"
};

export default TileSelector;
