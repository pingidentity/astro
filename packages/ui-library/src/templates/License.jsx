import React, { Component } from "react";
import PageSection from "../components/layout/PageSection";
import Button from "../components/buttons/Button";
import Layout from "../components/general/ColumnLayout";
import PageHeader from "../components/general/PageHeader";
import FormLabel from "../components/forms/FormLabel";
import FlexRow, { spacingOptions, alignments } from "../components/layout/FlexRow";
import Text from "../components/general/Text";
import Stack from "../components/layout/Stack";
import Icon, { iconSizes } from "../components/general/Icon";
import Link from "../components/general/Link";
import LinkDropDownList from "../components/forms/LinkDropDownList";
import Modal from "../components/general/Modal";
import FormattedContent from "../components/general/FormattedContent";
import HR from "../components/general/HR";
import Section from "../components/general/Section";
import InputRow from "../components/layout/InputRow";
import Table, {
    columnAlignments,
} from "../components/tables/Table";
import CalloutBox from "../components/layout/CalloutBox";


/**
* @name License
* @desc This is a template to demonstrate how to build a License Template.
*/

const nodeOptions = [
    { label:
        <FormLabel value="Premier">
            <FlexRow spacing={spacingOptions.MD} alignment={alignments.CENTER}>
                <Stack gap="XS">
                    <Text type="value">Renewed 2019-06-13</Text>
                    <Text type="value">Expires 2022-12-13</Text>
                </Stack>
                <Stack gap="XS">
                    <Icon iconName="globe" iconSize={iconSizes.LG}>7/10</Icon>
                </Stack>
            </FlexRow>
        </FormLabel>, value: "1" },
    { label:
            <FormLabel value="Trial">
                <FlexRow spacing={spacingOptions.MD} alignment={alignments.CENTER}>
                    <Stack gap="XS">
                        <Text type="value">Created 2019-06-13</Text>
                        <Text type="value">Expires 2022-12-13</Text>
                    </Stack>
                    <Stack gap="XS">
                        <Icon iconName="globe" iconSize={iconSizes.LG}>4/5</Icon>
                    </Stack>
                </FlexRow>
            </FormLabel>, value: "2" },
    { label:
                <FormLabel value="Global">
                    <FlexRow spacing={spacingOptions.MD} alignment={alignments.CENTER}>
                        <Stack gap="XS">
                            <Text type="value">Renewed 2019-06-13</Text>
                            <Text type="value">Expires 2022-12-13</Text>
                        </Stack>
                        <Stack gap="XS">
                            <Icon iconName="globe" iconSize={iconSizes.LG}>11/15</Icon>
                        </Stack>
                    </FlexRow>
                </FormLabel>, value: "2" }
];


const mockData = {
};

const licenseStates = {
    landing: "landing",
    modal: "modal"
};


export default class License extends Component {

    initState = {
        licenseState: licenseStates.landing,
        modalClick: false,
        modalConfirm: false,
        expanded: false,
    }

    state = this.initState

    _toggleOpen = () => {
        this.setState({
            expanded: true,
        });
    }

    renderModal() {
        if (this.state.licenseState === licenseStates.Modal) {
            return (
                <Modal
                    data-id="default-example"
                    modalTitle="Default Modal"
                    expanded={this._toggleOpen}
                    onOpen={this._toggleOpen}
                >
                    <div>
                        <p>
                        Default modals size both vertically and horizontally with the content.
                        </p>
                        <p>
                        The modal has a maximum width of 960px.
                        </p>
                        <p>
                        The height will grow until it is 40px from the bottom of the users screen.
                        </p>
                    </div>
                </Modal>
            );
        }
    }

    renderLinkDropDown () {
        return (
            <LinkDropDownList
                stateless={false}
                closeOnClick={true}
                label={<Icon inline iconName="edit"/>}
                options={nodeOptions}
                flags={["use-portal"]}
                noCaret
            >
                {this.renderModal()}
            </LinkDropDownList>
        );

    }

    renderTable () {
        return ( <Table
            columnStyling={[
                {
                    width: "15em"
                },
                {
                    width: "10em",
                },
                {},
                {
                    width: "10em",
                    alignment: columnAlignments.RIGHT
                }
            ]}
            headData={[
                "Environment",
                "identities",
                "region",
                "re-assign"
            ]}
            bodyData={[
                [
                    "EU Contractors",
                    "201",
                    "Europe-DE",
                    this.renderLinkDropDown()
                ],
                [
                    "IT Admins",
                    "23",
                    "North America",
                    this.renderLinkDropDown()
                ],
                [
                    "Production",
                    "1400",
                    "North America",
                    this.renderLinkDropDown()
                ],
                [
                    "Stacy's Prod-like Sandbox",
                    "56",
                    "North America",
                    this.renderLinkDropDown()
                ],
                [
                    "Staging",
                    "1001",
                    "North America",
                    this.renderLinkDropDown()
                ],
                [
                    "UK Employees",
                    "854",
                    "Europe - UK",
                    this.renderLinkDropDown()
                ],
                [
                    "Vendors from Acme",
                    "33",
                    "North America",
                    this.renderLinkDropDown()
                ]
            ]
            }
        />
        );
    }

    render () {
        return (
            <div>
                <PageHeader title="License" />
                <PageSection>
                    <InputRow>
                        <Stack gap="LG">
                            <Layout.Column>
                                <FormLabel value="Organization" />
                                <Text type="value">
                                PingOne Demo
                                </Text>
                            </Layout.Column>
                        </Stack>
                    </InputRow>
                    <InputRow>
                        <Section
                            flags={["p-stateful"]}
                            titleSection={
                                <Layout.Row className="columns-width-auto">
                                    <Layout.Column>
                                        <FormLabel value="Premier">
                                            <Stack gap="XS">
                                                <Text type="value">Renewed 2019-06-13</Text>
                                                <Text type="value">Expires 2022-12-13</Text>
                                            </Stack>
                                        </FormLabel>
                                    </Layout.Column>
                                    <Layout.Column>
                                        <Icon iconName="earth" iconSize="xl" title="environments">
                                            <Stack gap="XS">
                                                <Text type="value">7/10 maximum</Text>
                                                <Text type="value">2 regions</Text>
                                            </Stack>
                                        </Icon>
                                    </Layout.Column>
                                    <Layout.Column>
                                        <Icon iconName="users" iconSize="xl" title="identites">
                                            <FormattedContent>
                                                <Stack gap="XS">
                                                    <Text type="value">10 million / environment</Text>
                                                </Stack>
                                            </FormattedContent>
                                        </Icon>
                                    </Layout.Column>
                                </Layout.Row>}
                        >
                            <Stack gap="MD">
                                <Link title="View Feature List" url="#" type="block" />
                                <CalloutBox>
                                    {this.renderTable()}
                                </CalloutBox>
                            </Stack>
                        </Section>
                        <Section
                            flags={["p-stateful"]}
                            titleSection={
                                <Layout.Row className="columns-width-auto">
                                    <Layout.Column>
                                        <FormLabel value="Trial"/>
                                        <Stack gap="XS">
                                            <Text type="value">Renewed 2019-06-13</Text>
                                            <Text type="value">Expires 2022-12-13</Text>
                                        </Stack>
                                    </Layout.Column>
                                    <Layout.Column>
                                        <Icon iconName="earth" iconSize="xl" title="environments">
                                            <Stack gap="XS">
                                                <Text type="value">4/5 maximum</Text>
                                                <Text type="value">Sandbox only</Text>
                                                <Text type="value">1 regions</Text>
                                            </Stack>
                                        </Icon>
                                    </Layout.Column>
                                    <Layout.Column>
                                        <Icon iconName="users" iconSize="xl" title="identites">
                                            <FormattedContent>
                                                <Stack gap="XS">
                                                    <Text type="value">1 million / environment</Text>
                                                </Stack>
                                            </FormattedContent>
                                        </Icon>
                                    </Layout.Column>
                                </Layout.Row>}
                        />
                    </InputRow>
                    <Stack gap="SM">
                        <Link title="Compare plans" url="#" type="block"/>
                        <Link title="Terms of service" url="#" type="block"/>
                        <Button type="primary" label="Contact Us" />
                    </Stack>
                </PageSection>
            </div>
        );
    }
}



