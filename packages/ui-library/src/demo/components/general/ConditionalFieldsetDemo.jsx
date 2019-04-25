import React from "react";
import ConditionalFieldset from "./../../../components/general/ConditionalFieldset";
import FormRadioGroup from "./../../../components/forms/FormRadioGroup";
import _ from "underscore";
import InputWidths from "../../../components/forms/InputWidths";
import InputRow from "../../../components/layout/InputRow";
import HR from "ui-library/lib/components/general/HR";

const typeOptions = [
    { id: 0, name: ConditionalFieldset.Types.SELECT },
    { id: 1, name: ConditionalFieldset.Types.RADIO },
];

/**
 * @name ConditionalFieldsetDemo
 * @memberof ConditionalFieldset
 * @desc A demo for ConditionalFieldset
 */
class ConditionalFieldsetDemo extends React.Component {
    static flags = [ "use-portal", "p-stateful" ];

    state= {
        selectedIndex: 0,
        type: ConditionalFieldset.Types.SELECT,
        typeId: 0,
    }

    _onValueChange = (index) => {
        this.setState({
            selectedIndex: Number(index)
        });
    };

    _onTypeChange = (id) => {
        const typeName = _.findWhere(typeOptions, { id: Number(id) }).name.toUpperCase();
        this.setState({
            type: ConditionalFieldset.Types[typeName],
            typeId: id,
        });
    }

    _usePstateful = () => this.props.flags.includes("p-stateful");

    render() {
        return (
            <div>
                <div style = {{ marginLeft: "20px" }}>
                    <FormRadioGroup
                        groupName="type-selector"
                        items={typeOptions}
                        label="Select conditional fieldset input type"
                        onValueChange={this._onTypeChange}
                        selected={this.state.typeId}
                    />

                    <HR />

                    <InputRow>
                        <ConditionalFieldset
                            data-id="demo-1"
                            emptyMessage={"Do nothing"}
                            label="Stateless version"
                            onValueChange={this._onValueChange}
                            selectedIndex={this._usePstateful() ? undefined : this.state.selectedIndex}
                            stateless
                            type={this.state.type}>
                            <div title="Option 1">Option 1 content</div>
                            <div title="Option 2">Option 2 content</div>
                        </ConditionalFieldset>
                    </InputRow>

                    <InputRow>
                        <ConditionalFieldset
                            data-id="demo-2"
                            label="Stateful version"
                            type={this.state.type}>
                            <div title="Option 1">Option 1 content</div>
                            <div title="Option 2">Option 2 content</div>
                        </ConditionalFieldset>
                    </InputRow>

                    <InputRow>
                        <ConditionalFieldset
                            data-id="demo-4"
                            emptyMessage="Do nothing"
                            label="Empty option - declared with prop"
                            supportEmpty
                            type={this.state.type}>
                            <div title="Option 1">Option 1 content</div>
                            <div title="Option 2">Option 2 content</div>
                        </ConditionalFieldset>
                    </InputRow>

                    <InputRow>
                        <ConditionalFieldset
                            data-id="demo-3"
                            label="Empty option - declared with empty child div"
                            type={this.state.type}>
                            <div title="Do nothing" />
                            <div title="Option 1">Option 1 content</div>
                            <div title="Option 2">Option 2 content</div>
                        </ConditionalFieldset>
                    </InputRow>

                    <InputRow>
                        <ConditionalFieldset
                            data-id="demo-5"
                            label="Input width specified (medium)"
                            type={this.state.type}
                            inputWidth={InputWidths.MD}>
                            <div title="Option 1">Option 1 content</div>
                            <div title="Option 2">Option 2 content</div>
                        </ConditionalFieldset>
                    </InputRow>

                    <InputRow>
                        <ConditionalFieldset
                            data-id="demo-6"
                            label="Disabled"
                            type={this.state.type}
                            disabled>
                            <div title="Option 1">Option 1 content</div>
                            <div title="Option 2">Option 2 content</div>
                        </ConditionalFieldset>
                    </InputRow>

                    <InputRow>
                        <ConditionalFieldset
                            data-id="demo-7"
                            emptyMessage="select option"
                            label="Required - only applicable for the drop-down/select"
                            required
                            supportEmpty
                            type={ConditionalFieldset.Types.SELECT}>
                            <div title="Option 1">Option 1 content</div>
                            <div title="Option 2">Option 2 content</div>
                        </ConditionalFieldset>
                    </InputRow>
                </div>
            </div>
        );
    }
}

module.exports = ConditionalFieldsetDemo;
