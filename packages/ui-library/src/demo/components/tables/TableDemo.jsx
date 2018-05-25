var React = require("react"),
    FormLabel = require("../../../components/forms/FormLabel"),
    Table = require("../../../components/tables/Table");

/**
* @name Table Demo
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
                "breckenridge"
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
            city: "breckenridge"
        },
        {
            name: "roy",
            age: 19,
            city: "arvada"
        }
    ];
    return (
        <div>
            <div className="input-row">
                <FormLabel className="detached" value="<Table> with headData and bodyData arrays." />
                <Table
                    headData={mockData.head}
                    bodyData={mockData.body} />
            </div>
            <div className="input-row">
                <FormLabel className="detached" value="<Table> with data array of objects." />
                <Table
                    data={dataObjects} />
            </div>
            <hr className="hr"/>
            <div className="input-row">
                <FormLabel className="detached" value="<Table> with row labels." />
                <Table
                    headData={mockData.head}
                    bodyData={mockData.body}
                    rowLabels={true} />
            </div>
            <div className="input-row">
                <FormLabel className="detached" value="<Table> row labels." />
                <Table
                    data={dataObjects} rowLabels={true} className="grid--no-lines"/>
            </div>
        </div>
    );
};

module.exports = TableDemo;
