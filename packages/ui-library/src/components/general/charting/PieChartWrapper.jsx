import React from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";

import PieChart, { PieChartTitle } from "./PieChart";
import FlexRow, { alignments, flexDirectionOptions, spacingOptions } from "../../layout/FlexRow";
import Legend, { alignments as legendAlignments, boxAlignments } from "./Legend";
import RockerButton, { rockerTypes } from "../../forms/RockerButton";
import { inStateContainer } from "../../utils/StateContainer";

const getTotal = (data) => data.reduce((total, { value }) => total + value, 0);

const getLegendAndData = (data, dataColors) =>
    data.reduce(([dataAcc, totalAcc], { series, data: currentData = series, id, value, ...dataPoint }) => {
        const color = (dataColors.find(entry => entry.id === id) || {}).color;
        if (currentData) {
            return [
                [...dataAcc,
                    {
                        ...dataPoint,
                        series: currentData,
                        id,
                        color
                    }
                ],
                {
                    ...totalAcc,
                    [id]: getTotal(currentData)
                }
            ];
        } else {
            return [
                [...dataAcc,
                    {
                        ...dataPoint,
                        color,
                        id,
                        value
                    }
                ],
                {
                    ...totalAcc,
                    [id]: value
                }
            ];
        }
    }, [[], {}]);

function PieChartWrapper({
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
        dataColors
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
            <PieChartTitle title={title} />
            <Legend
                alignment={legendAlignment}
                boxAlignment={legendBoxAlignment}
                data={legendData}
            />
            <PieChart
                data={dataWithColors}
                errorMessage={errorMessage}
                height={height}
                legend={legendData}
                loadingMessage={loadingMessage}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
                renderTooltip={renderTooltip}
                showTooltip
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

PieChartWrapper.defaultProps = {
    legendAlignment: legendAlignments.CENTER,
    legendBoxAlignment: boxAlignments.CENTER,
    onSelectDataSet: noop
};

PieChartWrapper.propTypes = {
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
        ),
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
])(PieChartWrapper);
