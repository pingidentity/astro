import React from "react";
import Button from "../../../components/buttons/Button";
import FlexRow, {
    alignments,
    justifyOptions,
    spacingOptions,
    flexDirectionOptions
} from "../../../components/layout/FlexRow";
import InputRow from "../../../components/layout/InputRow";

/**
* @name FlexRowDemo
* @memberof FlexRow
* @desc A demo for FlexRow component
 */

export default function FlexRowDemo() {
    return (
        <div>
            <InputRow>
                Using a justify value of flex-start and bottom-alignment
            </InputRow>
            <InputRow>
                <FlexRow>
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                Using a justify value of center
            </InputRow>
            <InputRow>
                <FlexRow
                    justify={justifyOptions.CENTER}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                Using a justify value of space-between
            </InputRow>
            <InputRow>
                <FlexRow
                    justify={justifyOptions.SPACEBETWEEN}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                Using a justify value of space-evenly
            </InputRow>
            <InputRow>
                <FlexRow
                    justify={justifyOptions.SPACEEVENLY}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                Using a justify value of end
            </InputRow>
            <InputRow>
                <FlexRow
                    justify={justifyOptions.END}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                Using an alignment value of top
            </InputRow>
            <InputRow>
                <FlexRow
                    alignment={alignments.TOP}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                Using an alignment value of center
            </InputRow>
            <InputRow>
                <FlexRow
                    alignment={alignments.CENTER}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                With spacing between items
            </InputRow>
            <InputRow>
                <FlexRow
                    spacing={spacingOptions.SM}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                Flex Direction Column
            </InputRow>
            <InputRow>
                <FlexRow
                    flexDirection={flexDirectionOptions.COLUMN}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                Flex Direction Column Reverse
            </InputRow>
            <InputRow>
                <FlexRow
                    flexDirection={flexDirectionOptions.COLUMNREVERSE}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                Flex Direction Row
            </InputRow>
            <InputRow>
                <FlexRow
                    flexDirection={flexDirectionOptions.ROW}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
            <InputRow>
                Flex Direction Row Reverse
            </InputRow>
            <InputRow>
                <FlexRow
                    flexDirection={flexDirectionOptions.ROWREVERSE}
                >
                    <Button label="Button" noSpacing />
                    <Button label="Another button" noSpacing />
                    <Button
                        inline
                        label="Inline button"
                        noSpacing
                        type="primary"
                    />
                </FlexRow>
            </InputRow>
        </div>
    );
}
