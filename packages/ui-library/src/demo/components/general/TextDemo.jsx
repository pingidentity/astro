import React from "react";
import InputRow from "ui-library/lib/components/layout/InputRow";
import PageSection from "ui-library/lib/components/layout/PageSection";
import Text, { textTypes, textVariants } from "ui-library/lib/components/general/Text";

/**
* @name TextDemo
* @memberof Text
* @desc A demo for Text component
*/

const TextDemo = () => {
    return (
        <div>
            <div>
                <PageSection title="Text Types">
                    {
                        Object.entries(textTypes).map(function([key, value]) {
                            return (
                                <div key={key}>
                                    <InputRow>
                                        <Text>{`type={textTypes.${key}}`}</Text>
                                        <Text type={value}>
                                        The quick brown fox jumps over the lazy dog.
                                        </Text>
                                    </InputRow>
                                </div>
                            );
                        })
                    }
                </PageSection>
            </div>
            <InputRow/>
            <div>
                <PageSection title="Text Variants">
                    {
                        Object.entries(textVariants).map(function([key, value]) {
                            return (
                                <div key={key}>
                                    <InputRow>
                                        <Text>{`variant={textVariant.${key}}`}</Text>
                                        <Text variant={value}>
                                        The quick brown fox jumps over the lazy dog.
                                        </Text>
                                    </InputRow>
                                </div>
                            );
                        })
                    }
                </PageSection>
            </div>
            <PageSection title="Text Alignments">
                <Text align={Text.alignments.CENTER}>Centered</Text>
                <Text align={Text.alignments.RIGHT}>Right-aligned</Text>
            </PageSection>
        </div>
    );
};

export default TextDemo;
