var React = require("react"),
    Redux = require("redux"),
    Messages = require("./../../../components/general/messages/");

/**
* @name MessagesDemo
* @memberof Messages
* @desc A demo for Messages
*/
var MessagesDemo = React.createClass({
    _addSuccessMessage: function () {
        this.actions.addMessage("New Success Message Added at " + (new Date()).toString(),
                                Messages.MessageTypes.SUCCESS);
    },

    _addErrorMessage: function () {
        this.actions.addMessage("New Error Message Added at " + (new Date()).toString(),
                                Messages.MessageTypes.WARNING);
    },

    _addWarningMessage: function () {
        this.actions.addMessage("New Warning Message Added at " + (new Date()).toString(),
                                Messages.MessageTypes.NOTICE);
    },

    _addInfoMessage: function () {
        this.actions.addMessage("New Info Message Added at " + (new Date()).toString(),
                                Messages.MessageTypes.FEATURE);
    },

    componentWillMount: function () {
        this.actions = Redux.bindActionCreators(Messages.Actions, this.props.store.dispatch);
    },

    render: function () {
        return (
            <div>
                <p>For messages that will appear in full width pages like Login or Change Password pages, add
                'containerType=&#123;Messages.ContainerTypes.FULL&#125;'. For messages that will appear
                in Modals or Wizards, add 'className=&#123;Messages.ContainerTypes.MODAL&#125;'.For messages that will
                appear in pages with a left-nav, do not set the containerType prop.</p>

                <Messages messages={this.props.messages}
                    onRemoveMessage={this.actions.removeAt} />
                <br />
                <button onClick={this._addSuccessMessage} >Add success message</button>
                <button onClick={this._addErrorMessage} >Add error message</button>
                <button onClick={this._addWarningMessage} >Add warning message</button>
                <button onClick={this._addInfoMessage} >Add info message</button>
            </div>
        );
    }
});

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
MessagesDemo.Reducer = Messages.Reducer;

module.exports = MessagesDemo;
