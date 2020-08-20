import React, { Component } from "react";
import { v4 as uuidV4 } from "uuid";
import Button from "../components/buttons/Button";
import Chip, { chipColors } from "../components/layout/Chip";
import ColumnSelector, {
    ColumnTitle,
} from "../components/list/ColumnSelector";
import DetailsTooltip, { detailsWidths, tooltipPlacements } from "../components/tooltips/DetailsTooltip";
import ExpandableRow from "../components/rows/ExpandableRow";
import FileDrop from "../components/forms/FileDrop";
import FileUpload from "../components/forms/FileUpload";
import FlexRow, { alignments, spacingOptions } from "../components/layout/FlexRow";
import FormCheckbox from "../components/forms/FormCheckbox";
import FormDropDownList from "../components/forms/FormDropDownList";
import FormTextArea from "../components/forms/FormTextArea";
import FormTextField from "../components/forms/FormTextField";
import FormRadioInput from "../components/forms/FormRadioInput";
import FormToggle from "../components/forms/form-toggle";
import HelpHint, { Placements as HelpHintPlacements } from "../components/tooltips/HelpHint";
import Icon, { iconSizes } from "../components/general/Icon";
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
import SocialIcon from "@pingux/end-user/components/SocialIcon";
import SocialButton, { BrandTypes } from "@pingux/end-user/components/SocialButton";
import Link from "../components/general/Link";
import Image, { imageSizes } from "../components/general/Image";
import ColorPicker, { pickerTypes, simplePickerSizes } from "../components/general/ColorPicker";

const initialState = {
    attributes: [],
    description: "",
    name: ""
};

const possibleProviders = {
    FACEBOOK: {
        token: "facebook",
        label: "Facebook",
        logo: <SocialIcon.FACEBOOK width="50px" height="50px" />,
        branding: BrandTypes.FACEBOOK,
        brandingLabel: "Login with Facebook",
        ...initialState
    },
    LINKEDIN: {
        token: "linkedin",
        label: "LinkedIn",
        logo: <SocialIcon.LINKEDIN width="50px" height="50px" />,
        branding: BrandTypes.LINKEDIN,
        brandingLabel: "Login with LinkedIn",
        ...initialState
    },
    TWITTER: {
        token: "twitter",
        label: "Twitter",
        logo: <SocialIcon.TWITTER width="50px" height="50px" />,
        branding: BrandTypes.TWITTER,
        brandingLabel: "Login with Twitter",
        ...initialState
    },
    GOOGLE: {
        token: "google",
        label: "Google",
        logo: <SocialIcon.GOOGLE width="50px" height="50px" />,
        branding: BrandTypes.GOOGLE,
        brandingLabel: "Login with Google",
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
            logo: <SocialIcon.FACEBOOK width="50px" height="50px" />,
            name: "Facebook",
            type: "facebook"
        }],
        wizardStep: 0,
        displayCustomSocialButton: false,
        buttonType: "upload",
        buttonLogo: true,
        buttonFileName: null,
        tooltipOpen: false
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
        wizardStep: 0,
        buttonType: provider.branding ? "html" : "upload"
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
                customLogo: result
            }
        }));
        reader.readAsDataURL(file);
    };

    removeProviderImage = () => {
        this.setState(({ activeProvider }) => ({
            activeProvider: {
                ...activeProvider,
                customLogo: null
            }
        }));
    }

    setSocialButtonImage = (file) => {
        const reader = new FileReader();
        reader.onloadend = ({ target: { result } }) => this.setState(({ activeProvider }) => ({
            activeProvider: {
                ...activeProvider,
                socialButtonImage: result
            }
        }));
        this.setState({ buttonFileName: file.name });
        reader.readAsDataURL(file);

        setTimeout(() => {
            this.setState({ tooltipOpen: !this.state.tooltipOpen });
        }, 1000);
    };

    removeSocialButtonImage = () => {
        this.setState(({ activeProvider }) => ({
            activeProvider: {
                ...activeProvider,
                socialButtonImage: null
            }
        }));
    }

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
            expanded: provider.id === providerId ? !expanded : expanded,
            rowIndex,
            ...provider
        }))
    }))

    updateFill = (color) => {
        this.setState({
            activeProvider: {
                ...this.state.activeProvider,
                branding: {
                    ...this.state.activeProvider.branding,
                    fill: color
                }
            }
        });
    }

    updateBorder = (color) => {
        this.setState({
            activeProvider: {
                ...this.state.activeProvider,
                branding: {
                    ...this.state.activeProvider.branding,
                    border: color
                }
            }
        });
    }

    updateColor = (color) => {
        this.setState({
            activeProvider: {
                ...this.state.activeProvider,
                branding: {
                    ...this.state.activeProvider.branding,
                    color: color
                }
            }
        });
    }

    updateLabel= (value) => {
        this.setState({
            activeProvider: {
                ...this.state.activeProvider,
                brandingLabel: value
            }
        });
    }

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
                name,
                rowIndex = 0,
                secret,
                customLogo = null,
                logo,
                socialButtonImage = null,
                branding,
                brandingLabel,
                type, // Facebook, LinkedIn or Twitter
            } = provider;

            return (
                <ExpandableRow
                    expanded={expanded}
                    icon={customLogo ? undefined : logo}
                    image={customLogo}
                    key={id}
                    onDelete={this.deleteProvider(id)}
                    onEditButtonClick={this.openProviderWizard(provider)}
                    onToggle={this.toggleProviderExpanded(id)}
                    rowAccessories={
                        <FormToggle
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
                                        value: customLogo ? (<Image source={customLogo} size={imageSizes.SM} />) : logo
                                    },
                                    {
                                        label: "Button",
                                        value: (
                                            <div style={{ width: "340px" }}>
                                                <SocialButton
                                                    branding={branding}
                                                    label={brandingLabel}
                                                    image={socialButtonImage}
                                                />
                                            </div>
                                        )
                                    }
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
                                                <SocialIcon.FACEBOOK />
                                            }
                                            onClick={this.openProviderWizard(possibleProviders.FACEBOOK)}
                                            type={tileButtonTypes.SQUARE}
                                        />
                                        <TileButton
                                            title={possibleProviders.TWITTER.label}
                                            icon={
                                                <SocialIcon.TWITTER />
                                            }
                                            onClick={this.openProviderWizard(possibleProviders.TWITTER)}
                                            type={tileButtonTypes.SQUARE}
                                        />
                                        <TileButton
                                            title={possibleProviders.LINKEDIN.label}
                                            icon={
                                                <SocialIcon.LINKEDIN />
                                            }
                                            onClick={this.openProviderWizard(possibleProviders.LINKEDIN)}
                                            type={tileButtonTypes.SQUARE}
                                        />
                                        <TileButton
                                            title={possibleProviders.GOOGLE.label}
                                            icon={
                                                <SocialIcon.GOOGLE />
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
                                            {activeProvider.logo}
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
                                        labelText="Name"
                                        onValueChange={this.setStepState("name")}
                                        value={activeProvider.name}
                                    />
                                </InputRow>
                                <InputRow>
                                    <FormTextArea
                                        labelText="Description"
                                        onValueChange={this.setStepState("description")}
                                        value={activeProvider.description}
                                    />
                                </InputRow>
                                <InputRow>
                                    <FileUpload
                                        accepts={[".jpg"]}
                                        defaultImage="src/demo/images/logo-facebook.png"
                                        labelSelect="choose"
                                        labelRemove={activeProvider.customLogo ? "Remove" : ""}
                                        showThumbnail
                                        label="Logo"
                                        onChange={this.setProviderImage}
                                        onRemove={this.removeProviderImage}
                                        thumbnailSrc={
                                            activeProvider.customLogo ? activeProvider.customLogo : (<div>
                                                <div style={{
                                                    marginBottom: "8px",
                                                    opacity: !activeProvider.customLogo ? .5 : 1
                                                }}>
                                                    {activeProvider.logo}
                                                </div>
                                                <div style={{ textTransform: "none", fontSize: "14px" }}>
                                                    {!activeProvider.customLogo && (
                                                        <Link>Change</Link>
                                                    )}
                                                </div>
                                            </div>)
                                        }
                                    />
                                </InputRow>
                                <InputRow>
                                    <InputRow>
                                        <div>
                                            <div style={{
                                                alignItems: "center",
                                                display: "flex",
                                                flexDirection: "row",
                                                marginBottom: "8px"
                                            }}>
                                                <div style={{
                                                    marginRight: "15px",
                                                    width: "340px",
                                                    opacity: !activeProvider.socialButtonImage ? .5 : 1
                                                }}>
                                                    {activeProvider.socialButtonImage ? (
                                                        <Image
                                                            alt={activeProvider.socialButtonImage}
                                                            size={imageSizes.AUTO}
                                                            source={activeProvider.socialButtonImage}
                                                        />
                                                    ) : (
                                                        <SocialButton
                                                            branding={{
                                                                ...activeProvider.branding,
                                                                logo: this.state.buttonLogo &&
                                                                    activeProvider.branding ? (
                                                                        activeProvider.branding.logo
                                                                    ) : null
                                                            }}
                                                            label={activeProvider.brandingLabel}
                                                            image={activeProvider.socialButtonImage}
                                                        />
                                                    )}
                                                </div>
                                                <DetailsTooltip
                                                    label={<Icon iconName="edit" iconSize={iconSizes.MD} />}
                                                    showClose
                                                    width={detailsWidths.LG}
                                                    placement={tooltipPlacements.RIGHT}
                                                    open={this.state.tooltipOpen}
                                                    onToggle={() => this.setState({
                                                        tooltipOpen: !this.state.tooltipOpen
                                                    })}
                                                >
                                                    {activeProvider.branding && (
                                                        <div>
                                                            <FormRadioInput
                                                                checked={this.state.buttonType === "html"}
                                                                onValueChange={() => this.setState({
                                                                    buttonType: "html"
                                                                })}
                                                                label="Customize HTML"
                                                            />
                                                            <div style={{ marginBottom: "25px", marginLeft: "40px" }}>
                                                                {this.state.buttonType === "html" && (
                                                                    <React.Fragment>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            flexDirection: "row"
                                                                        }}>
                                                                            <div>
                                                                                <p style={{
                                                                                    color: "#93999f",
                                                                                    fontSize: "13px",
                                                                                    margin: 0,
                                                                                    whiteSpace: "nowrap"
                                                                                }}>BUTTON COLOR</p>
                                                                                <ColorPicker
                                                                                    color={
                                                                                        activeProvider.branding.fill||
                                                                                        "#FFF"}
                                                                                    onValueChange={(color) =>
                                                                                        this.updateFill(color)}
                                                                                    type={pickerTypes.SIMPLE}
                                                                                    size={simplePickerSizes.SMALL}
                                                                                />
                                                                            </div>
                                                                            <div style={{ margin: "0px 15px" }}>
                                                                                <p style={{
                                                                                    color: "#93999f",
                                                                                    fontSize: "13px",
                                                                                    margin: 0,
                                                                                    whiteSpace: "nowrap"
                                                                                }}>OUTLINE COLOR</p>
                                                                                <ColorPicker
                                                                                    color={
                                                                                        activeProvider.branding.border||
                                                                                        "#FFF"}
                                                                                    onValueChange={(color) =>
                                                                                        this.updateBorder(color)}
                                                                                    type={pickerTypes.SIMPLE}
                                                                                    size={simplePickerSizes.SMALL}
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <p style={{
                                                                                    color: "#93999f",
                                                                                    fontSize: "13px",
                                                                                    margin: 0,
                                                                                    whiteSpace: "nowrap"
                                                                                }}>FONT COLOR</p>
                                                                                <ColorPicker
                                                                                    color={
                                                                                        activeProvider.branding.color||
                                                                                        "#FFF"}
                                                                                    onValueChange={(color) =>
                                                                                        this.updateColor(color)}
                                                                                    type={pickerTypes.SIMPLE}
                                                                                    size={simplePickerSizes.SMALL}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <FormTextField
                                                                            label="BUTTON TEXT"
                                                                            onChange={(e) =>
                                                                                this.updateLabel(e.target.value)}
                                                                            value={activeProvider.brandingLabel}
                                                                        />
                                                                        <FormCheckbox
                                                                            label="Show provided logo"
                                                                            onChange={(e) =>
                                                                                this.setState(
                                                                                    { buttonLogo: e.target.checked }
                                                                                )
                                                                            }
                                                                            checked={this.state.buttonLogo}
                                                                            stacked
                                                                        />
                                                                    </React.Fragment>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div>
                                                        {activeProvider.branding && (
                                                            <FormRadioInput
                                                                label="Upload image"
                                                                checked={this.state.buttonType === "upload"}
                                                                onValueChange={() =>
                                                                    this.setState({ buttonType: "upload" })
                                                                }
                                                            />
                                                        )}
                                                        {this.state.buttonType === "upload" && (
                                                            <div>
                                                                <p>
                                                                    Social Button (40PX x 340PX, .JPG/.PNG)
                                                                </p>
                                                                <FileDrop
                                                                    onValueChange={this.setSocialButtonImage}
                                                                    onRemove={this._handleRemove}
                                                                    onValidateFile={this._handleFileValidation}
                                                                    fileName={this.state.buttonFileName &&
                                                                        this.state.buttonFileName}
                                                                    accept={[".jpg", ".jpeg", ".png"]}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </DetailsTooltip>
                                            </div>
                                        </div>
                                    </InputRow>
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
                                        labelText="App ID"
                                        onValueChange={this.setStepState("appId")}
                                        value={activeProvider.appId || ""}
                                    />
                                </InputRow>
                                <InputRow>
                                    <FormTextField
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
                                                    hintText="Scope cannot be removed"
                                                    placement={HelpHintPlacements.TOP}
                                                >
                                                    <Icon
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
                                                                        hintText="Hint"
                                                                    />
                                                                </div>
                                                            }
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
                                                                        hintText="Hint" />
                                                                </div>
                                                            }
                                                            onValueChange={this.setAttrValue(id)("from")}
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
