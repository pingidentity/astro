import React, { Component } from "react";

import Button from "ui-library/lib/components/buttons/Button";
import FileInput from "ui-library/lib/components/forms/FileInput";
import FlexRow, { alignments } from "ui-library/lib/components/layout/FlexRow";
import FormRadioGroup from "ui-library/lib/components/forms/FormRadioGroup";
import FormTextField from "ui-library/lib/components/forms/FormTextField";
import FormTextArea from "ui-library/lib/components/forms/FormTextArea";
import HelpHint from "ui-library/lib/components/tooltips/HelpHint";
import HR from "ui-library/lib/components/general/HR";
import Icon from "ui-library/lib/components/general/Icon";
import InputRow from "ui-library/lib/components/layout/InputRow";
import InputWidths from "ui-library/lib/components/forms/InputWidths";
import PageSection from "ui-library/lib/components/layout/PageSection";
import PageWizard, { Step } from "ui-library/lib/components/panels/PageWizard";
import Text, { textTypes } from "ui-library/lib/components/general/Text";

/**
* @name MetadataImport
* @desc A metadata import demo
*/

export default class MetadataImport extends Component {
    state = {
        activeStep: 0,
        numSteps: 3,
        currentApp: { appName: "", appDesc: "" },
        applications: [],
        headerColumns: null,
        show: null,
        messageProps: null,
        fileStatus: "no file selected yet",
        selectedMetadataSource: "2",
        selectedCertificateSource: "2",
        selectedSLOBinding: "1",
        open: false,
    };

    onNext = () => {
        let nextState = {
            loading: true,
            activeStep: this.state.activeStep < this.state.numSteps - 1
                ? this.state.activeStep + 1
                : this.state.numSteps - 1
        };
        if (this.state.activeStep === 1) {
            nextState.loading = true;
            setTimeout(() => {
                this.hideLoader();
                this.showMessage();
                setTimeout(this.hideMessage, 3000);
            }, 500);
        } else {
            setTimeout(this.hideLoader, 500);
        }
        this.setState(nextState);
    }

    _onMenuClick = (step) => {
        this.setState({ activeStep: step });
    }

    _onOpen = () => {
        this.setState({ open: true });
    }

    _onClose = () => {
        this.setState({ open: false, activeStep: 0, currentApp: {} });
    }

    _handleRadioChange = id => value => this.setState({ [id]: value });

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

    render() {
        const headerItems = [
            { title: "App Name", value: "My Home App" },
            { title: "Type", value: "Custom" },
            { title: "Client ID", value: "5t78br41-98b3-7898-6pl2-9898y5kg4op6nn2" },
        ];

        const metadataSources = [
            { id: "1", name: "Import Metadata" },
            { id: "2", name: "Import from URL" },
            { id: "3", name: "Manually Enter" }
        ];

        const sloBindings = [
            { id: "1", name: "HTTP POST" },
            { id: "2", name: "HTTP Redirect" },
        ];

        const certificateImport = [
            { id: "1", name: "None" },
            { id: "2", name: "Import" },
            { id: "3", name: "Choose from List" }
        ];

        const helpHint = (<span>
            Import Metadata from URL&nbsp;
            <HelpHint hintText="This is some help text..." />
        </span>);

        const _renderMetadataSource = () => {
            return (
                <div>
                    {this.state.selectedMetadataSource === "1" ? (
                        <h2>Option 1</h2>
                    ) : (
                        null
                    )}

                    {this.state.selectedMetadataSource === "2" ? (
                        <FlexRow alignment={alignments.CENTER}>
                            <FormTextField
                                labelText="Import URL"
                                width={InputWidths.LG}
                            />
                            <Button
                                iconName="clear"
                                inline
                            />
                        </FlexRow>
                    ) : (
                        null
                    )}

                    {this.state.selectedMetadataSource === "3" ? (
                        <h2>Option 3</h2>
                    ) : (
                        null
                    )}
                </div>
            );
        };

        const _renderCertificateSource = () => {
            return (
                <div>
                    { this.state.selectedCertificateSource === "1" ? (
                        <h2>Option 1</h2>
                    ) : (
                        null
                    )}

                    { this.state.selectedCertificateSource === "2" ? (
                        <InputRow>
                            <FileInput
                                accept={["text/csv", "image/jpeg", "image/png", "pdf"]}
                                fileName={this.state.selectedFile}
                                fileData={(
                                    <span>
                                        Valid&nbsp;
                                        <Text inline type={textTypes.VALUE}>04-15</Text> to&nbsp;
                                        <Text inline type={textTypes.VALUE}>09-17</Text>
                                    </span>
                                )}
                                onValidateFile={this._handleFileValidation}
                                onValueChange={this._handleChange}
                                onRemove={this._handleRemove}
                                selectedTitle="Certificate"
                            />
                        </InputRow>
                    ) : (
                        null
                    )}

                    { this.state.selectedCertificateSource === "3" ? (
                        <h2>Option 3</h2>
                    ) : (
                        null
                    )}
                </div>
            );
        };

        return ([
            <Button key="wizard-button" onClick={this._onOpen}>Show Wizard Example</Button>,
            (this.state.open &&
                <PageWizard
                    data-id="metadata-import-demo"
                    key="wizard"
                    onNext={this.onNext}
                    activeStep={this.state.activeStep}
                    onMenuClick={this._onMenuClick}
                    onClose={this._onClose}
                    headerItems={headerItems}>
                    <Step
                        completed={this.state.activeStep > 0}
                        title="Set Up SAML Connection"
                        infoItem={
                            <a href="#"><Icon iconName="info" type="inline" /> More on this topic</a>
                        }
                        menuDescription="Configure connection between your app and PingOne."
                        description="Specify details about the application that PingOne will be communicating with."
                        required
                    >
                        <InputRow>
                            <FormRadioGroup
                                groupName="metadata-sources"
                                items={metadataSources}
                                selected={this.state.selectedMetadataSource}
                                onValueChange={this._handleRadioChange("selectedMetadataSource")}
                                labelText="Provide App Metadata"
                                labelHelpText="This is some help text..."
                                stacked={false}
                            />
                        </InputRow>

                        {_renderMetadataSource()}

                        <HR solid />

                        <PageSection title={helpHint} underlined={false}>
                            <InputRow>
                                <FormTextArea
                                    labelText="ACS URLs (Customer Service)"
                                    rows={5}
                                    width={InputWidths.LG}
                                />
                            </InputRow>

                            <InputRow>
                                <FormTextField
                                    labelText="Service Provider (SP) Entity ID"
                                    width={InputWidths.LG}
                                />
                            </InputRow>

                            <InputRow>
                                <FormTextField
                                    labelText="Single Logout (SLO) Response Endpoint"
                                    width={InputWidths.LG}
                                />
                            </InputRow>

                            <InputRow>
                                <FormRadioGroup
                                    groupName="slo-binding"
                                    selected={this.state.selectedSLOBinding}
                                    onValueChange={this._handleRadioChange("selectedSLOBinding")}
                                    items={sloBindings}
                                    labelText="Single Logout (SLO) Binding"
                                    stacked={false}
                                />
                            </InputRow>

                            <InputRow>
                                <FormTextField
                                    labelText="Assertation Validity Duration (In Seconds)"
                                    width={InputWidths.SM}
                                />
                            </InputRow>

                            <HR solid />

                            { !this.state.selectedFile ? (
                                <InputRow>
                                    <FormRadioGroup
                                        groupName="certificate-source"
                                        selected={this.state.selectedCertificateSource}
                                        onValueChange={this._handleRadioChange("selectedCertificateSource")}
                                        items={certificateImport}
                                        labelText="Verification Certificate (Optional)"
                                        labelHelpText="This is some help text..."
                                        stacked={false}
                                    />
                                </InputRow>
                            ) : (
                                null
                            )}

                            {_renderCertificateSource()}

                        </PageSection>
                    </Step>
                    <Step
                        completed={this.state.activeStep > 1}
                        title="Map Attributes"
                        menuDescription="Provide access to your application for customers to authenticate."
                        description="Provide access to your application for customers to authenticate."
                        required
                    >
                        <h2>Page 3</h2>
                    </Step>
                </PageWizard>
            )
        ]);
    }
}