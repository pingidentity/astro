import React from "react";
import Chip, { chipColors, chipTypes } from "ui-library/lib/components/layout/Chip";
import Icon from "ui-library/lib/components/general/Icon";
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
        </div>
    );
}
