import React, { Component } from "react";

import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
import ButtonGroup from "ui-library/lib/components/layout/ButtonGroup";
import CalloutBox from "ui-library/lib/components/layout/CalloutBox";
import FlexRow, { spacingOptions, alignments, justifyOptions } from "ui-library/lib/components/layout/FlexRow";
import FormattedContent from "ui-library/lib/components/general/FormattedContent";
import Icon, { iconSizes, iconTypes } from "ui-library/lib/components/general/Icon";
import InputRow from "ui-library/lib/components/layout/InputRow";
import Layout from "ui-library/lib/components/general/ColumnLayout";
import Link from "ui-library/lib/components/general/Link";
import LinkDropDownList from "ui-library/lib/components/forms/LinkDropDownList";
import Modal from "ui-library/lib/components/general/Modal";
import Padding, { sizes } from "ui-library/lib/components/layout/Padding";
import PageSection from "ui-library/lib/components/layout/PageSection";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import Stack from "ui-library/lib/components/layout/Stack";
import Section from "ui-library/lib/components/general/Section";
import Table, {
    columnAlignments,
} from "ui-library/lib/components/tables/Table";
import Text, { textTypes } from "ui-library/lib/components/general/Text";

/**
* @name License
* @desc This is a template to demonstrate how to build a License Template.
*/

const LicenseOption = ({
    created,
    envCount,
    expires,
    renewed,
    type,
}) => (
    <Padding vertical={sizes.SM}>
        <FlexRow spacing={spacingOptions.LG} justify={justifyOptions.SPACEBETWEEN} alignment={alignments.CENTER}>
            <Stack gap="XS">
                <Text type={textTypes.PARENTLABEL}>{type}</Text>
                {renewed && <Text type={textTypes.VALUE}>Renewed {renewed}</Text>}
                {created && <Text type={textTypes.VALUE}>Created {created}</Text>}
                <Text type={textTypes.VALUE}>Expires {expires}</Text>
            </Stack>
            <Stack gap="XS">
                <Icon iconName="earth" iconSize={iconSizes.LG} type={iconTypes.INLINE}/>
                <Text align={Text.alignments.CENTER} type={textTypes.VALUE}>{envCount}</Text>
            </Stack>
        </FlexRow>
    </Padding>
);

const LicenseRow = ({
    created,
    envLines = [],
    expires,
    identityLines = [],
    onFeatureClick,
    renderTable,
    renderModal,
    renewed,
    type,
}) => (
    <Section
        flags={["p-stateful"]}
        title={
            <Layout.Row autoWidth>
                <Layout.Column>
                    <Stack gap="XS">
                        <Text type={textTypes.PARENTLABEL}>{type}</Text>
                        {renewed && <Text type={textTypes.VALUE}>Renewed {renewed}</Text>}
                        {created && <Text type={textTypes.VALUE}>Created {created}</Text>}
                        <Text type={textTypes.VALUE}>Expires {expires}</Text>
                    </Stack>
                </Layout.Column>
                <Layout.Column>
                    <Icon iconName="earth" iconSize={iconSizes.XL} title="environments">
                        <Stack gap="XS">
                            {envLines.map(line => <Text type={textTypes.VALUE} key={line}>{line}</Text>)}
                        </Stack>
                    </Icon>
                </Layout.Column>
                <Layout.Column>
                    <Icon iconName="users" iconSize={iconSizes.XL} title="identites">
                        <FormattedContent>
                            <Stack gap="XS">
                                {identityLines.map(line => <Text type={textTypes.VALUE} key={line}>{line}</Text>)}
                            </Stack>
                        </FormattedContent>
                    </Icon>
                </Layout.Column>
            </Layout.Row>}
    >
        <Stack gap="MD">
            <Link title="View Feature List" onClick={onFeatureClick} type="block"/>
            <CalloutBox>
                {renderTable()}
                {renderModal()}
            </CalloutBox>
        </Stack>
    </Section>
);

const nodeOptions = [
    { label: <LicenseOption type="Premier" renewed="2019-06-13" expires="2022-12-13" envCount="7/10" />, value: "1" },
    { label: <LicenseOption type="Trial" created="2019-06-13" expires="2022-12-13" envCount="4/5" />, value: "2" },
    { label: <LicenseOption type="Global" renewed="2019-06-13" expires="2022-12-13" envCount="11/15" />, value: "3" },
];


const licenseStates = {
    LANDING: "landing",
    MODALREASSIGN: "modalreassign",
    MODALDOWNGRADE: "modaldowngrade",
    FEATURE: "feature",
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
            licenseState: licenseStates.MODALREASSIGN,
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

    handleClick = () => {
        this.setState({
            expanded: false,
            licenseState: licenseStates.LANDING,
        });
    }


    modalContent = () => {
        if (this.state.licenseState === licenseStates.MODALREASSIGN) {
            return (
                <div>
                    <InputRow>
                    Are you sure you want to re-assign the environment <br/>
                    EU Contractors to a Global license?
                    </InputRow>
                    <ButtonGroup onCancel={this.handleClick}>
                        <Button type={buttonTypes.PRIMARY} onClick={this.handleClick}>Re-assign</Button>
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
                        <FormattedContent>
                            <ul>
                                <li>MFA will not be available for new users</li>
                                <li>Current custom schemas will not allow further customization</li>
                            </ul>
                        </FormattedContent>
                    </InputRow>
                    <InputRow>
                    Are you sure you want to re-assign the environment <br/>
                    EU Contractors to a Global license?
                    </InputRow>
                    <ButtonGroup onCancel={this.handleClick}>
                        <Button type={buttonTypes.PRIMARY} onClick={this.handleClick}>Re-assign</Button>
                    </ButtonGroup>
                </div>
            );
        } else if (this.state.licenseState === licenseStates.FEATURE) {
            return (
                <Stack spacing="LG">
                    <FormattedContent>
                        <ul>
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
                        </ul>
                    </FormattedContent>
                    <div>
                        <Link>Compare License Types <Icon iconName="new-window" flags={["v4"]} /></Link>
                    </div>
                    <ButtonGroup>
                        <Button onClick={this.handleClick}>Close</Button>
                    </ButtonGroup>
                </Stack>
            );
        }
    }

    renderModal = () => {
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

    renderLinkDropDown = () => {
        return (
            <LinkDropDownList
                label={<Icon type={iconTypes.INLINE} iconName="edit"/>}
                options={nodeOptions}
                flags={["p-stateful", "use-portal"]}
                onClick={this._toggleOpen}
                initialState={{
                    selectedOption: nodeOptions[0]
                }}
                labelArrowPosition={LinkDropDownList.labelArrowPositions.NONE}
            />
        );
    }

    renderLinkDropDown2 = () => {
        return (
            <LinkDropDownList
                label={<Icon type={iconTypes.INLINE} iconName="edit"/>}
                options={nodeOptions}
                flags={["p-stateful", "use-portal"]}
                onClick={this._toggleOpen2}
                initialState={{
                    selectedOption: nodeOptions[0]
                }}
                labelArrowPosition={LinkDropDownList.labelArrowPositions.NONE}
            />
        );
    }

    renderTable = () => {
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

    renderTable2 = () => {
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
                    this.renderLinkDropDown2()
                ],
                [
                    "IT Admins",
                    "23",
                    "North America",
                    this.renderLinkDropDown2()
                ],
            ]
            }
        />
        );
    }

    renderTable3 = () => {
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
                        <Stack gap="XS">
                            <Text type={textTypes.PARENT}>Organization</Text>
                            <Text type={textTypes.VALUE}>PingOne Demo</Text>
                        </Stack>
                    </InputRow>
                    <InputRow>
                        <LicenseRow
                            type="Premier"
                            renewed="2019-06-13"
                            expires="2022-12-13"
                            envLines={[
                                "7 (10 maximum)",
                                "2 regions"
                            ]}
                            identityLines={[
                                "10 million / environment"
                            ]}
                            onFeatureClick={this._toggleFeatureClick}
                            renderModal={this.renderModal}
                            renderTable={this.renderTable}
                        />
                        <LicenseRow
                            type="Trial"
                            renewed="2019-06-13"
                            expires="2022-12-13"
                            envLines={[
                                "4 (5 maximum)",
                                "Sandbox only",
                                "1 region",
                            ]}
                            identityLines={[
                                "1 million / environment"
                            ]}
                            onFeatureClick={this._toggleFeatureClick}
                            renderModal={this.renderModal}
                            renderTable={this.renderTable2}
                        />
                        <LicenseRow
                            type="Global"
                            renewed="2019-06-13"
                            expires="2022-12-13"
                            envLines={[
                                "11 (15 maximum)",
                                "All regions",
                            ]}
                            identityLines={[
                                "10 million / environment"
                            ]}
                            onFeatureClick={this._toggleFeatureClick}
                            renderModal={this.renderModal}
                            renderTable={this.renderTable3}
                        />
                    </InputRow>
                    <Stack gap="SM">
                        <Link title="Compare plans" url="#" type="block"/>
                        <Link title="Terms of service" url="#" type="block"/>
                        <Button type={buttonTypes.PRIMARY} label="Contact Us" />
                    </Stack>
                </PageSection>
            </div>
        );
    }
}



