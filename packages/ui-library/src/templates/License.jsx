import React, { Component } from "react";
import PageSection from "../components/layout/PageSection";
import Button from "../components/buttons/Button";
import ButtonGroup from "../components/layout/ButtonGroup";
import Layout from "../components/general/ColumnLayout";
import PageHeader from "../components/general/PageHeader";
import FormLabel from "../components/forms/FormLabel";
import FlexRow, { spacingOptions, alignments, justifyOptions } from "../components/layout/FlexRow";
import Text from "../components/general/Text";
import Stack from "../components/layout/Stack";
import Icon, { iconSizes } from "../components/general/Icon";
import Link from "../components/general/Link";
import LinkDropDownList from "../components/forms/LinkDropDownList";
import Modal from "../components/general/Modal";
import FormattedContent from "../components/general/FormattedContent";
import Section from "../components/general/Section";
import InputRow from "../components/layout/InputRow";
import Table, {
    columnAlignments,
} from "../components/tables/Table";
import CalloutBox from "../components/layout/CalloutBox";
import Checkbox from "../components/forms/FormCheckbox";


/**
* @name License
* @desc This is a template to demonstrate how to build a License Template.
*/

const nodeOptions = [
    { label:
        <div>
            <FormLabel value="Premier" />
            <FlexRow spacing={spacingOptions.MD} justify={justifyOptions.SPACEBETWEEN} alignment={alignments.CENTER}>
                <Stack gap="XS">
                    <Text type="value">Renewed 2019-06-13</Text>
                    <Text type="value">Expires 2022-12-13</Text>
                </Stack>
                <Stack gap="XS">
                    <Icon iconName="globe" iconSize={iconSizes.LG}/>
                    <Text>&nbsp;7/10</Text>
                </Stack>
            </FlexRow>
        </div>, value: "1" },
    { label:
        <div>
            <FormLabel value="Trial" />
            <FlexRow spacing={spacingOptions.MD} justify={justifyOptions.SPACEBETWEEN} alignment={alignments.CENTER}>
                <Stack gap="XS">
                    <Text type="value">Created 2019-06-13</Text>
                    <Text type="value">Expires 2022-12-13</Text>
                </Stack>
                <Stack gap="XS">
                    <Icon iconName="globe" iconSize={iconSizes.LG}/>
                    <Text>&nbsp;4/5</Text>
                </Stack>
            </FlexRow>
        </div>, value: "2" },
    { label:
        <div>
            <FormLabel value="Global" />
            <FlexRow spacing={spacingOptions.MD} justify={justifyOptions.SPACEBETWEEN} alignment={alignments.CENTER}>
                <Stack gap="XS">
                    <Text type="value">Renewed 2019-06-13</Text>
                    <Text type="value">Expires 2022-12-13</Text>
                </Stack>
                <Stack gap="XS">
                    <Icon iconName="globe" iconSize={iconSizes.LG}/>
                    <Text>&nbsp;11/15</Text>
                </Stack>
            </FlexRow>
        </div>, value: "2" }
];


const licenseStates = {
    LANDING: "landing",
    MODALREASSIGN: "modalreassign",
    MODALDOWNGRADE: "modaldowngrade",
    FEATURE: "feature"
};


export default class License extends Component {

    initState = {
        licenseState: licenseStates.LANDING,
        expanded: false,
    }

    state = this.initState

    _toggleOpen = () => {
        this.setState({
            expanded: true,
            licenseState: licenseStates.MODALREASSIGN
        });
    }

    _toggleOpen2 = () => {
        this.setState({
            expanded: true,
            licenseState: licenseStates.MODALDOWNGRADE
        });
    }

    _toggleFeatureClick = () => {
        this.setState({
            expanded: true,
            licenseState: licenseStates.FEATURE
        });
    }

    // _toggleModals = () => {
    //     if (this.state.licenseState === licenseStates.MODALREASSIGN) {
    //         return this._toggleOpen;
    //     } else if (this.state.licenseState === licenseStates.MODALDOWNGRADE) {
    //         return this._toggleOpen2;
    //     }
    // }

    handleClick = () => {
        this.setState({
            expanded: false,
            licenseState: licenseStates.LANDING,
        });
    }

    _onChange = i => event => {
        var newState = {};
        newState["checkboxChecked" + i] = event.target.checked;
        this.setState(newState);
    };

    modalContent() {
        if (this.state.licenseState === licenseStates.MODALREASSIGN) {
            return (
                <div>
                    <InputRow>
                    Are you sure you want to re-assign the environment <br/>
                    EU Contractors to a Global license?
                    </InputRow>
                    <ButtonGroup onCancel={this.handleClick}>
                        <Button type="primary" onClick={this.handleClick}>Re-assign</Button>
                    </ButtonGroup>
                </div>
            );
        } else if (this.state.licenseState === licenseStates.MODALDOWNGRADE) {
            return (
                <div>
                    <InputRow>
                    Some Features in this environment current license <br/>
                    are not available in the new license. These features <br/>
                    will still function, but not additive changes can be <br/>
                    made to them.
                    </InputRow>
                    <InputRow>
                        <li>MFA will not be available for new users</li>
                        <li>
                                    Current custom schemas will not allow further <br />
                                    customization
                        </li>
                    </InputRow>
                    <InputRow>
                    Are you sure you want to re-assign the environment <br/>
                    EU Contractors to a Global license?
                    </InputRow>
                    <ButtonGroup onCancel={this.handleClick}>
                        <Button type="primary" onClick={this.handleClick}>Re-assign</Button>
                    </ButtonGroup>
                </div>
            );
        } else if (this.state.licenseState === licenseStates.FEATURE) {
            return (
                <div>
                    <li>Password Authn w/ credential store & basic profile</li>
                    <li>Social Login & Account Linking</li>
                    <li>Registration</li>
                    <li>Account Recovery</li>
                    <li>Profile Mgmt</li>
                    <li>MFA OTP - Email & SMS</li>
                    <li>OIDC / Oauth2</li>
                    <li>Polices: Time and IP</li>
                    <li>Admin User Mgmt App</li>
                    <li>Admin Auditing</li>
                    <li>Service Usage Reporting</li>
                    <li>Custom Schema</li>
                    <li>SAML Support (Inbound and Outbound)</li>
                    <li>Expanded Polices Support (Authn, Reg, Recover)</li>
                    <li>Consent Service</li>
                    <li>Delegated User Administration</li>
                    <li>OutBound Provisioning</li>
                    <ButtonGroup>
                        <Button onClick={this.handleClick}>Cancel</Button>
                    </ButtonGroup>
                </div>
            );
        }
    }

    renderModal() {
        if (this.state.licenseState === licenseStates.MODALREASSIGN) {
            return (
                <Modal
                    data-id="default-example"
                    modalTitle="Re-assign Environment"
                    maximize={false}
                    expanded={this.state.expanded}
                    flags={["p-stateful", "use-portal"]}
                >
                    {this.modalContent()}
                </Modal>
            );
        } else if (this.state.licenseState === licenseStates.MODALDOWNGRADE) {
            return ( <Modal
                data-id="default-example"
                modalTitle="License Downgrade"
                maximize={false}
                expanded={this.state.expanded}
                flags={["p-stateful", "use-portal"]}
            >
                {this.modalContent()}
            </Modal>
            );
        } else if (this.state.licenseState === licenseStates.FEATURE) {
            return ( <Modal
                data-id="default-example"
                modalTitle="Features: Premier License"
                maximize={false}
                expanded={this.state.expanded}
                flags={["p-stateful", "use-portal"]}
            >
                {this.modalContent()}
            </Modal>
            );
        }
    }

    renderLinkDropDown () {
        return (
            <LinkDropDownList
                stateless={false}
                label={<Icon type="inline" iconName="edit"/>}
                options={nodeOptions}
                flags={["p-stateful", "use-portal"]}
                onClick={this._toggleOpen}
                noCaret
            />
        );

    }

    renderCheckbox() {
        return (
            <Checkbox
                onChange = {this._onChange(1)}
                checked = {this.state.checkboxChecked1}
            />
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

    renderTable2 () {
        return ( <Table
            columnStyling={[
                {
                    width: "0"
                },
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
                this.renderCheckbox(),
                "Environment",
                "identities",
                "region",
                "re-assign"
            ]}
            bodyData={[
                [
                    this.renderCheckbox(),
                    "EU Contractors",
                    "201",
                    "Europe-DE",
                    this.renderLinkDropDown()
                ],
                [
                    this.renderCheckbox(),
                    "IT Admins",
                    "23",
                    "North America",
                    this.renderLinkDropDown()
                ],
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
                                        <FormLabel value="Premier"/>
                                        <Stack gap="XS">
                                            <Text type="value">Renewed 2019-06-13</Text>
                                            <Text type="value">Expires 2022-12-13</Text>
                                        </Stack>
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
                                <Link title="View Feature List" onClick={this._toggleFeatureClick} type="block"/>
                                <CalloutBox>
                                    {this.renderTable()}
                                    {this.renderModal()}
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
                        >
                            <CalloutBox>
                                {this.renderTable2()}
                                {this.renderModal()}
                            </CalloutBox>
                        </Section>
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



