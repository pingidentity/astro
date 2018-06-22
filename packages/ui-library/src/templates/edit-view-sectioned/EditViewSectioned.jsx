var React = require("react"),
    FormCheckbox = require("../../components/forms/FormCheckbox"),
    FormTextField = require("../../components/forms//form-text-field").v2,
    FormRadioGroup = require("../../components/forms/FormRadioGroup"),
    FormDropDownList = require("../../components/forms/FormDropDownList"),
    PageHeader = require("../../components/general/PageHeader"),
    Layout = require("../../components/general/ColumnLayout"),
    Toggle = require("../../components/forms/form-toggle").v2,
    ButtonBar = require("../../components/forms/ButtonBar");

/**
 * @callback EditViewSectioned~onSave
 */

/**
 * @callback EditViewSectioned~onInputChange
 * @param {string} data-id
 *          Identifier for input
 * @param {string} value
 *          New value of input
 */

/**
 * @class EditViewSectioned
 * @desc This is a template to demonstrate how to build a sectioned edit/form page.  Use it as a
 *     starting poing for a sectioned edit page.
 *
 * @param {boolean} saving
 *    If true, a saving animation will be added to the save button.
 * @param {boolean} showButtonBar
 *    If true, will show the button bar at the bottom of the page.
 * @param {EditViewSectioned~onInputChange} onInputChange
 *          Callback to be triggered when an input value changes
 * @param {EditViewSectioned~onSave} onSave
 *          Callback to be triggered when the save button is clicked
 */
module.exports = class extends React.Component {
    _handleCancel = () => {
        // do something on cancel
    };

    _handleSave = () => {
        this.props.onSave();
    };

    _handleInputChange = (e) => {
        var value = e.target.type === "checkbox" ? !!e.target.checked : e.target.value,
            dataId = e.target.type === "text" ? e.target.getAttribute("data-id").slice(0,-6)
                : e.target.getAttribute("data-id");

        this.props.onInputChange(dataId, value);
    };

    _handleSelectChange = (dataId, value) => {
        this.props.onInputChange(dataId, value);
    };

    _handleRadioInputChange = (name, value) => {
        this.props.onInputChange(name, value);
    };

    componentDidMount() {
        ["addressType", "alternateAddressType"].map(function (id) {
            this["_handleSelectChange_" + id] = this._handleSelectChange.bind(null, id);
        }.bind(this));

        this._handleRadioInputChangeUserGroup = this._handleRadioInputChange.bind(this, "userGroup");
    }

    render() {
        var addressOptions = [
            { value: "home", label: "Home" },
            { value: "work", label: "Work" },
            { value: "other", label: "Other" }
        ];

        return (
            <div>
                <a className="page-return-link">To record list</a>

                <PageHeader title="Edit Template with Sections"
                        underlined={true}
                        accessories={[
                            <button type="button" className="inline">Inline Button</button>,
                            <Toggle stateless={false} />
                        ]} />

                <div className="page-section">
                    <div className="page-section-title">
                        Identity
                    </div>
                    <div className="page-section-content">
                        <div className="input-row">
                            <FormTextField
                                labelText="First Name"
                                className="input-width-small"
                                data-id="firstName"
                                value={this.props.inputs.firstName || ""}
                                onChange={this._handleInputChange} />
                            <FormTextField
                                labelText="Last Name"
                                className="input-width-medium"
                                data-id="lastName"
                                value={this.props.inputs.lastName || ""}
                                onChange={this._handleInputChange} />
                        </div>
                        <div className="input-row">
                            <FormTextField
                                labelText="Username"
                                className="input-width-medium"
                                data-id="username"
                                value={this.props.inputs.username || ""}
                                onChange={this._handleInputChange} />
                        </div>
                    </div>

                    <div className="page-section-title">
                        Address
                    </div>
                    <div className="page-section-content">
                        <div className="input-row">
                            <Layout.Row>
                                <Layout.Column>
                                    <div className="input-row">
                                        <FormTextField
                                            labelText="Address"
                                            className="input-width-medium"
                                            data-id="address1"
                                            value={this.props.inputs.address1 || ""}
                                            onChange={this._handleInputChange} />
                                    </div>
                                    <div className="input-row">
                                        <FormTextField
                                            className="input-width-medium"
                                            data-id="address2"
                                            value={this.props.inputs.address2 || ""}
                                            onChange={this._handleInputChange} />
                                    </div>
                                    <div className="input-row">
                                        <FormDropDownList
                                            label="Address Location"
                                            className="input-width-medium"
                                            data-id="addressType"
                                            searchType="box"
                                            selectedOption={this.props.inputs.addressType || addressOptions[0]}
                                            onValueChange={this._handleSelectChange_addressType}
                                            options={addressOptions} />
                                    </div>
                                </Layout.Column>
                                <Layout.Column>
                                    <div className="input-row">
                                        <FormTextField
                                            labelText="Alternate Address"
                                            className="input-width-medium"
                                            data-id="alternateAddress1"
                                            value={this.props.inputs.alternateAddress1 || ""}
                                            onChange={this._handleInputChange} />
                                    </div>
                                    <div className="input-row">
                                        <FormTextField
                                            className="input-width-medium"
                                            data-id="alternateAddress2"
                                            value={this.props.inputs.alternateAddress2 || ""}
                                            onChange={this._handleInputChange} />
                                    </div>
                                    <div className="input-row">
                                        <FormDropDownList
                                            label="Alternate Address Location"
                                            className="input-width-medium"
                                            data-id="alternateAddressType"
                                            selectedOption={this.props.inputs.alternateAddressType || addressOptions[1]}
                                            onValueChange={this._handleSelectChange_alternateAddressType}
                                            options={addressOptions} />
                                    </div>
                                </Layout.Column>
                                <Layout.Column>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                                    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                                    penatibus et magnis dis parturient montes, nascetur ridiculus
                                    mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                                    quis, sem. Nulla consequat massa quis enim.
                                </Layout.Column>
                            </Layout.Row>
                        </div>
                    </div>

                    <div className="page-section-title">
                        Miscellaneous
                    </div>
                    <div className="page-section-content">
                        <div className="input-row">
                            <label>
                                User Group
                            </label>
                            <FormRadioGroup
                                label="User Group"
                                groupName="user-group"
                                selected={this.props.inputs.userGroup}
                                onValueChange={this._handleRadioInputChangeUserGroup}
                                items={[
                                    { id: 1, name: "Group 1" },
                                    { id: 2, name: "Group 2" },
                                    { id: 3, name: "Group 3" }
                                ]} />
                        </div>
                        <div className="input-row">
                            <FormCheckbox
                                label="Activate User"
                                className="input-width-medium"
                                data-id="userActive"
                                checked={this.props.inputs.userActive}
                                onChange={this._handleInputChange} />
                        </div>
                    </div>
                </div>
                <ButtonBar
                        onCancel={this._handleCancel}
                        onSave={this._handleSave}
                        cancelText="Cancel"
                        saveText="Save"
                        enableSavingAnimation={this.props.saving}
                        visible={this.props.showButtonBar} />
            </div>
        );
    }
};
