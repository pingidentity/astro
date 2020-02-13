import React from "react";
import ChartWrapper from "ui-library/lib/components/general/charting/ChartWrapper";
import LineChart from "ui-library/lib/components/general/charting/LineChart";
import Legend, {
    alignments as legendAlignments,
    boxAlignments
} from "ui-library/lib/components/general/charting/Legend";
import ChartTitle from "ui-library/lib/components/general/charting/ChartTitle";
import RockerButton, { rockerTypes } from "ui-library/lib/components/forms/RockerButton";
import { generateTheme } from "../../../../util/ChartingUtils";

/**
* @name LineChartDemo
* @memberof LineChart
* @desc A demo for LineChart
*/
class LineChartDemo extends React.Component {
    render() {
        const legend = [
            {
                label: "Mobile",
                id: "mobile",
                color: "#4C8DCA",
                value: 20
            }, {
                label: "Desktop",
                id: "desktop",
                color: "#CA4C8D",
                value: 21,
            }, {
                label: "API",
                id: "api",
                color: "#8DCA4C",
                value: 15,
            }
        ];

        const data = [
            {
                id: "jan",
                label: "January",
                data: [
                    {
                        label: "Day #1",
                        points: [
                            {
                                id: "mobile",
                                value: 3,
                            },
                            {
                                id: "desktop",
                                value: 6,
                            },
                            {
                                id: "api",
                                value: 2,
                            }
                        ]
                    }, {
                        label: "Day #2",
                        points: [
                            {
                                id: "mobile",
                                value: 6,
                            },
                            {
                                id: "desktop",
                                value: 3,
                            },
                            {
                                id: "api",
                                value: 4,
                            }
                        ]
                    }, {
                        label: "Day #3",
                        points: [
                            {
                                id: "mobile",
                                value: 2,
                            },
                            {
                                id: "desktop",
                                value: 4,
                            },
                            {
                                id: "api",
                                value: 5,
                            }
                        ]
                    }, {
                        label: "Day #4",
                        points: [
                            {
                                id: "mobile",
                                value: 4,
                            },
                            {
                                id: "desktop",
                                value: 1,
                            },
                            {
                                id: "api",
                                value: 3,
                            }
                        ]
                    }, {
                        label: "Day #5",
                        points: [
                            {
                                id: "mobile",
                                value: 5,
                            },
                            {
                                id: "desktop",
                                value: 7,
                            },
                            {
                                id: "api",
                                value: 1,
                            }
                        ]
                    }
                ]
            },
            {
                id: "feb",
                label: "February",
                data: [
                    {
                        label: "Day #1",
                        points: [
                            {
                                id: "mobile",
                                value: 8,
                            },
                            {
                                id: "desktop",
                                value: 3,
                            },
                            {
                                id: "api",
                                value: 7,
                            }
                        ]
                    }, {
                        label: "Day #2",
                        points: [
                            {
                                id: "mobile",
                                value: 2,
                            },
                            {
                                id: "desktop",
                                value: 7,
                            },
                            {
                                id: "api",
                                value: 1,
                            }
                        ]
                    }, {
                        label: "Day #3",
                        points: [
                            {
                                id: "mobile",
                                value: 1,
                            },
                            {
                                id: "desktop",
                                value: 2,
                            },
                            {
                                id: "api",
                                value: 3,
                            }
                        ]
                    }, {
                        label: "Day #4",
                        points: [
                            {
                                id: "mobile",
                                value: 5,
                            },
                            {
                                id: "desktop",
                                value: 5,
                            },
                            {
                                id: "api",
                                value: 6,
                            }
                        ]
                    }, {
                        label: "Day #5",
                        points: [
                            {
                                id: "mobile",
                                value: 7,
                            },
                            {
                                id: "desktop",
                                value: 2,
                            },
                            {
                                id: "api",
                                value: 2,
                            }
                        ]
                    }
                ]
            }
        ];

        const controlLabels = ["1d", "1w"];

        return (
            <ChartWrapper
                title={<ChartTitle title="Visitors" />}
                legend={
                    <Legend
                        alignment={legendAlignments.CENTER}
                        boxAlignment={boxAlignments.CENTER}
                        data={legend}
                    />
                }
                chart={
                    <LineChart
                        data={data[0].data}
                        legend={legend}
                        width="100%"
                        height={150}
                        theme={generateTheme("#4c8dca", legend)}
                    />
                }
                controls={
                    <RockerButton
                        labels={controlLabels}
                        noMargin
                        selectedIndex={0}
                        type={rockerTypes.CHART}
                    />
                }
            />
        );
    }
}

module.exports = LineChartDemo;