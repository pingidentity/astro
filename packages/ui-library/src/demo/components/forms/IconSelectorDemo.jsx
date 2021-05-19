import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import IconSelector from "ui-library/lib/components/forms/IconSelector";
//eslint-disable-next-line import/no-extraneous-dependencies
import StateContainer from "ui-library/lib/components/utils/StateContainer";

/**
* @name IconSelectorDemo
* @memberof IconSelector
* @desc A demo for IconSelector
*/

const radioItems = [
    { id: "cog", iconName: "cog" },
    { id: "puzzle", iconName: "puzzle" },
    { id: "badge", iconName: "badge" },
    { id: "key", iconName: "key" },
    { id: "globe", iconName: "globe" },
    { id: "apps", iconName: "apps" },
    { id: "beaker", iconName: "beaker" },
    { id: "device", iconName: "device" },
];

const stateDefs = [
    {
        name: "selected",
        initial: "",
        setter: "onValueChange",
    },
];

const IconSelectorDemo = () => (
    <div>
        <StateContainer stateDefs={stateDefs}>
            {props => <IconSelector items={radioItems} {...props} groupName="icon"/>}
        </StateContainer>
    </div>
);

export default IconSelectorDemo;
