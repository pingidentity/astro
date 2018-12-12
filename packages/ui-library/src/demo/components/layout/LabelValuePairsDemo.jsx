import React from "react";
import LabelValuePairs from "../../../components/layout/LabelValuePairs";
import CopyField from "../../../components/utils/CopyField";

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
            label: "Copy Superhero",
            value: <CopyField text="Copy superhero." />
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
        {
            title: "More Data Below",
        },
        {
            label: "Data",
            value: "1",
        },
        {
            label: "Data",
            value: "2",
        },
        {
            label: "Data",
            value: "3",
        },
        {
            title: "Title with hint",
            hintText: "This is where we put it"
        },
    ];

    return (
        <LabelValuePairs dataPairs={mockData} />
    );
};

module.exports = LabelValuePairsDemo;
