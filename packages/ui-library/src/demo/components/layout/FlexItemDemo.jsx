import React from "react";
import FlexRow from "../../../components/layout/FlexRow";
import FlexItem, { flexPositions } from "../../../components/layout/FlexItem";
import InputRow from "../../../components/layout/InputRow";
import Text from "../../../components/general/Text";
import Padding from "../../../components/layout/Padding";
import HR from "ui-library/lib/components/general/HR";

/**
* @name FlexItemDemo
* @memberof FlexItem
* @desc A demo for FlexItem component
 */

export default function FlexItemDemo() {
    return (
        <div>
            <InputRow>
                <Text>
                Flex Grow - Specifies how much space within the parent container an item should take up.
                If all sibling flex items have the same flex grow factor all items will be distributed
                evenly in the parent container.
                </Text>
                <FlexRow>
                    <FlexItem grow="1">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            grow: 1;
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem grow="1">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            grow: 1;
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem grow="3">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            grow: 3;
                            </Padding>
                        </div>
                    </FlexItem>
                </FlexRow>
            </InputRow>
            <HR/>
            <InputRow>
                <Text>
                Flex Shrink - If items are larger than the parent container, flex items will shrink according to the
                flex-shrink ratio. Resize this screen to see how the two items resize themselves.
                </Text>
                <FlexRow>
                    <FlexItem grow ="1" shrink="1" basis="400px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            shrink: 1;
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem grow ="2" shrink="2" basis="400px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            shrink: 2;
                            </Padding>
                        </div>
                    </FlexItem>
                </FlexRow>
            </InputRow>
            <HR/>
            <Text>
                Flex Basis - Defines the initial size of the flex item.
            </Text>
            <InputRow>
                <FlexRow>
                    <FlexItem basis="300px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            basis: 300px;
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem basis="400px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            basis: 400px;
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem basis="500px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            basis: 500px;
                            </Padding>
                        </div>
                    </FlexItem>
                </FlexRow>
            </InputRow>
            <HR/>
            <Text>
                Flex Position - Defines the placement of a flex item within its parent container.
            </Text>
            <InputRow>
                <FlexRow>
                    <FlexItem basis="500px" flexPosition={flexPositions.FORCESTART} basis="400px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            flexPosition = flexpositions.FORCESTART
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem basis="200px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            basis: 200px;
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem basis="200px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            basis: 200px;
                            </Padding>
                        </div>
                    </FlexItem>
                </FlexRow>
            </InputRow>

            <InputRow>
                <FlexRow>
                    <FlexItem basis="500px" flexPosition={flexPositions.FORCEEND} basis="400px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            flexPosition = flexpositions.FORCEEND
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem basis="200px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            basis: 200px;
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem basis="200px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            basis: 200px;
                            </Padding>
                        </div>
                    </FlexItem>
                </FlexRow>
            </InputRow>


            <InputRow>
                <FlexRow>
                    <FlexItem flexPosition={flexPositions.FORCECENTER} basis="400px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            flexPosition = flexpositions.FORCECENTER
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem basis="200px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            basis: 200px;
                            </Padding>
                        </div>
                    </FlexItem>
                    <FlexItem basis="200px">
                        <div style={{ background: "lightgrey", margin: "0px 10px" }}>
                            <Padding padding={Padding.sizes.MD}>
                            basis: 200px;
                            </Padding>
                        </div>
                    </FlexItem>
                </FlexRow>
            </InputRow>
        </div>
           
    );
}



