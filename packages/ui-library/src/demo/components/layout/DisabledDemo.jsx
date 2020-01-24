import React from "react";
import Disabled from "ui-library/lib/components/layout/Disabled";
import Button from "../../../components/buttons/Button";
import FormCheckbox from "./../../../components/forms/FormCheckbox";
import ExpandableRow from "ui-library/lib/components/rows/ExpandableRow";

/**
* @name DisabledDemo
* @memberof Disabled
* @desc A demo for Disabled
*/

const DisabledDemo = () => (
    <div>
        <Disabled>
            this is disabled text
            this is disabled text
            this is disabled text
            this is disabled text
            this is disabled text
        </Disabled>
        <br />
        <br />
        <Disabled disabledText="disabled" placement="bottom">
            this is disabled text with a helphint
            this is disabled text with a helphint
            this is disabled text with a helphint
            this is disabled text with a helphint
            this is disabled text with a helphint
        </Disabled>
        <Disabled>
            <br />
            <br />
            <Button
                label="Add"
                iconName="add"
            />
            <Button
                iconName="edit"
                inline
            />
        </Disabled>
        <br />
        <br />
        <Disabled>
            <FormCheckbox
                label = {"Regular Checkbox; checked: "}
                value = ""
                inline
            />
        </Disabled>
        <br />
        <br />
        <Disabled>
            <ExpandableRow
                title="Basic Row"
                subtitle="Row Subtitle"
            />
        </Disabled>


    </div>
);

module.exports = DisabledDemo;