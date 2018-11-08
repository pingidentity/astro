import React from "react";
import PageSection from "ui-library/lib/components/layout/PageSection";
import HelpHint from "ui-library/lib/components/tooltips/HelpHint";

/**
* @name PageSectionDemo
* @memberof PageSection
* @desc A demo for PageSection
*/
class PageSectionDemo extends React.Component {
    render() {
        const helpHint = <span>Would you like <HelpHint hintText="Some help?" className="inline" /></span>;

        return (
            <div>
                <PageSection
                    title="Here's a Section"
                    description={
                        `This is some content that's being laid out in our standard section style`
                    }
                >
                    Contrary to popular belief, Lorem Ipsum is not simply random text.
                    It has roots in a piece of classical Latin literature from 45 BC,
                    making it over 2000 years old. Richard McClintock, a Latin professor
                    at Hampden-Sydney College in Virginia, looked up one of the more
                    obscure Latin words, consectetur, from a Lorem Ipsum passage, and
                    going through the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                    1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
                    and Evil) by Cicero, written in 45 BC. This book is a treatise
                    on the theory of ethics, very popular during the Renaissance. The
                    first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
                    from a line in section 1.10.32.
                </PageSection>
                <hr className="hr"/>
                <PageSection>
                    This section is merely indented. This section is merely indented
                     This section is merely indented. This section is merely indented.
                     This section is merely indented. This section is merely indented.
                     This section is merely indented. This section is merely indented.
                     This section is merely indented. This section is merely indented.
                </PageSection>
                <hr className="hr"/>
                <PageSection description="No title, but with a description">
                    This section is merely indented. This section is merely indented.
                     This section is merely indented. This section is merely indented.
                     This section is merely indented. This section is merely indented.
                </PageSection>
                <hr className="hr" />
                <PageSection title={helpHint}>
                    You can put markup in the title prop as well.
                </PageSection>
            </div>
        );
    }
}

module.exports = PageSectionDemo;
