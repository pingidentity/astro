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
            label: "Description",
            value: "Tony Stark is a playboy billionare who is a super hero with an iron suit"
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