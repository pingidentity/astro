import React from "react";
import PropTypes from "prop-types";
import Legend, { alignments as legendAlignments, boxAlignments } from "./Legend";
import LineChart from "./LineChart";
import RockerButton from "../../forms/RockerButton";
import Padding from "../../layout/Padding";
import FlexRow, { justifyOptions } from "../../layout/FlexRow";
import { noop } from "underscore";
import { inStateContainer } from "../../utils/StateContainer";

/**
 * @class LineChartWrapper
 * @desc Ties LineChart with RockerButton and Legend.
 *
 * @param {array} data
 *     Array of objects with names and values for the data.
 * @param {string} [data-id="line-chart"]
 *     The data-id assigned to the top-most container of the component.
 * @param {string} [highlightColor]
 *     Color of the currently highlighted range.
 * @param {array} highlightRange
 *     Start and end indexes of data to be highlighted eg: [3, 5].
* @param {array} [legend]
 *     Array of objects to associate labels and ids.
 * @param {array} [dataColors]
 *     Array of objects of colors and ids.
 * @param {function} [onHoverDataPoint]
 *     Callback triggered when the mouse moves over a new data point.
 * @param {string} [referenceLabelColor]
 *     Color of the scrubbing bar label.
 * @param {string} [referenceLineColor]
 *     Color of the scrubbing bar line.
 * @param {boolean} [showHighLight=false]
 *     If a range highlight should be shown.
 */
class LineChartWrapper extends React.Component {

    _hasMultipleDataSets = (data) => data.length > 1;

    _handleRockerValueChange = ({ id }) => {
        this.props.onSelectDataSet(id);
    };

    /**
     * Generate Rocker based on labels from dataset
     */
    _renderRocker = (data) => {
        if (!this._hasMultipleDataSets(data)) {
            return null;
        }

        const labels = data.map(({ id, label }) => ({ id, label }));

        return (
            <RockerButton
                type={RockerButton.rockerTypes.CHART}
                onValueChange={this._handleRockerValueChange}
                labels={labels}
            />
        );
    };

    /**
     * Get the currently selected dataset based on the
     * RockerButton selection
     */
    _getSelectedDataSet = (data, selectedDataSet = this.props.data[0].id) => {
        const { data: selected } = data.find(set => set.id === selectedDataSet) || {};
        return selected;
    }

    /**
     * Sum of all values and [series] values in the data
     */
    _getTotalValue = (data, id) =>
        data.reduce((total, item) => total + item.points.find(o => o.id === id).value, 0);

    /**
     * Combine Legend, Colors, and values from Data to create LegendItems
     */
    _buildLegend = (legend, data, colors) => {
        return legend.reduce((a, item) => ([
            ...a,
            {
                color: colors.find((c) => c.id === item.id).color,
                label: item.label,
                value: this._getTotalValue(
                    this._getSelectedDataSet(
                        data,
                        this.props.selectedDataSet
                    ),
                    item.id
                )
            }
        ]), []);
    }


    render() {
        const {
            chartHeight,
            chartWidth,
            data,
            "data-id": dataId,
            errorMessage,
            highlightRange,
            legend,
            loadingMessage,
            onHoverDataPoint,
            selectedDataSet,
            showHighlight,
            theme,
        } = this.props;

        return (
            <div data-id={dataId}>
                <Padding bottom={Padding.sizes.MD}>
                    <Legend
                        alignment={legendAlignments.CENTER}
                        boxAlignment={boxAlignments.CENTER}
                        data={this._buildLegend(legend, data, theme.dataColors)}
                    />
                </Padding>

                <LineChart
                    data={this._getSelectedDataSet(data, selectedDataSet)}
                    legend={legend}
                    width={chartWidth}
                    height={chartHeight}
                    referenceLineColor={theme.referenceLineColor}
                    referenceLabelColor={theme.referenceLabelColor}
                    loadingMessage={loadingMessage}
                    errorMessage={errorMessage}
                    showHighlight={showHighlight}
                    highlightColor={theme.highlightColor}
                    highlightRange={highlightRange}
                    lineColors={theme.dataColors}
                    onHoverDataPoint={onHoverDataPoint}
                />

                <FlexRow justify={justifyOptions.CENTER}>
                    <Padding top={Padding.sizes.MD}>
                        {this._renderRocker(data)}
                    </Padding>
                </FlexRow>
            </div>
        );
    }
}

LineChartWrapper.propTypes = {
    chartHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    chartWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.arrayOf(PropTypes.shape({})),
    "data-id": PropTypes.string,
    errorMessage: PropTypes.string,
    highlightRange: PropTypes.array,
    legend: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            id: PropTypes.string,
        })
    ),
    loadingMessage: PropTypes.string,
    onHoverDataPoint: PropTypes.func,
    selectedDataSet: PropTypes.string,
    showHighlight: PropTypes.bool,
    theme: PropTypes.shape({
        referenceLineColor: PropTypes.string,
        referenceLabelColor: PropTypes.string,
        dataColors: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            color: PropTypes.string
        })),
        data: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.number,
            })
        ),
    })
};

LineChartWrapper.defaultProps = {
    "data-id": "line-chart-wrapper",
    chartHeight: 150,
    chartWidth: 500,
    data: [],
    onHoverDataPoint: noop,
    showHighlight: false,
    theme: {
        referenceLineColor: "#5DA4EC",
        referenceLabelColor: "#676D74",
        lineColor: "#193867",
        highlightColor: "#5DA4EC",
    }
};

export default inStateContainer([
    {
        name: "selectedDataSet",
        setter: "onSelectDataSet"
    }
])(LineChartWrapper);