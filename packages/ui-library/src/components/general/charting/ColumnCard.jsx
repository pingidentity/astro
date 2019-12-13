import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { noop } from "underscore";
import { DashboardCard } from "./Cards/index";
import DashboardCardTitle from "./Cards/DashboardCardTitle";
import Legend, { alignments as legendAlignments } from "./Legend";
import ColumnChart from "./ColumnChart";

/**
 * @class ColumnCard
 * @desc A card containing a ColumnChart and a connected Legend.
 *
 * @param {string} [data-id="column-card"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     A class name applied to the top-level element in the component.
 * @param {Object[]} [data=[]]
 *     The data to be passed to the component.
 * @param {string} [data.id]
 *     ID for the whole data set, represented in the rocker button below the chart.
 * @param {string} [data.helpText]
 *     If provided, shows a help hint on the rocker button associated with the data set.
 * @param {Object[]} [data.data]
 *     The second-level datasets. For example, if the top-level dataset corresponds to a week,
 *     this might correspond to a day.
 * @param {string} [data.data.id]
 *     ID for individual x-axis points.
 * @param {int[]} [data.data.data]
 *     Array of integers representing the data within the chart.
 * @param {string} [errorMessage]
 *     Error message to be displayed within the component.
 * @param {Object[]} [legend=[]]
 *     Legend for the chart.
 * @param {string} [legend.id]
 *     Unique identifier for a particular part of the legend.
 * @param {string} [legend.color]
 *     Hex color for this part of the legend, formatted like "#000000".
 * @param {string} [title]
 *     Title of the chart.
 */

/**
 * Callback triggered when a user mouses over the chart.
 * @callback ColumnCard~onMouseOver
 * @param {Object} [data]
 *     The datapoint being hovered over.
 * @param {Object} [event]
 *     The event that triggered the callback.
*/

/**
 * Callback triggered when a user mouses out of the chart.
 * @callback ColumnCard~onMouseOut
 * @param {Object} [event]
 *     The event that triggered the callback.
*/

export default class ColumnCard extends Component {
    state = {
        hoverSection: null,
        legendData: [
            {
                color: "#49BF6B",
                label: "Usage",
                value: "0",
            },
            {
                color: "#379250",
                label: "Cost",
                value: "0",
            },
        ],
    };

    _mouseOver = (value, e) => {
        this.setState({
            hoveredSection: value.id,
        });

        this.props.onMouseOver(value, e);
    };

    _mouseOut = (e) => {
        this.setState({
            hoveredSection: null,
        });

        this.props.onMouseOut(e);
    };

    render() {
        const classes = classnames(
            "horizontal-bar-card",
            this.props.className,
        );

        const {
            data
        } = this.props;

        return (
            <DashboardCard {...this.props} data-id={this.props["data-id"]} className={classes}
                size={2}
                front={(
                    <div className="horizontalBar-card__top-level-container">
                        <DashboardCardTitle
                            className="dashboard-card__title--horizontal-bar-card"
                            title={this.props.title}
                        />
                        {!this.props.loading && ([
                            <Legend
                                alignment={legendAlignments.CENTER}
                                data={this.state.legendData}
                                key="legend"
                            />,
                            <ColumnChart
                                data={data[0].data}
                                key="chart"
                                legend={this.props.legend}
                                onMouseOver={this._mouseOver}
                                onMouseOut={this._mouseOut}
                            />,
                        ])}
                    </div>
                )}
            />
        );
    }

    static propTypes = {
        className: PropTypes.string,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                helpText: PropTypes.string,
                data: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string,
                        data: PropTypes.arrayOf(PropTypes.number)
                    })
                )
            })
        ),
        "data-id": PropTypes.string,
        errorMessage: PropTypes.string,
        legend: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                color: PropTypes.string,
            })
        ),
        loading: PropTypes.bool,
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        title: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "column-card",
        loading: false,
        onMouseOver: noop,
        onMouseOut: noop
    };
}