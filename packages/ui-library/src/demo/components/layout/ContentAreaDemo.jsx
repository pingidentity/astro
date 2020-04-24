import React from "react";
import Text from "ui-library/lib/components/general/Text";
import ContentArea from "ui-library/lib/components/layout/ContentArea";
import PageSection from "ui-library/lib/components/layout/PageSection";

/**
* @name ContentAreaDemo
* @memberof ContentArea
* @desc A demo for Content Area component
*/

// Inline styles added to work around component's overflow and positioning css for demoing purposes only.
const styles = {
    height: "120px",
    position: "relative"
};

const ContentAreaDemo = () => {
    return (
        <div>
            <PageSection title="Content Area">
                <div style={ styles }>
                    <ContentArea>
                        <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu tincidunt.
                        Sed scelerisque quam tortor, in pretium dolor elementum ac. Integer eg.
                        lacus, vitae iaculis leo. Suspendisse lobortis mattis eros, a congue nisi.
                        magna eu convallis. Morbi facilisis sed lorem at bibendum. Nunc sed mauris.
                        Donec nec lorem venenatis, tincidunt odio quis, euismod lacus.
                        </Text>
                    </ContentArea>
                </div>
            </PageSection>
            <PageSection title="Content Area with noLeftPadding prop">
                <div style={ styles }>
                    <ContentArea noLeftPadding>
                        <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu tincidunt.
                        Sed scelerisque quam tortor, in pretium dolor elementum ac. Integer eg.
                        lacus, vitae iaculis leo. Suspendisse lobortis mattis eros, a congue nisi.
                        magna eu convallis. Morbi facilisis sed lorem at bibendum. Nunc sed mauris.
                        Donec nec lorem venenatis, tincidunt odio quis, euismod lacus.
                        </Text>
                    </ContentArea>
                </div>
            </PageSection>
        </div>
    );
};

export default ContentAreaDemo;
