import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";

/**
 * @typedef {Object} DashboardCardList~listData
 * @param {string} [label]
 *     Identifier for this option
 * @param {string|number} [value]
 *     Title of the button
 *
 * @class DashboardCardList
 * @desc A list of label/value data (often appears on theback of dashboard cards)
 *
 * @param {object} [Array.DashboardCardList~listData]
 *     A list of objects that renders as a list of labels and values on the back of the card
 */

const CardList = ({
    accent,
    data,
    "data-id": dataId,
}) => {
    return (
        <div className="dashboard-card__stat-list" data-id={dataId}>
            {_.map(data, row => (
                <div className="dashboard-card__stat-row" key={row.label}>
                    <div className="dashboard-card__stat-row-label">
                        {row.label}
                    </div>
                    <div className="dashboard-card__stat-row-number" accent={accent}>
                        {row.value}
                    </div>
                </div>
            ))}
        </div>
    );
};

CardList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
};

CardList.defaultProps = {
    data: []
};

export default CardList;