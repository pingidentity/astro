import React from "react";
import LabelValuePairs from "ui-library/lib/components/layout/LabelValuePairs";
import CopyField from "ui-library/lib/components/utils/CopyField";
import HR from "ui-library/lib/components/general/HR";
import Text from "ui-library/lib/components/general/Text";

/**
* @name LabelValuePairsDemo
* @memberof LabelValuePairs
* @desc A demo for LabelValuePairs
*/

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

const mockData2 = [
    {
        label: "Zero",
        value: 0,
    },
    {
        label: "One",
        value: 1,
    },
    {
        label: "Undefined",
    },
    {
        label: "Blank",
        value: "",
    }
];

const LabelValuePairsDemo = () => (
    <>
        <LabelValuePairs dataPairs={mockData} />
        <HR />
        <Text>Pruning empty values:</Text>
        <LabelValuePairs dataPairs={mockData2} pruneEmpty />
    </>
);

module.exports = LabelValuePairsDemo;
