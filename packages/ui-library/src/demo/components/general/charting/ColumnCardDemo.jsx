import React from "react";
import { CardRow, DashboardCard } from "ui-library/lib/components/general/charting/Cards";
import ColumnCard from "ui-library/lib/components/general/charting/ColumnCard";

/**
* @name ColumnCardDemo
* @memberof ColumnCard
* @desc A demo for ColumnCard
*/
class ColumnCardDemo extends React.Component {
    render() {
        const legend = [
            { label: "Authenticators", id: "authenticators", color: "#49BF6B" },
            { label: "Test Thing", id: "test-thing", color: "#379250" },
        ];

        /**
         * NOTE: This data structure is to support future implementation
         * of the RockerButton within the card.
         */
        const columnData = [
            {
                id: "1D",
                helpText: "This is by day",
                data: [
                    {
                        id: "November 11, 2019",
                        data: [
                            {
                                id: "authenticators",
                                value: 20,
                            },
                            {
                                id: "test-thing",
                                value: 43 ,
                            }
                        ]
                    },
                    {
                        id: "November 12, 2019",
                        data: [ // Order does not matter
                            {
                                id: "test-thing",
                                value: 10,
                            },
                            {
                                id: "authenticators",
                                value: 5,
                            },
                        ]
                    },
                    {
                        id: "November 13, 2019",
                        data: [
                            {
                                id: "authenticators",
                                value: 30,
                            },
                            {
                                id: "test-thing",
                                value: 12,
                            }
                        ]
                    },
                ]
            }
        ];

        return (
            <CardRow>
                <ColumnCard
                    title="SMS/Voice"
                    data={columnData}
                    legend={legend}
                />
                <DashboardCard size={2} />
            </CardRow>
        );
    }
}

export default ColumnCardDemo;