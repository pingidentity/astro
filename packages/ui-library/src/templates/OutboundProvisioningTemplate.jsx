import { allFlags } from "../util/FlagUtils";
import Aside from "ui-library/lib/components/layout/Aside";
import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";import React, { Component } from "react";
import ColumnSelector, { ColumnTitle } from "ui-library/lib/components/list/ColumnSelector/ColumnSelector";
import ColumnLayout from "ui-library/lib/components/general/ColumnLayout";
import ExpandableRow from "ui-library/lib/components/rows/ExpandableRow";
import FormRadioGroup from "ui-library/lib/components/forms/FormRadioGroup";
import FileUpload from "ui-library/lib/components/forms/FileUpload";
import FilterSelector from "ui-library/lib/components/filters/FilterSelector";
import FlexRow, { alignments, justifyOptions } from "ui-library/lib/components/layout/FlexRow";
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
import FormCheckBox from "ui-library/lib/components/forms/FormCheckbox";
import FormTextArea from "ui-library/lib/components/forms/FormTextArea";
import FormTextField from "ui-library/lib/components/forms/FormTextField";
import InputRow from "ui-library/lib/components/layout/InputRow";
import InputWidths from "ui-library/lib/components/forms/InputWidths";
import LabelValuePairs from "ui-library/lib/components/layout/LabelValuePairs";
import Link, { linkTypes } from "ui-library/lib/components/general/Link";
import MappedAttributes from "ui-library/lib/components/layout/MappedAttributes";
import MessageButton from "ui-library/lib/components/buttons/MessageButton";
import PageWizard, { Step } from "ui-library/lib/components/panels/PageWizard/";
import Padding, { sizes as paddingSizes } from "ui-library/lib/components/layout/Padding";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import PageSection from "ui-library/lib/components/layout/PageSection";
import SearchBar from "ui-library/lib/components/forms/FormSearchBar";
import StatusIndicator from "ui-library/lib/components/general/StatusIndicator";
import Text, { textTypes } from "ui-library/lib/components/general/Text";
import TileSelector, { TileButton, tileButtonTypes } from "ui-library/lib/components/buttons/TileSelector";
import Toggle from "ui-library/lib/components/forms/form-toggle";
import { Row, Separator } from "ui-library/lib/components/rows/RowBuilder";
import { TabSet, TabContent } from "ui-library/lib/components/layout/TabSet";
import { v4 as uuidV4 } from "uuid";

import SocialIcon from "@pingux/end-user/components/SocialIcon/SocialIcon";



/**
 * @class Outbound Provisioning Template
 * @desc This is a template for Outbound Provisioning
 */



const initialState = {
    attributes: [],
    description: "",
    name: ""
};

const possibleProviders = {
    MARKETO: {
        token: "Marketo",
        label: "Marketo",
        logo: <SocialIcon.MARKETO width="75px" height="75px" />,
        name: "Marketo",
        ...initialState
    },
    SALESFORCE: {
        token: "Salesforce",
        label: "Salesforce",
        logo: <SocialIcon.SALESFORCE width="75px" height="75px" />,
        ...initialState
    },
    INITIAL: {
        token: "initial"
    }
};

const ProfileEdit = ({
    setStepState,
    activeProvider,
}) => {
    return (
        <PageSection>
            <InputRow>
                <FormTextField
                    labelText="Name"
                    onValueChange={setStepState("name")}
                    value={activeProvider.name}
                    required={true}
                />
            </InputRow>
            <InputRow>
                <FormTextArea
                    labelText="Description"
                    onValueChange={setStepState("description")}
                    value={activeProvider.description}
                    width={InputWidths.XX}
                />
            </InputRow>
            <InputRow>
                <FileUpload
                    accepts={[".jpg"]}
                    flags={["true-default"]}
                    label="Logo"
                    labelRemove="Remove"
                    labelSelect="Choose a File"
                    showThumbnail
                    thumbnailSrc={activeProvider.logo || ""}
                />
            </InputRow>
        </PageSection>
    );
};

const IDPEdit = (props) => {
    return (
        <PageSection>
            <InputRow>
                <FormTextField
                    labelText="Subdomain"
                    onValueChange={props.setStepState("appId")}
                    value={props.activeProvider.appId || ""}
                    width={InputWidths.LG}
                />
            </InputRow>
            <InputRow>
                <FormCheckBox
                    checked={props.activeProvider.freeze}
                    inline
                    label= {"Freeze user accounts on deprovisioning"}
                    selected = {props.activeProvider.freeze}
                    onValueChange= {props.setStepState("freeze")}
                />
            </InputRow>
        </PageSection>
    );
};

const AuthorizationEdit = (props) => {

    return (
        <PageSection>
            <InputRow>
                <FormRadioGroup
                    groupName="privacy-type"
                    selected={props.activeProvider.privacyType}
                    onValueChange={props.setStepState("privacyType")}
                    items={[
                        { id: "1", name: "Private" },
                        { id: "2", name: "Public" },
                    ]}
                    stacked={false}
                />
            </InputRow>
            <InputRow>
                <FormTextField
                    required
                    labelText="OAUTH CLIENT ID"
                    onValueChange={props.setStepState("appId")}
                    value={props.activeProvider.appId || ""}
                />
            </InputRow>
            <InputRow>
                <FormTextField
                    required
                    labelText="OAUTH CLIENT SECRET"
                    maskValue
                    onValueChange={props.setStepState("secret")}
                    showReveal
                    value={props.activeProvider.secret || ""}
                />
            </InputRow>
            <InputRow>
                <MessageButton
                    data-id="demo-ellipsis-loader-button-primary"
                    label="Authorize Configuration"
                    type={buttonTypes.PRIMARY}
                />
            </InputRow>
        </PageSection>
    );
};

const AttributesEdit = (props) => {
    return (
        <div>
            <PageSection
                title={
                    `Link ${props.activeProvider.label}'s attributes to your Pingone Identity attributes.`
                }
            >
                <InputRow>
                    <FormTextField
                        width={InputWidths.SM}
                        placeholder="Username"
                        withArrow
                    />
                    <FormDropDownList
                        width={InputWidths.MD}
                        required
                        label="PingOne User Attribute"
                        placeholder="Select an attribute to link"
                        selectedOption={{ label: "Attribute", value: "Attribute" }}
                        options={[
                            {
                                label: "Attribute",
                                value: "Attribute"
                            }
                        ]}
                    />
                </InputRow>
            </PageSection>
            <Padding
                bottom={paddingSizes.XL}
            />
            <PageSection
                title="Optional Attributes"
            >
                <InputRow>
                    <Row key="first">
                        <FormTextField
                            width={InputWidths.SM}
                            labelText=""
                            value="FirstName"
                        />
                        <Separator>=</Separator>
                        <FormDropDownList
                            width={InputWidths.MD}
                            label="PingOne User Attribute"
                            placeholder="Select an attribute to link"
                            selectedOption={{ label: "Attribute", value: "Attribute" }}
                            options={[
                                {
                                    label: "Attribute",
                                    value: "Attribute"
                                }
                            ]}
                        />
                    </Row>
                </InputRow>
                <InputRow>
                    <Row key="second">
                        <FormTextField
                            width={InputWidths.SM}
                            labelText=""
                            value="LastName"
                        />
                        <Separator>=</Separator>
                        <FormDropDownList
                            width={InputWidths.MD}
                            placeholder="Select an attribute to link"
                            selectedOption={{ label: "Attribute", value: "Attribute" }}
                            options={[
                                {
                                    label: "Attribute",
                                    value: "Attribute"
                                }
                            ]}
                        />
                    </Row>
                </InputRow>
                <InputRow>
                    <Row key="third">
                        <FormTextField
                            width={InputWidths.SM}
                            labelText=""
                            value="Title"
                        />
                        <Separator>=</Separator>
                        <FormDropDownList
                            width={InputWidths.MD}
                            placeholder="Select an attribute to link"
                            selectedOption={{ label: "Attribute", value: "Attribute" }}
                            options={[
                                {
                                    label: "Attribute",
                                    value: "Attribute"
                                }
                            ]}
                        />
                    </Row>
                </InputRow>
                <InputRow>
                    <Row key="fourth">
                        <FormTextField
                            width={InputWidths.SM}
                            labelText=""
                            value="Phone"
                        />
                        <Separator>=</Separator>
                        <FormDropDownList
                            width={InputWidths.MD}
                            placeholder="Select an attribute to link"
                            selectedOption={{ label: "Attribute", value: "Attribute" }}
                            options={[
                                {
                                    label: "Attribute",
                                    value: "Attribute"
                                }
                            ]}
                        />
                    </Row>
                </InputRow>
            </PageSection>
        </div>
    );
};

const PopulationsEdit = () => {
    return (
        <PageSection title="Populations">
            <ColumnSelector
                options={
                    [
                        {
                            subtitle: "Tel Aviv",
                            value: "Tel Aviv",
                            id: "1"
                        },
                        {
                            subtitle: "San Francisco",
                            value: "San Francisco",
                            id: "2"
                        },
                        {
                            subtitle: "Vancouver",
                            value: "Vancouver",
                            id: "3"
                        },
                    ]
                }
                optionsTitle={
                    <FlexRow justify={justifyOptions.SPACEBETWEEN}>
                        <ColumnTitle
                            title="Populations (96)"
                        />
                        <Button
                            inline
                            label="Add All +"
                            noSpacing
                        />

                    </FlexRow>
                }
                searchPlaceHolder="Search"
                selectedOptions={[
                    {
                        subtitle: "Denver",
                        value: "Denver",
                        id: "4"
                    },
                    {
                        subtitle: "Austin",
                        value: "Austin",
                        id: "5"
                    },
                ]}
                selectedTitle={
                    <FlexRow justify={justifyOptions.SPACEBETWEEN}>
                        <ColumnTitle
                            title="Added Populations (2)"
                        />
                        <Button
                            inline
                            label="Remove All"
                            noSpacing
                        />

                    </FlexRow>
                }
            />
        </PageSection>
    );
};

class EditView extends Component {
    state = {
        activeTab: this.props.activeProvider.rowIndex || 0,
    }

    _handleValueChange = ({ index }) => this.setState({ activeTab: index })

    render () {
        const { activeProvider } = this.props;

        return (
            <div>
                <Link onClick={this.props.onClose} type={linkTypes.PAGE_RETURN}>Back to Application List</Link>
                <PageHeader

                    title={
                        <FlexRow
                            alignment={alignments.CENTER}
                        >
                            <Padding
                                right={paddingSizes.MD}
                            >
                                {activeProvider.logo}
                            </Padding>
                            {activeProvider.label}
                        </FlexRow>
                    }
                />
                <TabSet
                    selectedIndex={this.state.activeTab}
                    onValueChange={this._handleValueChange}
                >
                    <TabContent label="Profile">
                        <ProfileEdit {...this.props} />
                    </TabContent>
                    <TabContent label="Identity Store">
                        <IDPEdit {...this.props} />
                    </TabContent>
                    <TabContent label="Authorization">
                        <AuthorizationEdit {...this.props} />
                    </TabContent>
                    <TabContent label="Attributes">
                        <AttributesEdit {...this.props} />
                    </TabContent>
                    <TabContent label="Populations">
                        <PopulationsEdit {...this.props} />
                    </TabContent>
                </TabSet>
            </div>
        );
    }
}

class WizardView extends Component {
    state = {
        wizardStep: 0
    };

    goToNextStep = () => this.setState(({ wizardStep }) => ({
        wizardStep: wizardStep + 1
    }))

    render() {
        const { closeWizard, onSave, setStepState, openProviderWizard, activeProvider } = this.props;
        const { wizardStep } = this.state;
        return (
            <PageWizard
                activeStep={wizardStep}
                onCancel={closeWizard}
                onClose={closeWizard}
                onNext={this.goToNextStep}
            >
                {activeProvider.token === possibleProviders.INITIAL.token &&
            <Step
                title="Add a Provisioning Identity Store"
                description={"Synchronize your customer identities with your other customer platforms"}
                clickDisabled
                hideMenu
                hideButtonBar
                required
            >
                <PageSection
                    description={"SELECT A PROVISIONING IDENTITY STORE FROM THE OPTIONS BELOW"}
                >
                    <TileSelector>
                        <TileButton
                            title={possibleProviders.MARKETO.label}
                            icon={
                                possibleProviders.MARKETO.logo
                            }
                            onClick={openProviderWizard(possibleProviders.MARKETO)}
                            type={tileButtonTypes.SQUARE}
                        />
                        <TileButton
                            title={possibleProviders.SALESFORCE.label}
                            icon={
                                possibleProviders.SALESFORCE.logo
                            }
                            onClick={openProviderWizard(possibleProviders.SALESFORCE)}
                            type={tileButtonTypes.SQUARE}
                        />
                    </TileSelector>
                </PageSection>

            </Step>
                }
                {this.props.activeProvider.token !== possibleProviders.INITIAL.token && [
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
                            "Customize the provisioning identity store profile" +
                            "to help you identify this provisioning connection in your configuration."
                        }
                        required
                        menuDescription="Customize your provisioning identity store."
                        menuTitle="Create Profile"
                        completed={wizardStep > 0}
                        key="create"
                        labelCancel=""
                    >
                        <ProfileEdit activeProvider={activeProvider}
                            setStepState={setStepState} />
                    </Step>,
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
                            Identity Store Configuration
                            </FlexRow>
                        }
                        description={
                            `Specify additional configuration options for the
                            ${activeProvider.label} provisioning identity store.`
                        }
                        required
                        menuDescription={
                            `Configure provisioning identity store between ${activeProvider.label} and PingOne.`
                        }
                        menuTitle="Identity Store Configuration"
                        completed={wizardStep > 1}
                        key="configure"
                    >
                        <IDPEdit activeProvider={activeProvider} setStepState={setStepState} />
                    </Step>,
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
                            Authorization Configuration
                            </FlexRow>
                        }
                        description={
                            `Configure authorization for ${activeProvider.label} provisioning identity store.`
                        }
                        required
                        menuDescription={
                            `Configure provisioning identity store between ${activeProvider.label} and PingOne.`
                        }
                        menuTitle="Authorization Configuration"
                        completed={wizardStep > 2}
                        key="request"
                    >

                        <AuthorizationEdit activeProvider={activeProvider} setStepState={setStepState} />

                    </Step>,
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
                            Attribute Mapping
                            </FlexRow>
                        }
                        description={
                            `Specify the attribute mapping between PingOne customer ` +
                            `attributes and ${activeProvider.label} attributes.`
                        }
                        required
                        menuDescription={`Specify the attribute mapping between PingOne` +
                         `customer attributes and ${activeProvider.label} attributes.`}
                        menuTitle="Attribute Mapping"

                        completed={wizardStep > 3}
                        key="linking"
                    >
                        <AttributesEdit activeProvider={activeProvider} setStepState={setStepState} />
                    </Step>,
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
                             Identity Store Configuration
                            </FlexRow>
                        }
                        completed={wizardStep > 4}
                        description={
                            `Specify additional configuration options for the ${activeProvider.label} provisioning.`
                        }
                        required
                        menuDescription={
                            `Configure provisioning identity store between ${activeProvider.label} and PingOne.`
                        }
                        menuTitle="Identity Store Configuration"

                        key="attributes"
                        onSave={onSave}
                    >
                        <PopulationsEdit activeProvider={activeProvider} setStepState={setStepState} />
                    </Step>,
                ]}
            </PageWizard>
        );
    }
}
export default class OutboundProvisioning extends Component {
    state = {
        activeProvider: null,
        providers: [{
            id: uuidV4(),
            description: "Lorem Ipsum",
            logo: <SocialIcon.MARKETO width="75px" height="75px" />,
            name: "Marketo",
            type: "Marketo",
            label: "Marketo",
        }],
        showEdit: false,
        firstChecked: false,
        values1: [
            "population1"
        ],
        privacyType: "1",
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

    closeWizard = () => this.setState({
        activeProvider: null,
    })

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

    openProviderWizard = ({ id = uuidV4(), ...provider }) => () => this.setState({
        activeProvider: {
            id,
            attributes: [],
            expanded: true,
            ...provider
        },
    })

    saveActiveProvider = () => this.setState(({ activeProvider, providers }) => ({
        activeProvider: null,
        editView: false,
        providers: [
            ...providers.filter(({ id }) => id !== activeProvider.id),
            activeProvider
        ],
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

    _setSearchTerm = searchTerm => this.setState({
        searchTerm: searchTerm.toLowerCase()
    })

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

    _handleEdit = (provider) => () => {
        this.setState({ activeProvider: provider, showEdit: true });
    }

    cancelEdit = () => {
        this.setState({ showEdit: false, activeProvider: null });
    }

    _handleFilterChange1 = value => this.setState({ values1: value });


    render() {
        const providers = this.state.providers.map(provider => {
            const {
                appId,
                description,
                expanded = false,
                id,
                logo,
                name,
                rowIndex = 0,
                secret,
                subdomain,
                type,
                label = "Marketo",
            } = provider;

            return (
                <ExpandableRow
                    key={id}
                    expanded={expanded}
                    flags={allFlags}
                    icon={logo}
                    onEditButtonClick={this._handleEdit(provider)}
                    onToggle={this.toggleProviderExpanded(id)}
                    rowAccessories={
                        label !== "Marketo"
                            ? [
                                <Text inline type={Text.textTypes.ERROR} key="text">
                                Error: OAuth Client ID
                                </Text>,
                                <StatusIndicator type={StatusIndicator.Types.ERROR} key="status"/>,
                                <Toggle key="toggle"/>
                            ]
                            : <StatusIndicator type={StatusIndicator.Types.SUCCESS}/>}
                    subtitle={possibleProviders[type]}
                    title={label}
                >
                    <TabSet
                        selectedIndex={rowIndex}
                        onValueChange={this.setRowIndex(id)}
                    >
                        <TabContent label="Profile">
                            <PageSection>
                                <LabelValuePairs
                                    dataPairs={[
                                        {
                                            label: "Name",
                                            value: name,
                                        },
                                        {
                                            label: "Description",
                                            value: description,
                                        },
                                        {
                                            label: "Logo",
                                            value: logo,
                                        },
                                    ]}
                                />
                            </PageSection>
                        </TabContent>
                        <TabContent label="Identity Store">
                            <PageSection>
                                <LabelValuePairs
                                    dataPairs={[
                                        {
                                            label: "Subdomain",
                                            value: subdomain
                                        },
                                    ]}
                                />
                            </PageSection>
                        </TabContent>
                        <TabContent label="Authorization">
                            <PageSection>
                                <LabelValuePairs
                                    dataPairs={[
                                        {
                                            label: "Oauth client ID",
                                            value: appId
                                        },
                                        {
                                            label: "Oauth client secret",
                                            value: secret
                                        },

                                    ]}
                                />
                            </PageSection>
                        </TabContent>
                        <TabContent label="Attributes">
                            <PageSection
                                title="Mapped Attributes"
                            >
                                <MappedAttributes
                                    lines={false}
                                    attributes={[
                                        {
                                            from: "Username",
                                            to: "Name",
                                            required: true
                                        },
                                        {
                                            from: "FirstName",
                                            to: "FirstName",
                                        },
                                        {
                                            from: "LastName",
                                            to: "LastName",
                                        },
                                        {
                                            from: "Title",
                                            to: "Title",
                                        },
                                        {
                                            from: "Phone",
                                            to: "PhoneNumber",
                                        },
                                    ]}
                                    labels={
                                        {
                                            from: "Saleforce Attribute",
                                            to: "Pingone User Attribute"
                                        }
                                    }
                                />
                            </PageSection>
                        </TabContent>
                        <TabContent label="Populations">
                            <PageSection>
                                    Populations Content
                            </PageSection>
                        </TabContent>
                    </TabSet>
                </ExpandableRow>
            );
        });

        const { activeProvider } = this.state;


        return (
            this.state.showEdit && this.state.activeProvider
                ? <EditView
                    activeProvider={this.state.activeProvider}
                    setStepState={this.setStepState}
                    onClose={this.cancelEdit}
                    onSave={this.saveActiveProvider}
                />
                : <div>
                    <PageHeader
                        title={
                            <FlexRow inline>
                                <Padding right={paddingSizes.LG}>
                            Provisioning Identity Stores
                                </Padding>
                            </FlexRow>
                        }
                    />
                    <InputRow>
                        <SearchBar
                            onValueChange={this._setSearchTerm}
                            placeholder="Search something"
                            showClear={true}
                            value={this.state.value}
                            rightControl={<Button label="Connection" iconName="add"
                                noSpacing onClick={this.openProviderWizard(possibleProviders.INITIAL)}/>}
                            name="demo-search"
                            key="direct"
                        >
                            <Aside
                                position="top-right"
                                aside={<Link>Clear</Link>}
                            >
                                <ColumnLayout.Row divided>
                                    <ColumnLayout.Column>
                                        <FilterSelector

                                            labelText="A Filter"
                                            options={[
                                                {
                                                    id: "population1",
                                                    name: "Population 1",
                                                },
                                                {
                                                    id: "population2",
                                                    name: "Population 2",
                                                },
                                                {
                                                    id: "population3",
                                                    name: "Population 3",
                                                },
                                                {
                                                    id: "population4",
                                                    name: "Population 4",
                                                },
                                                {
                                                    id: "population5",
                                                    name: "Population 5",
                                                },
                                                {
                                                    id: "population6",
                                                    name: "Population 6",
                                                },
                                            ]}
                                            selected={this.state.values1}
                                            onValueChange={this._handleFilterChange1}
                                        />
                                    </ColumnLayout.Column>
                                </ColumnLayout.Row>
                            </Aside>
                        </SearchBar>
                    </InputRow>
                    <InputRow>
                        <Text type={textTypes.SECTIONTITLE}>PROVISIONING IDENTITY STORES</Text>
                    </InputRow>
                    {providers}
                    {activeProvider &&
                    <WizardView
                        closeWizard={this.closeWizard}
                        activeProvider={activeProvider}
                        onSave={this.saveActiveProvider}
                        setStepState={this.setStepState}
                        openProviderWizard={this.openProviderWizard}
                    />
                    }
                </div>
        );
    }
}
