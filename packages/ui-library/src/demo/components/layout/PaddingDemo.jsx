import React from "react";
import Padding from "../../../components/layout/Padding";
import HR from "ui-library/lib/components/general/HR";

/**
* @name PaddingDemo
* @memberof Padding
* @desc A demo for Padding
*/

const PaddingDemo = () => {
    return (
        <div>
            <div style={{ background: "red" }}>
                <Padding left={Padding.sizes.LG}>
                    Padding on the left
                </Padding>
            </div>
            <HR />
            <div style={{ background: "red" }}>
                <Padding vertical={Padding.sizes.XL}>
                    Vertical padding
                </Padding>
            </div>
            <HR />
            <div style={{ background: "red" }}>
                <Padding padding={Padding.sizes.MD}>
                    Padding all around
                </Padding>
            </div>
            <HR />
        </div>
    );
};

module.exports = PaddingDemo;