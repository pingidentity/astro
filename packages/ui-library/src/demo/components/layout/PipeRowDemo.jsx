import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import PipeRow from "ui-library/lib/components/layout/PipeRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import Link from "ui-library/lib/components/general/Link";
//eslint-disable-next-line import/no-extraneous-dependencies
import Button from "ui-library/lib/components/buttons/Button";
//eslint-disable-next-line import/no-extraneous-dependencies
import HR from "ui-library/lib/components/general/HR";

/**
* @name PipeRowDemo
* @memberof PipeRow
* @desc A demo for PipeRow
*/
const PipeRowDemo = () => (
    <div>
        <PipeRow>
            <Link href="https://www.pingidentity.com/">Link</Link>
            <Link href="https://www.pingidentity.com/">Another</Link>
        </PipeRow>
        <HR />
        <PipeRow>
            <Button label="Click Me" noSpacing />
            <Link href="https://www.pingidentity.com/">Bonus Link</Link>
        </PipeRow>
    </div>
);

export default PipeRowDemo;
