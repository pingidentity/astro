import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @class StatCardRow
 * @desc A row of StatCards. Provides the .stat-card-row class
 * @see StatCard
**/

const StatCardRow = props => (
    <div className={classnames("dashboard-card-row", props.className)} data-id={props["data-id"]}>
        {props.children}
    </div>
);

StatCardRow.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string
};

StatCardRow.defaultProps = {
    "data-id": "stat-card-row"
};

export default StatCardRow;
