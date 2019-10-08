import React, { Component } from "react";
import { v4 as uuidV4 } from "uuid";
import FormDropDownList from "../../../components/forms/FormDropDownList";
import FormTextField from "../../../components/forms/form-text-field";
import RowBuilder, { renderRemoveIcon } from "../../../components/rows/RowBuilder";
import { omit } from "underscore";
import InputRow from "../../../components/layout/InputRow";
import HR from "../../../components/general/HR";
import FormattedContent from "../../../components/general/FormattedContent";

/**
* @name RowBuilderDemo
* @memberof RowBuilder
* @desc A demo for RowBuilder component
*/

export default class RowBuilderDemo extends Component {
    state = {
        firstRowIds: [uuidV4(), uuidV4()],
        secondRowIds: [uuidV4(), uuidV4()],
        thirdRowIds: [uuidV4()],
    }

    addRow = key => () => {
        const stateKey = `${key}RowIds`;
        this.setState(state => ({
            ...state,
            [stateKey]: [...state[stateKey], uuidV4()],
        }));
    }

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

    removeRow =key => (e, id) => {
        const stateKey = `${key}RowIds`;
        this.setState(state => ({
            ...state,
            [stateKey]: state[stateKey].filter(rowId => rowId !== id),
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
                        onAdd={this.addRow("first")}
                        onRemove={this.removeRow("first")}
                        rows={this.createRows(
                            [
                                (
                                    <FormDropDownList
                                        key="dropdown"
                                        options={[{ label: "Name", value: "" } ]}
                                        label="Row with inputs"
                                    />
                                ),
                                (
                                    <FormTextField
                                        key="textfield"
                                        labelText="Text field"
                                        stateless={false}
                                    />
                                )
                            ],
                            this.state.firstRowIds
                        )}
                        showRemoveLabel={true}
                    />
                </InputRow>
                <HR />
                <InputRow>
                    <RowBuilder
                        hasLineBetween={false}
                        onAdd={this.addRow("second")}
                        onRemove={this.removeRow("second")}
                        rows={[
                            ...this.createRows(
                                [<FormTextField
                                    key="textfield"
                                    placeholder="Rows without dividing lines"
                                    stateless={false}
                                />],
                                this.state.secondRowIds
                            ),
                            nonRemovable
                        ]}
                    />
                </InputRow>
                <HR />
                <FormattedContent>
                    <p>
                        RowBuilder accepts a prop that overrides how the remove button is rendered.
                        <code>renderRemoveButton</code> accepts a function that returns the rendered button.
                        The function accepts an object with the data for the row.
                        (Try logging out the properties you get to help design a render function.)
                    </p>
                    <p>
                        We provide one alternate function that renders a trash icon as the button.
                        <code>import {`{ renderRemoveIcon }`} from "ui-library/lib/components/rows/RowBuilder"</code>
                        and pass it to <code>renderRemoveButton</code> to use this appearance.
                    </p>
                </FormattedContent>
                <InputRow>
                    <RowBuilder
                        hasLineBetween={false}
                        onAdd={this.addRow("third")}
                        onRemove={this.removeRow("third")}
                        renderRemoveButton={renderRemoveIcon}
                        rows={[
                            ...this.createRows(
                                [<FormTextField
                                    key="textfield"
                                    placeholder="Rows without dividing lines"
                                />],
                                this.state.thirdRowIds
                            )
                        ]}
                    />
                </InputRow>
            </div>
        );
    }
}