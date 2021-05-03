import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import ValueItem from "ui-library/lib/components/layout/ValueItem";
//eslint-disable-next-line import/no-extraneous-dependencies
import Toggle from "ui-library/lib/components/forms/form-toggle";

/**
* @name ValueItemDemo
* @memberof ValueItem
* @desc A demo for ValueItem
*/
class ValueItemDemo extends React.Component {
    render() {
        return (
            <ValueItem icon={<Toggle />}>
                Disabled
            </ValueItem>
        );
    }
}

module.exports = ValueItemDemo;
