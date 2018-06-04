var React = require("react"),
    ConditionalFieldset = require("./../../../components/general/ConditionalFieldset"),
    FormRadioGroup = require("./../../../components/forms/FormRadioGroup"),
    FormTextField = require("./../../../components/forms/form-text-field"),
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
class ConditionalFieldsetDemo extends React.Component {
    state = {
        selectedCondition1Index: 1,
        selectedCondition2Index: 0,
        selectedCondition3Index: 1,
        selectedTypeIndex: 0,
        selectedTypeName: ConditionalFieldset.Types.RADIO
    };

    _onCondition1ValueChange = (index) => {
        this.setState({
            selectedCondition1Index: Number(index)
        });
    };

    _onCondition2ValueChange = (index) => {
        this.setState({
            selectedCondition2Index: Number(index)
        });
    };

    _onCondition3ValueChange = (index) => {
        this.setState({
            selectedCondition3Index: Number(index)
        });
    };

    _onTypeValueChange = (index) => {
        var type = _.findWhere(fieldSetOptions, { id: Number(index) });
        this.setState({
            selectedTypeIndex: type.id,
            selectedTypeName: type.name
        });
    };

    render() {
        return (

            <div style = { { marginLeft: "20px" } }>

                <div className="input-row">
                    <label className="detached">
                        RADIO OR DROPDOWN
                    </label>
                    <FormRadioGroup
                        label="Radio or Dropdown"
                        groupName="dropdown-radio"
                        data-id="type-picker"
                        stacked={true}
                        selected={this.state.selectedTypeIndex}
                        onValueChange={this._onTypeValueChange}
                        items={fieldSetOptions}
                    />
                </div>

                <div className="input-row">
                    <ConditionalFieldset data-id="fieldset-1"
                                         label="ConditionalFieldset with empty support, set through props;
                                         input width set to medium"
                                         name="fieldset-demo"
                                         onValueChange={this._onCondition1ValueChange}
                                         selectedIndex={this.state.selectedCondition1Index}
                                         supportEmpty={true}
                                         emptyMessage={"Do Nothing"}
                                         listClassName="input-width-medium"
                                         stateless={true}
                                         type={this.state.selectedTypeName} >
                        <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                        <div title="Option 2">Option 2</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <ConditionalFieldset data-id="fieldset-2"
                                         label="ConditionalFieldset without empty support - default behaviour, no type;
                                         input width set to large"
                                         onValueChange={this._onCondition2ValueChange}
                                         selectedIndex={this.state.selectedCondition2Index}
                                         stateless={true}
                                         listClassName="input-width-large"
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
                    <ConditionalFieldset data-id="fieldset-3"
                                         label="ConditionalFieldset with empty support, set through dom;
                                         input width set to small"
                                         onValueChange={this._onCondition3ValueChange}
                                         selectedIndex={this.state.selectedCondition3Index}
                                         stateless={true}
                                         listClassName="input-width-small"
                                         type={this.state.selectedTypeName} >
                        <div title="Do nothing"></div>
                        <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                        <div title="Option 2">Option 2</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <ConditionalFieldset data-id="fieldset-4"
                                         label="ConditionalFieldset with empty support, set through dom, stateful"
                                         type={this.state.selectedTypeName} >
                        <div title="Do nothing"></div>
                        <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                        <div title="Option 2">Option 2</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <ConditionalFieldset data-id="fieldset-5"
                                         label="ConditionalFieldset, disabled, with empty support,
                                         set through dom, stateful"
                                         type={this.state.selectedTypeName}
                                         disabled={true}>
                        <div title="Do nothing"></div>
                        <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                        <div title="Option 2">Option 2</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <ConditionalFieldset data-id="fieldset-6"
                                         label="ConditionalFieldset without empty support,
                                         default settings, stateful"
                                         >
                        <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
                        <div title="Option 2">Option 2</div>
                    </ConditionalFieldset>
                </div>

            </div>

        );
    }
}

module.exports = ConditionalFieldsetDemo;
