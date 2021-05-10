import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import HR from "ui-library/lib/components/general/HR";

/**
* @name HRDemo
* @memberof HR
* @desc A demo for HR
*/

const HRDemo = () => (
    <div>
        lines
        <HR />
        appear
        <HR spacing={HR.spacings.XS} />
        between
        <HR solid />
        the text.
    </div>
);

export default HRDemo;
