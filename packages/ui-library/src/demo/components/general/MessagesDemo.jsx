var React = require("react"),
    Redux = require("redux"),
    Messages = require("./../../../components/general/messages/"),
    InlineMessage = require("../../../components/general/InlineMessage"),
    uuid = require("uuid");

import Button from "../../../components/buttons/Button";
import InputRow from "../../../components/layout/InputRow";

/**
 * @name MessagesDemo
 * @memberof Messages
 * @desc A demo for Messages
 */
class MessagesDemo extends React.Component {
    _addSuccessMessage = () => {
        this.actions.addMessage(`New Success Message Added at ${new Date().toString()}`, Messages.MessageTypes.SUCCESS);
    };

    _addErrorMessage = () => {
        this.actions.addMessage(`New Error Message Added at ${new Date().toString()}`, Messages.MessageTypes.ERROR);
    };

    _addWarningMessage = () => {
        this.actions.addMessage(`New Warning Message Added at ${new Date().toString()}`, Messages.MessageTypes.NOTICE);
    };

    _addInfoMessage = () => {
        this.actions.addMessage(`New Info Message Added at ${new Date().toString()}`, Messages.MessageTypes.FEATURE);
    };

    _testButtonClick = () => {
        console.log("Button clicked");
    }

    _addHtmlMessage = () => {
        this.actions.addMessage({
            message: <div>
                New Message Added with <Button inline onClick={this._testButtonClick}>HTML</Button>
                at {new Date().toString()}
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

    componentWillMount() {
        this.actions = Redux.bindActionCreators(Messages.Actions, this.props.store.dispatch);
    }

    render() {
        return (
            <div>
                <InlineMessage type={ InlineMessage.MessageTypes.WARNING }>
                    There is a discrepency between the message types and the constant name.
                    Please use the following for the status. <br />
                    Success = MessageTypes.SUCCESS <br />
                    Error = MessageTypes.WARNING || MessageTypes.ERROR <br />
                    Warning = MessageTypes.NOTICE <br />
                    Info = MessageTypes.FEATURE <br />
                </InlineMessage>

                <InputRow>
                    For messages that will appear in full width pages like Login or Change Password pages, add
                    'containerType=&#123;Messages.ContainerTypes.FULL&#125;'. For messages that will appear in Modals or
                    Wizards, add 'className=&#123;Messages.ContainerTypes.MODAL&#125;'.For messages that will appear in
                    pages with a left-nav, do not set the containerType prop.
                </InputRow>

                <InputRow>
                    <Messages messages={this.props.messages} onRemoveMessage={this.actions.removeAt} />
                </InputRow>
                <InputRow>
                    <Button onClick={this._addSuccessMessage}>Add success message - MessageTypes.SUCCESS</Button>
                </InputRow>
                <InputRow>
                    <Button onClick={this._addErrorMessage}>Add error message - MessageTypes.ERROR</Button>
                </InputRow>
                <InputRow>
                    <Button onClick={this._addWarningMessage}>Add warning message - MessageTypes.NOTICE</Button>
                </InputRow>
                <InputRow>
                    <Button onClick={this._addInfoMessage}>Add info message - MessageTypes.FEATURE</Button>
                </InputRow>

                <hr className="hr" />

                <Button onClick={this._addHtmlMessage}>Add HTML message</Button>
                <Button onClick={this._addProgressMessage}>Add progress message</Button>
                <Button onClick={this._addMinimizedProgressMessage}>Add minimized message</Button>
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
