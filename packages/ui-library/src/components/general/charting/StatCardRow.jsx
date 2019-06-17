import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @class StatCardRow
 * @desc A row of StatCards. Provides the .stat-card-row class
 * @see StatCard
*/

const StatCardRow = props => (
    <div
        className={
            classnames(
                "dashboard-card-row",
                props.className,
                {
                    "dashboard-card-row--content-left": props.alignCards === "left",
                    "dashboard-card-row--content-center": props.alignCards === "center",
                    "dashboard-card-row--content-right": props.alignCards === "right",
                }
            )
        }
        data-id={props["data-id"]}
    >
        {props.children}
    </div>
);

StatCardRow.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    alignCards: PropTypes.oneOf([
        "left",
        "center",
        "right"
    ]),
};

StatCardRow.defaultProps = {
    "data-id": "stat-card-row"
};

export default StatCardRow;
