import React, { Component } from "react";
import { v4 as uuidV4 } from "uuid";
import FormDropDownList from "../../../components/forms/FormDropDownList";
import FormTextField from "../../../components/forms/form-text-field";
import RowBuilder from "../../../components/rows/RowBuilder";
import { omit } from "underscore";

export default class RowBuilderDemo extends Component {
    state = {
        firstRowCount: 2,
        secondRowCount: 2
    }

    addRow = (isFirstRow) => {
        this.setState(({ firstRowCount, secondRowCount }) => ({
            firstRowCount: isFirstRow ? firstRowCount + 1 : firstRowCount,
            secondRowCount: isFirstRow ? secondRowCount : secondRowCount + 1
        }));
    }

    addFirst = () => this.addRow(true)
    addSecond = () => this.addRow(false)

    createRows = ({ id, content }, count) => {
        const noLabels = content.map(({ props, ...template }) => ({
            props: omit(props, ["label", "labelText"]),
            ...template
        }));

        const noLabelCount = count < 1 ? 0 : count - 1;

        return count > 0 ? [{ id, content }, ...(new Array(noLabelCount).fill({ id, content: noLabels }))] : [];
    }

    removeRow = (isFirstRow) => () => {
        this.setState(({ firstRowCount, secondRowCount }) => ({
            firstRowCount: isFirstRow ? firstRowCount - 1 : firstRowCount,
            secondRowCount: isFirstRow ? secondRowCount : secondRowCount - 1
        }));
    }

    render() {
        return (
            <div>
                <div className="input-row">
                    <RowBuilder
                        onAdd={this.addFirst}
                        onRemove={this.removeRow(true)}
                        rows={this.createRows(
                            {
                                id: uuidV4(),
                                content: [
                                    (
                                    <FormDropDownList
                                        key={uuidV4()}
                                        options={[{ label: "Name", value: "" } ]}
                                        label="Row with inputs"
                                    />
                                    ),
                                    (
                                    <FormTextField
                                        key={uuidV4()}
                                        labelText="Text field"
                                    />
                                    )
                                ]
                            },
                            this.state.firstRowCount
                        )}
                        showRemoveLabel={true}
                    />
                </div>
                <div className="input-row">
                    <RowBuilder
                        onAdd={this.addSecond}
                        onRemove={this.removeRow(false)}
                        rows={this.createRows(
                            {
                                id: uuidV4(),
                                content: [<div key={uuidV4()}>Simple row</div>]
                            },
                            this.state.secondRowCount
                        )}
                    />
                </div>
            </div>
        );
    }
}