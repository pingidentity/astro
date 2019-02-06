import React from "react";
import PageSection from "ui-library/lib/components/layout/PageSection";

const Content = () => (
    <PageSection>
        <PageSection title="Capitalization">
            <ul className="ul">
                <li>Buttons are title case, like "Delete Application"</li>
                <li>Links can be either sentence case or title case, depending on context</li>
                <li>If a link is being used to perform an action, it should be title case, like "+ Add Row"</li>
                <li>Links should be sentence case when they appear within other content</li>
                <li>
                    If a standalone link is not an action and is a complete sentence,
                    it should be sentence case like "Read more about this on our documentation site"
                </li>
            </ul>
        </PageSection>
        <PageSection title="Formats">
            <p>Our standard datetime format is 'YYYY-MM-DD hh:MM:SSa'.</p>
            <ul className="ul">
                <li>Dates should look like "2018-09-05"</li>
                <li>Times should look like "03:12:00pm"</li>
                <li>Datetimes should look like "2018-09-05 03:12:00pm"</li>
            </ul>
        </PageSection>
        <PageSection title="Language">
            <ul className="ul">
                <li>
                    Buttons and link button labels should be phrased as
                    verbs with objects when appropriate, like "+ Add Certificate" or "Change Token Provider"
                </li>
                <li>The titles of popups and popovers should match the labels of the buttons that triggered them</li>
                <li>
                    Buttons for completing or confirming an action can be more terse, like "Save" or "Done" or "Delete"
                </li>
                <li>
                    "Save" should refer to a singular change.
                    "Done" is used when completing a multi-step process (like a wizard).
                </li>
            </ul>
        </PageSection>
    </PageSection>
);

export default Content;