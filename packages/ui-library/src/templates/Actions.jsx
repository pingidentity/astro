import React from "react";

import Anchor from "../components/general/Anchor";
import Button from "../components/buttons/Button";
import ConfirmTooltip from "../components/tooltips/ConfirmTooltip";
import FormLabel from "../components/forms/FormLabel";
import FormTextField from "../components/forms/form-text-field/";
import InputRow from "../components/layout/InputRow";
import { InputWidths } from "../components/forms/InputWidths";
import Messages from "../components/general/messages/Messages";
import Modal from "../components/general/Modal";
import PageGroup from "../components/layout/PageGroup";
import PageHeader from "../components/general/PageHeader";
import PageSection from "../components/layout/PageSection";
import RowBuilder from "../components/rows/RowBuilder";
import ButtonGroup from "../components/layout/ButtonGroup";
import { v4 as uuidV4 } from "uuid";
import _ from "underscore";

const templateUUIDs = [
    "caa615f5-9475-4ad4-b09e-08bfdcbc5971 ",
    "b3b435c3-8549-4486-9cce-477dce2cbf64 ",
    "c13d9a73-cc45-42e2-a369-4b4576fa7816",
    "0dac7497-2e0e-4b39-bd59-ba3be452fdef",
    "11e7adb3-53a7-472f-8690-56120275d103",
    "61f0ce36-3a0d-49ae-abd9-d08cb99fc398",
    "a2b290e0-07ac-4ba9-b93c-ee6e7203aae1",
    "63e476fe-fa5b-498f-b319-beb3bd4ecab4",
    "91b7fbb4-6f3e-4400-be96-6ded1adbcc1f",
    "922d6f24-abd7-4bcf-8424-7640f7d4725d",
];

/**
 * @class Actions
 * @desc This template...
 */
class Actions extends React.Component {

    state = {
        listIds1: [
            {
                id: uuidV4(),
                confirm: false
            },
            {
                id: uuidV4(),
                confirm: false
            },
        ],
        listIds2: [],
        messages: null,
        popoverOpen: false,
    }

    _getList = (id) => {
        return _.find(this.state.listIds1, (row) => row.id === id) ? "listIds1" : "listIds2";
    }

    _renderRows = (listName) => {
        return this.state[listName].map((row, index) => {
            return ({
                id: row.id,
                content: [(
                    <FormTextField
                        key={row.id}
                        readOnly
                        value={templateUUIDs[index % templateUUIDs.length]}
                        width={InputWidths.MD}
                    />
                )]
            });
        });
    }

    _renderAddButton = (listIndex) => {
        return (
            <div>
                <Button
                    data-id={`list${listIndex}-add-button`}
                    inline iconName="plus"
                    onClick={this._addRow(`listIds${listIndex}`)}
                >
                    Generate
                </Button>
            </div>
        );
    }

    _renderRemoveButton = ({ id }) => {
        return (
            <ConfirmTooltip
                buttonLabel="Delete"
                cancelText="Cancel"
                flags={["use-portal"]}
                label={(
                    <Button
                        alignInputs
                        iconName="delete"
                        inline
                        onClick={this._toggleConfirm(id)}
                    />
                )}
                title="Confirm Cancel"
                onConfirm={this._removeRow(id)}
                onCancel={this._toggleConfirm(id)}
                open={this._isConfirmOpen(id)}
            >
                Are you sure you want to delete this item?
            </ConfirmTooltip>
        );
    }

    _addRow = (listName) => () => {
        this.setState({
            [listName]: [
                ...this.state[listName],
                {
                    id: uuidV4(),
                    confirm: false,
                }
            ]
        });
    }

    _removeRow = (id) => () => {
        const list = this._getList(id);
        this.setState({
            [list]: this.state[list].filter(row => row.id !== id)
        });
    }

    _isConfirmOpen = (id) => {
        const list = this._getList(id);
        return _.find(
            this.state[list],
            (row) => row.id === id
        ).confirm;
    }

    _toggleConfirm = (id) => () => {
        const list = this._getList(id);
        this.setState({
            [list]: this.state[list].map(row => row.id === id ? { id: row.id, confirm: !row.confirm } : row)
        });
    }

    _togglePopover = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    _togglePopup = () => {
        this.setState({
            popupOpen: !this.state.popupOpen
        });
    }

    _addMessage = () => {
        this.setState({
            messages: [{
                text: "You did it.",
                type: Messages.MessageTypes.SUCCESS,
            }]
        });
    }

    _removeMessage = () => {
        this.setState({
            messages: []
        });
    }

    _popoverConfirm = () => {
        this._togglePopover();
        this._addMessage();
        setTimeout(this._removeMessage, 3000);
    }

    _popupConfirm = () => {
        this._togglePopup();
        this._addMessage();
        setTimeout(this._removeMessage, 3000);
    }

    render = () => {
        return (
            <div>
                <Messages messages={this.state.messages} />

                <PageHeader
                    title="Descriptions and Actions"
                />
                <PageSection
                    title="SECTION THAT CAN ONLY LINK"
                    description={(
                        <span>To do this thing, you will need to <Anchor href="#">visit another page</Anchor>.</span>
                    )}
                />
                <PageSection
                    title="LIST OF OBJECTS"
                    description="Here are some objects that you can generate and remove. When you click these buttons,
                        the action happens. It’s done. There’s no need to save the page, and so there will never be a
                        save bar."
                >
                    <InputRow>
                        <PageGroup data-id="page-group-1" title="THE FIRST LIST">
                            <p>
                                You can add items to this list and remove items from it.
                            </p>
                            <RowBuilder
                                data-id="input-list-1"
                                hasLineBetween={false}
                                rows={this._renderRows("listIds1")}
                                showRemoveLabel={false}
                                renderAddButton={this._renderAddButton(1)}
                                renderRemoveButton={this._renderRemoveButton}
                            />
                        </PageGroup>
                    </InputRow>
                    <InputRow>
                        <PageGroup data-id="page-group-2" title="THE SECOND LIST">
                            <p>
                                Starting out, there are no items in this list.
                            </p>
                            <RowBuilder
                                data-id="input-list-2"
                                hasLineBetween={false}
                                rows={this._renderRows("listIds2")}
                                showRemoveLabel={false}
                                renderAddButton={this._renderAddButton(2)}
                                renderRemoveButton={this._renderRemoveButton}
                            />
                        </PageGroup>
                    </InputRow>
                </PageSection>

                <PageSection
                    title="JUST A FEW BUTTONS"
                    description="Here are some simple actions."
                >
                    <FormLabel detached>
                        SHOW SOMETHING
                    </FormLabel>
                    <ConfirmTooltip
                        data-id="popup-tooltip"
                        flags={["use-portal"]}
                        label={<Button data-id="popup-button" inline>Popup</Button>}
                        onConfirm={this._popupConfirm}
                        open={this.state.popupOpen}
                        onToggle={this._togglePopup}
                        placement="bottom right"
                        title="Tooltip Title"
                    >
                        Hi, this is a popover with a simple action.
                    </ConfirmTooltip>

                    <Button data-id="popover-button" inline onClick={this._togglePopover}>Popover</Button>
                    <Modal
                        closeOnBgClick={true}
                        data-id="popover-modal"
                        expanded={this.state.popoverOpen}
                        modalTitle="Its a Popover"
                        onClose={this._togglePopover}
                        onOpen={this._togglePopover}
                    >
                        Hi, this is a popup with a simple action.

                        <ButtonGroup>
                            <Button
                                data-id="popover-confirm-button"
                                label="Confirm"
                                onClick={this._popoverConfirm} type="primary"
                            />
                            <br />
                            <a className="cancel" data-id="popover-cancel-button" onClick={this._togglePopover}>
                                Cancel
                            </a>
                        </ButtonGroup>
                    </Modal>
                </PageSection>

            </div>
        );
    }
}

export default Actions;
