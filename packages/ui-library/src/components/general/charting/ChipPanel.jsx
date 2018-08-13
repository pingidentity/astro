import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";

const click = onClick => id => e => {
    if (onClick) {
        onClick(id, e);
    }
};

const renderChips = (chips, onClick) => chips.map(({ className = "", id, name }, idx) => (
    <div className={classnames(className, "chip-panel__chip")} key={`${name}-${idx}`} onClick={onClick(id)} >
        <span>{ name }</span>
        <Icon className="chip-panel__chip__icon" iconName="clear" />
    </div>
));

/**
* @class ChipPanel
* @desc A panel that displays chips.
*
* @param {string} [data-id="chip-panel"]
*     The data-id assigned to the top-most container of the component.
* @param {string} [className]
*     A url to an image to display in the background of the component.
* @param {array} [chips]
*     An array of objects each with an id, a name and an optional class name; these are displayed
*     as chips.
*/

const ChipPanel = ({
    "data-id": dataId,
    className,
    chips,
    onClick
}) => (
    <div className={classnames(className, "chip-panel")} data-id={dataId}>
        {renderChips(chips, click(onClick))}
    </div>
);

ChipPanel.propTypes = {
    chips: PropTypes.arrayOf(
        PropTypes.shape({
            className: PropTypes.string,
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
            name: PropTypes.string.isRequired
        })
    ),
    className: PropTypes.string,
    "data-id": PropTypes.string
};

ChipPanel.defaultProps = {
    chips: [],
    "data-id": "chip-panel",
};

export default ChipPanel;