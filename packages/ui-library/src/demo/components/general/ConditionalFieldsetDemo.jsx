import React from "react";
import ConditionalFieldset from "./../../../components/general/ConditionalFieldset";
import FormRadioGroup from "./../../../components/forms/FormRadioGroup";
import _ from "underscore";

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

    render() {
        return (
            <div style = {{ marginLeft: "20px" }}>
                <FormRadioGroup
                    groupName="type-selector"
                    items={typeOptions}
                    label="Select conditional fieldset input type"
                    onValueChange={this._onTypeChange}
                    selected={this.state.typeId}
                />

                <hr className="hr"/>

                <div className="input-row">
                    <ConditionalFieldset
                        data-id="demo-1"
                        emptyMessage={"Do nothing"}
                        label="Stateless version"
                        onValueChange={this._onValueChange}
                        selectedIndex={this.state.selectedIndex}
                        stateless
                        type={this.state.type}>
                        <div title="Option 1">Option 1 content</div>
                        <div title="Option 2">Option 2 content</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <ConditionalFieldset
                        data-id="demo-2"
                        label="Stateful version"
                        type={this.state.type}>
                        <div title="Option 1">Option 1 content</div>
                        <div title="Option 2">Option 2 content</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <ConditionalFieldset
                        data-id="demo-4"
                        emptyMessage="Do nothing"
                        label="Empty option - declared with prop"
                        supportEmpty
                        type={this.state.type}>
                        <div title="Option 1">Option 1 content</div>
                        <div title="Option 2">Option 2 content</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <ConditionalFieldset
                        data-id="demo-3"
                        label="Empty option - declared with empty child div"
                        type={this.state.type}>
                        <div title="Do nothing" />
                        <div title="Option 1">Option 1 content</div>
                        <div title="Option 2">Option 2 content</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <ConditionalFieldset
                        data-id="demo-5"
                        label="Input width specified (medium)"
                        listClassName="input-width-medium"
                        type={this.state.type}>
                        <div title="Option 1">Option 1 content</div>
                        <div title="Option 2">Option 2 content</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
                    <ConditionalFieldset
                        data-id="demo-6"
                        label="Disabled"
                        type={this.state.type}
                        disabled>
                        <div title="Option 1">Option 1 content</div>
                        <div title="Option 2">Option 2 content</div>
                    </ConditionalFieldset>
                </div>

                <div className="input-row">
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
                </div>
            </div>
        );
    }
}

module.exports = ConditionalFieldsetDemo;
