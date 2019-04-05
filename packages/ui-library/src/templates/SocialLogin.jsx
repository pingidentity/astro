import React, { Component } from "react";
import Button from "../components/buttons/Button";
import ColumnSelector, {
    ColumnTitle,
} from "../components/list/ColumnSelector";
import ExpandableRow from "../components/rows/ExpandableRow";
import FileUpload from "../components/forms/FileUpload";
import FlexRow, { justifyOptions, alignments } from "../components/layout/FlexRow";
import FormDropDownList from "../components/forms/FormDropDownList";
import FormTextArea from "../components/forms/FormTextArea";
import FormTextField from "../components/forms/FormTextField";
import FormToggle from "../components/forms/form-toggle";
import HelpHint, { Placements as HelpHintPlacements } from "../components/tooltips/HelpHint";
import Icon, { iconSizes } from "../components/general/Icon";
import InputRow from "../components/layout/InputRow";
import { InputWidths } from "../components/forms/InputWidths";
import LabelValuePairs from "../components/layout/LabelValuePairs";
import LinkDropDownList from "../components/forms/LinkDropDownList";
import Padding, { sizes as paddingSizes } from "../components/layout/Padding";
import PageHeader from "../components/general/PageHeader";
import PageSection from "../components/layout/PageSection";
import RowBuilder, { Row as RowBuilderRow, Separator } from "../components/rows/RowBuilder";
import { TabSet, TabContent } from "../components/layout/TabSet";
import TileSelector, { TileButton, tileButtonTypes } from "../components/buttons/TileSelector";
import TutorialButton from "../components/buttons/TutorialButton";
import Wizard, { Step } from "../components/wizard-v2/";

const possibleProviders = {
    FACEBOOK: {
        token: "facebook",
        label: "Facebook"
    },
    LINKEDIN: {
        token: "linkedin",
        label: "LinkedIn"
    },
    TWITTER: {
        token: "twitter",
        label: "Twitter"
    },
    INITIAL: {
        token: "initial"
    }
};

export default class SocialLogin extends Component {
    state = {
        activeProvider: null,
        providers: [{
            description: "Supervillain",
            id: 0,
            name: "Facebook",
            type: "facebook"
        }],
        wizardStep: 0
    }

    closeWizard = () => this.setState(({
        activeProvider: null,
        wizardStep: 0
    }))

    goToLastStep = () => this.setState(({ activeProvider, wizardStep }) => ({
        activeProvider: wizardStep === 0 ? null : activeProvider,
        wizardStep: wizardStep === 0 ? 0 : wizardStep - 1
    }))

    goToNextStep = () => this.setState(({ wizardStep }) => ({
        wizardStep: wizardStep + 1
    }))

    openProviderWizard = provider => () => this.setState({
        activeProvider: provider,
        wizardStep: 0
    })

    // Not wired in yet
    saveActiveProvider = () => this.setState(({ activeProvider, providers }) => ({
        activeProvider: null,
        providers: [
            ...providers.filter(({ id }) => id !== activeProvider.id),
            activeProvider
        ]
    }))

    // Not wired in yet
    setStepState = (stateName) => val => ({ activeProvider }) => ({
        activeProvider: {
            ...activeProvider,
            [stateName]: val
        }
    })

    render() {
        // NOTE: State has not been wired in yet, but will be wired in at a later time.
        // Also, many of these properties- including the following function- should be
        // functions that are part of the class rather than in render to avoid them
        // being recreated on each render. Shown here for clarity.
        const providers = this.state.providers.map(({
            description,
            name,
            type // Facebook, LinkedIn or Twitter
        }) => {
            const icon = <Icon iconName={type} iconSize={iconSizes.XL} inline />;
            return (
                <ExpandableRow
                    flags={["expandable-row-class"]}
                    icon={icon}
                    key={name}
                    rowAccessories={
                        <FormToggle
                            flags={["p-stateful"]}
                            initialState={{
                                toggled: true
                            }}
                        />
                    }
                    subtitle={possibleProviders[type]}
                    title={name}
                >
                    <TabSet
                        selectedIndex={0}
                    >
                        <TabContent label="Profile">
                            <LabelValuePairs
                                dataPairs={[
                                    {
                                        label: "Name:",
                                        value: name
                                    },
                                    {
                                        label: "Description:",
                                        value: description
                                    },
                                    {
                                        label: "Logo:",
                                        value: icon
                                    },
                                ]}
                            />
                        </TabContent>
                        <TabContent label="Connection">
                            Connections
                        </TabContent>
                        <TabContent label="Access">
                            Access
                        </TabContent>
                        <TabContent label="Attributes">
                            Attributes
                        </TabContent>
                        <TabContent label="Populations">
                            Populations
                        </TabContent>
                    </TabSet>
                </ExpandableRow>
            );
        });

        const { activeProvider, wizardStep } = this.state;
        const renderRowBuilderAdd = () => (
            <LinkDropDownList
                key="filter"
                label="+ ADD ATTRIBUTE"
                options={[]}
                stateless
            />
        );
        return (
            <div>
                <PageHeader
                    title={
                        <FlexRow alignment={alignments.CENTER} justify={justifyOptions.SPACEBETWEEN}>
                            <FlexRow inline>
                                <Padding right={paddingSizes.LG}>
                                    Social Identity Providers
                                </Padding>
                                <TutorialButton />
                            </FlexRow>
                            <Button
                                label="+ Provider"
                                onClick={this.openProviderWizard(possibleProviders.INITIAL)}
                            />
                        </FlexRow>
                    }
                    underlined
                />
                {providers}
                {activeProvider &&
                    <Wizard
                        activeStep={this.state.wizardStep}
                        onCancel={this.goToLastStep}
                        onClose={this.closeWizard}
                        onNext={this.goToNextStep}
                    >
                        {this.state.activeProvider === possibleProviders.INITIAL &&
                        <Step
                            title="Add a Social or Custom Identity Provider"
                            description={"Make login and registration frictionless, easy," +
                                    " and more secure by enabling a trusted external IDP"}
                            clickDisabled
                            hideMenu
                            hideButtonBar
                            required
                        >
                            <PageSection
                                title="Select an identity provider from the options below"
                            >
                                <TileSelector>
                                    <TileButton
                                        title={possibleProviders.FACEBOOK.label}
                                        iconName={possibleProviders.FACEBOOK.token}
                                        onClick={this.openProviderWizard(possibleProviders.FACEBOOK)}
                                        type={tileButtonTypes.SQUARE}
                                    />
                                    <TileButton
                                        title={possibleProviders.TWITTER.label}
                                        iconName={possibleProviders.TWITTER.token}
                                        onClick={this.openProviderWizard(possibleProviders.TWITTER)}
                                        type={tileButtonTypes.SQUARE}
                                    />
                                    <TileButton
                                        title={possibleProviders.LINKEDIN.label}
                                        iconName={possibleProviders.LINKEDIN.token}
                                        onClick={this.openProviderWizard(possibleProviders.LINKEDIN)}
                                        type={tileButtonTypes.SQUARE}
                                    />
                                </TileSelector>
                            </PageSection>
                            {/* TODO: Add "social" with faded out styling */}
                        </Step>
                        }
                        {this.state.activeProvider !== possibleProviders.INITIAL && [
                            <Step
                                title={
                                    <FlexRow
                                        alignment={alignments.CENTER}
                                    >
                                        <Padding
                                            right={paddingSizes.MD}
                                        >
                                            <Icon
                                                iconName={this.state.activeProvider.token}
                                                iconSize={iconSizes.LG}
                                                inline
                                            />
                                        </Padding>
                                        Create Profile
                                    </FlexRow>
                                }
                                description={
                                    "Personalize the Identity Provider by create a unique profile. " +
                                    "The description will help your users identify the purpose and " +
                                    "uniqueness of your Identity Provider."
                                }
                                required
                                menuDescription="Customize Your Login Connector"
                                menuTitle="Create Profile"
                                completed={wizardStep > 0}
                                key="create"
                            >
                                <InputRow>
                                    <FormTextField
                                        flags={["p-stateful"]}
                                        labelText="Name"
                                    />
                                </InputRow>
                                <InputRow>
                                    <FormTextArea
                                        flags={["p-stateful"]}
                                        labelText="Description"
                                    />
                                </InputRow>
                                <InputRow>
                                    <FileUpload
                                        defaultImage=""
                                        label="Logo"
                                        labelRemove="Remove"
                                        labelSelect="Choose a File"
                                        showThumbnail
                                        thumbnailSrc="src/demo/images/favicon.png"
                                    />
                                </InputRow>
                            </Step>,
                            <Step
                                title={
                                    <FlexRow
                                        alignment={alignments.CENTER}
                                    >
                                        <Padding
                                            right={paddingSizes.MD}
                                        >
                                            <Icon
                                                iconName={this.state.activeProvider.token}
                                                iconSize={iconSizes.LG}
                                                inline
                                            />
                                        </Padding>
                                        Configure Connection
                                    </FlexRow>
                                }
                                description={
                                    "Personalize your application by creating a unique profile. " +
                                    "The description will help your users identify the purpose of the " +
                                    "application and provide important information to misguided connections."
                                }
                                required
                                menuDescription={
                                    `Configure connection between ${this.state.activeProvider.label} and PingOne`
                                }
                                menuTitle="Configure Connection"
                                completed={wizardStep > 1}
                                key="configure"
                            >
                                <InputRow>
                                    <FormTextField
                                        flags={["p-stateful"]}
                                        labelText="App ID"
                                    />
                                </InputRow>
                                <InputRow>
                                    <FormTextField
                                        flags={["p-stateful"]}
                                        labelText="App secret"
                                        maskValue
                                        showReveal
                                    />
                                </InputRow>
                            </Step>,
                            <Step
                                title={
                                    <FlexRow
                                        alignment={alignments.CENTER}
                                    >
                                        <Padding
                                            right={paddingSizes.MD}
                                        >
                                            <Icon
                                                iconName={this.state.activeProvider.token}
                                                iconSize={iconSizes.LG}
                                                inline
                                            />
                                        </Padding>
                                        Request Access
                                    </FlexRow>
                                }
                                description={
                                    "Logon connections are granted OAuth scopes so they can access our resources. " +
                                    "On the left is a list of OAuth scopes by resource type that can be added to " +
                                    "the \"Access Grants\" column to the right. After moving the desired scopes to " +
                                    "the Access Grants column you can save your selections."
                                }
                                required
                                menuDescription="Request OAuth scopes so they can access PingOne resources"
                                menuTitle="Request Access"
                                completed={wizardStep > 2}
                                key="configure"
                            >
                                <ColumnSelector
                                    options={[
                                        {
                                            id: "sandbox",
                                            subtitle: "scopeID",
                                            title: `${activeProvider.label}`
                                        },
                                    ]}
                                    optionsTitle={
                                        <div>
                                            <ColumnTitle
                                                title={<div key="label">Scopes filtered by:</div>}
                                            />
                                            <LinkDropDownList
                                                key="filter"
                                                label="All"
                                                options={[]}
                                                stateless
                                            />
                                        </div>
                                    }
                                    searchPlaceHolder="Search for Scopes"
                                    selectedOptions={[
                                        {
                                            disabled: true,
                                            id: "sandbox",
                                            subtitle: "Email",
                                            title: `${activeProvider.label}`,
                                            customButton: () => (
                                                <HelpHint
                                                    hintText="Scope cannot be removed"
                                                    placement={HelpHintPlacements.TOP}
                                                >
                                                    <Icon iconName="lock" />
                                                </HelpHint>
                                            )
                                        },
                                    ]}
                                    selectedTitle={
                                        <ColumnTitle
                                            title="Requested Scopes"
                                        />
                                    }
                                />
                            </Step>,
                            <Step
                                title={
                                    <FlexRow
                                        alignment={alignments.CENTER}
                                    >
                                        <Padding
                                            right={paddingSizes.MD}
                                        >
                                            <Icon
                                                iconName={this.state.activeProvider.token}
                                                iconSize={iconSizes.LG}
                                                inline
                                            />
                                        </Padding>
                                        ID Linking
                                    </FlexRow>
                                }
                                description={
                                    "Logon connections are granted OAuth scopes so they can access our resources. " +
                                    "On the left is a list of OAuth scopes by resource type that can be added to " +
                                    "the \"Access Grants\" column to the right. After moving the desired scopes to " +
                                    "the Access Grants column you can save your selections."
                                }
                                required
                                menuDescription="Provide access to your application for customers to authenticate"
                                menuTitle="ID Linking"
                                onSave={this.closeWizard}
                                completed={wizardStep > 4}
                                key="configure"
                            >
                                <PageSection
                                    title={
                                        `Link ${activeProvider.label}'s attribute to your PingOne Identity Attribute`
                                    }
                                >
                                    <InputRow>
                                        <FormTextField
                                            flags={["p-stateful"]}
                                            labelText="Facebook ID Attribute"
                                            readonly
                                            withArrow
                                        />
                                        <FormDropDownList
                                            label="PingOne User Attribute"
                                            options={[
                                                {
                                                    label: "email",
                                                    value: "email"
                                                }
                                            ]}
                                            selectedOption={{ label: "email", value: "email" }}
                                        />
                                    </InputRow>
                                </PageSection>
                                <Padding
                                    bottom={paddingSizes.XL}
                                />
                                <PageSection
                                    title="Map Attributes"
                                >
                                    <RowBuilder
                                        renderAddButton={renderRowBuilderAdd}
                                        rows={[
                                            {
                                                id: "first",
                                                content: (
                                                    <RowBuilderRow key="first" showRemoveLabel>
                                                        <FormTextField
                                                            labelText={
                                                                <div>
                                                                    {`${activeProvider.label} Attribute`}
                                                                    <HelpHint hintText="Hint" />
                                                                </div>
                                                            }
                                                            stateless={false}
                                                            width={InputWidths.MD}
                                                            value="Customer Name"
                                                        />
                                                        <Separator>=</Separator>
                                                        <FormDropDownList
                                                            autofocus={true}
                                                            label="PingOne User Attribute"
                                                            onValueChange={this.firstDropDownChange}
                                                            options={[
                                                                {
                                                                    label: "attributeExample",
                                                                    value: "attributeExample"
                                                                },
                                                            ]}
                                                            selectedOption={{
                                                                label: "attributeExample",
                                                                value: "attributeExample"
                                                            }}
                                                            width={InputWidths.MD}
                                                        />
                                                        <Padding right={paddingSizes.SM} />
                                                        <FormDropDownList
                                                            autofocus={true}
                                                            label={
                                                                <div>
                                                                Sync Frequency
                                                                    <HelpHint hintText="Hint" />
                                                                </div>
                                                            }
                                                            onValueChange={this.firstDropDownChange}
                                                            options={[
                                                                { label: "None", value: "none" },
                                                            ]}
                                                            selectedOption={{ label: "None", value: "none" }}
                                                            width={InputWidths.SM}
                                                        />
                                                        <Padding right={paddingSizes.MD} />
                                                    </RowBuilderRow>
                                                )
                                            }
                                        ]}
                                    />
                                </PageSection>
                            </Step>,
                        ]}
                    </Wizard>
                }
            </div>
        );
    }
}
