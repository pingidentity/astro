
import React, { Component } from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
//eslint-disable-next-line import/no-extraneous-dependencies
import ButtonBar from "ui-library/lib/components/forms/ButtonBar";
//eslint-disable-next-line import/no-extraneous-dependencies
import CalloutBox from "ui-library/lib/components/layout/CalloutBox";
//eslint-disable-next-line import/no-extraneous-dependencies
import CopyField from "ui-library/lib/components/utils/CopyField";
//eslint-disable-next-line import/no-extraneous-dependencies
import ColorPicker from "ui-library/lib/components/general/ColorPicker";
//eslint-disable-next-line import/no-extraneous-dependencies
import FileInput from "ui-library/lib/components/forms/FileInput";
//eslint-disable-next-line import/no-extraneous-dependencies
import FileUpload from "ui-library/lib/components/forms/file-upload";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormTextField from "ui-library/lib/components/forms/FormTextField";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormLabel from "ui-library/lib/components/forms/FormLabel";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormTextArea from "ui-library/lib/components/forms/FormTextArea";
//eslint-disable-next-line import/no-extraneous-dependencies
import FlexRow,
//eslint-disable-next-line import/no-extraneous-dependencies
{ justifyOptions, spacingOptions, alignments, flexDirectionOptions } from "ui-library/lib/components/layout/FlexRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import InputRow from "ui-library/lib/components/layout/InputRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import { InputWidths } from "ui-library/lib/components/forms/InputWidths";
//eslint-disable-next-line import/no-extraneous-dependencies
import InlineMessage from "ui-library/lib/components/general/InlineMessage";
//eslint-disable-next-line import/no-extraneous-dependencies
import Layout from "ui-library/lib/components/general/ColumnLayout";
//eslint-disable-next-line import/no-extraneous-dependencies
import Link, { linkTypes } from "ui-library/lib/components/general/Link";
//eslint-disable-next-line import/no-extraneous-dependencies
import Modal from "ui-library/lib/components/general/Modal";
//eslint-disable-next-line import/no-extraneous-dependencies
import ModalButton from "ui-library/lib/components/general/ModalButton";
//eslint-disable-next-line import/no-extraneous-dependencies
import MessageButton, { statuses } from "ui-library/lib/components/buttons/MessageButton";
//eslint-disable-next-line import/no-extraneous-dependencies
import PageHeader from "ui-library/lib/components/general/PageHeader";
//eslint-disable-next-line import/no-extraneous-dependencies
import PageSection from "ui-library/lib/components/layout/PageSection";
//eslint-disable-next-line import/no-extraneous-dependencies
import Stack from "ui-library/lib/components/layout/Stack";
//eslint-disable-next-line import/no-extraneous-dependencies
import Text, { textTypes } from "ui-library/lib/components/general/Text";
//eslint-disable-next-line import/no-extraneous-dependencies
import ButtonGroup from "ui-library/lib/components/layout/ButtonGroup";



/**
 * @class Custom Domain Name
 * @desc This is a template for Custom Domain Name.
 */

const domainStates = {
    complete: "complete",
    enterDomain: "enterDomain",
    needsVerification: "needsVerification",
    needsSsl: "needsSsl",
    noDomain: "noDomain",
};

export default class CustomDomainName extends Component {

    initState = {
        domainState: domainStates.noDomain,
        modalButtonExpanded: false,
        modalConfirm: false,
        editModal: false,
        expanded: false,
        requiredValue: "",
        canonical: "611a17db-81cc-45d5-ad2b-6950472e851a.edge1.pingone.com",
        saveDisabled: true,
        selectedStatus: statuses.DEFAULT,
        statusText: "Save",
        showBar: true,
    };

    state = this.initState

    _toggleClick = () => {
        this.setState({
            domainState: domainStates.enterDomain,
        });
    }

    _toggleOpen = () => {
        this.setState({
            modalButtonExpanded: true,
        });
    }

    _toggleEditModal = () => {
        this.setState({
            editModal: true,
        });
    }

    _toggleModalConfirm = () => {
        this.setState({
            modalConfirm: true,
        });
    }

    _toggleClose = () => {
        this.setState({
            expanded: false,
            modalConfirm: false,
            editModal: false,
        });
    }

    _toggleModalClosed = () => {
        this.setState({
            modalButtonExpanded: false,
            editModal: false
        });
    }

    _handleValueChange = (value) => {
        this.setState({
            saveDisabled: (!value || value.length <= 0),
            requiredValue: value
        });
    }

    _handleMessageClick = () => {

        this.setState({
            selectedStatus: statuses.LOADING,
            statusText: null
        });


        setTimeout(() => {
            this.setState({
                selectedStatus: statuses.SUCCESS,
                statusText: "Saved"
            });
        }, 1000);

        setTimeout(() => {
            this.setState({
                expanded: true
            });
        }, 3000);

    }

    _handleDiscard = () => {
        this.setState(
            this.initState
        );
    };

    _handleNeedsVerification = () => {
        this.setState({
            expanded: false,
            domainState: domainStates.needsVerification,
        });
    }

    _handleSave = () => {
        this.setState({
            expanded: false,
            modalButtonExpanded: false,
            domainState: domainStates.needsSsl
        });
    };

    _handleVerify = () => {
        this.setState({
            expanded: true,
            domainState: domainStates.needsVerification
        });
    }

    _fileValidator = (file) => {
        if (file) {
            if (file.size > 102400) {
                return "Oops, too big for me (100Kb max)";
            }

            if (file.type !== "image/png") {
                return "Sorry, can handle only PNG.";
            }
        }
    };

    _handleColorChange = dataId => color => {
        this.setState({
            [dataId]: color
        });
    };


    _handleSslSave = () => {
        this.setState ({
            expanded: false,
            editModal: false,
            domainState: domainStates.complete
        });
    }

    _handleEdit = () => {
        this.setState ({
            editModal: true,
            domainState: domainStates.complete
        });
    }

    renderCopy() {
        if (this.state.selectedStatus === statuses.SUCCESS) {
            return (
                <FlexRow justify={justifyOptions.CENTER} spacing={spacingOptions.SM}>
                    <CalloutBox>
                        <InputRow>
                            <FlexRow alignment={alignments.CENTER} flexDirection={flexDirectionOptions.COLUMN}>
                                <Text type={textTypes.PRIMARY}>
                            Add this to your DNS configuration:
                                </Text>
                                <CopyField
                                    width={InputWidths.LG}
                                    text="<unique identifier for domain+environment pair goes here>"
                                />
                            </FlexRow>
                        </InputRow>
                    </CalloutBox>
                </FlexRow>);
        } else {
            return null;
        }
    }

    renderButtonBar () {
        if (this.state.selectedStatus === statuses.SUCCESS) {
            return (<ButtonBar
                onCancel={this._handleNeedsVerification}
                onSave={this._handleSave}
                cancelText="Close"
                saveText="Verify"
                visible={this.state.showBar}
                unfixed
            />);
        } else {
            return null;
        }
    }

    renderModals () {
        if (this.state.domainState === domainStates.enterDomain ||
            this.state.domainState === domainStates.needsVerification) {
            return (
                <div>
                    <InputRow>
                        <Text>
                        In order to establish domain control and realize the custom domain functionality,
                        the following CNAME needs to be added to your domain's DNS configuration.
                        Once you have done this, click "Verify".
                        </Text>
                    </InputRow>
                    <div>
                        <InputRow>
                            {this.renderCopy()}
                        </InputRow>
                        <InputRow>
                            <FlexRow justify={justifyOptions.CENTER}>
                                <Text>
                                    Please note: it may take up to 24 hours for changes to your
                                    domain configuration to propagate through the internet.
                                </Text>
                            </FlexRow>
                        </InputRow>
                        {this.renderButtonBar()}
                    </div>
                </div>);
        } else {
            return null;
        }
    }

    renderTextAreas () {
        return (
            <Stack gap="LG">
                <FormTextArea
                    labelText="Certificate"
                    description="Description of what the certificate is and so on"
                    required
                    noResize
                    width={InputWidths.LG}
                    placeholder=
                        " - - - BEGIN CERTIFICATE - - - Certificate Code - - - END CERTIFICATE - - -"
                />
                <FormTextArea
                    labelText="Private Key"
                    description="Description of what the private key is and so on"
                    required
                    noResize
                    width={InputWidths.LG}
                    placeholder=
                        " - - - BEGIN PRIVATE KEY - - - Private Key Code - - - END PRIVATE KEY - - -"
                />
                <FormTextArea
                    labelText="Intermediate Certificate (optional)"
                    description="Description of what the intermediate certificate is and so on"
                    noResize
                    width={InputWidths.LG}
                    placeholder=
                        " - - - BEGIN CERTIFICATE - - - Certificate Code - - - END CERTIFICATE - - -"
                />
                <ButtonBar
                    onCancel={this._toggleModalClosed}
                    onSave={this._handleSslSave}
                    cancelText="Cancel"
                    saveText="Save"
                    visible={this.state.showBar}
                    saveDisabled={this.state.saveDisabled}
                    unfixed
                />
            </Stack>
        );
    }

    renderModalButton () {
        if (this.state.domainState === domainStates.needsSsl) {
            return (
                <FlexRow spacing={spacingOptions.SM}>
                    <ModalButton
                        data-id="domain-modal-ssl"
                        modalTitle="Add SSL Certificate"
                        activatorContent={
                            <Button label="Add SSL Certificate" type={buttonTypes.PRIMARY}/>
                        }
                        expanded={this.state.modalButtonExpanded}
                        onOpen={this._toggleOpen}
                        onClose={this._toggleModalClosed}
                    >
                        <InputRow>
                            <Text>
                        Add the SSL Certificate for your domain.
                            </Text>
                        </InputRow>
                        {this.renderTextAreas()}
                    </ModalButton>
                </FlexRow>
            );
        } else if (this.state.domainState === domainStates.complete) {
            return (
                <Modal
                    data-id="ssl-modal"
                    modalTitle="Edit SSL Certificate"
                    expanded={this.state.editModal}
                    onOpen={this._toggleEditModal}
                    onClose={this._toggleClose}
                >
                    <InputRow>
                        <Text>
                        Edit the SSL Certificate for your domain.
                        </Text>
                    </InputRow>
                    {this.renderTextAreas()}
                </Modal>
            );
        }
    }

    renderConfirmModal () {
        if (this.state.domainState === domainStates.complete) {
            return (
                <ModalButton
                    activatorContent={
                        <Button label="Remove Domain" inline/>
                    }
                    expanded={this.state.modalConfirm}
                    onOpen={this._toggleModalConfirm}
                >
                    <Text>
                        Are you sure you want to remove the custom domain for your environment?
                        Users will see auth.pingone.com instead of your custom domain.
                    </Text>
                    <ButtonGroup>
                        <Button onClick={this._toggleClose}>No</Button>
                        <Button onClick={this._handleDiscard} type={buttonTypes.PRIMARY}>Yes</Button>
                    </ButtonGroup>
                </ModalButton>
            );
        } else if (this.state.domainState === domainStates.needsVerification ||
            this.state.domainState === domainStates.needsSsl) {
            return (
                <Modal
                    expanded={this.state.modalConfirm}
                    onOpen={this._toggleModalConfirm}
                >
                    <Text>
                Are you sure you want to remove the custom domain for your environment?
                Users will see auth.pingone.com instead of your custom domain.
                    </Text>
                    <ButtonGroup>
                        <Button onClick={this._toggleClose}>No</Button>
                        <Button onClick={this._handleDiscard} type={buttonTypes.PRIMARY}>Yes</Button>
                    </ButtonGroup>
                </Modal>
            );
        }
    }

    renderSSL () {
        if (this.state.domainState === domainStates.complete) {
            return ( <FileInput
                fileName={this.state.requiredValue &&
                        <FlexRow spacing={spacingOptions.SM}>
                            <Stack gap="XS">
                                <span>{this.state.requiredValue}</span>
                                <Text>{this.state.canonical}</Text>
                            </Stack>
                        </FlexRow>}
                selectedTitle="Domain Name"
                fileData={(
                    <FlexRow spacing={spacingOptions.SM}>
                        <span>
                            SSL Certificate Valid &nbsp;
                            <Text
                                inline type={textTypes.VALUE}
                            >
                            04-15
                            </Text> to
                            <Text
                                inline type={textTypes.VALUE}
                            >
                                09-17
                            </Text>
                        </span>
                        <Link onClick={this._handleEdit}>Edit</Link>
                        {this.renderModalButton()}
                    </FlexRow>
                )}
                onRemove={this._handleDiscard}
                buttonNode={this.renderConfirmModal()}
            />
            );
        } else if (this.state.domainState === domainStates.needsSsl) {
            return (
                <div>
                    <InlineMessage type={InlineMessage.MessageTypes.WARNING }>
                        Your domain is not active until you add the SSL Certificate
                    </InlineMessage>
                    <FileInput
                        fileName={this.state.requiredValue &&
                    <FlexRow spacing={spacingOptions.SM}>
                        <Stack gap="XS">
                            <span>{this.state.requiredValue}</span>
                            <Text>{this.state.canonical}</Text>
                        </Stack>
                    </FlexRow>}
                        selectedTitle="Domain Name"
                        fileData={(
                            <FlexRow spacing={spacingOptions.SM}>
                                <Link onClick={this._toggleModalConfirm}>Remove</Link>
                                {this.renderConfirmModal()}
                            </FlexRow>
                        )}
                        onRemove={this._handleDiscard}
                        buttonNode={this.renderModalButton()}
                    />
                </div>
            );
        }
    }


    renderButtons () {
        if (this.state.domainState === domainStates.needsVerification) {
            return (
                <Button
                    label="Verify Domain"
                    type={buttonTypes.PRIMARY}
                    onClick={this._handleVerify}
                    disabled={this.state.saveDisabled}
                />
            );
        } else if (this.state.domainState === domainStates.enterDomain) {
            return (
                <MessageButton
                    label={this.state.statusText}
                    status={this.state.selectedStatus}
                    onClick={this._handleMessageClick}
                    type={(this.state.selectedStatus === statuses.DEFAULT) ||
                            (this.state.selectedStatus === statuses.LOADING)
                        ? "primary" : undefined}
                    disabled={this.state.saveDisabled}
                />
            );
        }
    }


    renderFormTextField () {
        const formText = (
            <FormTextField
                dataId="requiredTextField"
                required={true}
                onValueChange={this._handleValueChange}
                value={this.state.requiredValue}
                width={InputWidths.MD}
            />
        );

        if (this.state.domainState === domainStates.needsVerification) {
            return (
                <div>
                    <InlineMessage type={InlineMessage.MessageTypes.WARNING }>
                        Your domain is not active until you verify the domain.
                    </InlineMessage>
                    <span>
                        {formText}
                        {this.renderButtons()}
                        <InputRow>
                            <Link onClick={this._toggleModalConfirm}>Remove</Link>
                            {this.renderConfirmModal()}
                        </InputRow>
                    </span>
                </div>
            );
        }

        if (this.state.domainState === domainStates.enterDomain) {
            return (
                formText
            );
        }
    }


    renderFields() {
        if (this.state.domainState === domainStates.needsVerification ||
            this.state.domainState === domainStates.needsSsl ||
            this.state.domainState === domainStates.complete) {
            return (
                <Stack gap="MD">
                    <InputRow>
                        {this.state.domainState === domainStates.complete ? null : this.renderFormTextField() }
                    </InputRow>
                    <InputRow>
                        {this.renderSSL()}
                    </InputRow>
                </Stack>
            );
        } else if (this.state.domainState === domainStates.enterDomain) {
            return (
                <InputRow>
                    {this.renderFormTextField()}
                    {this.renderButtons()}
                    {this.renderSSL()}
                </InputRow>);
        } else {
            return <Link type={linkTypes.ADD} onClick={this._toggleClick}>Add Custom Domain</Link>;
        }
    }


    render() {

        return (
            <div>
                <PageHeader
                    title="Customization Settings"
                />
                <PageSection
                    title="Brand & Appearance"
                    description={
                        <Layout.Row autoWidth>
                            <Layout.Column>
                                <FileUpload
                                    accept="image/jpeg, image/jpg, image/png"
                                    data-id="file-upload"
                                    validator={this._fileValidator}
                                    showThumbnail={true}
                                    labelText="Organization logo"
                                    labelSelect="Choose a File"
                                    labelRemove="Remove Image"
                                    labelMaxFileSize="Max Size 4MB"
                                    thumbnailSrc="src/demo/images/favicon.png"
                                />
                            </Layout.Column>
                            <Layout.Column>
                                <ColorPicker
                                    data-id="color-picker-bg"
                                    initialState={{
                                        color: "#fff",
                                    }}
                                    onValueChange={this._handleColorChange("backgroundColor")}
                                    labelText="Background Color"
                                />
                            </Layout.Column>
                        </Layout.Row>
                    }
                />
                <PageSection
                    title="Custom Domain"
                    description={
                        <div>
                            <Text>
                            Customize your environment by setting up a custom domain name.
                            Users will see your customized domain name in place of the standard (auth.pingone.com).
                            </Text>
                            {this.state.domainState === domainStates.needsSsl ||
                            this.state.domainState === domainStates.complete
                                ? null :<FormLabel value="Domain Name" detached/>}
                            <InputRow>
                                {this.renderFields()}
                                <Modal
                                    data-id="domain-modal"
                                    modalTitle="Verify Custom Domain"
                                    expanded={this.state.expanded}
                                    onOpen={this._toggleModalOpen}
                                    onClose={this._handleDiscard}
                                >
                                    {this.renderModals()}
                                </Modal>
                            </InputRow>
                        </div>
                    }
                />
            </div>
        );
    }
}
