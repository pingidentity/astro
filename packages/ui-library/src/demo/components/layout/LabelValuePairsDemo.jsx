import React from "react";
import LabelValuePairs from "../../../components/layout/LabelValuePairs";

/**
* @name LabelValuePairsDemo
* @memberof LabelValuePairs
* @desc A demo for LabelValuePairs
*/

const LabelValuePairsDemo = () => {
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
            label: "Description with helphint",
            value: "Tony Stark is a playboy billionare who is a super hero with an iron suit",
            hintText: "this is the help text",
            hintPlacement: "left",
            hintLink: "#"
        },
        {
            divider: true,
        },
        {
            label: "Required",
            value: "No"
        },
        {
            label: "Registration",
            value: "No"
        },
    ];

    return (
        <LabelValuePairs dataPairs={mockData}/>
    );
};

module.exports = LabelValuePairsDemo;