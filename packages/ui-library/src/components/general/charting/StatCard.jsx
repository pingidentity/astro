import React from "react";
import PropTypes from "prop-types";
import PageSpinner from "../../general/PageSpinner";
import ViewToggle from "./ViewToggle";
import _ from "underscore";
import classnames from "classnames";

const accentClasses = ["indigo", "magenta", "blue", "cyan"];

const accentClass = key => accentClasses[key] || key;

/**
 * @class StatCard
 * @desc A card that displays a single statistic, but can be flipped to reveal others as well.
 *
 * @param {number} [accent]
 *     Index of the accent color for this stat card. There are three (0-2) options.
 * @param {string} [className]
 *     Custom class names
 * @param {array} [data]
 *     The list of values to show on the back of the card
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
 * @param {string} [title]
 *     Tile of the card. Displayed at top of front and back
 * @param {string} [value]
 *     The single value shown on the front of the card
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
        title: PropTypes.string,
        value: valuePropType,
    }

    static defaultProps = {
        "data-id": "stat-card",
        accent: 0,
        iconName: "bar-line-chart",
        loading: false,
    }

    state = { flipped: false }

    _handleFlip = () => {
        if (this.props.onFlip) {
            this.props.onFlip();
        }

        this.setState({ flipped: !this.state.flipped });
    }

    _isFlipped = () => this.props.flipped === undefined ? this.state.flipped : this.props.flipped

    render = () => {
        const classes = classnames(
            "stat-card",
            "stat-card--" + accentClass(this.props.accent),
            this.props.className,
            {
                "stat-card--flipped": this._isFlipped()
            }
        );

        return (
            <div className={classes} data-id={this.props["data-id"]}>
                {!this.props.errorMessage && [
                    <div key="back" className="stat-card__back">
                        <div className="stat-card__back-title" accent={this.props.accent}>{this.props.title}</div>
                        <div className="stat-card__stat-list">
                            {_.map(this.props.data, row => (
                                <div className="stat-card__stat-row" key={row.label}>
                                    <div className="stat-card__stat-row-label">{row.label}</div>
                                    <div className="stat-card__stat-row-number" accent={this.props.accent}>
                                        {row.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>,
                    <div key="front" className="stat-card__front">
                        <div className="stat-card__front-title">
                            <div className="stat-card__title-icon" accent={this.props.accent}>
                                <span className={classnames("icon", "icon-" + this.props.iconName)}/>
                            </div>
                            <div className="stat-card__title-text">{this.props.title}</div>
                        </div>
                        {!this.props.loading &&
                            <div className="stat-card__primary-number" accent={this.props.accent}>
                                {this.props.value}
                            </div>
                        }
                        {this.props.loading &&
                            <PageSpinner className="stat-card__loader" small />
                        }
                        <div className="stat-card__description">{this.props.description}</div>
                    </div>,
                    <div key="control" className="stat-card__control">
                        {!this.props.loading &&
                            <ViewToggle onToggle={this._handleFlip} toggled={this.state.flipped} />
                        }
                    </div>
                ]}
                {this.props.errorMessage &&
                    <div className="stat-card__front">
                        <div className="stat-card__error">
                            <div className="icon-cogs stat-card__error-icon" />
                            <div className="stat-card__error-text">
                                {this.props.errorMessage}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default StatCard;
