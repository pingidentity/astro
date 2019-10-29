import React from "react";
import RockerButton from "ui-library/lib/components/forms/RockerButton";
import Section from "ui-library/lib/components/general/Section";
import Table from "ui-library/lib/components/tables/Table";
import PageHeader from "ui-library/lib/components/general/PageHeader";

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
                <div className="table-row-arrow">
                    <div className="icon-link"/>
                    <span>Name</span>
                    <div className="table-row-arrow__line"/>
                </div>,
                <div>
                    Customer Name
                </div>,
                <span className="row-tag">Required</span>
            ],
            [
                <div className="table-row-arrow">
                    <div className="icon-link"/>
                    <span>Country</span>
                    <div className="table-row-arrow__line"/>
                </div>,
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
                    className="grid--no-lines grid--small-padding home-app"
                />
            </Section>
            <Section
                data-id="demo-section-2"
                title="SAML Settings"
            >
                <Table
                    headData={attributeMappings.head}
                    bodyData={attributeMappings.body}
                    className="grid--no-lines grid--small-padding home-app"
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
                    className="grid--no-lines grid--small-padding home-app"
                />
            </Section>
        </div>
    );
};

export default HomeApp;
