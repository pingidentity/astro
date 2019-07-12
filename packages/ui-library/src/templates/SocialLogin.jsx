import React, { Component } from "react";
import { v4 as uuidV4 } from "uuid";
import { allFlags } from "../util/FlagUtils";
import Button from "../components/buttons/Button";
import Chip, { chipColors } from "../components/layout/Chip";
import ColumnSelector, {
    ColumnTitle,
} from "../components/list/ColumnSelector";
import ExpandableRow from "../components/rows/ExpandableRow";
import FileUpload from "../components/forms/FileUpload";
import FlexRow, { alignments, spacingOptions } from "../components/layout/FlexRow";
import FormDropDownList from "../components/forms/FormDropDownList";
import FormTextArea from "../components/forms/FormTextArea";
import FormTextField from "../components/forms/FormTextField";
import FormToggle from "../components/forms/form-toggle";
import HelpHint, { Placements as HelpHintPlacements } from "../components/tooltips/HelpHint";
import Icon, { iconSizes } from "../components/general/Icon";
import Image, { imageSizes, imageTypes } from "../components/general/Image";
import InputRow from "../components/layout/InputRow";
import { InputWidths } from "../components/forms/InputWidths";
import LabelValuePairs from "../components/layout/LabelValuePairs";
import LinkDropDownList from "../components/forms/LinkDropDownList";
import MappedAttributes from "../components/layout/MappedAttributes";
import Padding, { sizes as paddingSizes } from "../components/layout/Padding";
import PageHeader from "../components/general/PageHeader";
import PageSection from "../components/layout/PageSection";
import RowBuilder, { Row as RowBuilderRow, Separator } from "../components/rows/RowBuilder";
import Table from "../components/tables/Table";
import { TabSet, TabContent } from "../components/layout/TabSet";
import Text, { textTypes } from "../components/general/Text";
import TileSelector, { TileButton, tileButtonTypes } from "../components/buttons/TileSelector";
import TutorialButton from "../components/buttons/TutorialButton";
import PageWizard, { Step } from "../components/panels/PageWizard/";

const initialState = {
    attributes: [],
    description: "",
    name: ""
};

const possibleProviders = {
    FACEBOOK: {
        token: "facebook",
        label: "Facebook",
        logo: "src/images/social/FacebookLogo.png",
        ...initialState
    },
    LINKEDIN: {
        token: "linkedin",
        label: "LinkedIn",
        logo: "src/images/social/LinkedInLogo.png",
        ...initialState
    },
    TWITTER: {
        token: "twitter",
        label: "Twitter",
        logo: "src/images/social/TwitterLogo.png",
        ...initialState
    },
    GOOGLE: {
        token: "google",
        label: "Google",
        logo: "src/images/social/GoogleLogo.png",
        ...initialState
    },
    INITIAL: {
        token: "initial"
    }
};

/**
 * @class Social Login
 * @desc This is a template for Social Login.
 */

export default class SocialLogin extends Component {
    state = {
        activeProvider: null,
        providers: [{
            id: uuidV4(),
            description: "Supervillain",
            logo: "src/demo/images/logo-facebook.png",
            name: "Facebook",
            type: "facebook"
        }],
        wizardStep: 0
    }

    addAttribute = () => this.setState(({ activeProvider: { attributes, ...activeProvider } }) => ({
        activeProvider: {
            ...activeProvider,
            attributes: [
                ...attributes,
                {
                    id: uuidV4(),
                    to: {
                        label: "attributeExample",
                        value: "attributeExample"
                    },
                    type: {
                        label: "None",
                        value: "none"
                    }
                }
            ]
        }
    }))

    removeAttribute = (e, id) => this.setState(({ activeProvider: { attributes, ...activeProvider } }) => ({
        activeProvider: {
            ...activeProvider,
            attributes: attributes.filter(attr => attr.id !== id)
        }
    }))

    closeWizard = () => this.setState(({
        activeProvider: null,
        wizardStep: 0
    }))

    deleteProvider = id => () => this.setState(({ providers }) => ({
        providers: providers.filter(prov => prov.id !== id)
    }))

    getMappedAttributes = attributes =>
        attributes.map(({
            from,
            to: { value: to },
            type: { value: type }
        }) => ({
            from: from,
            to: to,
            type: type
        }));

    goToLastStep = () => this.setState(({ activeProvider, wizardStep }) => ({
        activeProvider: wizardStep === 0 ? null : activeProvider,
        wizardStep: wizardStep === 0 ? 0 : wizardStep - 1
    }))

    goToNextStep = () => this.setState(({ wizardStep }) => ({
        wizardStep: wizardStep + 1
    }))

    openProviderWizard = ({ id = uuidV4(), ...provider }) => () => this.setState({
        activeProvider: {
            id,
            attributes: [],
            expanded: true,
            ...provider
        },
        wizardStep: 0
    })

    saveActiveProvider = () => this.setState(({ activeProvider, providers }) => ({
        activeProvider: null,
        providers: [
            ...providers.filter(({ id }) => id !== activeProvider.id),
            activeProvider
        ],
        wizardStep: 0
    }))

    setAttrValue = id => property => value => this.setState(({ activeProvider: { attributes, ...provider } }) => ({
        activeProvider: {
            ...provider,
            attributes: attributes.map(attr =>
                attr.id === id
                    ? {
                        ...attr,
                        [property]: value
                    }
                    : attr
            )
        }
    }))

    setProviderImage = ({
        target: {
            files: [file] = []
        } = {}
    }) => {
        const reader = new FileReader();
        reader.onloadend = ({ target: { result } }) => this.setState(({ activeProvider }) => ({
            activeProvider: {
                ...activeProvider,
                logo: result
            }
        }));
        reader.readAsDataURL(file);
    };

    setRowIndex = providerId => ({ index }) => this.setState(({ providers }) => ({
        // Iterate through providers, find the one being updated and update its
        // rowIndex
        providers: providers.map(({ rowIndex, ...provider }) => ({
            rowIndex: provider.id === providerId ? index : rowIndex,
            ...provider
        }))
    }));

    setStepState = stateName => val => this.setState(({ activeProvider }) => ({
        activeProvider: {
            ...activeProvider,
            [stateName]: val
        }
    }))

    toggleProviderExpanded = providerId => () => this.setState(({ providers }) => ({
        providers: providers.map(({ expanded, rowIndex = 0, ...provider }) => ({
            expanded: provider.id === providerId ? !expanded : rowIndex,
            rowIndex,
            ...provider
        }))
    }))

    render() {
        // NOTE: any of these properties- including the following function- should be
        // functions that are part of the class rather than in render to avoid them
        // being recreated on each render. Shown here for clarity.
        const providers = this.state.providers.map(provider => {
            const {
                appId,
                attributes = [],
                description,
                expanded = false,
                id,
                logo,
                name,
                rowIndex = 0,
                secret,
                type, // Facebook, LinkedIn or Twitter
            } = provider;

            return (
                <ExpandableRow
                    expanded={expanded}
                    flags={allFlags}
                    icon={<Image source={logo} type={imageTypes.SQUARE} size={imageSizes.AUTO} />}
                    key={id}
                    onDelete={this.deleteProvider(id)}
                    onEditButtonClick={this.openProviderWizard(provider)}
                    onToggle={this.toggleProviderExpanded(id)}
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
                        selectedIndex={rowIndex}
                        onValueChange={this.setRowIndex(id)}
                    >
                        <TabContent label="Profile">
                            <LabelValuePairs
                                dataPairs={[
                                    {
                                        label: "Name",
                                        value: name
                                    },
                                    {
                                        label: "Description",
                                        value: description
                                    },
                                    {
                                        label: "Logo",
                                        value: <Image size={imageSizes.SM} source={logo} />
                                    },
                                ]}
                            />
                        </TabContent>
                        <TabContent label="Connection">
                            <PageSection
                                title="Connection details"
                            >
                                <LabelValuePairs
                                    dataPairs={[
                                        {
                                            label: "App ID",
                                            value: appId
                                        },
                                        {
                                            label: "App Secret",
                                            value: secret
                                        }
                                    ]}
                                />
                            </PageSection>
                        </TabContent>
                        <TabContent label="Access">
                            <Table
                                bodyData={[
                                    [
                                        name,
                                        <Chip
                                            color={chipColors.FAINTGREY}
                                        >
                                            <FlexRow
                                                spacing={spacingOptions.XS}
                                            >
                                                Default:
                                                <Text
                                                    type={textTypes.NOTE}
                                                >
                                                id, first_name, last_name
                                                </Text>
                                            </FlexRow>
                                        </Chip>
                                    ],
                                    [
                                        name,
                                        <Chip
                                            color={chipColors.FAINTGREY}
                                        >
                                            Age Range
                                        </Chip>
                                    ]
                                ]}
                            />
                        </TabContent>
                        <TabContent label="Attributes">
                            <PageSection
                                title="Mapped Attributes"
                            >
                                <MappedAttributes
                                    attributes={this.getMappedAttributes(attributes)}
                                    labels={{
                                        from: `${type} Attribute`,
                                        to: "PingOne User Attribute",
                                        type: "Sync Frequency"
                                    }}
                                />
                            </PageSection>
                        </TabContent>
                    </TabSet>
                </ExpandableRow>
            );
        });

        const { activeProvider, wizardStep } = this.state;

        return (
            <div>
                <PageHeader
                    accessories={
                        <Button
                            label="Provider"
                            noSpacing
                            onClick={this.openProviderWizard(possibleProviders.INITIAL)}
                            iconName="add"
                        />
                    }
                    title={
                        <FlexRow inline>
                            <Padding right={paddingSizes.LG}>
                                    Social Identity Providers
                            </Padding>
                            <TutorialButton />
                        </FlexRow>
                    }
                    underlined
                />
                {providers}
                {activeProvider &&
                    <PageWizard
                        activeStep={this.state.wizardStep}
                        onCancel={this.goToLastStep}
                        onClose={this.closeWizard}
                        onNext={this.goToNextStep}
                    >
                        {activeProvider.token === possibleProviders.INITIAL.token &&
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
                                        icon={
                                            <Image source={possibleProviders.FACEBOOK.logo} size={imageSizes.FULL} />
                                        }
                                        onClick={this.openProviderWizard(possibleProviders.FACEBOOK)}
                                        type={tileButtonTypes.SQUARE}
                                    />
                                    <TileButton
                                        title={possibleProviders.TWITTER.label}
                                        icon={
                                            <Image source={possibleProviders.TWITTER.logo} size={imageSizes.FULL} />
                                        }
                                        onClick={this.openProviderWizard(possibleProviders.TWITTER)}
                                        type={tileButtonTypes.SQUARE}
                                    />
                                    <TileButton
                                        title={possibleProviders.LINKEDIN.label}
                                        icon={
                                            <Image source={possibleProviders.LINKEDIN.logo} size={imageSizes.FULL} />
                                        }
                                        onClick={this.openProviderWizard(possibleProviders.LINKEDIN)}
                                        type={tileButtonTypes.SQUARE}
                                    />
                                    <TileButton
                                        title={possibleProviders.GOOGLE.label}
                                        icon={
                                            <Image source={possibleProviders.GOOGLE.logo} size={imageSizes.FULL} />
                                        }
                                        onClick={this.openProviderWizard(possibleProviders.GOOGLE)}
                                        type={tileButtonTypes.SQUARE}
                                    />
                                </TileSelector>
                            </PageSection>
                            {/* TODO: Add "social" with faded out styling */}
                        </Step>
                        }
                        {activeProvider.token !== possibleProviders.INITIAL.token && [
                            <Step
                                title={
                                    <FlexRow
                                        alignment={alignments.CENTER}
                                    >
                                        <Padding
                                            right={paddingSizes.MD}
                                        >
                                            <Icon
                                                iconName={activeProvider.token}
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
                                        onValueChange={this.setStepState("name")}
                                        value={activeProvider.name}
                                    />
                                </InputRow>
                                <InputRow>
                                    <FormTextArea
                                        flags={["p-stateful"]}
                                        labelText="Description"
                                        onValueChange={this.setStepState("description")}
                                        value={activeProvider.description}
                                    />
                                </InputRow>
                                <InputRow>
                                    <FileUpload
                                        accepts={[".jpg"]}
                                        defaultImage="src/demo/images/logo-facebook.png"
                                        flags={["true-default"]}
                                        label="Logo"
                                        labelRemove="Remove"
                                        labelSelect="Choose a File"
                                        onChange={this.setProviderImage}
                                        showThumbnail
                                        stateless={false}
                                        thumbnailSrc={activeProvider.logo || ""}
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
                                                iconName={activeProvider.token}
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
                                    `Configure connection between ${activeProvider.label} and PingOne`
                                }
                                menuTitle="Configure Connection"
                                completed={wizardStep > 1}
                                key="configure"
                            >
                                <InputRow>
                                    <FormTextField
                                        flags={["p-stateful"]}
                                        labelText="App ID"
                                        onValueChange={this.setStepState("appId")}
                                        value={activeProvider.appId || ""}
                                    />
                                </InputRow>
                                <InputRow>
                                    <FormTextField
                                        flags={["p-stateful"]}
                                        labelText="App secret"
                                        maskValue
                                        onValueChange={this.setStepState("secret")}
                                        showReveal
                                        value={activeProvider.secret || ""}
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
                                                iconName={activeProvider.token}
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
                                key="request"
                            >
                                <ColumnSelector
                                    onAdd={this.addScope}
                                    options={[
                                        {
                                            id: "default",
                                            subtitle: "default",
                                            title: `${activeProvider.name}`
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
                                            title: `${activeProvider.name}`,
                                            customButton: () => (
                                                <HelpHint
                                                    flags={allFlags}
                                                    hintText="Scope cannot be removed"
                                                    placement={HelpHintPlacements.TOP}
                                                >
                                                    <Icon
                                                        flags={allFlags}
                                                        iconName="lock"
                                                        type="leading"
                                                    />
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
                                                iconName={activeProvider.token}
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
                                onSave={this.saveActiveProvider}
                                completed={wizardStep > 4}
                                key="linking"
                            >
                                <PageSection
                                    title={
                                        `Link ${activeProvider.name}'s attribute to your PingOne Identity Attribute`
                                    }
                                >
                                    <InputRow>
                                        <FormTextField
                                            flags={["p-stateful"]}
                                            labelText="Facebook ID Attribute"
                                            readOnly
                                            placeholder="email"
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
                                        addLabel="+ Add Attribute"
                                        onAdd={this.addAttribute}
                                        onRemove={this.removeAttribute}
                                        rows={[
                                            {
                                                id: "first",
                                                content: (
                                                    <RowBuilderRow key="first" showRemoveLabel>
                                                        <FormTextField
                                                            labelText={
                                                                <div>
                                                                    {`${activeProvider.name} Attribute`}
                                                                    <HelpHint
                                                                        flags={allFlags}
                                                                        hintText="Hint"
                                                                    />
                                                                </div>
                                                            }
                                                            stateless={false}
                                                            width={InputWidths.MD}
                                                            value="Example attribute"
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
                                                                    <HelpHint
                                                                        flags={allFlags}
                                                                        hintText="Hint"
                                                                    />
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
                                                ),
                                                removable: false
                                            },
                                            ...activeProvider.attributes.map(({ id, from, to, type }) => ({
                                                id,
                                                content: (
                                                    <RowBuilderRow key="first" showRemoveLabel>
                                                        <FormTextField
                                                            labelText={
                                                                <div>
                                                                    {`${activeProvider.name} Attribute`}
                                                                    <HelpHint
                                                                        flags={allFlags}
                                                                        hintText="Hint" />
                                                                </div>
                                                            }
                                                            onValueChange={this.setAttrValue(id)("from")}
                                                            stateless={false}
                                                            width={InputWidths.MD}
                                                            value={from}
                                                        />
                                                        <Separator>=</Separator>
                                                        <FormDropDownList
                                                            label="PingOne User Attribute"
                                                            onValueChange={this.setAttrValue(id)("to")}
                                                            options={[
                                                                {
                                                                    label: "attributeExample",
                                                                    value: "attributeExample"
                                                                },
                                                            ]}
                                                            selectedOption={to}
                                                            width={InputWidths.MD}
                                                        />
                                                        <Padding right={paddingSizes.SM} />
                                                        <FormDropDownList
                                                            label={
                                                                <div>
                                                                Sync Frequency
                                                                    <HelpHint
                                                                        flags={allFlags}
                                                                        hintText="Hint"
                                                                    />
                                                                </div>
                                                            }
                                                            onValueChange={this.setAttrValue(id)("type")}
                                                            options={[
                                                                { label: "None", value: "none" },
                                                            ]}
                                                            selectedOption={type}
                                                            width={InputWidths.SM}
                                                        />
                                                        <Padding right={paddingSizes.MD} />
                                                    </RowBuilderRow>
                                                )
                                            }))
                                        ]}
                                    />
                                </PageSection>
                            </Step>,
                        ]}
                    </PageWizard>
                }
            </div>
        );
    }
}
