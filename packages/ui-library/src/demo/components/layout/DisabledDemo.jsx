import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import Disabled from "ui-library/lib/components/layout/Disabled";
//eslint-disable-next-line import/no-extraneous-dependencies
import Button from "ui-library/lib/components/buttons/Button";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormCheckbox from "ui-library/lib/components/forms/FormCheckbox";
//eslint-disable-next-line import/no-extraneous-dependencies
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
        <Disabled hintText="disabled" placement="bottom">
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
