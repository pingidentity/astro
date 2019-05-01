import React, { Component } from "react";
import { v4 as uuidV4 } from "uuid";
import FormDropDownList from "../../../components/forms/FormDropDownList";
import FormTextField from "../../../components/forms/form-text-field";
import RowBuilder from "../../../components/rows/RowBuilder";
import { omit } from "underscore";
import InputRow from "../../../components/layout/InputRow";

/**
* @name RowBuilderDemo
* @memberof RowBuilder
* @desc A demo for RowBuilder component
*/

export default class RowBuilderDemo extends Component {
    state = {
        firstRowIds: [uuidV4(), uuidV4()],
        secondRowIds: [uuidV4(), uuidV4()]
    }

    addRow = (isFirstRow) => {
        this.setState(({ firstRowIds, secondRowIds }) => ({
            firstRowIds: isFirstRow ? [...firstRowIds, uuidV4()] : firstRowIds,
            secondRowIds: isFirstRow ? secondRowIds : [...secondRowIds, uuidV4()]
        }));
    }

    addFirst = () => this.addRow(true)
    addSecond = () => this.addRow(false)

    createRows = (content, ids) => {
        const noLabels = content.map(({ props, ...template }) => ({
            props: omit(props, ["label", "labelText"]),
            ...template
        }));

        return ids.map((id, index) =>
            index === 0
                ? { id, content }
                : { id, content: noLabels }
        );
    }

    removeRow = (isFirstRow) => (e, id) => {
        this.setState(({ firstRowIds, secondRowIds }) => ({
            firstRowIds: isFirstRow ? firstRowIds.filter(rowId => rowId !== id) : firstRowIds,
            secondRowIds: isFirstRow ? secondRowIds : secondRowIds.filter(rowId => rowId !== id)
        }));
    }

    render() {
        const nonRemovable = {
            content: [<div key="non-removable">Non-removable row</div>],
            id: "non-removable",
            removable: false
        };

        return (
            <div>
                <InputRow>
                    <RowBuilder
                        onAdd={this.addFirst}
                        onRemove={this.removeRow(true)}
                        rows={this.createRows(
                            [
                                (
                                    <FormDropDownList
                                        key="dropdown"
                                        options={[{ label: "Name", value: "" } ]}
                                        label="Row with inputs"
                                        flags={["p-stateful", "use-portal"]}
                                    />
                                ),
                                (
                                    <FormTextField
                                        key="textfield"
                                        labelText="Text field"
                                        stateless={false}
                                        flags={["p-stateful"]}
                                    />
                                )
                            ],
                            this.state.firstRowIds
                        )}
                        showRemoveLabel={true}
                    />
                </InputRow>
                <InputRow>
                    <RowBuilder
                        hasLineBetween={false}
                        onAdd={this.addSecond}
                        onRemove={this.removeRow(false)}
                        rows={[
                            ...this.createRows(
                                [<FormTextField
                                    key="textfield"
                                    placeholder="Rows without dividing lines"
                                    stateless={false}
                                    flags={["p-stateful"]}
                                />],
                                this.state.secondRowIds
                            ),
                            nonRemovable
                        ]}
                    />
                </InputRow>
            </div>
        );
    }
}