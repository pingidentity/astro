import React from "react";
import FilterSelector from "ui-library/lib/components/filters/FilterSelector";

/**
* @name FilterSelectorDemo
* @memberof FilterSelector
* @desc A demo for FilterSelector
*/
class FilterSelectorDemo extends React.Component {
    static flags = [ "use-portal" ];

    state = {
        values1: [
            "8675309"
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
                    onValueChange={this._handleChange1}
                />
            </div>
        );
    }
}

module.exports = FilterSelectorDemo;
