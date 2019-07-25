
import React, { Component } from "react";
import Button, { buttonTypes } from "../components/buttons/Button";
import ButtonBar from "../components/forms/ButtonBar";
import CalloutBox from "../components/layout/CalloutBox";
import CopyField from "../components/utils/CopyField";
import ColorPicker from "../components/general/ColorPicker";
import FileInput from "../components/forms/FileInput";
import FileUpload from "../components/forms/file-upload";
import FormTextField from "../components/forms/FormTextField";
import FormLabel from "../components/forms/FormLabel";
import FormTextArea from "../components/forms/FormTextArea";
import FlexRow,
{ justifyOptions, spacingOptions, alignments, flexDirectionOptions } from "../components/layout/FlexRow";
import InputRow from "../components/layout/InputRow";
import { InputWidths } from "../components/forms/InputWidths";
import InlineMessage from "../components/general/InlineMessage";
import Layout from "../components/general/ColumnLayout";
import Link, { linkTypes } from "../components/general/Link";
import Modal from "../components/general/Modal";
import ModalButton from "../components/general/ModalButton";
import MessageButton, { statuses } from "../components/buttons/MessageButton";
import PageHeader from "../components/general/PageHeader";
import PageSection from "../components/layout/PageSection";
import Stack from "../components/layout/Stack";
import Text from "../components/general/Text";



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
        expanded: false,
        requiredValue: "",
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
            modalButtonExpanded: true
        });
    }

    _toggleClose = () => {
        this.setState({
            expanded: false,
        });
    }

    _toggleModalClosed = () => {
        this.setState({
            modalButtonExpanded: false
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
            domainState: domainStates.enterDomain
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
            domainState: domainStates.complete
        });
    }

    _handleEdit = () => {
        this.setState ({
            modalButtonExpanded: true,
            domainState: domainStates.needsSsl
        });
    }

    renderCopy() {
        if (this.state.selectedStatus === statuses.SUCCESS) {
            return (
                <FlexRow justify={justifyOptions.CENTER} spacing={spacingOptions.SM}>
                    <CalloutBox>
                        <InputRow>
                            <FlexRow alignment={alignments.CENTER} flexDirection={flexDirectionOptions.COLUMN}>
                                <Text type="primary">
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
                flags={this.props.flags}
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
        if (this.state.domainState === domainStates.enterDomain ) {
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
                        flags={["p-stateful", "use-portal"]}
                        initialState={{
                            expanded: false,
                        }}
                        onOpen={this._toggleOpen}
                        onClose={this._toggleModalClosed}
                    >
                        <InputRow>
                            <Text>
                        Add the SSL Certificate for your domain.
                            </Text>
                        </InputRow>
                        <Stack gap="LG">
                            <FormTextArea
                                flags={this.props.flags}
                                labelText="Certificate"
                                description="Description of what the certificate is and so on"
                                required
                                noResize
                                width={InputWidths.LG}
                                placeholder=
                                    " - - - BEGIN CERTIFICATE - - - Certificate Code - - - END CERTIFICATE - - -"
                            />
                            <FormTextArea
                                flags={this.props.flags}
                                labelText="Private Key"
                                description="Description of what the private key is and so on"
                                required
                                noResize
                                width={InputWidths.LG}
                                placeholder=
                                    " - - - BEGIN PRIVATE KEY - - - Private Key Code - - - END PRIVATE KEY - - -"
                            />
                            <FormTextArea
                                flags={this.props.flags}
                                labelText="Intermediate Certificate (optional)"
                                description="Description of what the intermediate certificate is and so on"
                                noResize
                                width={InputWidths.LG}
                                placeholder=
                                    " - - - BEGIN CERTIFICATE - - - Certificate Code - - - END CERTIFICATE - - -"
                            />
                            <ButtonBar
                                flags={this.props.flags}
                                onCancel={this._handleDiscard}
                                onSave={this._handleSslSave}
                                cancelText="Cancel"
                                saveText="Save"
                                visible={this.state.showBar}
                                saveDisabled={this.state.saveDisabled}
                                unfixed
                            />
                        </Stack>
                    </ModalButton>
                </FlexRow>
            );
        }
    }

    renderInlineMessage () {
        return (
            <InlineMessage type={InlineMessage.MessageTypes.WARNING }>
                        Your domain is not active until you add the SSL Certificate
            </InlineMessage>
        );
    }

    renderSSL () {
        if (this.state.domainState === domainStates.complete) {
            return ( <FileInput
                fileName={this.state.requiredValue &&
                        <FlexRow spacing={spacingOptions.SM}>
                            <span>{this.state.requiredValue}</span>
                        </FlexRow>}
                selectedTitle="Domain Name"
                fileData={(
                    <FlexRow spacing={spacingOptions.SM}>
                        <span>
                            SSL Certificate Valid &nbsp;
                            <Text inline type="value">04-15</Text> to <Text inline type="value">09-17</Text>
                        </span>
                        <Link onClick={this._handleEdit}>Edit</Link>
                    </FlexRow>
                )}
                onRemove={this._handleDiscard}
                buttonLabel="Remove Domain"
            />
            );
        } else if (this.state.domainState === domainStates.needsSsl) {
            return (
                <div>
                    {this.renderInlineMessage()}
                    <FileInput
                        fileName={this.state.requiredValue &&
                    <FlexRow spacing={spacingOptions.SM}>
                        <span>{this.state.requiredValue}</span>
                    </FlexRow>}
                        selectedTitle="Domain Name"
                        fileData={(
                            <FlexRow spacing={spacingOptions.SM}>
                                <Link onClick={this._handleDiscard}>Remove</Link>
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
                flags={this.props.flags}
                required={true}
                onValueChange={this._handleValueChange}
                value={this.state.requiredValue}
                width={InputWidths.MD}
            />
        );

        if (this.state.domainState === domainStates.needsVerification) {
            return (
                <div>
                    {this.renderInlineMessage()}
                    <span>
                        {formText}
                        {this.renderButtons()}
                        <InputRow>
                            <Link onClick={this._handleDiscard}>Remove</Link>
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
                                    flags={this.props.flags}
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
                                    flags={this.props.flags}
                                    data-id="domain-modal"
                                    modalTitle="Verify Custom Domain"
                                    expanded={this.state.expanded}
                                    onOpen={this._toggleModalOpen}
                                    onClose={this._toggleClose}
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
