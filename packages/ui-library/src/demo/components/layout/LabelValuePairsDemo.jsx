import React, { Component } from "react";
import LabelValuePairs from "../../../components/layout/LabelValuePairs";

/**
* @name LabelValuePairsDemo
* @memberof LabelValuePairs
* @desc A demo for LabelValuePairs
*/

class LabelValuePairsDemo extends Component {
    render () {
        const mockData = [
            {
                label: "Attribute Type",
                value: "String"
            },
            {
                label: "Category",
                value: "Profile"
            },
            {
                label: "name",
                value: "Tony Stark"
            },
            {
                label: "Display Name",
                value: "Iron Man"
            },
            {
                label: "Description",
                value: "Tony Stark is a playboy billionare who is a super hero with an iron suit"
            },
            {
                label: "Required",
                value: "NO"
            },
            {
                label: "Resgistration",
                value: "NO"
            },
        ];

        return (
            <LabelValuePairs dataPairs={mockData}/>
        );
    }
}

module.exports = LabelValuePairsDemo;