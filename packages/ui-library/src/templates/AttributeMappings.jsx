import React, { Component } from "react";
import FormCheckbox from "ui-library/lib/components/forms/FormCheckbox";
import FormDropDownList from "ui-library/lib//components/forms/FormDropDownList";
import FormTextField from "ui-library/lib//components/forms/form-text-field";
import HelpHint from "ui-library/lib//components/tooltips/HelpHint";
import Indent from "ui-library/lib//components/general/Indent";
import Link from "ui-library/lib//components/general/Link";
import PageHeader from "ui-library/lib//components/general/PageHeader";
import DropDownButton from "ui-library/lib//components/forms/DropDownButton";
import RowBuilder, { Row, Separator } from "ui-library/lib//components/rows/RowBuilder";
import InputWidths from "ui-library/lib//components/forms/InputWidths";

/**
 * @class Attribute Mappings
 * @desc This is a template to demonstrate how to build an Attribute Mappings screen.
 */
export default class AttributeMappings extends Component {
    state = {
        firstChecked: false,
        secondChecked: false,
        firstDropDownOption: null,
        secondDropDownOption: null
    }

    setChecked = checkedName => () => this.setState(
        ({ [checkedName]: checked }) => ({ [checkedName]: !checked })
    )
    firstCheckChange = this.setChecked("firstChecked")
    secondCheckChange = this.setChecked("secondChecked")

    setDropDown = dropDownName => opt => this.setState({
        [dropDownName]: opt
    })
    firstDropDownChange = this.setDropDown("firstDropDownOption")
    secondDropDownChange = this.setDropDown("secondDropDownOption")

    render() {
        // The next three variables are declared here for readability;
        // these would not be included in render otherwise.
        const dropDownOptions = {
            pingOne: "PingOne Attribute",
            static: "Static Attribute",
        };

        const firstRow = (
            [<Row key="first">
                <FormTextField
                    labelText={<div>Application Attribute<HelpHint hintText="Hint" /></div>}
                    width={InputWidths.MD}
                    value="Customer Name"
                    flags={["p-stateful"]}
                />
                <Separator>=</Separator>
                <FormDropDownList
                    autofocus={true}
                    label={<div>Pingone User Attribute<HelpHint hintText="Hint" /></div>}
                    onValueChange={this.firstDropDownChange}
                    options={[
                        { label: "ID", value: "id" },
                        { label: "Name", value: "name" }
                    ]}
                    selectedOption={this.state.firstDropDownOption}
                    width={InputWidths.MD}
                    flags={["p-stateful", "use-portal"]}
                />
                <FormCheckbox
                    checked={this.state.firstChecked}
                    inline
                    label="Required"
                    onValueChange={this.firstCheckChange}
                />
            </Row>]
        );

        const secondRow = (
            [<Row key="second">
                <FormTextField
                    labelText="Application Attribute"
                    placeholder="Enter mapped attribute"
                    stateless={false}
                    width={InputWidths.MD}
                    flags={["p-stateful"]}
                />
                <Separator>=</Separator>
                <FormDropDownList
                    label="Pingone User Attribute"
                    onValueChange={this.secondDropDownChange}
                    options={[
                        { label: "ID", value: "id" },
                        { label: "Name", value: "name" }
                    ]}
                    placeholder="Select a PingOne attribute"
                    selectedOption={this.state.secondDropDownOption}
                    width={InputWidths.MD}
                    flags={["p-stateful", "use-portal"]}
                />
                <FormCheckbox
                    checked={this.state.secondChecked}
                    inline
                    label="Required"
                    onValueChange={this.secondCheckChange}
                />
            </Row>]
        );

        const renderButton = ({
            onClick
        }) => (
            <Link
                onClick={onClick}
                title="+ Add Attribute"
            />
        );

        return (
            <div>
                <PageHeader
                    title={<div>Attribute Mappings<HelpHint hintText="Hint" leftMargin /></div>}
                    underlined
                />
                <Indent border={false} >
                    <RowBuilder
                        addButton={
                            <DropDownButton
                                options={dropDownOptions}
                                renderButton={renderButton}
                            />
                        }
                        rows={[
                            {
                                id: "first",
                                content: firstRow,
                                removable: false
                            },
                            {
                                id: "second",
                                content: secondRow
                            }
                        ]}
                        showRemoveLabel
                    />
                </Indent>
            </div>
        );
    }
}
