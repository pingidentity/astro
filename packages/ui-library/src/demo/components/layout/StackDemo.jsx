import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import Stack from "ui-library/lib/components/layout/Stack";
//eslint-disable-next-line import/no-extraneous-dependencies
import Button from "ui-library/lib/components/buttons/Button";
//eslint-disable-next-line import/no-extraneous-dependencies
import HR from "ui-library/lib/components/general/HR";

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
        <HR />
        <Stack gap="XL">
            <div>Stack</div>
            <div>With</div>
            <div>Extra-Large</div>
            <div>Gap</div>
        </Stack>
    </div>
);

module.exports = StackDemo;
