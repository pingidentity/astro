import React, { Component } from "react";
import Button, { buttonTypes } from "../components/buttons/Button";
import ButtonBar from "../components/forms/ButtonBar";
import CalloutBox from "../components/layout/CalloutBox";
import CopyField from "../components/utils/CopyField";
import ColorPicker from "../components/general/ColorPicker";
import FileInput from "../components/forms/FileInput";
import FileUpload from "../components/forms/file-upload";
import FormTextField from "../components/forms/FormTextField";
import FlexRow,
{ alignments, justifyOptions, spacingOptions } from "../components/layout/FlexRow";
import InputRow from "../components/layout/InputRow";
import { InputWidths } from "../components/forms/InputWidths";
import Layout from "../components/general/ColumnLayout";
import Modal from "../components/general/Modal";
import MessageButton, { statuses } from "../components/buttons/MessageButton";
import PageHeader from "../components/general/PageHeader";
import PageSection from "../components/layout/PageSection";
import Padding, { sizes } from "../components/layout/Padding";
import Stack from "../components/layout/Stack";
import Text from "../components/general/Text";




/**
 * @class Custom Domain Name
 * @desc This is a template for Custom Domain Name.
 */


export default class CustomDomainName extends Component {

    initState = {
        expanded: false,
        requiredValue: "",
        saving: false,
        saveDisabled: false,
        selectedStatus: statuses.DEFAULT,
        statusText: "Save",
        showBar: true,
        loading: false,
        saveLater: false,
        finishVerification: false,
        save: false,
        backgroundColor: "#fff",
        onChangeValidationErrorMessage: "",
    };

    state = this.initState;

    _toggleClick = () => {
        this.setState({
            save: true
        });
    }

    _toggleClose = () => {
        this.setState({
            expanded: false,
        });
    }

    _toggleLoadingButton = () => {
        this.setState({
            loading: true
        });
    }

    _handleValueChange = dataId => value => {
        this.setState({
            [dataId]: value
        });
    }

    _handleSubmit = (event) => {
        this.setState({
            requiredValue: event.target.value,
        });
    }

    _handleMessageClick = () => {
        this.setState({
            selectedStatus: statuses.SUCCESS,
            statusText: "Saved",
        });

        setTimeout(() => {
            this.setState({
                expanded: true
            });
        }, 1000);

    }

    _handleDiscard = () => {
        this.setState(
            this.initState
        );
    };

    _handleSaveLater = () => {
        this.setState({
            expanded: false,
            saveLater: true,
        });
    }

    _handleSave = () => {
        this.setState({
            expanded: false,
            finishVerification: true
        });
    };


    _handleDisabled = () => {
        this.setState({
            saveDisabled: true
        });
    };


    _handleClickFinishVerification = () => {
        this.setState({
            expanded: true,
        });
    }

    _handleChange = (file) => {
        this.setState({
            selectedFile: file.name,
            fileStatus: "file selected"
        });
    }

    _handleRemove = () => {
        this.setState({
            selectedFile: null,
            fileStatus: "file removed",
        });
    }

    _handleFileValidation = (valid) => {
        if (!valid) {
            this.setState({
                fileStatus: "invalid file type selected"
            });
        }
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

    _handleChangeErrorValidation = (e) => {
        this.setState({
            onChangeValidationErrorMessage: this._validateInput(e.target.value)
        });
    };

    _validateInput = (value) => {

        return value.length === 0 || value.length <= 5
            ? "This URL is already in use in another environment and can't be used again." : "";
    };


    renderCopy() {
        if (this.state.selectedStatus === statuses.SUCCESS) {
            return (
                <FlexRow justify={justifyOptions.CENTER} spacing={spacingOptions.SM}>
                    <CalloutBox>
                        <InputRow>
                            <FlexRow justify={justifyOptions.CENTER}>
                                <Text type="primary">
                            Add this to your DNS configuration:
                                </Text>
                            </FlexRow>
                            <FlexRow justify={justifyOptions.CENTER}>
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
                onCancel={this._handleSaveLater}
                onSave={this._handleSave}
                cancelText="Close"
                saveText="Verify"
                enableSavingAnimation={this.state.saving}
                visible={this.state.showBar}
                unfixed
            />);
        } else {
            return null;
        }
    }

    renderModals () {
        if (this.state.save ) {
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
                                    domain configuration to propogate through the internet.
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

    renderSSL () {
        if (this.state.finishVerification) {
            return (
                <Padding
                    left={this.state.selectedFile ? undefined : sizes.MD}
                >
                    <FileInput
                        accept={["text/csv", "image/jpeg", "image/png", "pdf"]}
                        fileName={this.state.selectedFile}
                        strings={{ select: "Upload SSL Certificate" }}
                        fileData={(
                            <span>
                                Valid <Text inline type="value">04-15</Text> to <Text inline type="value">09-17</Text>
                            </span>
                        )}
                        onValidateFile={this._handleFileValidation}
                        onValueChange={this._handleChange}
                        selectedTitle="SSL Certificate"
                        onRemove={this._handleRemove}
                        noBorder
                        alwaysShowTitle
                    />
                </Padding>);
        }
    }

    renderButtons () {
        if (this.state.saveLater) {
            return (
                <Padding left={sizes.MD} top={sizes.FORMLABEL}>
                    <Button
                        label="Verify Domain"
                        type={buttonTypes.PRIMARY}
                        loading={this.state.loading}
                        onClick={this._handleClickFinishVerification}
                    />
                </Padding>
            );
        } else if (this.state.save) {
            return (
                <Padding top={sizes.INLINE_BUTTON_WITH_INPUT} left={sizes.MD}>
                    <MessageButton
                        label={this.state.statusText}
                        status={this.state.selectedStatus}
                        onClick={this._handleMessageClick}
                        inline
                    />
                </Padding>
            );
        }
    }


    renderFormTextField () {
        if (this.state.save) {
            return (
                <Stack gap="XS">
                    <FormTextField
                        labelText="Domain Name"
                        dataId="requiredTextField"
                        flags={this.props.flags}
                        required={true}
                        onValueChange={this._handleValueChange("requiredValue")}
                        onChange={this._handleSubmit}
                        value={this.state.requiredValue}
                        width={InputWidths.MD}
                        readOnly={this.state.finishVerification}
                        errorMessage={this.state.onChangeValidationErrorMessage}
                        onChange={this._handleChangeErrorValidation}
                    />
                    <a onClick={this._handleDiscard}>Remove</a>
                </Stack>);
        } else {
            return null;
        }
    }



    renderFields() {
        if (this.state.save) {
            return (
                <InputRow>
                    <FlexRow alignment={alignments.TOP}>
                        {this.renderFormTextField()}
                        {!this.state.finishVerification && this.renderButtons()}
                        {this.renderSSL()}
                    </FlexRow>
                </InputRow>);
        } else {
            return <a onClick={this._toggleClick}>+ Add Custom Domain</a>;
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
                >
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
                                color={this.state.backgroundColor}
                                onValueChange={this._handleColorChange("backgroundColor")}
                                labelText="Background Color"
                                flags={this.props.flags}
                            />
                        </Layout.Column>
                    </Layout.Row>
                </PageSection>
                <PageSection
                    title="Custom Domain"
                >
                    <Text>
                        Customize your environment by setting up a custom domain name.
                        Users will see your customized domain name in place of the standard (auth.pingone.com).
                    </Text>
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
                </PageSection>
            </div>
        );
    }

}

