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
            { id: "Authenticators", color: "#49BF6B" },
            { id: "Test Thing", color: "#379250" },
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
                            60,
                            20,
                        ]
                    },
                    {
                        id: "November 12, 2019",
                        data: [
                            20,
                            30,
                        ]
                    },
                    {
                        id: "November 13, 2019",
                        data: [
                            40,
                            60,
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