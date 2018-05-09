import React from "react";
import PropTypes from "prop-types";
import LineChartIcon from "./icons/LineChartIcon";
import DataListIcon from "./icons/DataListIcon";
import classnames from "classnames";

/**
 * @class ViewToggle
 * @desc The control that flips views for charts and cards
 *
 * @param {array} [data-id="view-toggle"]
 * @param {function} [onToggle]
 *     Handles the toggle event
 * @param {boolean} [toggled]
 *     Whether it's toggled or not
 *
 * @example
 * <ViewToggle onToggle={this._handleFlip} toggled={this.state.flipped} />
 *
 */

const ViewToggle = props => {
    const classes = classnames("view-toggle", {
        "view-toggle--toggled": props.toggled
    });

    return (
        <button className={classes} onClick={props.onToggle} data-id={props["data-id"]}>
            <div className="view-toggle__icon"><LineChartIcon/></div>
            <div className="view-toggle__icon"><DataListIcon/></div>
        </button>
    );
};

ViewToggle.propTypes = {
    "data-id": PropTypes.string,
    onToggle: PropTypes.func,
    toggled: PropTypes.bool
};

ViewToggle.defaultProps = {
    "data-id": "view-toggle",
};

export default ViewToggle;
