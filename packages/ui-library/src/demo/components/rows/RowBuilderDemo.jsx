import React, { Component } from "react";
import { v4 as uuidV4 } from "uuid";
import FormDropDownList from "../../../components/forms/FormDropDownList";
import FormTextField from "../../../components/forms/form-text-field";
import RowBuilder from "../../../components/rows/RowBuilder";

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

    createRows = (template, count) => count > 0 ? new Array(count).fill(template) : []

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