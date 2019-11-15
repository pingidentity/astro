import React from "react";
import Disabled from "ui-library/lib/components/layout/Disabled";

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
    </div>
);

module.exports = DisabledDemo;