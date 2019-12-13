import Aside from "ui-library/lib/components/layout/Aside";
import Button from "ui-library/lib/components/buttons/Button";import React, { Component } from "react";
import ColumnSelector, { ColumnTitle } from "ui-library/lib/components/list/ColumnSelector/ColumnSelector";
import ColumnLayout from "ui-library/lib/components/general/ColumnLayout";
import ExpandableRow from "ui-library/lib/components/rows/ExpandableRow";
import FileUpload from "ui-library/lib/components/forms/FileUpload";
import FilterSelector from "ui-library/lib/components/filters/FilterSelector";
import FlexRow, { alignments, justifyOptions } from "ui-library/lib/components/layout/FlexRow";
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
import FormCheckbox from "ui-library/lib/components/forms/FormCheckbox";
import FormTextArea from "ui-library/lib/components/forms/FormTextArea";
import FormTextField from "ui-library/lib/components/forms/FormTextField";
import HelpHint, { Types } from "ui-library/lib/components/tooltips/HelpHint";
import InlineMessage from "ui-library/lib/components/general/InlineMessage";
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
import { omit } from "underscore";
import RowBuilder from "ui-library/lib/components/rows/RowBuilder";
import SearchBar from "ui-library/lib/components/forms/FormSearchBar";
import Spacing from "ui-library/lib/components/layout/Spacing";
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
    name: "",
    dropDownOptions: [
        { label: "phone number", value: "1" },
        { label: "email", value: "2" },
        { label: "username", value: "3" },
        { label: "given name", value: "4" },
    ],
    selectedValue: "",
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

const AttributesFirstRow = (
    [<Row key="first">
        <FormTextField
            width={InputWidths.MD}
            value="Username"
        />
        <Separator>=</Separator>
        <FormTextField
            width={InputWidths.MD}
            value="username"
            required
        />
    </Row>]
);

const AttributesSecondRow = (
    [<Row key="second">
        <FormTextField
            width={InputWidths.MD}
            value="First Name"
        />
        <Separator>=</Separator>
        <FormTextField
            width={InputWidths.MD}
            value="given name"
            required
        />
    </Row>]
);

const AttributesThirdRow = (
    [<Row key="third">
        <FormTextField
            width={InputWidths.MD}
            value="Last Name"
        />
        <Separator>=</Separator>
        <FormTextField
            width={InputWidths.MD}
            value="family name"
            required
        />
    </Row>]
);

const AttributesFourthRow = (
    [<Row key="fourth">
        <FormTextField
            width={InputWidths.MD}
            value="Alias"
        />
        <Separator>=</Separator>
        <FormTextField
            width={InputWidths.MD}
            value="username"
            required
        />
    </Row>]
);

const AttributesFifthRow = (
    [<Row key="fifth">
        <FormTextField
            width={InputWidths.MD}
            value="Email"
        />
        <Separator>=</Separator>
        <FormTextField
            width={InputWidths.MD}
            value="email"
            required
        />
    </Row>]
);

class AttributesSixthRow extends Component {
    state = {
        dropDownSelectedValue: {},
        dropDownOptions: [
            { label: "phone number", value: "1" },
            { label: "email", value: "2" },
            { label: "username", value: "3" },
            { label: "given name", value: "4" },
        ],
    };

    _handleDropDownAdd = (optionLabel) => {
        const newOption = { label: optionLabel, value: optionLabel };
        const newOptions = this.state.dropDownOptions.concat([newOption]);

        this.setState({
            dropDownOptions: newOptions,
            dropDownSelectedValue: newOption
        });
    };

    handleDropDownValueChange = selectedOption => {
        this.setState({
            dropDownSelectedValue: { selectedOption }
        });
    };
        
    render () {

        return (
            [<Row key="sixth">
                <FormTextField
                    width={InputWidths.MD}
                    value="Email Encoding Key"
                />
                <Separator>=</Separator>
                <HelpHint
                    data-id="helphint-button"
                    hintText= {<div><Spacing top={Spacing.sizes.XS}/>
                        <InlineMessage noMargin bordered={false}>
                        To add a new literal value, add quotation marks around the value (e.g., "phone number")
                        </InlineMessage> <Spacing bottom={Spacing.sizes.XS}/></div>}
                    type={Types.LIGHT}
                    delayShow={500}
                >
                    <FormDropDownList
                        required
                        options={this.state.dropDownOptions}
                        canAdd={true}
                        onAdd={this._handleDropDownAdd}
                        labelPrompt="Type to search or add"
                        selectedOption={this.state.dropDownSelectedValue.selectedOption}
                        onValueChange={this.handleDropDownValueChange}
                        width={InputWidths.MD}
                    />
                </HelpHint>
            </Row>]
        );
    }
}

const ProfileEdit = ({
    setStepState,
    name,
    description,
    activeProvider,
}) => {
    return (
        <PageSection>
            <InputRow>
                <FormTextField
                    labelText="Name"
                    onValueChange={setStepState("name")}
                    value={name}
                    required={true}
                />
            </InputRow>
            <InputRow>
                <FormTextArea
                    labelText="Description"
                    onValueChange={setStepState("description")}
                    value={description}
                    width={InputWidths.XX}
                />
            </InputRow>
            <InputRow>
                <FileUpload
                    accepts={[".jpg"]}
                    label="Logo"
                    labelSelect="Choose a File"
                    showThumbnail
                    labelRemove=""
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
        </PageSection>
    );
};

class IDPEdit extends Component {
    render() {
        return (
            <PageSection>
                <InputRow>
                    <FormTextField
                        labelText={`${this.props.activeProvider.label} Domain`}
                        placeholder="myCompanyName.my.salesforce.com"
                        onValueChange={this.props.setStepState("domain")}
                        value={this.props.activeProvider.domain || ""}
                        width={InputWidths.LG}
                        required
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        labelText={"Client ID"}
                        onValueChange={this.props.setStepState("clientID")}
                        value={this.props.activeProvider.clientID || ""}
                        width={InputWidths.LG}
                        required
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        labelText={"Client Secret"}
                        onValueChange={this.props.setStepState("clientSecret")}
                        value={this.props.activeProvider.clientSecret || ""}
                        width={InputWidths.LG}
                        required
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        labelText={"Oauth Access Token"}
                        onValueChange={this.props.setStepState("OAT")}
                        value={this.props.activeProvider.OAT || ""}
                        width={InputWidths.LG}
                        required
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        labelText={"Oauth Refresh Token"}
                        onValueChange={this.props.setStepState("ORT")}
                        value={this.props.activeProvider.ORT || ""}
                        width={InputWidths.LG}
                        required
                    />
                </InputRow>
                <MessageButton
                    label="Test Connection"
                />
            </PageSection>
        );}
}

class AuthorizationEdit extends Component {
    state = {
        deprovisioningDropDownOption: null,
        provisionChecked: false,
    }

    setDropDown = dropDownName => opt => this.setState({
        [dropDownName]: opt
    })
    deprovisioningDropDownChange = this.setDropDown("deprovisioningDropDownOption")
    permissionDropDownChange = this.setDropDown("permissionDropDownOption")

    setChecked = checkedName => () => this.setState(
        ({ [checkedName]: checked }) => ({ [checkedName]: !checked })
    )
    provisionCheckChange = this.setChecked("provisionChecked")

    render() {
        const actionOptions = ([
            { label: "Disable", value: "Disable" },
            { label: "Freeze", value: "Freeze" },
        ]);

        return (
            <PageSection>
                <InputRow>
                    <FormDropDownList
                        label="Deprovisioning Action"
                        required
                        options={actionOptions}
                        selectedOption={this.state.deprovisioningDropDownOption}
                        width={InputWidths.MD}
                        onValueChange={this.deprovisioningDropDownChange}
                    />
                    <InputRow/>
                    <FormCheckbox
                        label="Provision disabled users"
                        onChange={this.provisionCheckChange}
                        checked={this.state.provisionChecked}
                        inline
                    />
                </InputRow>
                <InputRow>
                    <FormDropDownList
                        label="Permission Set Management"
                        required
                        options={[
                            { label: "Merge with permission sets", value: "Merge with permission sets" },
                            { label: "Overwrite permission sets", value: "Overwrite permission sets" },
                        ]}
                        selectedOption={this.state.permissionDropDownOption}
                        width={InputWidths.MD}
                        onValueChange={this.permissionDropDownChange}
                    />
                </InputRow>
            </PageSection>
        );}
}

const AttributesEdit = (props) => {

    return (
        <div>
            <PageSection
                title="Optional Attributes"
            >
                <InputRow>
                    <InputRow>
                        <RowBuilder
                            hasLineBetween={false}
                            rows={[
                                {
                                    id: "first",
                                    content: AttributesFirstRow,
                                    removable: false
                                },
                                {
                                    id: "second",
                                    content: AttributesSecondRow,
                                    removable: false
                                },
                                {
                                    id: "third",
                                    content: AttributesThirdRow,
                                    removable: false
                                },
                                {
                                    id: "fourth",
                                    content: AttributesFourthRow,
                                    removable: false
                                },
                                {
                                    id: "fifth",
                                    content: AttributesFifthRow,
                                    removable: false
                                },
                                {
                                    id: "sixth",
                                    content: <AttributesSixthRow setStepState={props.activeProvider.setStepState} />,
                                    removable: false
                                },
                            ]}
                        />
                    </InputRow>
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
        const { closeWizard, onSave, setStepState, openProviderWizard, activeProvider, addRow, createRows, firstRowIds, handleDropDownValueChange } = this.props;
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
                                Configure Identity Store
                            </FlexRow>
                        }
                        description={
                            `Configure authorization for ${activeProvider.label} provisioning identity store.`
                        }
                        required
                        menuDescription={
                            `Specify additional configuration options for your 
                            ${activeProvider.label} Communities identity store`
                        }
                        menuTitle="Configure Identity Store"
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
                        <AttributesEdit activeProvider={activeProvider} setStepState={setStepState} firstRowIds={firstRowIds} addRow={addRow} createRows={createRows} handleDropDownValueChange={handleDropDownValueChange}/>
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
        dropDownSelectedValue: { label: "phone number", value: "1" },
    }

    
    addRow = key => () => {
        const stateKey = `${key}RowIds`;
        this.setState(state => ({
            ...state,
            [stateKey]: [...state[stateKey], uuidV4()],
        }));
    }

    createRows = (content, ids) => {
        const noLabels = content.map(({ props, ...template }) => ({
            props: omit(props, ["label", "labelText"]),
            ...template
        }));

        return ids.map((id, index) =>
            index === 0
                ? { id, content }
                : { id, content: noLabels }
        );
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
                        addRow={this.addRow}
                        createRows={this.createRows}
                        firstRowIds={this.state.firstRowIds}
                        handleDropDownValueChange={this.handleDropDownValueChange}
                    />
                    }
                </div>
        );
    }
}

