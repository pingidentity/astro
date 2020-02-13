import React from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";

import ColumnChart, { ColumnChartTitle } from "./ColumnChart";
import FlexRow, { alignments, flexDirectionOptions, spacingOptions } from "../../layout/FlexRow";
import Legend, { alignments as legendAlignments, boxAlignments } from "./Legend";
import RockerButton, { rockerTypes } from "../../forms/RockerButton";
import { inStateContainer } from "../../utils/StateContainer";

const getTotalsAndColors = (data, dataColors, startingTotals = {}) =>
    data.reduce(([ dataWithColors, totals ], { id, value }) => {
        const { [id]: currentValues = 0 } = totals;
        return [
            [...dataWithColors, { id, value, color: (dataColors.find(color => color.id === id) || {}).color }],
            {
                ...totals,
                [id]: value + currentValues,
            }
        ];
    }, [[], startingTotals]);

const getLegendAndData = (data, dataColors) =>
    data.reduce(([dataAcc, totalAcc], { data: currentData, ...dataPoint }) => {
        const [
            withColors,
            totals
        ] = getTotalsAndColors(currentData, dataColors, totalAcc);
        return [
            [...dataAcc,
                {
                    ...dataPoint,
                    data: withColors
                }
            ],
            totals
        ];
    }, [[], {}]);

function ColumnChartWrapper({
    data,
    errorMessage,
    height,
    legend,
    legendAlignment,
    legendBoxAlignment,
    loadingMessage,
    onMouseOver,
    onMouseOut,
    onSelectDataSet,
    renderTooltip,
    selectedDataSet = data[0].id,
    theme: {
        dataColors,
        referenceLineColor
    },
    title,
    width,
}) {
    const [
        rockerLabels,
        selectedData
    ] = data.reduce(([rockerAcc, selected], { id, label, data: setData }) => [
        [
            ...rockerAcc,
            {
                id,
                label,
            }
        ],
        id === selectedDataSet ? setData : selected
    ], [[], undefined]);

    const [
        dataWithColors,
        totals
    ] = getLegendAndData(selectedData, dataColors);

    const legendData = legend.map(({ id, ...item }) => ({
        ...item,
        color: (dataColors.find(color => color.id === id) || {}).color,
        id,
        value: totals[id] || "-"
    }));

    const handleSelectDataSet = ({ index }) => {
        onSelectDataSet(index);
    };

    return (
        <FlexRow
            alignment={alignments.CENTER}
            flexDirection={flexDirectionOptions.COLUMN}
            spacing={spacingOptions.SM}
        >
            <ColumnChartTitle title={title} />
            <Legend
                alignment={legendAlignment}
                boxAlignment={legendBoxAlignment}
                data={legendData}
            />
            <ColumnChart
                data={dataWithColors}
                errorMessage={errorMessage}
                height={height}
                legend={legendData}
                loadingMessage={loadingMessage}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
                referenceLineColor={referenceLineColor}
                renderTooltip={renderTooltip}
                width={width}
            />
            {
                data.length > 1 &&
                <RockerButton
                    labels={rockerLabels}
                    noMargin
                    onValueChange={handleSelectDataSet}
                    selectedIndex={selectedDataSet}
                    type={rockerTypes.CHART}
                />
            }
        </FlexRow>
    );
}

ColumnChartWrapper.defaultProps = {
    legendAlignment: legendAlignments.CENTER,
    legendBoxAlignment: boxAlignments.CENTER,
    onSelectDataSet: noop
};

ColumnChartWrapper.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(PropTypes.shape({}))
        })
    ).isRequired,
    errorMessage: PropTypes.string,
    height: PropTypes.number,
    legend: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        color: PropTypes.string
    })),
    legendAlignment: PropTypes.oneOf(Object.values(legendAlignments)),
    legendBoxAlignment: PropTypes.oneOf(Object.values(boxAlignments)),
    loadingMessage: PropTypes.string,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    onSelectDataSet: PropTypes.func,
    renderTooltip: PropTypes.func,
    selectedDataSet: PropTypes.string,
    theme: PropTypes.shape({
        dataColors: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                label: PropTypes.string
            })
        ).isRequired,
        referenceLineColor: PropTypes.string
    }),
    title: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default inStateContainer([
    {
        name: "selectedDataSet",
        setter: "onSelectDataSet"
    }
])(ColumnChartWrapper);
