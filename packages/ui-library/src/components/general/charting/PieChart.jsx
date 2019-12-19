import React from "react";
import PropTypes from "prop-types";
import {
    PieChart as Chart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";
import { noop } from "underscore";
import classnames from "classnames";
import { LegendItem, alignments, valueSizes } from "./Legend";
import { defaultRender } from "../../../util/PropUtils";

/**
 * @class MetricsTooltip
 * @desc Dynamic tooltip to display single or multiple valuves.
 *
 * @param {string} [color]
 *     Define the color square next to the label.
 * @param {string} [dataValue]
 *     The item value refrence in the data structure.
 * @param {string} [label]
 *     The name of the item.
 * @param {string} [series]
 *     Array of labels and values.
 * @param {string} [value]
 *     Value of the item.
 */
export const MetricsTooltip = ({
    color,
    label,
    value,
    series,
    dataValue
}) => (
    <div>
        { series ? (
            <div className="pie-chart__tooltip-top">
                <LegendItem
                    color={color}
                    label={label}
                />
            </div>
        ) : null }
        <div className="pie-chart__tooltip-values">
            { series ? (
                series.map(item => (
                    <LegendItem
                        key={item.label}
                        alignment={alignments.LEFT}
                        label={item.label}
                        value={item[dataValue]}
                        valueSize={valueSizes.SM}
                    />
                ))
            ) : (
                <LegendItem
                    alignment={alignments.LEFT}
                    valueSize={valueSizes.SM}
                    color={color}
                    label={label}
                    value={value}
                />
            )}
        </div>
    </div>
);

MetricsTooltip.propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    series: PropTypes.arrayOf(PropTypes.shape({})),
    dataValue: PropTypes.string,
};

MetricsTooltip.defaultProps = {
    dataValue: "value",
};

/**
 * @class PieChart
 * @desc A chart with pie segments.
 *
 * @param {string} [data-id="pie-chart"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     A class name applied to the top-level element in the component.
 * @param {Object[]} [data=[]]
 *     The data to be passed to the component.
 * @param {string} [data.id]
 *     ID for individual x-axis points.
 * @param {int[]} [data.data]
 *     Array of integers representing the data within the chart.
 * @param {string} [dataKey="id"]
 *     The item id refrence in the data structure.
 * @param {string} [dataValue="value"]
 *     The item value refrence in the data structure.
 */

/**
 * Callback triggered when a user clicks on a chart segment.
 * @callback PieChart~onClick
 * @param {Object} [data]
 *     The datapoint being clicked on.
 * @param {Object} [event]
 *     The event that triggered the callback.
 */

/**
 * Callback triggered when a user mouses out of the chart.
 * @callback PieChart~onMouseOut
 * @param {Object} [event]
 *     The event that triggered the callback.
 */

/**
 * Callback triggered when a user mouses over the chart.
 * @callback PieChart~onMouseOver
 * @param {Object} [data]
 *     The datapoint being hovered over.
 * @param {Object} [event]
 *     The event that triggered the callback.
*/

/**
 * Function that can be used to change how the tooltip renders. For example,
 * showing a value as $38 instead of just 38.
 * @callback PieChart~renderTooltip
 * @param {Object} props
 *     The props of the default component; these can be spread into the component.
 * @param {Object} defaultComponent
 *     The component that the ColumnChart renders by default.
*/
class PieChart extends React.Component {
    state = {
        selected: {},
    };

    /**
     * Get the value or the total of the [series] values for an item
     */
    _getValue = (data) =>
        data.series
            ? data.series.reduce((total, subItem) => total + subItem[this.props.dataValue], 0)
            : data[this.props.dataValue];

    /**
     * Sum of all values and [series] values in the data
     */
    _getTotalValue = (data) =>
        data.reduce((total, item) => total + this._getValue(item), 0);


    /**
     * Transform data into a Recharts-readable style
     */
    _digestData = (data) =>
        data.reduce((a, item) => ([
            ...a,
            {
                id: item[this.props.dataKey],
                [this.props.dataValue]: this._getValue(item),
                color: item.color,
            }
        ]), []);

    _mouseOver = (data, index, event) => {
        const element = this.props.data.find((item) => item.id === data.id);

        this.setState({
            selected: element,
        });

        this.props.onMouseOver(element, event);
    };

    _onClick = (data, index, event) => {
        const element = this.props.data.find((item) => item.id === data.id);

        this.setState({
            selected: element,
        });

        this.props.onClick(element, event);
    };

    _mouseOut = (...args) => {
        this.setState({ selected: {} });

        // Just send the event
        this.props.onMouseOut(args[2]);
    }

    _renderCells = (data) => {
        return data.map((item) => {
            const classNames = classnames("pie-chart__cell", {
                "pie-chart__cell--hovered": this.state.selected && this.state.selected.id === item.id
            });

            return (
                <Cell
                    key={"cell-" + item.id}
                    fill={item.color}
                    className={classNames}
                />
            );
        });
    };

    _renderTooltip = (d) => {
        if (!d.payload[0]) {
            return;
        }

        const id = d.payload[0].payload.id;

        const element = this.props.data.find(item => item.id === id);

        const data = {
            color: element.color,
            label: element.label,
            ...(element[this.props.dataValue] && { value: element[this.props.dataValue] }),
            ...(element.series && { series: element.series }),
            dataValue: this.props.dataValue,
        };

        return (
            <div className="pie-chart__tooltip">
                {this.props.renderTooltip(data, MetricsTooltip)}
            </div>
        );
    };

    render() {
        const chartData = this._digestData(this.props.data);

        const classNames = classnames("pie-chart", this.props.className);

        return (
            <div data-id={this.props["data-id"]} className={classNames}>
                <div className="pie-chart__center-info">
                    <div className="pie-chart__center-label">
                        Total
                    </div>
                    <div className="pie-chart__center-value">
                        {this._getTotalValue(this.props.data)}
                    </div>
                </div>

                <Chart
                    width={400}
                    height={300}
                    className="pie-chart__graph"
                >
                    <Pie
                        data={chartData}
                        nameKey={this.props.dataKey}
                        dataKey={this.props.dataValue}
                        paddingAngle={1}
                        innerRadius="55%"
                        legendType={this.props.legendType}
                        onMouseOver={this._mouseOver}
                        onMouseLeave={this._mouseOut}
                        onClick={this._onClick}
                    >
                        {this._renderCells(chartData)}
                    </Pie>
                    {this.props.showTooltips &&
                        <Tooltip
                            isAnimationActive={true}
                            content={this._renderTooltip}
                            cursor={false}
                        />
                    }
                </Chart>
            </div>
        );
    }
}

PieChart.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        color: PropTypes.string,
        series: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
        }))
    })),
    dataKey: PropTypes.string,
    dataValue: PropTypes.string,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    renderTooltip: PropTypes.func,
};

PieChart.defaultProps = {
    "data-id": "pie-chart",
    data: [],
    dataKey: "id",
    dataValue: "value",
    onClick: noop,
    onMouseOver: noop,
    onMouseOut: noop,
    renderTooltip: defaultRender,
};

export default PieChart;