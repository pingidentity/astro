var React = require("react"),
    FormCheckbox = require("../../components/forms/FormCheckbox.jsx"),
    FormTextField = require("../../components/forms//form-text-field").v2,
    FormRadioGroup = require("../../components/forms/FormRadioGroup.jsx"),
    FormSelectField = require("../../components/forms/form-select-field").v2,
    Layout = require("../../components/general/ColumnLayout.jsx"),
    Section = require("../../components/general/Section.jsx"),
    Toggle = require("../../components/forms/form-toggle").v2,
    ButtonBar = require("../../components/forms/ButtonBar.jsx");

/**
 * @callback EditViewCollapsible~onInputChange
 * @param {string} name
 *     Name of section
 * @param {string} value
 *      Value of section
 */

/**
 * @callback EditViewCollapsible~onSave
 */

/**
 * @callback EditViewCollapsible~onSectionToggle
 * @param {number} index
 *     Index of section to expand or collapse
 * @param {boolean} expand
 *      Whether to expand or collapse section
 */

/**
 * @class EditViewCollapsible
 * @desc This is a template to demonstrate how to build a form page with collapsible sections. Use
 *     it as a starting poing for an edit page of this type.
 *
 * @param {boolean} saving
 *    If true, a saving animation will be added to the save button.
 * @param {boolean} showButtonBar
 *    If true, will show the button bar at the bottom of the page.
 * @param {EditViewCollapsible~onInputChange} onInputChange
 *          Callback to be triggered when an input value changes
 * @param {EditViewCollapsible~onSave} onSave
 *          Callback to be triggered when the save button is clicked
 * @param {EditViewCollapsible~onSectionToggle} onSectionToggle
 *          Callback to be triggered when a collapsible section is clicked/toggled.
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
            dataId = e.target.type === "text" ? e.target.getAttribute("data-id").slice(0,-6)
                : e.target.getAttribute("data-id");

        this.props.onInputChange(dataId, value);
    },

    _handleRadioInputChange: function (name, value) {
        this.props.onInputChange(name, value);
    },

    _toggleSection: function (index, expanded) {
        this.props.onSectionToggle(index, !expanded);
    },

    componentDidMount: function () {
        this._toggleSection1 = this._toggleSection.bind(null, 1);
        this._toggleSection2 = this._toggleSection.bind(null, 2);
        this._toggleSection3 = this._toggleSection.bind(null, 3);
    },

    render: function () {
        return (
            <div>
                <a className="page-return-link">To record list</a>

                <div className="page-controls-secondary">
                    <button type="button" className="inline">Inline Button</button>
                    <Toggle />
                </div>

                <div className="page-title">Edit Template</div>

                <div className="page-section-content">
                    <Section
                        controlled={true}
                        onToggle={this._toggleSection1}
                        expanded={this.props.expandedSections.indexOf(1) > -1}
                        title="Identity"
                        data-id="identity-section">

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
                    </Section>
                    <Section
                        controlled={true}
                        onToggle={this._toggleSection2}
                        expanded={this.props.expandedSections.indexOf(2) > -1}
                        title="Address"
                        data-id="address-section">

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
                                        data-id="address2"
                                        value={this.props.inputs.address2}
                                        onChange={this._handleInputChange} />
                                </div>
                                <div className="input-row">
                                    <FormSelectField
                                        label="Address
                                        Location"
                                        className="input-width-medium"
                                        data-id="addressType"
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
                                        data-id="alternateAddressType"
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
                                Donec quam felis, ultricies nec, pellentesque eu, pretium
                                quis, sem. Nulla consequat massa quis enim.
                            </Layout.Column>
                        </Layout.Row>
                    </Section>
                    <Section
                        controlled={true}
                        onToggle={this._toggleSection3}
                        expanded={this.props.expandedSections.indexOf(3) > -1}
                        title="Miscellaneous"
                        data-id="miscellaneous-section">

                        <div className="input-row">
                            <label>
                                User Group
                            </label>
                            <FormRadioGroup
                                label="User Group"
                                groupName="user-group"
                                selected={this.props.inputs.userGroup}
                                onValueChange={this._handleRadioInputChange.bind(this, "userGroup")}
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
                                onValueChange={this._handleInputChange} />
                        </div>
                    </Section>
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
});
