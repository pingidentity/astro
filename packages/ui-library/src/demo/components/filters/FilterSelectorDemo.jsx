import React from "react";
import FilterSelector from "ui-library/lib/components/filters/FilterSelector";

/**
* @name FilterSelectorDemo
* @memberof FilterSelector
* @desc A demo for FilterSelector
*/
class FilterSelectorDemo extends React.Component {
    state = {
        values1: [
            "UK Employees"
        ]
    };

    _handleChange1 = value => this.setState({ values1: value });

    render() {
        return (
            <div>
                <FilterSelector
                    labelText="A Filter"
                    options={[
                        {
                            id: "US Employees",
                            name: "US Employees",
                        },
                        {
                            id: "UK Employees",
                            name: "UK Employees",
                        },
                        {
                            id: "Canada Employees",
                            name: "Canada Employees",
                        },
                        {
                            id: "Germany Employees",
                            name: "Germany Employees",
                        },
                        {
                            id: "India Employees",
                            name: "India Employees",
                        },
                        {
                            id: "Israel Employees",
                            name: "Israel Employees",
                        },
                        {
                            id: "Japan Employees",
                            name: "Japan Employees"
                        },
                    ]}
                    selected={this.state.values1}
                    onValueChange={this._handleChange1}
                />
            </div>
        );
    }
}

module.exports = FilterSelectorDemo;
