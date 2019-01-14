var PropTypes = require("prop-types");
var React = require("react");
var PieChart = require("recharts").PieChart;
var Pie = require("recharts").Pie;
var Cell = require("recharts").Cell;
var Tooltip = require("recharts").Tooltip;
var Legend = require("recharts").Legend;
var LegendTypes = require("../../../constants/ChartingConstants.js").LegendTypes;

/**
* @typedef PieChart~DataItem
* @desc An object describing a data item in the data list.
*    Must contain a unique 'id' from other data items in the same list.
*    Any additional fields will be used as series values (as they are specified via the series prop).
*
* @property {string|number} id
*    The unique identifier for this data item.
*/

/**
* @typedef PieChart~SectorItem
* @desc An object describing a single series sector in the chart.
*    Must contain a unique 'id' from other series items.
*
* @property {string|number} id
*    The unique 'id' for this series sector item - it should map to the corresponding field in the data items this series represents.
* @property {string} [color="#3182bd"]
*    The color of the sector corresponding to this series.
*/

/**
* @class PieChart
* @desc A charting component that renders data as a series of sectors in a pie with optional cuztomizable legend and tooltips.
*
* @param {string} [data-id="pie-chart"]
*    To define the base "data-id" value for top-level HTML container.
*
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
* @param {module:constants/ChartingConstants.LegendTypes} [legendType=PieCmodule:constants/ChartingConstantshart.LegendTypes.TRIANGLE]
*    The type of icon to be show for this pie's data in the legend. If set to 'none', no legend item will be rendered.
* @param {bool} [animate=false]
*    Whether or not to apply animation to the pie.
* @param {bool} [donut=false]
*    Set to true to activate a Donut chart instead of a Pie chart.
*
* @param {Array<PieChart~DataItem>} data
*    The source data for the chart.
* @param {Array<PieChart~SectorItem>} series
*    The series data for the chart.
*/
class Chart extends React.Component {
    static displayName = "PieChart";

    static propTypes = {
        "data-id": PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        margin: PropTypes.object,
        showTooltips: PropTypes.bool,
        showLegend: PropTypes.bool,
        legendType: PropTypes.oneOf([ LegendTypes.LINE, LegendTypes.SQUARE, LegendTypes.RECTANGLE,
            LegendTypes.CIRCLE, LegendTypes.CROSS, LegendTypes.DIAMOND, LegendTypes.STAR,
            LegendTypes.TRIANGLE, LegendTypes.WYE, LegendTypes.NONE
        ]),
        animate: PropTypes.bool,
        donut: PropTypes.bool,

        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired
        })).isRequired,

        series: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]).isRequired,
            color: PropTypes.string
        })).isRequired
    };

    static defaultProps = {
        "data-id": "pie-chart",
        showTooltips: true,
        showLegend: true,
        legendType: LegendTypes.TRIANGLE,
        animate: false,
        donut: false,
        // TODO: Confirm with designers what would be appropriate defaults
        width: 550,
        height: 350,
        margin: { top: 20, right: 20, bottom: 20, left: 20 }
    };

    _renderCells = () => {
        return this.props.series.map(function (item) {
            return <Cell key={"cell-" + item.id} fill={item.color} />;
        });
    };

    render() {
        return (
            <div data-id={this.props["data-id"]}>
                <PieChart width={this.props.width} height={this.props.height} margin={this.props.margin}>
                    <Pie data={this.props.data} nameKey={this.props.sectorKey} valueKey={this.props.sectorDataKey}
                        innerRadius={this.props.donut ? "50%" : null} label={this.props.sectorLabel}
                        legendType={this.props.legendType} isAnimationActive={this.props.animate}>
                        {this._renderCells()}
                    </Pie>
                    {this.props.showTooltips && <Tooltip />}
                    {this.props.showLegend && <Legend />}
                </PieChart>
            </div>
        );
    }
}

module.exports = Chart;