import React from "react";
import Stack from "ui-library/lib/components/layout/Stack";
import Button from "ui-library/lib/components/buttons/Button";

/**
* @name StackDemo
* @memberof Stack
* @desc A demo for Stack
*/

const StackDemo = () => (
    <div>
        <Stack>
            <Button label="Stack" />
            <Button label="With" type="primary" />
            <Button label="Medium" type="danger" />
            <Button label="Gap" inline />
        </Stack>
        <hr className="hr" />
        <Stack gap="XL">
            <div>Stack</div>
            <div>With</div>
            <div>Extra-Large</div>
            <div>Gap</div>
        </Stack>
    </div>
);

module.exports = StackDemo;