import React, { Component } from "react";
import ColorPicker from "ui-library/lib/components/general/ColorPicker";
import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
import ButtonBar from "ui-library/lib/components/forms/ButtonBar";
import FormRadioGroup from "ui-library/lib/components/forms/FormRadioGroup";
import FormTextField from "ui-library/lib/components/forms/form-text-field";
import FileUpload from "ui-library/lib/components/forms/FileUpload";
import HelpHint from "ui-library/lib/components/tooltips/HelpHint";
import InputWidths from "ui-library/lib/components/forms/InputWidths";
import Layout from "ui-library/lib/components/general/ColumnLayout";
import PageSection from "ui-library/lib/components/layout/PageSection";
import Stack from "ui-library/lib/components/layout/Stack";
import InputRow from "ui-library/lib/components/layout/InputRow";
import DetailsTooltip from "ui-library/lib/components/tooltips/DetailsTooltip";
import ButtonGroup from "ui-library/lib/components/layout/ButtonGroup";
import Image from "ui-library/lib/components/general/Image";


/**
 * @class Custom Branding
 * @desc This is a template for Custom Branding.
 */


const logoItems = [
    { id: "Radio 1", name: "Use Corporate Logo" },
    { id: "Radio 2", name: "Custom" },
];

const backgroundItems = [
    { id: "Radio 1", name: "Image" },
    { id: "Radio 2", name: "Color" },
];

export default class CustomBranding extends Component {

    initState = {
        saving: false,
        registrationPageHeader: "",
        loginPageHeader: "",
        registrationPageText: "",
        loginPageText: "",
        resetPasswordText: "",
        resetPasswordHeader: "",
        logo: null,
        backgrounds: null,
        formBackgroundColor: "#fff",
        buttonColor: "#fff",
        buttonFontColor: "#fff",
        formFillColor: "#fff",
        formFontColor: "#fff",
        linkColor: "#fff",
        headerCustomTextColor: "#fff",
        open: this.props.open || false
    }

    state = this.initState;

    _handleDiscard = () => {
        this.setState(
            this.initState
        );
    };

    _handleSave = () => {
        this.setState({
            saving: true,
        });
    };

    _handleColorChange = dataId => color => {
        this.setState({
            [dataId]: color
        });
    };

    _handleSelectChange = dataId => value => {
        this.setState({
            [dataId]: value
        });
    };

    _handleInputChange = dataId => value => {
        this.setState({
            [dataId]: value,
        });
    };

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _handleConfirm = () => {
        this._handleToggle();
    };

    _handleCancel = () => {
        this._handleToggle();
    };

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

    _showButtonBar = (state) => {
        return Object.entries(this.initState).some(([key, value]) => {
            return value !== state[key];
        });
    }

    render() {
        return (
            <div>
                <Stack gap="XL">
                    <DetailsTooltip
                        data-id="details-tooltip"
                        label={(
                            <Button inline type={buttonTypes.SECONDARY}>
                            Restore Defaults
                            </Button>
                        )}
                        placement="bottom right"
                        title="Restore Defaults"
                        open={this.state.open}
                        onToggle={this._handleToggle}
                    >

                        <p>
                        You are about to remove all custom branding and restore defaults
                        </p>
                        <ButtonGroup
                            data-id="delete-confirmation"
                            onCancel={this._handleCancel}
                        >
                            <Button
                                data-id="confirm-action"
                                type={buttonTypes.SECONDARY}
                                onClick={this._handleConfirm} >
                            Confirm
                            </Button>
                        </ButtonGroup>
                    </DetailsTooltip>
                    <PageSection
                        title={
                            <div data-id="logo">
                            logo
                                <HelpHint
                                    data-id="helphint-logo"
                                    hintText={
                                        <div>
                                        The logo that will show up on the top of the form.
                                            <br/>
                                    - Max display dimensions on dock is 35px(high) by 150px(wide)
                                            <br/>
                                    - Image dimension ratio is preserved
                                            <br/>
                                    - Logo dimensions should be doubled to render best on Retina displays,
                                    so up to 70px(high) by 300px(wide)
                                            <br/>
                                        </div>
                                    }
                                    leftMargin
                                />
                            </div>
                        }
                    >
                        <FormRadioGroup
                            data-id="logo-radio"
                            groupName="logo-radio"
                            selected={this.state.logo}
                            onValueChange={this._handleSelectChange("logo")}
                            items={logoItems}
                            stacked={false}
                        />
                    </PageSection>
                    <PageSection
                        data-id="background-section"
                        title="backgrounds"
                    >
                        <FormRadioGroup
                            data-id="bg-radio"
                            groupName="bg-radio"
                            items={backgroundItems}
                            stacked={false}
                            selected={this.state.backgrounds}
                            onValueChange={this._handleSelectChange("backgrounds")}
                            labelText={
                                <div data-id="main-background">
                                    Main background
                                    <HelpHint
                                        data-id="helphint-background"
                                        hintText={
                                            <div>
                                                <Image
                                                    source="src/templates/custom-branding/images/background.png"
                                                />
                                                <div>
                                                You can choose to upload a custom image or
                                                    <br />
                                                choose a custom color for the main background.
                                                </div>
                                            </div>
                                        }
                                        leftMargin
                                    />
                                </div>
                            }
                        />
                        <FileUpload
                            accept="image/png"
                            data-id="file-upload"
                            validator={this._fileValidator}
                            showThumbnail={true}
                            labelSelect="Choose a File"
                            labelRemove="Remove"
                        />
                        <ColorPicker
                            data-id="color-picker-bg"
                            color={this.state.formBackgroundColor}
                            onValueChange={this._handleColorChange("formBackgroundColor")}
                            labelText="Form Background Color"
                            hintText={
                                <div data-id="helphint-bg-color">
                                    <Image
                                        source="src/templates/custom-branding/images/formBackgroundColor.png"
                                    />
                                    <div>
                                        The Color (Hex) to assign to the background of
                                        <br />
                                        the form.
                                    </div>
                                </div>
                            }
                        />
                    </PageSection>
                    <PageSection
                        title="Buttons"
                        data-id="button-section"
                    >
                        <Layout.Row>
                            <Layout.Column>
                                <ColorPicker
                                    data-id="color-picker-button"
                                    color={this.state.buttonColor}
                                    onValueChange={this._handleColorChange("buttonColor")}
                                    labelText="Button Color"
                                    hintText={
                                        <div>
                                            <Image
                                                source="src/templates/custom-branding/images/buttonColor.png"
                                            />
                                            <div>
                                                The Color (Hex) to assign to the button(s) on the
                                                <br />
                                                form.
                                            </div>
                                        </div>
                                    }
                                />
                                <ColorPicker
                                    data-id="color-picker-button-font"
                                    color={this.state.buttonFontColor}
                                    onValueChange={this._handleColorChange("buttonFontColor")}
                                    labelText="Button Font Color"
                                    hintText={
                                        <div data-id="helphint-button-font">
                                            <Image
                                                source="src/templates/custom-branding/images/buttonFontColor.png"
                                            />
                                            <div>
                                                The Color (Hex) to assign to the front on the
                                                <br />
                                                button(s) on the form.
                                            </div>
                                        </div>
                                    }
                                />
                            </Layout.Column>
                        </Layout.Row>
                    </PageSection>
                    <PageSection
                        title="Text"
                        data-id="text-section"
                    >
                        <Layout.Row autoWidth>
                            <Layout.Column>
                                <ColorPicker
                                    data-id="color-picker-text-form-fill"
                                    color={this.state.formFillColor}
                                    onValueChange={this._handleColorChange("formFillColor")}
                                    labelText="Form Fill Color"
                                    hintText={
                                        <div data-id="helphint-text-form">
                                            <Image
                                                source="src/templates/custom-branding/images/formFillColor.png"
                                            />
                                            <div>
                                                The Color (Hex) to assign to the input boxes on
                                                <br />
                                                the form.
                                            </div>
                                        </div>
                                    }
                                />
                                <ColorPicker
                                    data-id="color-picker-text-font"
                                    color={this.state.formFontColor}
                                    onValueChange={this._handleColorChange("formFontColor")}
                                    labelText="Form Font Color"
                                    hintText={
                                        <div data-id="helphint-text-font">
                                            <Image
                                                source="src/templates/custom-branding/images/formFontColor.png"
                                            />
                                            <div>
                                                The Color (Hex) to assign to the front on the form.
                                            </div>
                                        </div>
                                    }
                                />
                                <ColorPicker
                                    data-id="color-picker-text-link"
                                    color={this.state.linkColor}
                                    onValueChange={this._handleColorChange("linkColor")}
                                    labelText="Link Color"
                                    hintText={
                                        <div data-id="helphint-text-link">
                                            <Image
                                                source="src/templates/custom-branding/images/linkColor.png"
                                            />
                                            <div>
                                                The Color (Hex) to assign to any links on the
                                                <br />
                                                form.
                                            </div>
                                        </div>
                                    }
                                />
                                <ColorPicker
                                    data-id="color-picker-text-header"
                                    color={this.state.headerCustomTextColor}
                                    onValueChange={this._handleColorChange("headerCustomTextColor")}
                                    labelText="Header And Custom Text Color"
                                    hintText={
                                        <div data-id="helphint-text-header">
                                            <Image
                                                source="src/templates/custom-branding/images/headerCustomText.png"
                                            />
                                            <div>
                                                The color (Hex) to assign to the header and
                                                <br />
                                                custom text on the form.
                                            </div>
                                        </div>
                                    }
                                />
                            </Layout.Column>
                        </Layout.Row>
                    </PageSection>
                    <PageSection
                        title="Content"
                        data-id="content-section"
                    >
                        <Layout.Row>
                            <Layout.Column>
                                <InputRow>
                                    <FormTextField
                                        labelText="Registration Page Header"
                                        width={InputWidths.SM}
                                        value={this.state.registrationPageHeader}
                                        data-id="registration-page-header"
                                        labelHelpText={
                                            <div data-id="helphint-registration-page-header">
                                                <Image
                                                    source="src/templates/custom-branding/images/pageHeader.png"
                                                />
                                                <div>
                                                    This allows you to write a custom Registration
                                                    <br />
                                                    Form header.
                                                </div>
                                            </div>
                                        }
                                        onValueChange={this._handleInputChange("registrationPageHeader")}
                                        maxLength={100}
                                        subText={`${this.state.registrationPageHeader.length}/100 character max`}
                                    />
                                    <FormTextField
                                        labelText="Registration Page Text"
                                        width={InputWidths.XL}
                                        value={this.state.registrationPageText}
                                        data-id="registration-page-text"
                                        labelHelpText={
                                            <div data-id="helphint-registration-page-text">
                                                <Image
                                                    source="src/templates/custom-branding/images/pageText.png"
                                                />
                                                <div>
                                                    This allows you to write custom text for the
                                                    <br />
                                                    Registration form.
                                                </div>
                                            </div>
                                        }
                                        onValueChange={this._handleInputChange("registrationPageText")}
                                        maxLength={300}
                                        subText={`${this.state.registrationPageText.length}/300 character max`}
                                    />
                                </InputRow>
                                <InputRow>
                                    <FormTextField
                                        labelText="Login Page Header"
                                        width={InputWidths.SM}
                                        value={this.state.loginPageHeader}
                                        data-id="login-page-header"
                                        labelHelpText={
                                            <div data-id="helphint-login-page-header">
                                                <Image
                                                    source="src/templates/custom-branding/images/pageHeader.png"
                                                />
                                                <div>
                                                    This allows you to write custom Login Form
                                                    <br />
                                                    header.
                                                </div>
                                            </div>
                                        }
                                        onValueChange={this._handleInputChange("loginPageHeader")}
                                        maxLength={100}
                                        subText={`${this.state.loginPageHeader.length}/100 character max`}
                                    />
                                    <FormTextField
                                        labelText="Login Page Text"
                                        width={InputWidths.XL}
                                        value={this.state.loginPageText}
                                        data-id="login-page-text"
                                        labelHelpText={
                                            <div data-id="helphint-login-page-text">
                                                <Image
                                                    source="src/templates/custom-branding/images/pageText.png"
                                                />
                                                <div>
                                                    This allows you to write custom text for Login
                                                    <br />
                                                    form.
                                                </div>
                                            </div>
                                        }
                                        onValueChange={this._handleInputChange("loginPageText")}
                                        maxLength={300}
                                        subText={`${this.state.loginPageText.length}/300 character max`}
                                    />
                                </InputRow>
                                <InputRow>
                                    <FormTextField
                                        labelText="Reset Password Header"
                                        width={InputWidths.SM}
                                        value={this.state.resetPasswordHeader}
                                        data-id="reset-password-header"
                                        labelHelpText={
                                            <div data-id="helphint-reset-password-header">
                                                <Image
                                                    source="src/templates/custom-branding/images/pageHeader.png"
                                                />
                                                <div>
                                                    This allows you to write a custom Reset
                                                    <br />
                                                    Password Form header.
                                                </div>
                                            </div>
                                        }
                                        onValueChange={this._handleInputChange("resetPasswordHeader")}
                                        maxLength={100}
                                        subText={`${this.state.resetPasswordHeader.length}/300 character max`}
                                    />
                                    <FormTextField
                                        labelText="Reset Password Text"
                                        width={InputWidths.XL}
                                        value={this.state.resetPasswordText}
                                        data-id="reset-password-text"
                                        labelHelpText={
                                            <div data-id="helphint-reset-password-text">
                                                <Image
                                                    source="src/templates/custom-branding/images/pageText.png"
                                                />
                                                <div>
                                                    This allows you to write custom text for the
                                                    <br />
                                                    Reset Password form.
                                                </div>
                                            </div>
                                        }
                                        onValueChange={this._handleInputChange("resetPasswordText")}
                                        maxLength={300}
                                        subText={`${this.state.resetPasswordText.length}/300 character max`}
                                    />
                                </InputRow>
                            </Layout.Column>
                        </Layout.Row>
                    </PageSection>
                    <ButtonBar
                        onCancel={this._handleDiscard}
                        onSave={this._handleSave}
                        cancelText="Discard Changes"
                        saveText="Save"
                        enableSavingAnimation={this.state.saving}
                        visible={this._showButtonBar(this.state)}
                    />
                </Stack>
            </div>
        );
    }
}