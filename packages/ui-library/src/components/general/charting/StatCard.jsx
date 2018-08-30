import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import DashboardCard from "./Cards/DashboardCard";
import DashboardCardList from "./Cards/DashboardCardList";

/**
 * @class StatCard
 * @desc A card that displays a single statistic, but can be flipped to reveal others as well.
 *
 * @param {number} [accent]
 *     Index of the accent color for this stat card. There are three (0-2) options.
 * @param {string} [className]
 *     Custom class names
 * @param {array} [data]
 *     A list of objects that renders as a list of labels and values on the back of the card
 * @param {array} [data-id="stat-card"]
 * @param {string} [description]
 *     Small bit of text at the bottom of the card
 * @param {string} [errorMessage]
 *     When provided, the error message and icon will display in place of the regular front/back content.
 * @param {boolean} [flipped]
 *     If provided, whether or not the card is flipped. If not provided, the component maintains its own state
 * @param {string} [iconName]
 *     Name of the icon that sits next to the title.
 * @param {boolean} [loading=false]
 *     When true the splinner animation shows in place of the stats
 * @param {function} [onFlip]
 *     Called when a flip is triggered
 * @param {number} [size]
 *     controls the CSS "flex-grow" of the card. When a single-sized card  appears next to a double-sized card, the
 *     double will occupy 2/3 of the width of the parent.
 * @param {string} [title]
 *     Tile of the card. Displayed at top of front and back
 * @param {string} [value]
 *     The single value shown on the front of the card
 * @see StatCardRow
 *
 * @example
 * <StatCard title="Failed Attempts" description="February 2016"
 *      value="1,056"
 *      data={[
 *          { label: "Last 30 days", value: "29" },
 *          { label: "Last 60 days", value: "124" },
 *          { label: "Last 90 days", value: "167" },
 *          { label: "Last 120 days", value: "195" },
 *          { label: "Last 150 days", value: "201" },
 *      ]}
 *  />
 *
 */

const valuePropType = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
]);

class StatCard extends React.Component {

    static propTypes = {
        accent: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        className: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: valuePropType
        })),
        "data-id": valuePropType,
        description: PropTypes.string,
        errorMessage: PropTypes.string,
        flipped: PropTypes.bool,
        iconName: PropTypes.string,
        loading: PropTypes.bool,
        onFlip: PropTypes.func,
        size: PropTypes.number,
        title: PropTypes.string,
        value: valuePropType,
    }

    static defaultProps = {
        "data-id": "stat-card",
        accent: 0,
        iconName: "bar-line-chart",
        loading: false,
    }
    render = () => {
        const classes = classnames(
            "stat-card",
            this.props.className,
        );

        return (
            <DashboardCard
                {...this.props}
                data-id={this.props["data-id"]}
                className={classes}
                size={this.props.size}
                back={
                    <div>
                        <div className="dashboard-card__back-title" accent={this.props.accent}>{this.props.title}</div>
                        {!this.props.loading && (
                            <DashboardCardList data={this.props.data} data-id={`${this.props["data-id"]}-list`} />
                        )}
                    </div>
                }
                front={
                    <div>
                        <div className="dashboard-card__front-title">
                            <div className="dashboard-card__title-icon" accent={this.props.accent}>
                                <span className={classnames("icon", "icon-" + this.props.iconName)}/>
                            </div>
                            <div className="dashboard-card__title-text">{this.props.title}</div>
                        </div>
                        {!this.props.loading &&
                            <div className="stat-card__primary-number" accent={this.props.accent}>
                                {this.props.value}
                            </div>
                        }
                        <div className="dashboard-card__description stat-card__description">
                            {this.props.description}
                        </div>
                    </div>
                }
            />
        );
    }
}

export default StatCard;
