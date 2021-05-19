import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import Chip, { chipColors, chipTypes } from "ui-library/lib/components/layout/Chip";
//eslint-disable-next-line import/no-extraneous-dependencies
import Icon from "ui-library/lib/components/general/Icon";
//eslint-disable-next-line import/no-extraneous-dependencies
import InputRow from "ui-library/lib/components/layout/InputRow";

/**
* @class ChipDemo
* @desc A demo for the Chip component.
*
*/

export default function ChipDemo() {
    return (
        <div>
            <InputRow>
                <Chip>
                    A standard chip
                </Chip>
            </InputRow>
            <InputRow>
                <Chip
                    color={chipColors.CYAN}
                >
                    A chip with a cyan background
                </Chip>
            </InputRow>
            <InputRow>
                <Chip
                    color={{
                        background: "black",
                        text: "gold",
                    }}
                >
                    A chip with your own colors
                </Chip>
            </InputRow>
            <InputRow>
                <Chip
                    color={chipColors.LIGHTGREY}
                >
                    <Icon
                        iconName="user"
                        type="leading"
                    >
                        A chip with an icon
                    </Icon>
                </Chip>
            </InputRow>
            <InputRow>
                <Chip
                    type={chipTypes.CONDENSED}
                >
                    Condensed
                </Chip>
            </InputRow>
            <InputRow>
                Count:
                <Chip
                    type={chipTypes.COUNT}
                >
                    18
                </Chip>
            </InputRow>
        </div>
    );
}
