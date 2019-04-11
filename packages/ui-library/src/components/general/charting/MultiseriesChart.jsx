import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Area,
    AreaChart,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import classnames from "classnames";
import { isFunction, noop } from "underscore";
import colorLib from "color";
import { chartingColors } from "../../../constants/DashboardConstants";
import ChartTooltip, { textAlignments } from "./ChartTooltip";
import DropDownSelector from "./DropDownSelector";

const baseClass = "multiseries-chart";

export const chartTypes = {
    AREA: "area",
    LINE: "line"
};

export const renderDefaultTooltip = ({
    data,
    xAxisValue,
}) => (
    <div className={`${baseClass}__tooltip`}>
        <ChartTooltip
            label={<div className={`${baseClass}__tooltip-title`}>{xAxisValue}</div>}
            textAlignment={textAlignments.LEFT}
            values={data}
        />
    </div>
);

/**
* @class Multiseries Chart
* @desc A line/area chart with a dropdown at the left for selecting multiple groups
*       of data.
*
* @param {string} [data-id="multiseries-chart"]
*     The data-id assigned to the top-most container of the component.
* @param {Object} [bottomPanel]
*     A piece of JSX to be included below the chart. Parameter can accept anything that
*     can be rendered by React, including JSX, strings and arrays.
* @param {Object[]} [data]
*     The data to be displayed. Data must be in the format of:
*     [{ id: val, id2: val }, { id: val2, id2: val2 }]
*     The toRechartsDataFormat helper function transforms data in the form of [{ id: id, label: label, data: data}]
*     to the Recharts format.
* @param {number} [height=400]
*     The height of the chart in pixels.
*
* @callback onDeselectOption
*     Callback for when an option is deselected.
* @param {string} [id]
*     The id of the deselected object
* @param {Object} [event]
*     The JS event fired by the deselect.
*
* @callback onSelectOption
*     Callback for when an option is selected.
* @param {string} [id]
*     The id of the selected object
* @param {Object} [event]
*     The JS event fired by the deselect.
*
* @callback onMenuToggle
*     Callback for option dropdown is toggled open or closed.
* @param {string} [id]
*     The id of the selected object
* @param {Object} [event]
*     The JS event fired by the deselect.
*
* @param {string[]} [selectedDataSets]
*     An array of ids that decides which dataset to display. If not passed in, the component
*     will manage selected IDs internally.
* @param {number} [selectedLimit=3]
*     The maximum number of datasets that can be selected at one time.
* @param {boolean|function} [tooltip]
*     Controls display of tooltip in chart. If false, no tooltip is displayed; if true, default tooltip
*     is displayed. If a render function is passed in, will render custom tooltip.
* @param {string} [type]
*     The type of chart to display. Must be one of available values of the chartTypes object exported
*     by this component.
* @param {number} [width=400]
*     The width of the chart in pixels.
* @param {string} [xAxisKey]
*     The id of the dataset to use as the x-axis for the chart. This ID will not appear in the list of
*     of dropdown options.
* @param {string} [yAxisLabel]
*     The label for the y-axis.
*/

export default class MultiseriesChart extends Component {
    static propTypes = {
        bottomPanel: PropTypes.node,
        data: PropTypes.arrayOf(
            PropTypes.object
        ).isRequired,
        onDeselectOption: PropTypes.func,
        onSelectOption: PropTypes.func,
        onMenuToggle: PropTypes.func,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string
                ]),
                name: PropTypes.string
            })
        ).isRequired,
        renderTooltip: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.string
        ]),
        selectedDataSets: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ])
        ),
        selectedLimit: PropTypes.number,
        tooltip: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func
        ]),
        type: PropTypes.oneOf([
            chartTypes.AREA,
            chartTypes.LINE
        ]),
        xAxisKey: PropTypes.string.isRequired,
        yAxisLabel: PropTypes.string.isRequired
    };

    static defaultProps = {
        "data-id": "multiseries-chart",
        height: 225,
        width: 500,
        onDeselectOption: noop,
        onSelectOption: noop,
        onMenuToggle: noop,
        selectedLimit: 3,
        tooltip: true
    };

    state = {
        selectedDataSets: this.props.selectedDataSets || [],
    }

    addColors = data => data.map((dataPoint, index) => ({
        ...dataPoint,
        color: chartingColors[index],
    }))

    dataWithColors = this.addColors(this.props.options)

    getTicks = (data, key) => data.map(({ [key]: tick }) => tick)

    getXAxis = ({ data, tickFormatter, xAxisKey }) => (
        <XAxis
            dataKey={xAxisKey}
            ticks={this.getTicks(data, xAxisKey)}
            tickCount={data.length}
            tickFormatter={tickFormatter}
        />
    )

    handleSelectDataSet = ({ id }, e) => {
        if (this.props.selectedDataSets) {
            this.props.onSelectOption(id, e);
        } else {
            this.setState(({ selectedDataSets }) => ({
                selectedDataSets:
                    selectedDataSets.includes(id) || (selectedDataSets.length >= this.props.selectedLimit)
                        ? selectedDataSets
                        : [...selectedDataSets, id]
            }), () => this.props.onSelectOption(id, e));
        }
    }

    handleDeselectDataSet = (id, e) => {
        if (this.props.selectedDataSets) {
            this.props.onDeselectOption(id, e);
        } else {
            this.setState(({ selectedDataSets }) => ({
                selectedDataSets: selectedDataSets.filter(setId => id !== setId)
            }), () => this.props.onDeselectOption(id, e));
        }
    }

    renderData = (isLine, dataKeys) => dataKeys.map((key) => {
        const { color } = this.dataWithColors.find(({ id }) => id === key);
        const libColor = colorLib(color);
        const sharedProps = {
            dataKey: key,
            dot: false,
            key: key,
            fill: color,
            isAnimationActive: false,
        };
        return isLine
            ? (
                <Line
                    stroke={color}
                    strokeWidth={4}
                    {...sharedProps}
                />
            )
            : (
                <Area
                    fillOpacity={1}
                    stackId={1}
                    stroke={libColor.lightness() > 30 ? libColor.lighten(0.3).hex() : libColor.lighten(0.95).hex()}
                    strokeWidth={4}
                    {...sharedProps}
                />
            );
    })

    renderTooltip = ({ label, payload = [] }) => {
        const renderer = isFunction(this.props.tooltip) ? this.props.tooltip : renderDefaultTooltip;
        return renderer({
            data: payload ? payload.map(({ dataKey, value }) => {
                const { color, name } = this.dataWithColors.find(({ id }) => id === dataKey);
                return {
                    color,
                    id: dataKey,
                    label: name,
                    value
                };
            }) : [],
            xAxisValue: label
        });
    }

    renderYAxis = label =>
        label &&
        (<YAxis
            axisLine={false}
            label={{
                angle: -90,
                className: `${baseClass}__chart-axis-label`,
                position: "inside",
                value: label
            }}
            tick={false}
            width={15}
        />)

    render() {
        const {
            bottomPanel,
            data,
            menuRequiredText,
            tooltip,
            type,
            yAxisLabel,
            "data-id": dataId
        } = this.props;

        const chartProps = {
            data,
            height: this.props.height,
            margin: {
                left: 20,
                top: 5
            },
            width: this.props.width,
        };
        const isLine = type === chartTypes.LINE;
        const ChartType = isLine ? LineChart : AreaChart;
        const xAxis = this.getXAxis(this.props);

        return (
            <div className={classnames(
                baseClass,
                { [`${baseClass}--line`]: isLine }
            )} data-id={dataId}>
                <div className={`${baseClass}__content`}>
                    <DropDownSelector
                        className={`${baseClass}__selector`}
                        colors={chartingColors}
                        label={this.props.menuLabel}
                        note={this.props.menuNote}
                        onDeselectOption={this.handleDeselectDataSet}
                        onSelectOption={this.handleSelectDataSet}
                        onToggle={this.props.onMenuToggle}
                        options={this.dataWithColors}
                        requiredText={
                            isFunction(menuRequiredText)
                                ? menuRequiredText({ ...this.state })
                                : menuRequiredText
                        }
                        selectedOptionIds={this.state.selectedDataSets}
                    />
                    <div className={`${baseClass}__chart`}>
                        <ChartType {...chartProps}>
                            {this.renderData(isLine, this.state.selectedDataSets)}
                            {xAxis}
                            {this.renderYAxis(yAxisLabel)}
                            {tooltip && this.state.selectedDataSets.length > 0 &&
                                <Tooltip content={this.renderTooltip} />}
                        </ChartType>
                        {bottomPanel && (
                            <div className={classnames(
                                `${baseClass}__bottom-panel`,
                                { [`${baseClass}__bottom-panel--line`]: isLine }
                            )}
                            >
                                {bottomPanel}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
