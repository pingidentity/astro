import React from "react";
import FormLabel from "../../../components/forms/FormLabel";
import Table, {
    columnAlignments,
    overflowOptions,
    Divider,
} from "../../../components/tables/Table";
import InputRow from "../../../components/layout/InputRow";

import HR from "ui-library/lib/components/general/HR";
import Button from "ui-library/lib/components/buttons/Button";

/**
* @name TableDemo
* @memberof Table
* @desc A demo for Table
*/

const TableDemo = () => {
    const mockData = {
        head: [
            "name",
            "age",
            "city",
            ""
        ],
        body: [
            [
                "tom",
                "25",
                "denver",
                <Button iconName="edit" inline />
            ],
            [
                "jane",
                "36",
                <span>breckenridge<br />montrose</span>,
                <Button iconName="edit" inline />
            ],
            [
                "roy",
                "19",
                "arvada",
                <Button iconName="edit" inline />
            ]
        ]
    };
    const dataObjects = [
        {
            name: "tom",
            age: 25,
            city: "denver"
        },
        {
            name: "jane",
            age: 36,
            city: <span>breckenridge<br />montrose</span>
        },
        {
            name: "roy",
            age: 19,
            city: "arvada"
        }
    ];

    const mockData2 = {
        head: [
            "name",
            "age",
            "",
            "city"
        ],
        body: [
            [
                "tom",
                "25",
                <Divider/>,
                "denver"
            ],
            [
                "jane",
                "36",
                <Divider/>,
                <span>breckenridge<br />montrose</span>
            ],
            [
                "roy",
                "19",
                <Divider/>,
                "arvada"
            ]
        ]
    };
    return (
        <div>
            <InputRow>
                <FormLabel detached value="<Table> with headData and bodyData arrays." />
                <Table
                    headData={mockData.head}
                    bodyData={mockData.body}
                />
            </InputRow>
            <InputRow>
                <FormLabel detached value="<Table> with data array of objects and vertical align middle." />
                <Table
                    data={dataObjects}
                    verticalAlignment="MIDDLE"
                />
            </InputRow>
            <HR />
            <InputRow>
                <FormLabel detached value="<Table> with row labels." />
                <Table
                    headData={mockData.head}
                    bodyData={mockData.body}
                    rowLabels={true} />
            </InputRow>
            <InputRow>
                <FormLabel detached value="<Table> row labels." />
                <Table
                    data={dataObjects} rowLabels={true} lines={false} />
            </InputRow>
            <InputRow>
                <FormLabel detached value="<Table> with no header." />
                <Table
                    bodyData={mockData.body}
                />
            </InputRow>
            <InputRow>
                <FormLabel detached value="<Table> with column styling and a full width." />
                <Table
                    columnStyling={[
                        {},
                        {
                            alignment: columnAlignments.CENTER,
                            width: "400px"
                        },
                        {
                            contentOverflow: overflowOptions.ELLIPSIS,
                            width: "40px"
                        }
                    ]}
                    headData={mockData.head}
                    bodyData={mockData.body}
                />
            </InputRow>
            <InputRow>
                <FormLabel detached value="<Table> with column styling and divider." />
                <Table
                    columnStyling={[
                        {},
                        {
                            alignment: columnAlignments.CENTER,
                            width: "400px"
                        },
                        {
                            contentOverflow: overflowOptions.ELLIPSIS,
                            width: "40px"
                        }
                    ]}
                    headData={mockData2.head}
                    bodyData={mockData2.body}
                />
            </InputRow>
        </div>
    );
};

module.exports = TableDemo;
