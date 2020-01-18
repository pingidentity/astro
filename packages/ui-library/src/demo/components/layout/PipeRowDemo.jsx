import React from "react";
import PipeRow from "ui-library/lib/components/layout/PipeRow";
import Link from "ui-library/lib/components/general/Link";
import Button from "ui-library/lib/components/buttons/Button";
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