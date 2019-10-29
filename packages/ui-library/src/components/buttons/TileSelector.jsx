import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import TileButton, { types as buttonTypes } from "./TileButton";
import TileGroup from "./TileGroup";
import TilePanel from "./TilePanel";

const getPanelPosition = (options, selected) => {
    const selectedPosition = options.findIndex(({ id }) => id === selected);
    return (selectedPosition + 1) <= Math.ceil(options.length / 2)
        ? "left"
        : "right";
};

const selectorTypes = {
    ROW: "row",
    SQUARE: "square",
    STACKED: "stacked",
};

/**
 * @typedef {Object} TileSelector~ButtonData
 * @param {string} [description]
 *     The blob of text between the icon and the title
 * @param {node} [icon]
 *     Node for custom icon
 * @param {string} [iconName]
 *     The name of the icon
 * @param {string} [id]
 *     Identifier for this option
 * @param {string} [title]
 *     Title of the button
 * @param {object} [link]
 *     Object with text and onClick that becomes a link below the content
 * @param {string} [note]
 *     A bit of gray text that shows up in the top-right corner of a side-icon tile
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
 * @param {string} [type="row"]
 *     If "stacked", the tiles will be full width and arranged in a column
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

/* istanbul ignore next  */
const getTilePanel = () => {
    const tileSelector = document.querySelector(".tile-button--selected");
    if (tileSelector) {
        return document.querySelector(".tile-panel").scrollIntoView(
            { behavior: "smooth", block: "end", inline: "nearest" }
        );
    }
};

const renderOptions = ({
    "data-id": dataId,
    onValueChange,
    options: propsOptions,
    selected,
    type
}) => options => options.reduce((
    [buttonsAcc, activePanel],
    {
        description,
        icon,
        iconName,
        id,
        note,
        title,
        link,
        panel: optionPanel,
        details,
    }
) => {
    const handleChange = e => onValueChange(id, e);
    const isSelected = selected === id;
    /* istanbul ignore next  */
    const scrollAndClick = (data) => {
        if ( optionPanel ) {
            getTilePanel();
        }
        handleChange(data.target);
    };

    return [
        [
            ...buttonsAcc,
            (
                <TileButton
                    key={id}
                    data-id={`${dataId}-button-${id}`}
                    title={title}
                    icon={icon}
                    iconName={iconName}
                    selected={isSelected}
                    onClick={scrollAndClick}
                    panel={optionPanel ? true : false}
                    details={details}
                    type={type === "stacked" ? "side-icon" : "top-icon"}
                    link={link}
                    note={note}
                >
                    {description}
                </TileButton>
            )
        ],
        (optionPanel && isSelected)
            ? <TilePanel
                {...optionPanel}
                tileId={id}
                // Pass in options from props here because, when grouped,
                // the panel needs to calculate its position based the the total
                // number of options
                position={getPanelPosition(propsOptions, selected)}
            />
            : activePanel
    ];
}, [[], undefined]);


const renderGroupedOptions = props => {
    const {
        groups,
        options,
        type
    } = props;
    // Group options by their group id
    const grouped = _.groupBy(options, "group");
    const render = renderOptions(props);

    return Object.entries(grouped).reduce((
        [groupsAcc, activePanel],
        [id, fromGroup]
    ) => {
        // Render all options from group
        // Active panel maintains the same value once it's defined
        const [
            childOpts,
            panel = activePanel,
        ] = render(fromGroup);

        const { title } = groups.find(group => group.id === id) || {};

        // Return active panel and add new group list of other groups
        return [
            [
                ...groupsAcc,
                <TileGroup
                    key={id}
                    title={title}
                    type={type}
                >
                    {childOpts}
                </TileGroup>
            ],
            panel
        ];
    }, [[], undefined]);
};

const TileSelector = props => {
    const {
        "data-id": dataId,
        className,
        children,
        groups,
        options,
        type
    } = props;
    const [buttons, panel] = groups ? renderGroupedOptions(props) : renderOptions(props)(options);

    return (
        <div data-id={dataId}>
            <div className={classnames("tile-selector", className, {
                "tile-selector--stacked": type === "stacked",
            })}>
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
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    ),
    onValueChange: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            details: PropTypes.arrayOf(PropTypes.string),
            group: PropTypes.string,
            icon: PropTypes.node,
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
                            onButtonClick: PropTypes.func,
                            note: PropTypes.string,
                            link: PropTypes.shape({
                                text: PropTypes.string,
                                onClick: PropTypes.func,
                            })
                        })
                    ),
                    PropTypes.node
                ])
            }),
            title: PropTypes.string
        })
    ),
    selected: PropTypes.string,
    type: PropTypes.oneOf([ "stacked", "row" ]),
};

TileSelector.defaultProps = {
    "data-id": "tile-selector",
    onValueChange: () => {},
    options: [],
    type: "row",
};

TileSelector.TileButton = TileButton;
TileSelector.tileButtonTypes = buttonTypes;
TileSelector.TileGroup = TileGroup;
TileSelector.selectorTypes = selectorTypes;

export default TileSelector;
