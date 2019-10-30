import Button, { buttonTypes } from "../components/buttons/Button";
import ButtonGroup from "../components/layout/ButtonGroup";
import CopyField from "../components/utils/CopyField";
import FileInput from "../components/forms/FileInput";
import FieldSet from "../components/layout/FieldSet";
import FlexRow, { justifyOptions } from "../components/layout/FlexRow";
import FormLabel from "../components/forms/FormLabel";
import FormRadioGroup from "../components/forms/FormRadioGroup";
import FormTextField from "../components/forms/FormTextField";
import FormDropDownList from "../components/forms/FormDropDownList";
import HR from "../components/general/HR";
import InputWidths from "../components/forms/InputWidths";
import InputRow from "../components/layout/InputRow";
import InlineMessage from "../components/general/InlineMessage";
import Link from "ui-library/lib/components/general/Link";
import PageHeader from "../components/general/PageHeader";
import PageSection from "../components/layout/PageSection";
import React, { Component } from "react";
import Text from "../components/general/Text";
import { TabContent, TabSet } from "../components/layout/TabSet";
import uuid from "uuid";

/**
* @name Multiple Verification Certificates Template
* @desc This template demonstrates how to add multiple verification certificates.
*/
export default class MultipleCertsTemplate extends Component {
    state = {
        selectedIndex: 2,
        selectedId: 1,
        certType: "1",
        selectedCertFile: null,
        showRadioButtons: true,
        addCertOption: false,
        addedFiles: [],
    };

    _addToFiles = (fileName) => {
        this.setState(previous => ({
            addedFiles: [...previous.addedFiles, { fileName, id: uuid.v4() }]
        }));
    }

    _addAdditionalCert = () => {
        return this.state.addCertOption
            ? (this._noRequiredCert())
            : (this._renderCertRadioChoices());
    }

    _fileDetailsHRVisibility = (index) => {
        return index !== 0
            ? (<HR dashed />)
            : (null);
    }

    _handleAdditionalCert = () => {
        this.setState({ addCertOption: false });
    }

    _handleCertFileChange = (file) => {
        this._addToFiles(file.name);
        this.setState({ addCertOption: true });
    }

    _handleCertRemove = (id) => {
        this.setState(previous => ({
            addedFiles: previous.addedFiles.filter( ({ id: prevId }) =>
                id !== prevId
            )
        }));
    }

    _handleCertType = (id) => {
        this.setState({ certType: id });
    }

    _handleSSOChange = (id) => {
        this.setState({ selectedId: id });
    }

    _handleTabSetValueChange = labelValues => {
        this.setState({
            selectedIndex: labelValues.index,
        });
    };

    _noRequiredCert = () => {
        return this.state.addedFiles.length > 0
            ? (<InputRow><Link onClick={this._handleAdditionalCert}>+ Add Additional Certificate</Link></InputRow>)
            : (<div>
                <InlineMessage type={ InlineMessage.MessageTypes.ERROR }>
                Your file “mycertificate.pdf” failed to upload because of
                    this reason. Please try again
                </InlineMessage>
                {this._renderCertRadioChoices()}
            </div>);
    }

    _renderCertRadioChoices = () => {
        return (
            <div>
                <FormRadioGroup
                    className="space-top-md"
                    groupName="verification-certificate"
                    selected={this.state.certType}
                    onValueChange={this._handleCertType}
                    items={[
                        { id: "1", name: "Import" },
                        { id: "2", name: "Choose from list" },
                    ]}
                    stacked={false}
                    flags={["p-stateful"]}
                />
                {this._renderCertUploadType()}
            </div>);
    }

    _renderCertUploadType = () => {
        return this.state.certType === "1"
            ? (<FileInput
                className= "space-top-sm"
                required = {this.state.addedFiles.length === 0}
                fileName={this.state.selectedCertFile}
                onValueChange={this._handleCertFileChange}
                onRemove={this._handleCertFileRemove}
                noBorder
                status={{ label: "Select File" }}
                fileData={(
                    <span>
                        Valid&nbsp;
                        <Text inline type="value">04-15</Text> to&nbsp;
                        <Text inline type="value">09-17</Text>
                    </span>
                )}/>
            )
            : (<FormDropDownList
                onValueChange = {this._handleCertFileChange}
                options={[
                    { name: "Certificate Option 1", value: "Certificate Option 1" },
                    { name: "Certificate Option 2", value: "Certificate Option 2" },
                    { name: "Certificate Option 3", value: "Certificate Option 3" },
                ]}
                placeholder="Choose a certificate"
                width={InputWidths.MD}
                flags={["p-stateful", "use-portal"]}
            />);
    }

    _returnFieldSetAndCertDetails = () => {
        return this.state.addedFiles.length > 0
            ? ( <FieldSet>
                {this.state.addedFiles.map( ({ id, fileName }, index) => {
                    return (
                        <div key={id}>
                            {this._fileDetailsHRVisibility(index)}
                            <FileInput
                                noBorder
                                fullWidth
                                fileName={fileName}
                                onRemove={ () => this._handleCertRemove(id)}
                                fileData={(
                                    <span>
                                        Valid &nbsp;
                                        <Text inline type="value">04-15</Text> to <Text inline type="value">09-17</Text>
                                    </span>
                                )}/>
                        </div>
                    );
                })}
            </FieldSet> )
            : (null);
    }

    render() {
        return (
            <div>
                <PageHeader
                    title="Example Header"
                    subtitle="SAML"
                    iconName="browser"
                />
                <PageSection border={false}>
                    <TabSet
                        onValueChange={this._handleTabSetValueChange}
                        selectedIndex={this.state.selectedIndex}
                    >
                        <TabContent label="Profile">
                            Profile Content...
                        </TabContent>
                        <TabContent label="P1 Connection">
                            P1 Content
                        </TabContent>
                        <TabContent label="IDP Configuration">
                            <InputRow>
                                <FormLabel value="Download Metadata">
                                    <Button
                                        label="Download"
                                        inline
                                    />
                                </FormLabel>
                            </InputRow>
                            <InputRow>
                                <CopyField
                                    text="Example Text"
                                    width={InputWidths.LG}/>
                            </InputRow>
                            <InputRow>
                                <FormTextField
                                    labelText="SSO Endpoint"
                                    width={InputWidths.LG}
                                    flags={["p-stateful"]}
                                />
                            </InputRow>
                            <InputRow>
                                <FormTextField
                                    labelText="IDP Entity ID"
                                    width={InputWidths.LG}
                                    flags={["p-stateful"]}
                                />
                            </InputRow>
                            <InputRow>
                                <FormRadioGroup
                                    groupName="sso-binding"
                                    selected={this.state.selectedId}
                                    onValueChange={this._handleSSOChange}
                                    items={[
                                        { id: "1", name: "HTTP POST" },
                                        { id: "2", name: "HTTP Redirect" },
                                    ]}
                                    stacked={false}
                                    flags={["p-stateful"]}
                                    labelText="SSO Binding"
                                />
                            </InputRow>
                            <HR solid/>
                            <InputRow>
                                <FormLabel value="Verification Certificate"/>
                                {this._returnFieldSetAndCertDetails()}
                                {this._addAdditionalCert()}
                            </InputRow>
                            <HR solid/>
                            <FlexRow justify={justifyOptions.END}>
                                <ButtonGroup>
                                    <Button
                                        label="Cancel"
                                        type={buttonTypes.CANCEL}
                                        disabled={true}
                                    />
                                    <Button
                                        type={Button.buttonTypes.PRIMARY}
                                        label="Save"
                                        disabled={true}
                                    />
                                </ButtonGroup>
                            </FlexRow>
                        </TabContent>
                        <TabContent label="Attributes">
                        Attributes Content...
                        </TabContent>
                    </TabSet>
                </PageSection>
            </div>
        );
    }
}