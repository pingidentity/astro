import React from "react";
import PropTypes from "prop-types";
import DashboardCard from "./DashboardCard";
import HammerIcon from "../icons/HammerIcon";
import classnames from "classnames";

/**
 * @class PlaceHolderCard
 * @desc A card that displays a place holder on a dashboard card.
 *
 * @param {string} [className]
 *     Custom class names
 * @param {string} [message]
 *      message for the front of the card
 * @example
 * <PlaceHolderCard
 *      message="We're building more data widgets. Check back soon!"
 * />
 *
 * */

const PlaceHolderCard = ({
    "data-id": dataId,
    message,
    className,
}) => {
    return (
        <DashboardCard
            data-id={dataId}
            className={classnames("dashboard-card dashboard-card--ghost placeholder-card", className)}
            front={
                <div className="placeholder-card__content">
                    <HammerIcon data-id={`${dataId}-icon`} />
                    <div className="placeholder-card__message">{message}</div>
                </div>
            }
        />
    );
};


PlaceHolderCard.propTypes = {
    "data-id": PropTypes.string,
    message: PropTypes.string,
    className: PropTypes.string
};

PlaceHolderCard.defaultProps = {
    "data-id": "placeholder-card"
};

export default PlaceHolderCard;