import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @class DashboardCardTitle
 * @desc A card that displays a place holder on a dashboard card.
 *
 * @param {string} [className]
 *     Custom class names
 * @param {string} [title]
 *      title for the the card
 * @param {bool} [backTitle]
 *      boolean to control the styling of the title on the back of the card.
 * @example
 * <DashboardCardTitle
 *      title="Iron Man"
 * />
 *
 * */


const DashboardCardTitle = ({
    title,
    "data-id": dataId,
    children,
    className,
    backTitle
}) => {
    const dashboardTitleClassName = classnames(
        "dashboard-card__title",
        className, {
            "dashboard-card--back-title": backTitle
        });
    return (
        <div className={dashboardTitleClassName} data-id={dataId}>
            { title }
            {children ? <div className="dashboard-card__title-accessories">
                { children}
            </div>
                : null
            }
        </div>
    );
};


DashboardCardTitle.propTypes = {
    "data-id": PropTypes.string,
    title: PropTypes.string,
    backTitle: PropTypes.bool
};

export default DashboardCardTitle;