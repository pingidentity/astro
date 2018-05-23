import React from "react";
import PageSection from "ui-library/lib/components/layout/PageSection";
import Markup from "../../core/Markup";

const TextStyles = () => (
    <div>
        <PageSection title="Headings">
            <div className="text-page-title">Page Title</div>
            <Markup
                custom={true}
                language="html"
                content={
                    `<div className="text-page-title">Page Title</div>`
                }
            />
            <hr className="hr"/>
            <div className="text-page-subtitle">Page Subtitle</div>
            <Markup
                custom={true}
                language="html"
                content={
                    `<div className="text-page-subtitle">Page Subtitle</div>`
                }
            />
            <hr className="hr"/>
            <div className="text-section-title">Section Title</div>
            <Markup
                custom={true}
                language="html"
                content={
                    `<div className="text-section-title">Section Title</div>`
                }
            />
        </PageSection>
        <PageSection title="Body Text">
            <div className="text-body">This is some body text.</div>
            <Markup
                custom={true}
                language="html"
                content={
                    `<div className="text-body">This is some body text.</div>`
                }
            />
            <hr className="hr"/>
            <div className="text-primary">This is some primary text.</div>
            <Markup
                custom={true}
                language="html"
                content={
                    `<div className="text-primary">This is some primary text.</div>`
                }
            />
        </PageSection>
        <PageSection title="Labels & Values">
            <div className="text-label">Label</div>
            <Markup
                custom={true}
                language="html"
                content={
                    `<div className="text-label">Label</div>`
                }
            />
            <hr className="hr"/>
            <div className="text-value">Value</div>
            <Markup
                custom={true}
                language="html"
                content={
                    `<div className="text-value">Value</div>`
                }
            />
        </PageSection>
        <PageSection title="Color Variants">
            <div className="text-value text-error">Error text</div>
            <Markup
                custom={true}
                language="html"
                content={
                    `<div className="text-value text-error">Error text</div>`
                }
            />
            <hr className="hr" />
            <div className="text-value text-warning">Warning text</div>
            <Markup
                custom={true}
                language="html"
                content={
                    `<div className="text-value text-warning">Warning text</div>`
                }
            />
            <hr className="hr" />
            <div className="text-value text-success">Success text</div>
            <Markup
                custom={true}
                language="html"
                content={
                    `<div className="text-value text-success">Success text</div>`
                }
            />
        </PageSection>
    </div>
);

export default TextStyles;
