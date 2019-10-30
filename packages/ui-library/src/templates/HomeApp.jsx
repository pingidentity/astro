import React from "react";
import Chip, { chipColors, chipTypes } from "ui-library/lib/components/layout/Chip";
import LinkingArrow from "ui-library/lib/components/layout/LinkingArrow";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import RockerButton from "ui-library/lib/components/forms/RockerButton";
import Section from "ui-library/lib/components/general/Section";
import Table, { tableWidths } from "ui-library/lib/components/tables/Table";

/**
 * @class Home App
 * @desc This is a template to demonstrate how to build a "Home App" interface.
 */
const HomeApp = () => {
    const attributeMappings = {
        head: [
            "P1 USER ATTRIBUTE",
            "APP ATTRIBUTE",
            ""
        ],
        body: [
            [
                <LinkingArrow
                    title="Name"
                />,
                <div>
                    Customer Name
                </div>,
                <Chip color={chipColors.TRANSPARENT} type={chipTypes.CONDENSED}>Required</Chip>
            ],
            [
                <LinkingArrow
                    title="Country"
                />,
                <div>Country</div>
            ]
        ]
    };

    return (
        <div>
            <PageHeader title="Home App" />
            <RockerButton
                labels={[
                    "Profile",
                    "Configuration",
                    "Access",
                    "Policies"
                ]}
                selectedIndex={2}
            />
            <Section
                data-id="demo-section-1"
                title="App Settings"
            >
                <Table
                    headData={attributeMappings.head}
                    bodyData={attributeMappings.body}
                    lines={false}
                />
            </Section>
            <Section
                data-id="demo-section-2"
                title="SAML Settings"
            >
                <Table
                    headData={attributeMappings.head}
                    bodyData={attributeMappings.body}
                    lines={false}
                />
            </Section>
            <Section
                data-id="demo-section-3"
                expanded
                title="Attribute Mappings"
            >
                <Table
                    headData={attributeMappings.head}
                    bodyData={attributeMappings.body}
                    lines={false}
                />
            </Section>
        </div>
    );
};

export default HomeApp;
