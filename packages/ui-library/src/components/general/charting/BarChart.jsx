var PropTypes = require("prop-types");
var React = require("react");
var BarChart = require("recharts").BarChart;
var XAxis = require("recharts").XAxis;
var YAxis = require("recharts").YAxis;
var CartesianGrid = require("recharts").CartesianGrid;
var Tooltip = require("recharts").Tooltip;
var Legend = require("recharts").Legend;
var Bar = require("recharts").Bar;
var Layouts = require("../../../constants/ChartingConstants.js").Layouts;
var AxisTypes = require("../../../constants/ChartingConstants.js").AxisTypes;
var AxisOrientations = require("../../../constants/ChartingConstants.js").AxisOrientations;
var LegendTypes = require("../../../constants/ChartingConstants.js").LegendTypes;

/**
* @typedef BarChart~DataItem
* @desc An object describing a data item in the data list.
*    Must contain a unique 'id' from other data items in the same list.
*    Any additional fields will be used as series values (as they are specified via the series prop).
*
* @property {string|number} id
*    The unique identifier for this data item.
*/

/**
* @typedef BarChart~BarItem
* @desc An object describing a single series bar in the chart.
*    Must contain a unique 'id' from other series items.
*
* @property {string|number} id
*    The unique 'id' for this series bar item - it should map to the corresponding field in the data items this series represents.
* @property {string} [label]
*    The label for this bar of data. This option will be used in configured tooltips and legend to represent a bar.
*    If no value was set to this option, the value of 'id' will be used alternatively.
* @property {module:constants/ChartingConstants.LegendTypes} [legendType=module:constants/ChartingConstants.LegendTypes.bar]
*    The type of icon to be show for this bar in the legend. If set to 'none', no legend item will be rendered.
* @property {string} [color="#3182bd"]
*    The color of the bar corresponding to this series.
* @property {boolean} [animate=false]
*    Whether or not to apply animation to this series' bar.
*/

/**
* @class BarChart
* @desc A charting component that renders data as a series of bars with optional customizable legend and tooltips.
*
* @param {string} [data-id="bar-chart"]
*    To define the base "data-id" value for top-level HTML container.
*
* @param {module:constants/ChartingConstants.Layouts} [layout=module:constants/ChartingConstants.Layouts.HORIZONTAL]
*    The layout of the bars in the chart.
* @param {number} [width=700]
*    The width of the chart.
* @param {number} [height=500]
*    The height of the chart.
* @param {object} [margin={ top: 5, right: 5, bottom: 5, left: 5 }]
*    The sizes of whitespace around the chart.
* @param {bool} [showTooltips=true]
*    Whether or not tooltips are displayed.
* @param {bool} [showLegend=true]
*    Whether or not a legend is displayed.
*
* @param {Array<BarChart~DataItem>} data
*    The source data for the chart.
* @param {Array<BarChart~BarItem>} series
*    The series data for the chart.
*
* @param {bool} [hideX=false]
*    Whether or not the x-axis is shown.
* @param {string} [xDataKey]
*    The key of the field from the data items to be displayed as labels on the x-axis.
* @param {module:constants/ChartingConstants.AxisTypes} [xAxisType=module:constants/ChartingConstants.AxisTypes.STRING]
*    The type of data being related to the x-axis.
* @param {string} [xLabel]
*    The label for the type of data shown on the x-axis.
* @param {number} [xMin]
*    The minimum value to be displayed on the x-axis (only applicable when the x-axis is of type BarChart.AxisTypes.NUMBER).
*    If no value is provided, the chart will auto-generate a minimum.
* @param {number} [xMax]
*    The maximum value to be displayed on the x-axis (only applicable when the x-axis is of type BarChart.AxisTypes.NUMBER).
*    If no value is provided, the chart will auto-generate a maximum.
* @param {BarChmodule:constants/ChartingConstantsart.AxisOrientations} [xOrientation=module:constants/ChartingConstants.AxisOrientations.BOTTOM]
*    The orientation of the x-axis of the chart.
* @param {number} [xTickDensity=5]
*    The density of ticks on the x-axis (only applicable when the x-axis is of type BarChart.AxisTypes.NUMBER).
*
* @param {bool} [hideY=false]
*    Whether or not the y-axis is shown.
* @param {string} [yDataKey]
*    The key of the field from the data items to be displayed as labels on the y-axis.
* @param {BarCmodule:constants/ChartingConstantshart.AxisTypes} [yType=Barmodule:constants/ChartingConstantsChart.AxisTypes.NUMBER]
*    The type of data being related to the y-axis.
* @param {string} [yLabel]
*    The label for the type of data shown on the y-axis.
* @param {number} [yMin]
*    The minimum value to be displayed on the y-axis (only applicable when the y-axis is of type BarChart.AxisTypes.NUMBER).
*    If no value is provided, the chart will auto-generate a minimum.
* @param {number} [yMax]
*    The maximum value to be displayed on the y-axis (only applicable when the y-axis is of type BarChart.AxisTypes.NUMBER).
*    If no value is provided, the chart will auto-generate a maximum.
* @param {module:constants/ChartingConstants.AxisOrientations} [yOrientation=module:constants/ChartingConstants.AxisOrientations.LEFT]
*    The orientation of the y-axis of the chart.
* @param {number} [yTickDensity=5]
*    The density of ticks on the y-axis (only applicable when the y-axis is of type BarChart.AxisTypes.NUMBER).
*
*/
class Chart extends React.Component {
    static displayName = "BarChart";

    static propTypes = {
        "data-id": PropTypes.string,
        layout: PropTypes.oneOf([ Layouts.HORIZONTAL, Layouts.VERTICAL ]),
        width: PropTypes.number,
        height: PropTypes.number,
        margin: PropTypes.object,
        showTooltips: PropTypes.bool,
        showLegend: PropTypes.bool,

        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired
        })).isRequired,

        series: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string,
            legendType: PropTypes.oneOf([ LegendTypes.LINE, LegendTypes.SQUARE, LegendTypes.RECTANGLE,
                LegendTypes.CIRCLE, LegendTypes.CROSS, LegendTypes.DIAMOND, LegendTypes.STAR,
                LegendTypes.TRIANGLE, LegendTypes.WYE, LegendTypes.NONE
            ]),
            color: PropTypes.string,
            animate: PropTypes.bool
        })).isRequired,

        hideX: PropTypes.bool,
        xDataKey: PropTypes.string,
        xAxisType: PropTypes.oneOf([ AxisTypes.NUMBER, AxisTypes.STRING ]),
        xLabel: PropTypes.string,
        xMin: PropTypes.number,
        xMax: PropTypes.number,
        xOrientation: PropTypes.oneOf([ AxisOrientations.TOP, AxisOrientations.BOTTOM ]),
        xTickDensity: PropTypes.number,

        hideY: PropTypes.bool,
        yDataKey: PropTypes.string,
        yAxisType: PropTypes.oneOf([ AxisTypes.NUMBER, AxisTypes.STRING ]),
        yLabel: PropTypes.string,
        yMin: PropTypes.number,
        yMax: PropTypes.number,
        yOrientation: PropTypes.oneOf([ AxisOrientations.LEFT, AxisOrientations.RIGHT ]),
        yTickDensity: PropTypes.number,
    };

    static defaultProps = {
        "data-id": "bar-chart",
        layout: Layouts.HORIZONTAL,
        showTooltips: true,
        showLegend: true,
        hideX: false,
        xAxisType: AxisTypes.STRING,
        xTickDensity: 5,
        xOrientation: AxisOrientations.BOTTOM,
        hideY: false,
        yAxisType: AxisTypes.NUMBER,
        yTickDensity: 5,
        yOrientation: AxisOrientations.LEFT,
        // TODO: Confirm with designers what would be appropriate defaults
        width: 550,
        height: 350,
        margin: { top: 20, right: 20, bottom: 20, left: 20 }
    };

    _renderBars = () => {
        return this.props.series.map(function (item) {
            return (
                <Bar key={"bar-"+ item.id} dataKey={item.id} name={item.label || item.id}
                        legendType={item.legendType || LegendTypes.RECTANGLE}
                        fill={item.color}
                        isAnimationActive={item.animate || false} />
            );
        }.bind(this));
    };

    _renderXAxis = () => {
        return (
            <XAxis dataKey={this.props.xDataKey} type={this.props.xAxisType} hide={this.props.hideX}
                    domain={[(this.props.xMin || "auto"), (this.props.xMax || "auto")]} label={this.props.xLabel}
                    tickCount={this.props.xTickDensity} orientation={this.props.xOrientation} />
        );
    };

    _renderYAxis = () => {
        return (
            <YAxis dataKey={this.props.yDataKey} type={this.props.yAxisType} hide={this.props.hideY}
                    domain={[(this.props.yMin || "auto"), (this.props.yMax || "auto")]} label={this.props.yLabel}
                    tickCount={this.props.yTickDensity} orientation={this.props.yOrientation} />
        );
    };

    render() {
        return (
            <div data-id={this.props["data-id"]}>
                <BarChart layout={this.props.layout}
                        width={this.props.width}
                        height={this.props.height}
                        margin={this.props.margin}
                        data={this.props.data}>
                    {this._renderXAxis()}
                    {this._renderYAxis()}
                    <CartesianGrid strokeDasharray="3 3"/>
                    {this.props.showTooltips && <Tooltip />}
                    {this.props.showLegend && <Legend />}
                    {this._renderBars()}
                </BarChart>
            </div>
        );
    }
}

module.exports = Chart;