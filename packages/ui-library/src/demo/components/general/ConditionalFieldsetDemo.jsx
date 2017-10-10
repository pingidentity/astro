var React = require("react"),
    ConditionalFieldset = require("./../../../components/general/ConditionalFieldset"),
    FormRadioGroup = require("./../../../components/forms/FormRadioGroup"),
    FormTextField = require("./../../../components/forms/FormTextField"),
    Link = require("./../../../components/general/Link"),
    ValidationMessages = require("./../../../components/forms/ValidationMessages"),
    _ = require("underscore");


var fieldSetOptions = [
    { id: 0, name: ConditionalFieldset.Types.RADIO },
    { id: 1, name: ConditionalFieldset.Types.SELECT }
];

/**
 * @name ConditionalFieldsetDemo
 * @memberof ConditionalFieldset
 * @desc A demo for ConditionalFieldset
 */
var ConditionalFieldsetDemo = React.createClass({

    _onCondition1ValueChange: function (index) {
        this.setState({
            selectedCondition1Index: Number(index)
        });
    },

    _onCondition2ValueChange: function (index) {
        this.setState({
            selectedCondition2Index: Number(index)
        });
    },

    _onCondition3ValueChange: function (index) {
        this.setState({
            selectedCondition3Index: Number(index)
        });
    },

    _onTypeValueChange: function (index) {
        var type = _.findWhere(fieldSetOptions, { id: Number(index) });
        this.setState({
            selectedTypeIndex: type.id,
            selectedTypeName: type.name
        });
    },

    getInitialState: function () {
        return {
            selectedCondition1Index: 1,
            selectedCondition2Index: 0,
            selectedCondition3Index: 1,
            selectedTypeIndex: 0,
            selectedTypeName: ConditionalFieldset.Types.RADIO
        };
    },

    render: function () {
        return (

            <div style = { { marginLeft: "20px" } }>

                <div className="input-row">
                    <label className="detached">
                        Radio or Dropdown
                    </label>
                    <FormRadioGroup
                        groupName="dropdown-radio"
                        data-id="type-picker"
                        stacked={true}
                        selected={this.state.selectedTypeIndex}
                        onValueChange={this._onTypeValueChange}
                        items={fieldSetOptions}
                    />
                </div>

                <div className="input-row">
                    <label className="detached">
                        ConditionalFieldset with empty support, set through props
                    </label>
                    <ConditionalFieldset data-id="fieldset-1"
                                         onValueChange={this._onCondition1ValueChange}
                                         selectedIndex={this.state.selectedCondition1Index}
                                         supportEmpty={true}
                                         emptyMessage={"Do Nothing"}
                                         stateless={true}
                                         type={this.state.selectedTypeName} >
                        <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                        <div title="Option 2">Option 2</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <label className="detached">
                        ConditionalFieldset without empty support - default behaviour, no type
                    </label>
                    <ConditionalFieldset data-id="fieldset-2"
                                         onValueChange={this._onCondition2ValueChange}
                                         selectedIndex={this.state.selectedCondition2Index}
                                         stateless={true}
                                         type={this.state.selectedTypeName} >
                        <div title="Invite By Email">
                            <span>Option with some <strong>MARKUP</strong></span>
                        </div>
                        <div title="Create Password">
                            <p>This is a one-time password that must be reset after the
                               user's first sign on.</p>
                            <div className="input-row">
                                <FormTextField
                                    labelText="Password"
                                    className="input-width-medium"
                                    data-id="username"
                                    required={true}
                                    maskValue={true}
                                    showReveal={true} />
                            </div>
                            <Link title="Generate password" className="inline" url="#" />
                            <ValidationMessages className="show"
                                        messages={[
                                            { text: "At least 6 characters", status: ValidationMessages.Status.FAIL },
                                            { text: "1 number", status: ValidationMessages.Status.PASS },
                                            { text: "1 UPPERCASE letter", status: ValidationMessages.Status.PASS }
                                        ]} />
                        </div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <label className="detached">
                        ConditionalFieldset with empty support, set through dom
                    </label>
                    <ConditionalFieldset data-id="fieldset-3"
                                         onValueChange={this._onCondition3ValueChange}
                                         selectedIndex={this.state.selectedCondition3Index}
                                         stateless={true}
                                         type={this.state.selectedTypeName} >
                        <div title="Do nothing"></div>
                        <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                        <div title="Option 2">Option 2</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <label className="detached">
                        ConditionalFieldset with empty support, set through dom, stateful
                    </label>
                    <ConditionalFieldset data-id="fieldset-4"
                                         type={this.state.selectedTypeName} >
                        <div title="Do nothing"></div>
                        <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                        <div title="Option 2">Option 2</div>
                    </ConditionalFieldset>
                </div>
                
                <div className="input-row">
                    <label className="detached">
                        ConditionalFieldset, disabled, with empty support, set through dom, stateful
                    </label>
                    <ConditionalFieldset data-id="fieldset-4"
                                         type={this.state.selectedTypeName}
                                         disabled={true}>
                        <div title="Do nothing"></div>
                        <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                        <div title="Option 2">Option 2</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <label className="detached">
                        ConditionalFieldset without empty support, default settings, stateful
                    </label>
                    <ConditionalFieldset data-id="fieldset-5">
                        <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                        <div title="Option 2">Option 2</div>
                    </ConditionalFieldset>
                </div>

            </div>

        );
    }
});

module.exports = ConditionalFieldsetDemo;
