import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @class StatCardRow
 * @desc A row of StatCards. Provides the .stat-card-row class
**/

const StatCardRow = props => (
    <div className={classnames("stat-card-row", props.className)} data-id={props["data-id"]}>
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
