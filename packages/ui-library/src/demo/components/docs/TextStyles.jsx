import React from "react";
import PageSection from "ui-library/lib/components/layout/PageSection";
import HR from "ui-library/lib/components/general/HR";
import Markup from "../../core/Markup";
import Text, { textTypes, textVariants } from "ui-library/lib/components/general/Text";

const TextStyles = () => (
    <div>
        <PageSection title="Headings">
            <Text type={textTypes.PAGETITLE}>Page Title</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type={textTypes.PAGETITLE}>Page Title</Text>`
                }
            />
            <HR />
            <Text type={textTypes.PAGESUBTITLE}>Page Subtitle</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type={textTypes.PAGESUBTITLE}>Page Subtitle</Text>`
                }
            />
            <HR />
            <Text type={textTypes.SECTIONTITLE}>Section Title</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type={textTypes.SECTIONTITLE}>Section Title</Text>`
                }
            />
        </PageSection>
        <PageSection title="Body Text">
            <Text>This is some body text. You can <em>italicized words in it</em>.</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text>This is some body text. You can <em>italicized words in it</em>.</Text>`
                }
            />
            <HR />
            <Text type={textTypes.PRIMARY}>This is some primary text.</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type={textTypes.PRIMARY}>This is some primary text.</Text>`
                }
            />
            <HR />
            <Text type={textTypes.NOTE}>This is a note.</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type={textTypes.NOTE}>This is a note.</Text>`
                }
            />
        </PageSection>
        <PageSection title="Labels & Values">
            <Text type={textTypes.LABEL}>Label</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type={textTypes.LABEL}>Label</div>`
                }
            />
            <HR />
            <Text type={textTypes.VALUE}>Value</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type={textTypes.VALUE}>Value</Text>`
                }
            />
        </PageSection>
        <PageSection title="Color Variants">
            <Text type={textTypes.VALUE} variant={textVariants.ERROR}>Error text</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type={textTypes.VALUE} variant={textVariants.ERROR}>Error text</Text>`
                }
            />
            <HR />
            <Text type={textTypes.VALUE} variant={textVariants.WARNING}>Warning text</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type={textTypes.VALUE} variant={textVariants.ERROR}>Warning text</Text>`
                }
            />
            <HR />
            <Text type={textTypes.VALUE} variant={textVariants.SUCCESS}>Success text</Text>
            <Markup
                custom={true}
                language="html"
                content={
                    `<Text type={textTypes.VALUE} variant={textVariants.SUCCESS}>Success text</Text>`
                }
            />
        </PageSection>
    </div>
);

export default TextStyles;
