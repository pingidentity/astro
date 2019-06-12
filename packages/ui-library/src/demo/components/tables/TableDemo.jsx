import React from "react";
import FormLabel from "../../../components/forms/FormLabel";
import Table from "../../../components/tables/Table";
import InputRow from "../../../components/layout/InputRow";

import HR from "ui-library/lib/components/general/HR";

/**
* @name TableDemo
* @memberof Table
* @desc A demo for Table
*/

const TableDemo = () => {
    var mockData = {
        head: [
            "name",
            "age",
            "city"
        ],
        body: [
            [
                "tom",
                "25",
                "denver"
            ],
            [
                "jane",
                "36",
                <span>breckenridge<br />montrose</span>
            ],
            [
                "roy",
                "19",
                "arvada"
            ]
        ]
    };
    var dataObjects = [
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
    return (
        <div>
            <InputRow>
                <FormLabel className="detached" value="<Table> with headData and bodyData arrays." />
                <Table
                    headData={mockData.head}
                    bodyData={mockData.body} />
            </InputRow>
            <InputRow>
                <FormLabel className="detached" value="<Table> with data array of objects and vertical align middle." />
                <Table
                    data={dataObjects}
                    verticalAlignment="MIDDLE"
                />
            </InputRow>
            <HR />
            <InputRow>
                <FormLabel className="detached" value="<Table> with row labels." />
                <Table
                    headData={mockData.head}
                    bodyData={mockData.body}
                    rowLabels={true} />
            </InputRow>
            <InputRow>
                <FormLabel className="detached" value="<Table> row labels." />
                <Table
                    data={dataObjects} rowLabels={true} className="grid--no-lines"/>
            </InputRow>
            <InputRow>
                <FormLabel className="detached" value="<Table> with no header." />
                <Table
                    bodyData={mockData.body}
                />
            </InputRow>
        </div>
    );
};

module.exports = TableDemo;
