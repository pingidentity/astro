
import React, { Component } from "react";

//eslint-disable-next-line import/no-extraneous-dependencies
import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
//eslint-disable-next-line import/no-extraneous-dependencies
import ButtonGroup from "ui-library/lib/components/layout/ButtonGroup";
//eslint-disable-next-line import/no-extraneous-dependencies
import CopyField from "ui-library/lib/components/utils/CopyField";
//eslint-disable-next-line import/no-extraneous-dependencies
import FileInput from "ui-library/lib/components/forms/FileInput";
//eslint-disable-next-line import/no-extraneous-dependencies
import FieldSet from "ui-library/lib/components/layout/FieldSet";
//eslint-disable-next-line import/no-extraneous-dependencies
import Link from "ui-library/lib/components/general/Link";
//eslint-disable-next-line import/no-extraneous-dependencies
import FlexRow, { justifyOptions } from "ui-library/lib/components/layout/FlexRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormLabel from "ui-library/lib/components/forms/FormLabel";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormRadioGroup from "ui-library/lib/components/forms/FormRadioGroup";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormTextField from "ui-library/lib/components/forms/FormTextField";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
//eslint-disable-next-line import/no-extraneous-dependencies
import HR from "ui-library/lib/components/general/HR";
//eslint-disable-next-line import/no-extraneous-dependencies
import InputWidths from "ui-library/lib/components/forms/InputWidths";
//eslint-disable-next-line import/no-extraneous-dependencies
import InputRow from "ui-library/lib/components/layout/InputRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import InlineMessage from "ui-library/lib/components/general/InlineMessage";
//eslint-disable-next-line import/no-extraneous-dependencies
import PageHeader from "ui-library/lib/components/general/PageHeader";
//eslint-disable-next-line import/no-extraneous-dependencies
import PageSection from "ui-library/lib/components/layout/PageSection";
//eslint-disable-next-line import/no-extraneous-dependencies
import Text, { textTypes } from "ui-library/lib/components/general/Text";
//eslint-disable-next-line import/no-extraneous-dependencies
import { TabContent, TabSet } from "ui-library/lib/components/layout/TabSet";
import uuid from "uuid";
//eslint-disable-next-line import/no-extraneous-dependencies
import Padding, { sizes } from "ui-library/lib/components/layout/Padding";

/**
* @name MultipleCertificates
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
                <Padding top={sizes.SM}>
                    <FormRadioGroup
                        groupName="verification-certificate"
                        selected={this.state.certType}
                        onValueChange={this._handleCertType}
                        items={[
                            { id: "1", name: "Import" },
                            { id: "2", name: "Choose from list" },
                        ]}
                        stacked={false}
                    />
                </Padding>
                {this._renderCertUploadType()}
            </div>);
    }

    _renderCertUploadType = () => {
        return this.state.certType === "1"
            ? (<Padding top={sizes.MD}>
                <FileInput
                    required = {this.state.addedFiles.length === 0}
                    fileName={this.state.selectedCertFile}
                    onValueChange={this._handleCertFileChange}
                    onRemove={this._handleCertFileRemove}
                    noBorder
                    status={{ label: "Select File" }}
                    fileData={(
                        <span>
                        Valid&nbsp;
                            <Text inline type={textTypes.VALUE}>04-15</Text> to&nbsp;
                            <Text inline type={textTypes.VALUE}>09-17</Text>
                        </span>
                    )}/>
            </Padding>
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
                                />
                            </InputRow>
                            <InputRow>
                                <FormTextField
                                    labelText="IDP Entity ID"
                                    width={InputWidths.LG}
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
                                        disabled
                                    />
                                    <Button
                                        type={Button.buttonTypes.PRIMARY}
                                        label="Save"
                                        disabled
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
