import React from "react";
import FormDropDownList from "../../../components/forms/FormDropDownList";
import InputWidths from "../../../components/forms/InputWidths";


const NUM_DEMOS = 12,
    OPTIONS = [
        { label: "One", value: "1", helpHintText: "Help text may be added to any drop-down option." },
        { label: "Two", value: "2", group: 4 },
        { label: "Three", value: "3", group: 1 },
        { label: "Four", value: "4", group: 2 },
        { label: "Five", value: "5", group: 3 },
        { label: "Six", value: "6", group: 2 },
        { label: "Seven", value: "7", group: 1 },
        { label: "Eight", value: "8", group: 3 },
        { label: "Nine", value: "9" },
        { label: "Ten", value: "10", group: 4 }
    ],
    GROUPS = [
        { label: "Section C", id: 3 },
        { label: "Section B", id: 2 },
        { label: "Section A", id: 1 },
        { label: "Disabled", id: 4, disabled: true }
    ],
    NONEOPTION = { label: "--" };

/**
* @name FormDropDownListDemo
* @memberof FormDropDownList
* @desc A demo for FormDropDownList
*/
class FormDropDownListDemo extends React.Component {
    static flags = [ "use-portal" ];

    constructor(props) {
        super(props);
        let initState = {
            addOptions7: OPTIONS,
            addOptions9: OPTIONS
        };

        for (let i=1; i<=NUM_DEMOS - 1; i+=1) {
            initState["selectedValue" + i] = i === 11 ? { iconName: "globe", label: "One", value: "1" } : OPTIONS[0];
        }
        initState["selectedValue" + NUM_DEMOS] = NONEOPTION;

        this.state = initState;
    }

    _handleValueChange = (index, option) => {
        let newState = {};

        newState["selectedValue" + index] = option;

        this.setState(newState);
    };

    _handleAdd7 = (optionLabel) => {
        // Mock new option
        const newOption = { label: optionLabel, value: optionLabel };
        const newOptions = this.state.addOptions7.concat([newOption]);

        // Update options & select the newly added option
        this.setState({
            addOptions7: newOptions,
            selectedValue7: newOption
        });
    };

    _handleAdd9 = (optionLabel) => {
        // Mock new option with group always being "Section A"
        const newOption = { label: optionLabel, value: optionLabel, group: 1 };
        const newOptions = this.state.addOptions9.concat([newOption]);

        // Update options & select the newly added option
        this.setState({
            addOptions9: newOptions,
            selectedValue9: newOption
        });
    };

    componentDidMount() {
        for (var i=1; i<=NUM_DEMOS; i+=1) {
            this["_handleValueChange" + i] = this._handleValueChange.bind(null, i);
        }
    }

    render() {
        class CustomType extends React.Component {
            render() {
                return <div>{this.props.value}</div>;
            }
        }

        var customType = <CustomType />;

        const { flags } = this.props;

        return (
            <div>
                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        options={[
                            { label: "One", value: "1" },
                            { label: "Option two with a very, very, very, very long label", value: "2" },
                            { label: "Three", value: "3" },
                        ]}
                        autofocus={true}
                        label="Autofocus with auto-width"
                        selectedOption={this.state.selectedValue1}
                        onValueChange={this._handleValueChange1}
                    />
                </div>
                <div>Selected value: {this.state.selectedValue1.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        options={[
                            { iconName: "globe", label: "One", value: "1" },
                            { iconName: "cog", label: "Option two", value: "2" },
                            { label: "with no icon", value: "3" },
                        ]}
                        autofocus={true}
                        label="input row with icons"
                        selectedOption={this.state.selectedValue11}
                        onValueChange={this._handleValueChange11}
                    />
                </div>
                <div>Selected value: {this.state.selectedValue11.value}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        options={OPTIONS}
                        contentType={customType}
                        label="Custom content type and search field"
                        searchField="value"
                        selectedOption={this.state.selectedValue2}
                        onValueChange={this._handleValueChange2}
                        width={InputWidths.MD}
                        name="custom-content-type"
                    />
                </div>
                <div>Selected value: {this.state.selectedValue2.value}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        options={OPTIONS}
                        label="With a help hint"
                        labelHelpText="Some help tip"
                        selectedOption={this.state.selectedValue3}
                        onValueChange={this._handleValueChange3}
                        width={InputWidths.SM}
                    />
                </div>
                <div>Selected value: {this.state.selectedValue3.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        options={OPTIONS}
                        label="With error"
                        errorMessage="The error message appears when hovering over the input or the error icon."
                        selectedOption={this.state.selectedValue4}
                        onValueChange={this._handleValueChange4}
                        width={InputWidths.SM}
                    />
                </div>
                <div>Selected value: {this.state.selectedValue4.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        options={OPTIONS}
                        label="Disabled"
                        disabled={true}
                        selectedOption={this.state.selectedValue5}
                        onValueChange={this._handleValueChange5}
                        width={InputWidths.SM}
                    />
                </div>
                <div>Selected value: {this.state.selectedValue5.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        options={OPTIONS}
                        groups={GROUPS}
                        label="With groups"
                        selectedOption={this.state.selectedValue6}
                        onValueChange={this._handleValueChange6}
                        width={InputWidths.SM}
                    />
                </div>
                <div>Selected value: {this.state.selectedValue6.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        options={this.state.addOptions7}
                        label="With add and none option"
                        canAdd={true}
                        noneOption={{ label: "None" }}
                        onAdd={this._handleAdd7}
                        labelAdd="ADD"
                        labelPrompt="Type to search or add"
                        selectedOption={this.state.selectedValue7}
                        onValueChange={this._handleValueChange7}
                        width={InputWidths.SM}
                    />
                </div>
                <div>Selected value: {this.state.selectedValue7.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        options={OPTIONS}
                        label="With search box filtering"
                        labelPrompt="Type to search"
                        searchType={FormDropDownList.SearchTypes.BOX}
                        selectedOption={this.state.selectedValue8}
                        onValueChange={this._handleValueChange8}
                        width={InputWidths.SM}
                    />
                </div>
                <div>Selected value: {this.state.selectedValue8.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        groups={GROUPS}
                        options={this.state.addOptions9}
                        label="With groups & add"
                        canAdd={true}
                        onAdd={this._handleAdd9}
                        labelAdd="ADD"
                        labelPrompt="Type to search or add"
                        selectedOption={this.state.selectedValue9}
                        onValueChange={this._handleValueChange9}
                        width={InputWidths.MD}
                    />
                </div>
                <div>Selected value: {this.state.selectedValue9.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        flags={flags}
                        options={OPTIONS}
                        label="Required with none option"
                        required
                        selectedOption={this.state["selectedValue" + NUM_DEMOS]}
                        noneOption={NONEOPTION}
                        onValueChange={this["_handleValueChange" + NUM_DEMOS]}
                        width={InputWidths.SM}
                    />
                </div>
                <div>Selected value: {this.state["selectedValue" + NUM_DEMOS] &&
                    this.state["selectedValue" + NUM_DEMOS].label}
                </div>
            </div>
        );
    }
}

module.exports = FormDropDownListDemo;
