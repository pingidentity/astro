import React from "react";
import PropTypes from "prop-types";
import {
    PieChart as Chart,
    Cell,
    Pie,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { noop, isNumber, isString } from "underscore";
import classnames from "classnames";
import { defaultRender } from "../../../util/PropUtils";
import DashboardCardTitle from "./Cards/DashboardCardTitle";
import { LegendItem, alignments, valueSizes } from "./Legend";
import { getAbbreviatedValue } from "../../../util/ChartingUtils";

export const PieChartTitle = ({ className, ...props }) => (
    <DashboardCardTitle
        {...props}
        className={classnames(className, "dashboard-card__title--horizontal-bar-card")}
    />
);

export const CenterLabel = ({
    children,
    color,
}) => <div className="pie-chart__center-label" style={{ color }}>{children}</div>;

CenterLabel.propTypes = {
    color: PropTypes.string,
};

export const CenterValue = ({
    children,
    color,
    abbreviated,
}) => (
    <div className="pie-chart__center-value" style={{ color }}>
        { abbreviated ? getAbbreviatedValue(children) : children }
    </div>
);

CenterValue.propTypes = {
    color: PropTypes.string,
    abbreviated: PropTypes.bool,
};

CenterValue.defaultProps = {
    abbreviated: true,
};

/**
 * @class MetricsTooltip
 * @desc Dynamic tooltip to display single or multiple values.
 *
 * @param {string} [color]
 *     Define the color square next to the label.
 * @param {string} [dataValue]
 *     The item value reference in the data structure.
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
 *     The item id reference in the data structure.
 * @param {string} [dataValue="value"]
 *     The item value reference in the data structure.
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
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        centerValue: PropTypes.oneOfType([PropTypes.number, PropTypes.node]),
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            color: PropTypes.string,
            series: PropTypes.arrayOf(PropTypes.shape({
                label: PropTypes.string,
            }))
        })),
        dataKey: PropTypes.string,
        dataValue: PropTypes.string,
        height: PropTypes.number,
        onClick: PropTypes.func,
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        renderCell: PropTypes.func,
        renderTooltip: PropTypes.func,
        width: PropTypes.number
    };

    static defaultProps = {
        "data-id": "pie-chart",
        centerLabel: "total",
        data: [],
        dataKey: "id",
        dataValue: "value",
        height: 300,
        onClick: noop,
        onMouseOver: noop,
        onMouseOut: noop,
        renderCell: defaultRender,
        renderTooltip: defaultRender,
        width: 400
    };

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
    _getTotalValue = (data) => data.length > 0 ? data.reduce((total, item) => total + this._getValue(item), 0) : null;

    /**
     * Transform data into a Recharts-readable style
     */
    _digestData = (data) =>
        data.map((item) => (
            {
                id: item[this.props.dataKey],
                [this.props.dataValue]: this._getValue(item),
                color: item.color,
            }
        ));

    _isPercentageValue = dimension => isString(dimension) && dimension.includes("%")

    _isResponsive = () => this._isPercentageValue(this.props.height) || this._isPercentageValue(this.props.width);

    _mouseEnter = (data, index, event) => {
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

    _mouseLeave = (...args) => {
        this.setState({ selected: {} });

        // Just send the event
        this.props.onMouseOut(args[2]);
    }

    _renderCells = (data) => {
        return data.map(({ id, color }) => {
            const isSelected = this.state.selected && this.state.selected.id === id;
            const classNames = classnames("pie-chart__cell", {
                "pie-chart__cell--hovered": this.state.selected && this.state.selected.id === id
            });

            return this.props.renderCell(
                {
                    key: `cell-${id}`,
                    fill: color,
                    className: classNames,
                    selected: isSelected,
                }
                , Cell);
        });
    };

    _renderTooltip = (d) => {
        if (!d.payload[0]) {
            return;
        }

        const id = d.payload[0].payload.id;
        const element = this.props.data.find(item => item.id === id);

        // Check to see if elem exists
        if (element === undefined) {
            return;
        }

        const {
            color,
            label,
            series,
            [this.props.dataValue]: value
        } = element;

        const data = {
            color: color,
            label: label,
            ...(value !== null && value !== undefined ? { value } : {}),
            ...(series && { series }),
            dataValue: this.props.dataValue,
        };

        return (
            <div className="pie-chart__tooltip">
                {this.props.renderTooltip(data, MetricsTooltip)}
            </div>
        );
    };

    render() {
        const {
            centerLabel,
            data,
            centerValue = this._getTotalValue(data),
        } = this.props;

        const chartData = this._digestData(data)
            .filter( dataObj => dataObj.chartValue !== 0); // filter out 0 for min size

        console.log(chartData);

        const classNames = classnames("pie-chart", this.props.className);

        const showPlaceholder = chartData.length === 0 || centerValue === 0;
        const renderedChartData = showPlaceholder ? [{ id: "none", chartValue: 1, color: "#E4E4E4" }] : chartData; //render empty gray chart


        console.log(chartData);

        const chart = (
            <Chart
                width={this.props.width}
                height={this.props.height}
                className="pie-chart__graph"
                onMouseLeave={this._mouseLeave}
            >
                <Pie
                    data={ renderedChartData }
                    nameKey={this.props.dataKey}
                    dataKey={this.props.dataValue}
                    innerRadius="55%"
                    minAngle={15}
                    legendType={this.props.legendType}
                    onMouseEnter={this._mouseEnter}
                    onClick={this._onClick}
                    animationDuration={1000}

                >
                    {this._renderCells(renderedChartData)}
                </Pie>
                {this.props.showTooltips &&
                    <Tooltip
                        isAnimationActive={true}
                        content={this._renderTooltip}
                        cursor={false}
                    />
                }
            </Chart>
        );

        return (
            <div data-id={this.props["data-id"]} className={classNames}>
                {centerValue !== null &&
                <div className="pie-chart__center-info">
                    {isString(centerLabel)
                        ? <CenterLabel>{centerLabel}</CenterLabel>
                        : centerLabel
                    }
                    {isString(centerValue) || isNumber(centerValue)
                        ? <CenterValue>{centerValue}</CenterValue>
                        : centerValue
                    }
                </div>
                }
                {this._isResponsive()
                    ? <ResponsiveContainer
                        height={this.props.height}
                        width={this.props.width}
                    >
                        {chart}
                    </ResponsiveContainer>
                    : chart
                }

            </div>
        );
    }
}

export default PieChart;
