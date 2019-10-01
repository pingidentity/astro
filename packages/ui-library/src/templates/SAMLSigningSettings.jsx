import React, { Component } from "react";
import PageHeader from "../components/general/PageHeader";
import PageSection from "../components/layout/PageSection";
import Text from "../components/general/Text";
import { TabSet, TabContent } from "../components/layout/TabSet";
import Section from "../components/general/Section";
import FormLabel from "../components/forms/FormLabel";
import Padding, { sizes as PaddingSizes } from "../components/layout/Padding";
import Stack from "../components/layout/Stack";
import CopyField from "../components/utils/CopyField";
import Button from "../components/buttons/Button";
import FormTextArea from "../components/forms/FormTextArea";
import InputWidths from "../components/forms/InputWidths";
import ConditionalFieldset, { Types as ConditionalFieldsetTypes } from "../components/general/ConditionalFieldset";
import InputRow from "../components/layout/InputRow";
import FormRadioGroup from "../components/forms/FormRadioGroup";
import FormTextField from "../components/forms/FormTextField";
import HR from "../components/general/HR";
import FileInput from "../components/forms/FileInput";
import FormDropDownList from "../components/forms/FormDropDownList";
import FlexRow, { alignments } from "../components/layout/FlexRow";

/**
* @name SAML Signing Template
* @desc This is a template to demonstrate how to build a SAML Signing template.
*/
export default class SAMLSigningSettings extends Component {
    state = {
        selectedIndex1: 1,
        selectedIndex2: 1,
        selectedId1: 1,
        selectedId2: 1,
        selectedCertFile: null,
        selectedValue1: { value: "RSA_SHA 256" },
        firstSectionOpen: true,
        secondSectionOpen: true,
    };

    _toggleFirst = () => {
        this.setState({ firstSectionOpen: !this.state.firstSectionOpen });
    }

    _toggleSecond = () => {
        this.setState({ secondSectionOpen: !this.state.secondSectionOpen });
    }

    _handleValueChange1 = labelValues => {
        this.setState({
            selectedIndex1: labelValues.index,
        });
    };

    _handleCertChange = (id) => {
        this.setState({ selectedId1: id });
    }

    _handleSLOChange = (id) => {
        this.setState({ selectedId2: id });
    }

    _handleCertFileChange = (file) => {
        this.setState({ selectedCertFile: file.name });
    }

    _handleCertFileRemove = () => {
        this.setState({ selectedCertFile: null });
    }

    _handleAlgoChange = (algo) => {
        this.setState({ selectedValue1: algo });
    }

    render() {
        return (
            <div>
                <PageHeader
                    title="My Home App"
                    subtitle="5t78br41-98b3-7898-6pl2-9898y5kg4op6nn2"
                    image="http://doge2048.com/meta/doge-600.png"
                />
                <PageSection border={false}>
                    <TabSet
                        onValueChange={this._handleValueChange1}
                        selectedIndex={this.state.selectedIndex1}
                    >
                        <TabContent label="Profile">
                            Content...
                        </TabContent>
                        <TabContent label="Configuration">
                            <Section
                                title="Connection Settings"
                                onToggle={this._toggleFirst}
                                expanded={this.state.firstSectionOpen}
                            >
                                <Stack>
                                    <InputRow>
                                        <FormLabel value="Issuer ID" />
                                        <Padding left={PaddingSizes.MD}>
                                            <Text>https://authpingone.com/051783a9-4630-4eb8-b1e1-34782e7aefcb</Text>
                                        </Padding>
                                    </InputRow>

                                    <InputRow>
                                        <FormLabel value="Single Logout Service" />
                                        <Padding left={PaddingSizes.MD}>
                                            <Text>https://authpingone.com/051783a9-4630-4eb8-b1e1-34782e7aefcb/saml20/slo</Text>
                                        </Padding>
                                    </InputRow>

                                    <InputRow>
                                        <FormLabel value="Single Signon Page" />
                                        <Padding left={PaddingSizes.MD}>
                                            <Text>https://authpingone.com/051783a9-4630-4eb8-b1e1-34782e7aefcb/saml20/slo/IDP</Text>
                                        </Padding>
                                    </InputRow>

                                    <InputRow>
                                        <FormLabel value="IDP Metadata URL" />
                                        <Padding left={PaddingSizes.MD}>
                                            <CopyField text="https://authpingone.com/051783a9-4630-4eb8-b1e1-34782e7aefcb/saml20" width="XL"/>
                                            <InputRow>
                                                <Button label="Download IDP Metadata" inline />
                                            </InputRow>
                                        </Padding>
                                    </InputRow>
                                </Stack>
                            </Section>

                            <Section
                                title="SAML Settings"
                                onToggle={this._toggleSecond}
                                expanded={this.state.secondSectionOpen}
                            >
                                <InputRow>
                                    <FormTextArea
                                        labelText="ACS URLs (Assertion Consumer Service)"
                                        width={InputWidths.MD}
                                    />
                                </InputRow>
                                <InputRow>
                                    <ConditionalFieldset
                                        data-id="demo-1"
                                        emptyMessage={"Do nothing"}
                                        label="Signing Certificate"
                                        type={ConditionalFieldsetTypes.SELECT}
                                    >
                                        <div title="(Default) P1 Universal Signing Cert 2018" icon="certificate">
                                            <FlexRow alignment={alignments.CENTER}>
                                                <Padding right={PaddingSizes.SM} bottom={PaddingSizes.SM}>
                                                    <Text>
                                                        Sign:
                                                    </Text>
                                                </Padding>
                                                <FormRadioGroup
                                                    groupName="signing-type"
                                                    selected={this.state.selectedId1}
                                                    onValueChange={this._handleCertChange}
                                                    items={[
                                                        { id: "1", name: "Assertion" },
                                                        { id: "2", name: "Response" },
                                                        { id: "3", name: "Assertion & Response" },
                                                    ]}
                                                    stacked={false}
                                                />
                                            </FlexRow>
                                        </div>

                                        <div title="(Default) P1 Universal Signing Cert 2018" icon="certificate">
                                            <FlexRow alignment={alignments.CENTER}>
                                                <Padding right={PaddingSizes.SM} bottom={PaddingSizes.SM}>
                                                    <Text>
                                                        Sign:
                                                    </Text>
                                                </Padding>
                                                <FormRadioGroup
                                                    groupName="signing-type"
                                                    selected={this.state.selectedId1}
                                                    onValueChange={this._handleCertChange}
                                                    items={[
                                                        { id: "1", name: "Assertion" },
                                                        { id: "2", name: "Response" },
                                                        { id: "3", name: "Assertion & Response" },
                                                    ]}
                                                    stacked={false}
                                                />
                                            </FlexRow>
                                        </div>
                                    </ConditionalFieldset>
                                </InputRow>
                                <InputRow>
                                    <FormTextField
                                        label="Service Provider (SP) Entity ID" placeholder="https://"
                                    />
                                </InputRow>
                                <InputRow>
                                    <InputRow>
                                        <FormTextField
                                            label="Single Logout (SLO) Response Endpoint"
                                            placeholder="https://"
                                        />
                                        <FormTextField
                                            label="Single Logout (SLO) Endpoint"
                                            placeholder="https://"
                                        />
                                    </InputRow>
                                </InputRow>
                                <InputRow>
                                    <InputRow>
                                        <FormRadioGroup
                                            groupName="slo-binding"
                                            selected={this.state.selectedId2}
                                            onValueChange={this._handleSLOChange}
                                            items={[
                                                { id: "1", name: "Http POST" },
                                                { id: "2", name: "Http Redirect" },
                                            ]}
                                            stacked={false}
                                            labelText="Single Logout (SLO) Binding"
                                        />
                                    </InputRow>
                                </InputRow>
                                <InputRow>
                                    <FormTextField
                                        labelText="Assertation Validity Duration (In Seconds)"
                                        width={InputWidths.SM}
                                    />
                                </InputRow>
                                <InputRow>
                                    <HR solid />
                                </InputRow>
                                <InputRow>
                                    <FormLabel
                                        value="Verification Certificate"
                                        hint="This is some help text..."
                                    >
                                        <FileInput
                                            fileName={this.state.selectedCertFile}
                                            onValueChange={this._handleCertFileChange}
                                            onRemove={this._handleCertFileRemove}
                                        />
                                    </FormLabel>
                                </InputRow>
                                <InputRow>
                                    <FormDropDownList
                                        options={[
                                            { value: "RSA_SHA 256" },
                                            { value: "Another option..." },
                                        ]}
                                        label="Verification Algorithm"
                                        selectedOption={this.state.selectedValue1}
                                        onValueChange={this._handleAlgoChange}
                                        width={InputWidths.LG}
                                    />
                                </InputRow>
                            </Section>
                        </TabContent>
                        <TabContent label="Attribute Mappings">
                            Content...
                        </TabContent>
                        <TabContent label="Policies">
                            Content...
                        </TabContent>
                    </TabSet>
                </PageSection>
            </div>
        );
    }
}