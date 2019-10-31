import React, { Component } from "react";

import Button from "ui-library/lib/components/buttons/Button";
import ButtonBar from "ui-library/lib/components/forms/ButtonBar";
import ConfirmToolTip from "ui-library/lib/components/tooltips/ConfirmTooltip";
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
import FormLabel from "ui-library/lib/components/forms/FormLabel";
import FormTextField from "ui-library/lib/components/forms/form-text-field";
import FormTextArea from "ui-library/lib/components/forms/form-text-area";
import InputRow from "ui-library/lib/components/layout/InputRow";
import InputWidths from "ui-library/lib/components/forms/InputWidths";
import Layout from "ui-library/lib/components/general/ColumnLayout";
import LinkDropDownList from "ui-library/lib/components/forms/LinkDropDownList";
import ListNav from "ui-library/lib/components/layout/ListNav";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import PageSection from "ui-library/lib/components/layout/PageSection";
import PopOverMenu from "ui-library/lib/components/tooltips/PopoverMenu";
import StatusIndicator from "ui-library/lib/components/general/StatusIndicator";
import Text, { textTypes } from "ui-library/lib/components/general/Text";

/**
* @name Notifications
* @desc This is a template to demonstrate how to build a list Nav
*/

const mockLabel = [
    {
        label: "English (en-US)",
        id: "one"
    },
    {
        label: "English (en-UK)",
        id: "two"
    },
    {
        label: "French (fr-FR)",
        id: "three"
    },
    {
        label: "French (fr-CA)",
        id: "four"
    },
    {
        label: "German (de-DE)",
        id: "five"
    },
    {
        label: "Chinese (zh-CN)",
        id: "six"
    }
];

const OPTIONS = [
    { label: "English", value: "1" },
    { label: "French", value: "2" },
    { label: "Skier", value: "3" },
];

const LOCALE = [
    { label: "London", value: "1" },
    { label: "Paris", value: "2" },
    { label: "Colorado", value: "3" },
];

const otp = "${otp}";

const supportEmail = "${supportEmail}";

const codeMarkUp =
`<html>
    <body>
        <p>Your PingID one-time passcode is:<strong>${otp}</strong></p>
        <p>For help, contact <a href=mailto:${supportEmail}>${supportEmail}</a></p>
    </body>
</html>`;


export default class Notifications extends Component {

    initState = {
        fromAddress: "pingid@pingidentity.com",
        fromName: "pingID",
        replyAddress: "",
        replyToName: "",
        subject: "PingID Authentication",
        senderID: "PingID",
        message: "PingID passcode: ${otp}",
        emailBody: codeMarkUp,
        emailLabel: "Default Content",
        smsLabel: "Default Content",
        saving: false,
        selectedLabel: mockLabel[0].id,
        defaultLanguage: mockLabel[0],
        selectedValue: OPTIONS[0],
        selectedLocale: LOCALE[0]
    }

    state = this.initState;

    _buttons = [
        {
            label: "Reset Email",
            onClick: () => this.setState(this.initState)
        },
        {
            label: "Reset SMS",
            onClick: () => this.setState(this.initState)
        }
    ];


    _onSelect = (id) => {
        this.setState({
            selectedLabel: id,
        });
    }

    _handleDefaultLanguage = (option) => {
        this.setState({
            defaultLanguage: option
        });
    }


    _handleValueChange = (option) => {
        this.setState ({
            selectedValue: option,
        });
    }

    _handleLocaleChange = (option) => {
        this.setState ({
            selectedLocale: option,
        });
    }

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

    _handleInputChange = (e) => {
        const value = e.target.value;

        let section = "";
        let textToSet = "Default Content";
        switch (e.target.name) {
            case "fromAddress":
            case "fromName":
            case "replyAddress":
            case "replyName":
            case "subject":
            case "emailBody":
                section = "emailLabel";
                break;
            case "senderID":
            case "message":
                section = "smsLabel";
                break;
            default:
        }
        if (value && value.trim() !== "") {
            textToSet = "";
        }

        this.setState({
            [e.target.name]: value,
            [section]: textToSet
        });
    };

    _showButtonBar = (state) => {
        return Object.entries(this.initState).some(([key, value]) => {
            if (key === "selectedLabel" || key === "selectedLocale" || key === "selectedValue" ) {
                return false;
            }
            return value !== state[key];
        });
    }

    render() {
        return (
            <div>
                <PageHeader title="Notifications" />
                <Layout.Row autoWidth>
                    <Layout.Column>
                        <FormLabel value="Default Language" />
                        <Layout.Row>
                            <LinkDropDownList
                                options={mockLabel}
                                label={this.state.defaultLanguage.label}
                                selectedOption={this.state.defaultLanguage}
                                onClick={this._handleDefaultLanguage}
                            />
                        </Layout.Row>
                    </Layout.Column>
                    <Layout.Column>
                        <FormLabel value="Required Placeholders" />
                        <Layout.Row>
                            <StatusIndicator type={StatusIndicator.Types.SUCCESS}>
                                {"${otp}"}
                            </StatusIndicator>
                        </Layout.Row>
                    </Layout.Column>
                    <Layout.Column>
                        <FormLabel value="Optional variables" />
                        <Layout.Row>
                            <Text type={textTypes.VALUE}>
                                {"${user.username}"} {"${supportEmail}"}
                            </Text>
                        </Layout.Row>
                    </Layout.Column>
                </Layout.Row>
                <hr />
                <ListNav
                    labels={mockLabel}
                    label1="Language"
                    label2="Locale"
                    selectedLabel={this.state.selectedLabel}
                    onSelect={this._onSelect}
                    listButton={
                        <ConfirmToolTip
                            placement="bottom"
                            label="+ Add Language"
                            title="Add Language"
                            buttonLabel="Add"
                            cancelText="Cancel"
                            buttonType="primary"
                        >
                            <FormDropDownList
                                label="Language"
                                options={OPTIONS}
                                selectedOption={this.state.selectedValue}
                                onValueChange={this._handleValueChange}
                            />
                            <br/>
                            <FormDropDownList
                                label="Locale"
                                options={LOCALE}
                                selectedOption={this.state.selectedLocale}
                                onValueChange={this._handleLocaleChange}
                            />
                        </ConfirmToolTip>
                    }
                >
                    <PageSection title="Email" titleAccessories={this.state.emailLabel}>
                        <InputRow>
                            <FormTextField
                                labelText="From Address"
                                width={InputWidths.MD}
                                name="fromAddress"
                                value={this.state.fromAddress}
                                onChange={this._handleInputChange}
                            />
                            <FormTextField
                                labelText="from name"
                                width={InputWidths.MD}
                                name="fromName"
                                value={this.state.fromName}
                                onChange={this._handleInputChange}
                            />
                        </InputRow>
                        <InputRow>
                            <FormTextField
                                labelText="reply to address"
                                width={InputWidths.MD}
                                name="replyAddress"
                                value={this.state.replyAddress}
                                onChange={this._handleInputChange}
                            />
                            <FormTextField
                                labelText="Reply To Name"
                                width={InputWidths.MD}
                                name="replyToName"
                                value={this.state.replyToName}
                                onChange={this._handleInputChange}
                            />
                        </InputRow>
                        <InputRow>
                            <FormTextField
                                labelText="Subject"
                                width={InputWidths.MAX}
                                name="subject"
                                value={this.state.subject}
                                onChange={this._handleInputChange}
                            />
                        </InputRow>
                        <InputRow>
                            <FormTextArea
                                name="emailBody"
                                labelText="body"
                                width={InputWidths.MAX}
                                value={this.state.emailBody}
                                rows={6}
                                onChange={this._handleInputChange}
                            />
                        </InputRow>
                        <InputRow>
                                Email templates support plain text or HTML.
                        </InputRow>
                    </PageSection>
                    <PageSection title="sms" titleAccessories={this.state.smsLabel}>
                        <InputRow>
                            <FormTextField
                                labelText="Sender ID"
                                labelHelpText="this is a help tooltip"
                                width={InputWidths.MD}
                                name="senderID"
                                value={this.state.senderID}
                                onChange={this._handleInputChange}
                            />
                        </InputRow>
                        <InputRow>
                            <FormTextField
                                labelText="Message"
                                width={InputWidths.MAX}
                                name="message"
                                value={this.state.message}
                                onChange={this._handleInputChange}
                            />
                        </InputRow>
                        <InputRow>
                                SMS messages will be cut off at 120 characters.
                        </InputRow>
                    </PageSection>
                    <PageSection>
                        <PopOverMenu
                            label={<Button submit label="Reset to Defaults"/>}
                            buttons={this._buttons}
                        />
                    </PageSection>
                </ListNav>
                <ButtonBar
                    onCancel={this._handleDiscard}
                    onSave={this._handleSave}
                    cancelText="Discard Changes"
                    saveText="Save"
                    enableSavingAnimation={this.state.saving}
                    visible={this._showButtonBar(this.state)}
                />

            </div>
        );
    }
}
