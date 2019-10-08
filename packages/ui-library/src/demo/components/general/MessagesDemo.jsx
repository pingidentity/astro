import React from "react";
import { bindActionCreators } from "redux";
import Messages from "./../../../components/general/messages/";
import uuid from "uuid";

import Button from "../../../components/buttons/Button";
import InputRow from "../../../components/layout/InputRow";
import HR from "ui-library/lib/components/general/HR";
import Toggle from "../../../components/forms/form-toggle";
import ValueItem from "../../../components/layout/ValueItem";

/**
 * @name MessagesDemo
 * @memberof Messages
 * @desc A demo for Messages
 */
class MessagesDemo extends React.Component {
    state = {
        cornerDefault: false,
    }

    actions = bindActionCreators(Messages.Actions, this.props.store.dispatch);

    _addSuccessMessage = () => {
        this.actions.addMessage({
            message: `New Error Message Added at ${new Date().toString()}`,
            status: Messages.MessageTypes.SUCCESS,
            iconName: "success",
        });
    };

    _addCenterMessage = () => {
        this.actions.addCenterMessage(
            "messages-i18n",
            "Changing to Environment",
            "TLV-Automation"
        );
    };

    _addI18nInfoMessage = () => {
        this.actions.addMessage({
            containerId: "messages-i18n",
            status: Messages.MessageTypes.INFO,
            iconName: "globe",
            key: "my.i18n.key",
        });
    };

    _addErrorMessage = () => {
        this.actions.addMessage({
            message: `New Error Message Added at ${new Date().toString()}`,
            status: Messages.MessageTypes.ERROR,
            iconName: "clear",
        });
    };

    _addWarningMessage = () => {
        this.actions.addMessage(`New Warning Message Added at ${new Date().toString()}`, Messages.MessageTypes.WARNING);
    };

    _addInfoMessage = () => {
        this.actions.addMessage(`New Info Message Added at ${new Date().toString()}`, Messages.MessageTypes.INFO);
    };

    _addCornerSuccessMessage = () => {
        this.actions.addMessage({
            message: `New Success Message Added at ${new Date().toString()}`,
            status: Messages.MessageTypes.SUCCESS,
            layout: Messages.Layouts.CORNER,
            iconName: "success",
            hideClose: true,
            removeAfterMs: 10000,
        });
    }

    _addCornerWarningMessage = () => {
        this.actions.addMessage({
            message: `New Warning Message Added at ${new Date().toString()}`,
            status: Messages.MessageTypes.WARNING,
            layout: Messages.Layouts.CORNER,
            iconName: "error-triangle",
            removeAfterMs: 0,
        });
    }

    _addCornerDeletedMessage = () => {
        this.actions.addMessage({
            message: "You've successfully removed (email address) from your authentication methods.",
            status: Messages.MessageTypes.INFO,
            layout: Messages.Layouts.CORNER,
            iconName: "delete",
            hideClose: true,
            removeAfterMs: 10000,
        });
    }

    _testButtonClick = () => {
        console.log("Button clicked");
    }

    _addHtmlMessage = () => {
        this.actions.addMessage({
            message: <div>
                New Message Added with html/buttons: <Button inline onClick={this._testButtonClick}>Button</Button>
                <Button type="primary" inline onClick={this._testButtonClick}>Primary Button</Button>
            </div>,
            status: Messages.MessageTypes.ERROR,
            isHtml: true
        });
    };

    _progressText = percent => (
        percent >= 100
            ? `Upload Complete!`
            : `Upload ${percent}% Complete`
    );

    _addProgressMessage = () => {
        let mId = uuid.v4();

        this.actions.addMessage({
            message: "New Progress Message Added at " + new Date().toString(),
            status: Messages.MessageTypes.SUCCESS,
            removeAfterMs: 0,
            progress: {
                textTemplate: this._progressText,
                percent: 25
            },
            messageId: mId
        });
        setTimeout(
            () => this.actions.updateProgress(mId, 45),
            1000
        );
        setTimeout(
            () => this.actions.updateProgress(mId, 75),
            2000
        );
        setTimeout(
            () => this.actions.updateProgress(mId, 100),
            4000
        );
    };

    _addMinimizedProgressMessage = () => {
        let mId = uuid.v4();

        this.actions.addMessage({
            message: "New Progress Message Added at " + new Date().toString(),
            status: Messages.MessageTypes.SUCCESS,
            removeAfterMs: 0,
            progress: {
                textTemplate: this._progressText,
                percent: 25
            },
            messageId: mId,
            minimizeAfterMS: 1500
        });
        setTimeout(
            () => this.actions.updateProgress(mId, 45),
            1000
        );
        setTimeout(
            () => this.actions.updateProgress(mId, 75),
            2000
        );
        setTimeout(
            () => this.actions.updateProgress(mId, 100),
            4000
        );
    };

    _onI18n(key) {
        const mssgs = {
            "my.i18n.key": `New i18n Message Added at ${new Date().toString()}`
        };
        return mssgs[key] || "i18n key key not found";
    }

    _toggleCornerDefault = () => this.setState(({ cornerDefault }) => ({ cornerDefault: !cornerDefault }));

    render() {
        return (
            <div>
                <Messages
                    data-id="messages"
                    messages={this.props.messages}
                    onRemoveMessage={this.actions.removeAt}
                    defaultMessageLayout={this.state.cornerDefault ? Messages.Layouts.CORNER : undefined}
                />
                <Messages
                    data-id="messages-i18n"
                    containerId="messages-i18n"
                    messages={this.props["messages-i18n"]}
                    onRemoveMessage={this.actions.removeAt}
                    onI18n={this._onI18n}
                    defaultMessageLayout={this.state.cornerDefault ? Messages.Layouts.CORNER : undefined}
                />

                <InputRow>
                    For messages that will appear in full width pages like Login or Change Password pages, add
                    'containerType=&#123;Messages.ContainerTypes.FULL&#125;'. For messages that will appear in Modals or
                    Wizards, add 'className=&#123;Messages.ContainerTypes.MODAL&#125;'.For messages that will appear in
                    pages with a left-nav, do not set the containerType prop.
                </InputRow>

                <InputRow>
                    <Button onClick={this._addSuccessMessage}>Add success message - MessageTypes.SUCCESS</Button>
                    <Button onClick={this._addCornerSuccessMessage}>Add corner success message</Button>
                </InputRow>
                <InputRow>
                    <Button onClick={this._addErrorMessage}>Add error message - MessageTypes.ERROR</Button>
                </InputRow>
                <InputRow>
                    <Button onClick={this._addWarningMessage}>Add warning message - MessageTypes.WARNING</Button>
                    <Button onClick={this._addCornerWarningMessage}>Add corner warning message</Button>
                </InputRow>
                <InputRow>
                    <Button onClick={this._addInfoMessage}>Add info message - MessageTypes.INFO</Button>
                    <Button onClick={this._addCornerDeletedMessage}>Add corner deleted message</Button>
                </InputRow>
                <InputRow>
                    <Button onClick={this._addI18nInfoMessage}>Add an i18n message - MessageTypes.INFO</Button>
                </InputRow>

                <HR />

                <Button onClick={this._addHtmlMessage}>Add HTML message</Button>
                <Button onClick={this._addProgressMessage}>Add progress message</Button>
                <Button onClick={this._addMinimizedProgressMessage}>Add minimized message</Button>

                <HR />

                <Button onClick={this._addCenterMessage}>Add env message</Button>

                <HR />

                <ValueItem
                    icon={
                        <Toggle
                            onToggle={this._toggleCornerDefault}
                            toggled={this.state.cornerDefault}
                        />
                    }
                >Default to corner layout</ValueItem>
            </div>
        );
    }
}

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
MessagesDemo.Reducer = Messages.Reducer;

module.exports = MessagesDemo;
