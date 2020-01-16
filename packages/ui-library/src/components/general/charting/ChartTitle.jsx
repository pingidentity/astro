import React from "react";
import DashboardCardTitle from "./Cards/DashboardCardTitle";
import PropTypes from "prop-types";


const ChartTitle = ({ className, title, children }) => (
    <DashboardCardTitle
        className={className}
        title={title}
    >
        {children}
    </DashboardCardTitle>
);

ChartTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
};

export default ChartTitle;
