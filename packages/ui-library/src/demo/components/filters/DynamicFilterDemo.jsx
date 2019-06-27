import React from "react";
import DynamicFilter from "ui-library/lib/components/filters/DynamicFilter";
import userOptions from "../forms/data/userOptions";

const CATEGORIES = [
    {
        value: "Applications",
        options: [
            { value: "Pannier" },
            { value: "Y-find" },
            { value: "Tin" },
            { value: "Toughjoyfax" },
            { value: "Cardify" },
            { value: "Tempsoft" },
            { value: "Kanlam" },
            { value: "Lotstring" },
            { value: "Bitchip" },
            { value: "Bigtax" },
            { value: "Voyatouch" },
            { value: "Cookley" },
            { value: "Cardguard" },
            { value: "Holdlamis" },
            { value: "Opela" },
            { value: "Tresom" },
            { value: "It" },
            { value: "Gembucket" },
        ]
    },
    {
        value: "Environments",
        options: [
            { value: "Development" },
            { value: "Staging" },
            { value: "Production" },
        ]
    },
    {
        value: "Administrators",
        options: userOptions,
    },
];

/**
* @name DynamicFilterDemo
* @memberof DynamicFilter
* @desc A demo for DynamicFilter
*/

class DynamicFilterDemo extends React.Component {
    state = {
        filterValue: { "Applications": ["Cookley"] }
    };

    _handleChange = filterValue => this.setState({ filterValue });

    render() {
        return (
            <DynamicFilter
                value={this.state.filterValue}
                categories={CATEGORIES}
                onValueChange={this._handleChange}
            />
        );
    }
}

export default DynamicFilterDemo;