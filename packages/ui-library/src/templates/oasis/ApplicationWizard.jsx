import React from "react";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import PageSection from "ui-library/lib/components/layout/PageSection";
import Button from "ui-library/lib/components/buttons/Button";
import PageWizard, { Step } from "ui-library/lib/components/panels/PageWizard";
import TileSelector from "ui-library/lib/components/buttons/TileSelector";
import Aside from "ui-library/lib/components/layout/Aside";
import CalloutBox from "ui-library/lib/components/layout/CalloutBox";
import Stack from "ui-library/lib/components/layout/Stack";
import Text from "ui-library/lib/components/general/Text";
import Modal from "ui-library/lib/components/general/Modal";
import Section from "ui-library/lib/components/general/Section";
import CodeView from "ui-library/lib/components/general/CodeView";
import Table from "ui-library/lib/components/tables/Table";
import FormTextArea from "ui-library/lib/components/forms/form-text-area";
import FormTextField from "ui-library/lib/components/forms/form-text-field";
import InputRow from "ui-library/lib/components/layout/InputRow";
import Multivalues from "ui-library/lib/components/forms/Multivalues";

/**
 * @class ApplicationWizard
 * @desc This is a template to demonstrate how to build the charting dashboard.
 */

const templates = [
    {
        id: "public",
        title: "Public Application",
        iconName: "globe",
        description: `This app should be accessible internally and externally, ` +
            `and sign-on is not required. ` +
            `Multi-factor authentication will not be required. There is no sensitive data in this app.`,
        link: {
            text: "Review Configuration",
        },
        note: "OpenID Connect",
    },
    {
        id: "partners",
        title: "Internal Application (and Partners)",
        iconName: "badge",
        description: `This app should be accessible only to internal employees and partners. ` +
            `They will be required to sign on via SSO, possibly requiring MFA. ` +
            `There may be some sensitive data in this app.`,
        link: {
            text: "Review Configuration",
        },
        note: "OAuth",
    },
    {
        id: "employees",
        title: "Internal Application (Employees Only)",
        iconName: "key",
        description: `This app should be accessible only to internal employees. ` +
            `They will be required to sign on via SSO, possibly requiring MFA. ` +
            `There is sensitive data in this app.`,
        link: {
            text: "Review Configuration",
        },
        note: "OpenID Connect",
    },
];

const code = `
{
    "clientId": "api_implicit",
    "redirectUris": [
        "https://localhost:3000/PingAccessQuickStart/api-demo"
    ],
    "grantTypes": [
        "IMPLICIT"
    ],
    "name": "Implicit API Client",
    "refreshRolling": "SERVER_DEFAULT",
    "persistentGrantExpirationType": "SERVER_DEFAULT",
    "persistentGrantExpirationTime": 0,
    "persistentGrantExpirationTimeUnit": "DAYS",
    "bypassApprovalPage": false,
    "restrictScopes": false,
    "restrictedScopes": [],
    "exclusiveScopes": [],
    "restrictedResponseTypes": [],
    "validateUsingAllEligibleAtms": false,
    "oidcPolicy": {
        "grantAccessSessionRevocationApi": false,
        "pingAccessLogoutCapable": false
    },
    "extendedParameters": {},
    "requireSignedRequests": false
}
`;

const filterTemplates = (integration, options) => (
    integration === "all" ? options : options.filter(option => option.note === integration)
);

const ChooseTemplate = ({
    template,
    onTemplateChange,
    integration,
    makeOnIntegrationChange,
    showConfiguration,
    onShowConfiguration,
    onHideConfiguration,
    ...props
}) => (
    <Step {...props} >
        <Aside
            aside={
                <CalloutBox>
                    <Stack>
                        <Text type="section-title">Need Help Choosing?</Text>
                        <Text type="primary">What kind of application is this?</Text>
                        <Stack gap="XS">
                            <Button
                                inline
                                label="API"
                                onClick={makeOnIntegrationChange("OAuth")}
                                active={integration === "OAuth"}
                            />
                            <Text>OAuth can authorize API access.</Text>
                        </Stack>
                        <Stack gap="XS">
                            <Button
                                inline
                                label="Web Application"
                                onClick={makeOnIntegrationChange("OpenID Connect")}
                                active={integration === "OpenID Connect"}
                            />
                            <Text>OpenID Connect provides authentication.</Text>
                        </Stack>
                    </Stack>
                </CalloutBox>
            }
            width="SM"
        >
            <TileSelector
                selected={template}
                onValueChange={onTemplateChange}
                type="stacked"
                options={filterTemplates(integration, templates).map(
                    item => ({
                        ...item,
                        link: {
                            text: item.link.text,
                            onClick: e => {
                                e.stopPropagation();
                                onShowConfiguration();
                            }
                        } })
                )}
            />
        </Aside>
        <Modal
            expanded={showConfiguration}
            onClose={onHideConfiguration}
            closeOnBgClick
            modalTitle="Template Configuration"
            maximize
        >
            <h3 className="text-section-title">Public Application</h3>
            <Section title="Client"><CodeView value={code} /></Section>
            <Section title="OIDC Policy"><CodeView value={code} /></Section>
            <Section title="Access Token Manager"><CodeView value={code} /></Section>
        </Modal>
    </Step>
);

const RedirectURIs = (props) => (
    <Step {...props} >
        <Stack>
            <Table
                verticalAlignment="MIDDLE"
                headData={["Environment", "Redirect URIs"]}
                bodyData={[
                    [
                        "Production",
                        <FormTextArea />
                    ],
                    [
                        "Staging",
                        <FormTextArea />
                    ],
                    [
                        "Development",
                        <FormTextArea />
                    ]
                ]}
            />
            <Text>
                When deploying the configuration for this application to each environment,
                it will be deployed with its respective set of redirection URIs.
            </Text>
        </Stack>
    </Step>
);

const ApplicationProperties = ({ owners, onOwnersChange, ...props }) => (
    <Step {...props} >
        <InputRow>
            <FormTextField labelText="Name" required />
        </InputRow>
        <InputRow>
            <FormTextArea labelText="Description" />
        </InputRow>
        <InputRow>
            <Multivalues
                labelText="Owners"
                entries={owners}
                onValueChange={onOwnersChange}
                autoHeight
                options={[{
                    "label": "Brandy Lemerle",
                    "value": "brandy_lemerle"
                }, {
                    "label": "Danielle Speirs",
                    "value": "danielle_speirs"
                }, {
                    "label": "Jennee Ofener",
                    "value": "jennee_ofener"
                }, {
                    "label": "Afton Siward",
                    "value": "afton_siward"
                }, {
                    "label": "Robbie Priter",
                    "value": "robbie_priter"
                }, {
                    "label": "Reginald Zamorano",
                    "value": "reginald_zamorano"
                }, {
                    "label": "Colline Hedditeh",
                    "value": "colline_hedditeh"
                }, {
                    "label": "Clevey Hatherall",
                    "value": "clevey_hatherall"
                }, {
                    "label": "Calhoun Breagan",
                    "value": "calhoun_breagan"
                }, {
                    "label": "Mathilda Foulstone",
                    "value": "mathilda_foulstone"
                }, {
                    "label": "Clerkclaude Lanon",
                    "value": "clerkclaude_lanon"
                }, {
                    "label": "Sam Lacer",
                    "value": "sam_lacer"
                }, {
                    "label": "Marleah Lillo",
                    "value": "marleah_lillo"
                }, {
                    "label": "Susanne Antonin",
                    "value": "susanne_antonin"
                }, {
                    "label": "Cynthea Figiovanni",
                    "value": "cynthea_figiovanni"
                }, {
                    "label": "Danny Kobierra",
                    "value": "danny_kobierra"
                }, {
                    "label": "Bettye Tribe",
                    "value": "bettye_tribe"
                }, {
                    "label": "Angelica Comley",
                    "value": "angelica_comley"
                }, {
                    "label": "Gabi Wagner",
                    "value": "gabi_wagner"
                }, {
                    "label": "Stephi Letteresse",
                    "value": "stephi_letteresse"
                }]}
            />
        </InputRow>
    </Step>
);

class AddApplication extends React.Component {
    state = {
        showingWizard: false,
        activeStep: 0,
        integration: "all",
        showConfiguration: false,
        owners: [],
    };

    _showWizard = () => this.setState({ showingWizard: true, activeStep: 0 });
    _hideWizard = () => this.setState({ showingWizard: false });

    _handleNext = () => this.setState(({ activeStep }) => ({ activeStep: activeStep + 1 }));
    _handleSave = () => {
        this._hideWizard();
    };

    _handleTemplateChange = template => this.setState({ template });

    _handleMenuClick = activeStep => this.setState({ activeStep });

    // this function makes the handler function you'd have to define for each
    // individual integration button
    _makeHandleIntegrationChange = integration => () => this.setState(
        state => {
            const unselect = (
                state.template && templates.find(
                    template => template.id === state.template
                ).note !== integration
            ) ? { template: undefined } : {};
            return (state.integration === integration)
                ? { integration: "all", ...unselect }
                : { integration, ...unselect };
        }
    );

    _showConfiguration = () => this.setState({ showConfiguration: true });
    _hideConfiguration = () => this.setState({ showConfiguration: false });

    _handleOwnersChange = value => this.setState({ owners: value });

    render() {
        const {
            activeStep,
            showingWizard,
            template,
            integration,
            showConfiguration,
            owners,
        } = this.state;

        return (
            <div>
                <PageHeader title="Oasis Add Application Wizard" />
                <PageSection>
                    <Button
                        label="Add Application"
                        iconName="add"
                        onClick={this._showWizard}
                    />
                </PageSection>
                {showingWizard &&
                    <PageWizard
                        activeStep={activeStep}
                        onCancel={this._hideWizard}
                        onNext={this._handleNext}
                        onMenuClick={this._handleMenuClick}
                    >
                        <ChooseTemplate
                            title="Choose Template"
                            description="Choose the base security policy for your application."
                            required
                            onTemplateChange={this._handleTemplateChange}
                            template={template}
                            continueDisabled={template === undefined}
                            completed={activeStep > 0}
                            integration={integration}
                            makeOnIntegrationChange={this._makeHandleIntegrationChange}
                            showConfiguration={showConfiguration}
                            onShowConfiguration={this._showConfiguration}
                            onHideConfiguration={this._hideConfiguration}
                        />
                        <RedirectURIs
                            title="Redirect URIs"
                            description="What are the URIs your app will live at for each environment tier?"
                            completed={activeStep > 1}
                            required
                        />
                        <ApplicationProperties
                            title="Application Properties"
                            description="Provide the basic details for your application."
                            completed={activeStep > 2}
                            owners={owners}
                            onOwnersChange={this._handleOwnersChange}
                            required
                            onSave={this._handleSave}
                        />
                    </PageWizard>
                }
            </div>);
    }
}

export default AddApplication;
