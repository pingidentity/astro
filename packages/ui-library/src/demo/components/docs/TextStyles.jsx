import React from "react";
import PageSection from "ui-library/lib/components/layout/PageSection";
import HR from "ui-library/lib/components/general/HR";
import Markup from "../../core/Markup";
import Text from "ui-library/lib/components/general/Text";

const TextStyles = () => (
    <div>
        <PageSection title="Headings">
            <Text type="page-title">Page Title</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="page-title">Page Title</Text>`
                }
            />
            <HR />
            <Text type="page-subtitle">Page Subtitle</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="page-subtitle">Page Subtitle</Text>`
                }
            />
            <HR />
            <Text type="section-title">Section Title</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="section-title">Section Title</Text>`
                }
            />
        </PageSection>
        <PageSection title="Body Text">
            <Text type="body">This is some body text. You can <em>italicized words in it</em>.</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="body">This is some body text. You can <em>italicized words in it</em>.</Text>`
                }
            />
            <HR />
            <Text type="primary">This is some primary text.</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="primary">This is some primary text.</Text>`
                }
            />
            <HR />
            <Text type="note">This is a note.</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="note">This is a note.</Text>`
                }
            />
        </PageSection>
        <PageSection title="Labels & Values">
            <Text type="label">Label</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="label">Label</div>`
                }
            />
            <HR />
            <Text type="value">Value</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="value">Value</Text>`
                }
            />
        </PageSection>
        <PageSection title="Color Variants">
            <Text type="value text-error">Error text</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="value text-error">Error text</Text>`
                }
            />
            <HR />
            <Text type="value text-warning">Warning text</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="value text-warning">Warning text</Text>`
                }
            />
            <HR />
            <Text type="value text-success">Success text</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type="value text-success">Success text</Text>`
                }
            />
        </PageSection>
    </div>
);

export default TextStyles;
