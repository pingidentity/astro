import React from "react";
import ValueItem from "ui-library/lib/components/layout/ValueItem";
import Toggle from "ui-library/lib/components/forms/form-toggle";

/**
* @name ValueItemDemo
* @memberof ValueItem
* @desc A demo for ValueItem
*/
class ValueItemDemo extends React.Component {
    render() {
        return (
            <ValueItem icon={<Toggle flags={["p-stateful"]} />}>
                Disabled
            </ValueItem>
        );
    }
}

module.exports = ValueItemDemo;
