var Redux = require("redux"),
    thunk = require("redux-thunk"),
    React = require("react"),
    Messages = require("./../../../components/general/Messages.jsx");

var MessagesDemo = React.createClass({

    getInitialState: function () {
        return { messages: [] };
    },

    _removeMessage: function (index) {
        this.store.dispatch(Messages.Actions.removeAt(index));
    },

    _addMessage: function () {
        this.store.dispatch(Messages.Actions.addMessage("New Message Added at " + (new Date()).toString()));
    },

    storeChange: function () {
        this.setState(this.store.getState());
    },

    componentWillMount: function () {
        this.store = Redux.applyMiddleware(thunk)(Redux.createStore)(Messages.Reducer);
        this.unsub = this.store.subscribe(this.storeChange);
    },

    componentWillUnmount: function () {
        this.store = null;
        this.unsub();
    },

    render: function () {
        return (
            <div className="messagesDemo">
                <Messages messages={this.state.messages} removeMessage={this._removeMessage} />
                <br />
                <button onClick={this._addMessage} >Add message</button>
            </div>
        );
    }
});

module.exports = MessagesDemo;
