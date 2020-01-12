import React from "react";
import LineChartWrapper from "../../../../components/general/charting/LineChartWrapper";

/**
* @name LineChartDemo
* @memberof LineChart
* @desc A demo for LineChart
*/
class LineChartDemo extends React.Component {
    state = {
        highlightRange: []
    };

    _onHoverDataPoint = (data) => {
        const padding = 1;
        this.setState({
            highlightRange: [
                data - padding < 0 ? 0 : data - padding,
                data + padding > data.length ? data.length : data + padding
            ],
        });
    }

    render() {
        const lineColors = [
            {
                id: "mobile",
                color: "#FFA9E7",
            },
            {
                id: "desktop",
                color: "#FF84E8",
            }
        ];

        const legend = [
            {
                label: "Mobile",
                id: "mobile",
            }, {
                label: "Desktop",
                id: "desktop",
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
                            }
                        ]
                    }
                ]
            }
        ];
        return (
            <LineChartWrapper
                data={data}
                legend={legend}
                chartWidth="100%"
                chartHeight={150}
                theme={{
                    referenceLineColor: "#7F2CCB",
                    referenceLabelColor: "#676D74",
                    highlightColor: "#7F2CCB",
                    lineColors: lineColors
                }}
            />
        );
    }
}

module.exports = LineChartDemo;