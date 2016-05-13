var React = require("react"),
    FormCheckbox = require("../../components/forms/FormCheckbox.jsx"),
    FormTextField = require("../../components/forms//form-text-field").v2,
    FormRadioGroup = require("../../components/forms/FormRadioGroup.jsx"),
    FormSelectField = require("../../components/forms/FormSelectField.jsx"),
    Layout = require("../../components/general/ColumnLayout.jsx"),
    RockerButton = require("../../components/forms/RockerButton.jsx"),
    Toggle = require("../../components/forms/Toggle.jsx");

/**
 * @class EditViewSwitched
 * @desc This is a template to demonstrate how to build a switched/button-tabbed edit/form page. Use
 *     it as a starting poing for an edit page of this type.
 *
 * @param {function} onInputChange - A callback executed when an input value changes
 * @param {function} onSave - A callback executed when the save button is clicked
 * @param {function} onRockerButtonChange - A callback to be executed when the rocker-button is
 *     clicked.
 */
module.exports = React.createClass({

    _handleCancel: function () {
        // do something on cancel
    },

    _handleSave: function () {
        this.props.onSave();
    },

    _handleInputChange: function (e) {
        var value = e.target.type === "checkbox" ? !!e.target.checked : e.target.value,
            dataId = e.target.getAttribute("data-id").slice(0,-6);

        this.props.onInputChange(dataId, value);
    },

    _handleRadioInputChange: function (name, value) {
        this.props.onInputChange(name, value);
    },

    render: function () {
        return (
            <div>
                <a className="page-return-link">To record list</a>

                <h1 className="page-title">Edit Template with Switcher</h1>

                <div className="page-controls-secondary">
                    <input type="button" className="button inline" value="Inline Button" />
                    <Toggle />
                </div>
                <RockerButton
                    labels={["Identity", "Address", "Miscellaneous"]}
                    onChange={this.props.onRockerButtonChange}
                    selectedIndex={this.props.activeRockerButton}
                    controlled={true} />

                {this.props.activeRockerButton === 0 && (
                    <div>
                        <div className="input-row">
                            <FormTextField
                                labelText="First Name"
                                className="input-width-small"
                                data-id="firstName"
                                value={this.props.inputs.firstName}
                                onChange={this._handleInputChange} />
                            <FormTextField
                                labelText="Last Name"
                                className="input-width-medium"
                                data-id="lastName"
                                value={this.props.inputs.lastName}
                                onChange={this._handleInputChange} />
                        </div>
                        <div className="input-row">
                            <FormTextField
                                labelText="Username"
                                className="input-width-medium"
                                data-id="username"
                                value={this.props.inputs.username}
                                onChange={this._handleInputChange} />
                        </div>
                    </div>
                )}

                {this.props.activeRockerButton === 1 && (
                    <Layout.Row>
                        <Layout.Column>
                            <div className="input-row">
                                <FormTextField
                                    labelText="Address"
                                    className="input-width-medium"
                                    data-id="address1"
                                    value={this.props.inputs.address1}
                                    onChange={this._handleInputChange} />
                            </div>
                            <div className="input-row">
                                <FormTextField
                                    className="input-width-medium"
                                    onChange={this._handleInputChange}
                                    data-id="address2"
                                    value={this.props.inputs.address2}
                                    onChange={this._handleInputChange} />
                            </div>
                            <div className="input-row">
                                <FormSelectField
                                    label="Address
                                    Location"
                                    className="input-width-medium"
                                    id="addressType"
                                    value={this.props.inputs.addressType}
                                    onChange={this._handleInputChange}
                                    options={[
                                        { value: "home", label: "Home" },
                                        { value: "work", label: "Work" },
                                        { value: "other", label: "Other" }
                                    ]} />
                            </div>
                        </Layout.Column>
                        <Layout.Column>
                            <div className="input-row">
                                <FormTextField
                                    labelText="Alternate Address"
                                    className="input-width-medium"
                                    data-id="alternateAddress1"
                                    value={this.props.inputs.alternateAddress1}
                                    onChange={this._handleInputChange} />
                            </div>
                            <div className="input-row">
                                <FormTextField
                                    className="input-width-medium"
                                    data-id="alternateAddress2"
                                    value={this.props.inputs.alternateAddress2}
                                    onChange={this._handleInputChange} />
                            </div>
                            <div className="input-row">
                                <FormSelectField
                                    label="Alternate Address Location"
                                    className="input-width-medium"
                                    id="alternateAddressType"
                                    value={this.props.inputs.alternateAddressType}
                                    onChange={this._handleInputChange}
                                    options={[
                                        { value: "home", label: "Home" },
                                        { value: "work", label: "Work" },
                                        { value: "other", label: "Other" }
                                    ]} />
                            </div>
                        </Layout.Column>
                        <Layout.Column>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                            Nulla consequat massa quis enim.
                        </Layout.Column>
                    </Layout.Row>
                )}

                {this.props.activeRockerButton === 2 && (
                    <div>
                        <div className="input-row">
                            <label className="stand-alone">
                                User Group
                            </label>
                            <FormRadioGroup
                                label="User Group"
                                groupName="user-group"
                                groupName="userGroup"
                                selected={this.props.inputs.userGroup}
                                onChange={this._handleRadioInputChange.bind(this, "userGroup")}
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
                                id="userActive"
                                checked={this.props.inputs.userActive}
                                onChange={this._handleInputChange} />
                        </div>
                    </div>
                )}

                <div className="page-controls-primary">
                    <input
                        type="button"
                        className="cancel"
                        value="Cancel"
                        onClick={this._handleCancel} />
                    <input
                        type="button"
                        className="primary"
                        value="Save"
                        onClick={this._handleSave} />
                </div>
            </div>
        );
    }
});
