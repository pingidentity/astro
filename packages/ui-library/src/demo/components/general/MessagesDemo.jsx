var React = require("react/addons");
var Messages = require("./../../../components/general/Messages.jsx");

var MessagesDemo = React.createClass({

    getInitialState: function () {
        return {
            messages: [],
            counter: 1
        };
    },

    _removeMessage: function (index) {
        var messages = this.state.messages;
        messages.splice(index, 1);
        this.setState({ messages: messages });
    },
    
    _addMessage: function () {
        var counter = this.state.counter;
        var messages = this.state.messages;
        messages.push({
            text: "New message #" + counter
        });
        counter += 1;
        
        this.setState({ messages: messages, counter: counter });
    },

    render: function () {
        return (
            <div>
                <Messages messages={this.state.messages} removeMessage={this._removeMessage} />
                <button onClick={this._addMessage} >Add message</button>
            </div>
        );
    }
});

module.exports = MessagesDemo;