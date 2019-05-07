import React from "react";
import FormTextField from "../../components/forms//form-text-field";
import FormRadioGroup from "../../components/forms/FormRadioGroup";
import FormDropDownList from "../../components/forms/FormDropDownList";
import InputWidths from "../../components/forms/InputWidths";
import PageHeader from "../../components/general/PageHeader";
import Layout from "../../components/general/ColumnLayout";
import Toggle from "../../components/forms/form-toggle";
import ButtonBar from "../../components/forms/ButtonBar";
import Button from "../../components/buttons/Button";
import RockerButton from "../../components/forms/RockerButton";
import PageSection from "../../components/layout/PageSection";
import InputRow from "../../components/layout/InputRow";
import Link from "../../components/general/Link";

/**
 * @class EditPage
 * @desc This is a template to demonstrate how to build a sectioned edit/form page.  Use it as a
 *     starting poing for an edit page.
 *
 */
export default class EditPage extends React.Component {

    initState = {
        address1: "1234 Stadium",
        address2: "seat 101",
        addressType: "",
        alternateAddress1: "1234 Stadium",
        alternateAddress2: "seat 101",
        alternateAddressType: "",
        firstName: "Denver",
        lastName: "Broncos",
        userActive: false,
        userGroup: null,
        username: "DenverBroncos01@broncos.com",
        saving: false,
    }

    state = this.initState

    _handleCancel = () => {
        // do something on cancel
    };

    _handleSave = () => {
        this.setState({
            saving: true
        });
    };

    _handleInputChange = (e) => {
        const value = e.target.type === "checkbox" ? !!e.target.checked : e.target.value,
            dataId = e.target.type === "text" ? e.target.getAttribute("data-id").slice(0,-6)
                : e.target.getAttribute("data-id");

        this.setState({
            [dataId]: value
        });
    };

    _handleSelectChange = dataId => value => {
        this.setState({
            [dataId]: value
        });
    };

    _showButtonBar = (state) => {
        return Object.entries(this.initState).some(([key, value]) => {
            return value !== state[key];
        });
    }


    render() {
        const labels = ["Profile", "Groups"];

        const addressOptions = [
            { value: "home", label: "Home" },
            { value: "work", label: "Work" },
            { value: "other", label: "Other" }
        ];

        return (
            <div>
                <Link className="page-return-link" title="To record list"/>
                <PageHeader title="Denver Broncos"
                    underlined={true}
                    accessories={[
                        <Button label="Reset Password" inline key="button" />,
                        <Toggle stateless={false} key="toggle"/>
                    ]}
                />

                <PageSection>
                    <RockerButton
                        stateless={false}
                        onValueChange={this._handleValueChange}
                        labels={labels}
                    />
                    <PageSection title="Identity">
                        <InputRow>
                            <FormTextField
                                labelText="First Name"
                                width={InputWidths.SM}
                                data-id="firstName"
                                required={true}
                                value={this.state.firstName || ""}
                                onChange={this._handleInputChange} />
                            <FormTextField
                                labelText="Last Name"
                                width={InputWidths.MD}
                                data-id="lastName"
                                required={true}
                                value={this.state.lastName || ""}
                                onChange={this._handleInputChange} />
                        </InputRow>
                        <InputRow>
                            <FormTextField
                                labelText="Username"
                                width={InputWidths.MD}
                                data-id="username"
                                required={true}
                                value={this.state.username || ""}
                                onChange={this._handleInputChange} />
                        </InputRow>
                    </PageSection>

                    <PageSection title="Address">
                        <InputRow>
                            <Layout.Row autoWidth>
                                <Layout.Column>
                                    <InputRow>
                                        <FormTextField
                                            labelText="Address"
                                            width={InputWidths.MD}
                                            data-id="address1"
                                            value={this.state.address1 || ""}
                                            onChange={this._handleInputChange} />
                                    </InputRow>
                                    <InputRow>
                                        <FormTextField
                                            width={InputWidths.MD}
                                            data-id="address2"
                                            value={this.state.address2 || ""}
                                            onChange={this._handleInputChange} />
                                    </InputRow>
                                    <InputRow>
                                        <FormDropDownList
                                            label="Address Location"
                                            width={InputWidths.MD}
                                            data-id="addressType"
                                            searchType="box"
                                            selectedOption={this.state.addressType || addressOptions[0]}
                                            onValueChange={this._handleSelectChange("addressType")}
                                            options={addressOptions} />
                                    </InputRow>
                                </Layout.Column>
                                <Layout.Column>
                                    <InputRow>
                                        <FormTextField
                                            labelText="Alternate Address"
                                            width={InputWidths.MD}
                                            data-id="alternateAddress1"
                                            value={this.state.alternateAddress1 || ""}
                                            onChange={this._handleInputChange} />
                                    </InputRow>
                                    <InputRow>
                                        <FormTextField
                                            width={InputWidths.MD}
                                            data-id="alternateAddress2"
                                            value={this.state.alternateAddress2 || ""}
                                            onChange={this._handleInputChange} />
                                    </InputRow>
                                    <InputRow>
                                        <FormDropDownList
                                            label="Alternate Address Location"
                                            width={InputWidths.MD}
                                            data-id="alternateAddressType"
                                            selectedOption={this.state.alternateAddressType || addressOptions[1]}
                                            onValueChange={this._handleSelectChange("alternateAddressType")}
                                            options={addressOptions} />
                                    </InputRow>
                                </Layout.Column>
                            </Layout.Row>
                        </InputRow>
                    </PageSection>

                    <PageSection title="Miscellaneous">
                        <InputRow>
                            <FormRadioGroup
                                label="User Group"
                                groupName="user-group"
                                selected={this.state.userGroup}
                                onValueChange={this._handleSelectChange("userGroup")}
                                items={[
                                    { id: 1, name: "Group 1" },
                                    { id: 2, name: "Group 2" },
                                    { id: 3, name: "Group 3" }
                                ]} />
                        </InputRow>
                    </PageSection>
                </PageSection>
                <ButtonBar
                    onCancel={this._handleCancel}
                    onSave={this._handleSave}
                    cancelText="Discard Changes"
                    saveText="Save"
                    enableSavingAnimation={this.state.saving}
                    visible={this._showButtonBar(this.state)} />
            </div>
        );
    }
}
