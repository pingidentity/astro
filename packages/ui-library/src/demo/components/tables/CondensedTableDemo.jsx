var React = require("react"),
    FormLabel = require("../../../components/forms/FormLabel.jsx"),
    CondensedTable = require("../../../components/tables/CondensedTable.jsx");

/**
* @name CondensedTable Demo
* @memberof CondensedTable
* @desc A demo for CondensedTable
*/

class CondensedTableDemo extends React.Component {
    render() {
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
                    <FormLabel className="detached" value="<CondensedTable> with headData and bodyData arrays." />
                    <CondensedTable
                        headData={mockData.head}
                        bodyData={mockData.body} />
                </div>
                <div className="input-row">
                    <FormLabel className="detached" value="<CondensedTable> with data array of objects." />
                    <CondensedTable
                        data={dataObjects} />
                </div>
            </div>
        );
    }
}

module.exports = CondensedTableDemo;
