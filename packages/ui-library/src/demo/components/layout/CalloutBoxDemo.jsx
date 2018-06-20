import React from "react";
import CalloutBox from "ui-library/lib/components/layout/CalloutBox";
import LabelValuePairs from "ui-library/lib/components/layout/LabelValuePairs";

/**
* @name CalloutBoxDemo
* @memberof CalloutBox
* @desc A demo for CalloutBox
*/

const CalloutBoxDemo = () => {
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
            value: "NO"
        },
        {
            label: "Registration",
            value: "NO"
        },
    ];

    return (
        <CalloutBox>
            <LabelValuePairs dataPairs={mockData}/>
        </CalloutBox>
    );
};

module.exports = CalloutBoxDemo;