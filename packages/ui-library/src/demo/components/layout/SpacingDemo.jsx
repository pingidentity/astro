import React from "react";
import Spacing from "../../../components/layout/Spacing";
import HR from "ui-library/lib/components/general/HR";

/**
* @name SpacingDemo
* @memberof Spacing
* @desc A demo for Spacing
*/

const SpacingDemo = () => {
    return (
        <div>
            <Spacing left={Spacing.sizes.LG}>
                <div style={{ background: "red" }}>
                    Spacing on the left
                </div>
            </Spacing>
            <HR />
            <Spacing vertical={Spacing.sizes.XL}>
                <div style={{ background: "red" }}>
                    Vertical spacing
                </div>
            </Spacing>
            <HR />
            <Spacing spacing={Spacing.sizes.MD}>
                <div style={{ background: "red" }}>
                    Spacing all around
                </div>
            </Spacing>
            <HR />
            <Spacing bottom={Spacing.sizes.XS}>
                <div style={{ background: "red" }}>
                    Collapsed
                </div>
            </Spacing>
            <Spacing top={Spacing.sizes.XS}>
                <div style={{ background: "red" }}>
                    Margins
                </div>
            </Spacing>
            <HR />
        </div>
    );
};

module.exports = SpacingDemo;