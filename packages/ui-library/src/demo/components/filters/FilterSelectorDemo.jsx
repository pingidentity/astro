import React from "react";
import FilterSelector from "ui-library/lib/components/filters/FilterSelector";
import HR from "ui-library/lib/components/general/HR";

/**
* @name FilterSelectorDemo
* @memberof FilterSelector
* @desc A demo for FilterSelector
*/

const nestedOptions = [
    {
        label: "Fruits",
        value: "Fruits",
        children: [
            { label: "Apple", value: "Apple" },
            { label: "Orange", value: "Orange" },
            { label: "Banana", value: "Banana" },
        ],
    },
    {
        label: "Vegetables",
        value: "Vegetables",
        children: [
            { label: "Carrot", value: "Carrot" },
            { label: "Lettuce", value: "Lettuce" },
            { label: "Pepper", value: "Pepper" },
            { label: "Cucumber", value: "Cucumber" },
        ],
    },
    {
        label: "Bread",
        value: "Bread",
        children: [
            { label: "White Bread", value: "White Bread", disabled: true },
            { label: "Whole Wheat", value: "Whole Wheat" },
            { label: "Sourdough", value: "Sourdough" },
        ],
    },
];

class FilterSelectorDemo extends React.Component {

    state = {
        values1: [
            "8675309"
        ]
    };

    _handleChange = index => value => this.setState({ [`values${index}`]: value });

    render() {
        return (
            <div>
                <FilterSelector
                    labelText="A Filter"
                    description="Sample Description"
                    options={[
                        {
                            id: "43434",
                            name: "US Employees",
                        },
                        {
                            id: "8675309",
                            name: "UK Employees",
                        },
                        {
                            id: "35346534",
                            name: "Canada Employees",
                        },
                        {
                            id: "6898900",
                            name: "Germany Employees",
                        },
                        {
                            id: "864564",
                            name: "India Employees",
                        },
                        {
                            id: "21210",
                            name: "Israel Employees",
                        },
                        {
                            id: "907545",
                            name: "Japan Employees"
                        },
                    ]}
                    selected={this.state.values1}
                    onValueChange={this._handleChange(1)}
                />
                <HR />
                <FilterSelector
                    labelText="A Filter of Food"
                    options={nestedOptions}
                    selected={this.state.values2}
                    onValueChange={this._handleChange(2)}
                    hideSelectionOptions={true}
                />
            </div>
        );
    }
}

module.exports = FilterSelectorDemo;
