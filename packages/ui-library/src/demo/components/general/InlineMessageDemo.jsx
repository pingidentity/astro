var React = require("react"),
    InlineMessage = require("../../../components/general/InlineMessage.jsx");

var doSomething = function (e) {
    console.log("Did something with " + e);
};

var InlineMessageDemo = React.createClass({

    render: function () {
        return (
            <div>
                <p>
                    For messages that will appear inside a form and not appear post action, but appear as a
                    general notice relating to that form, you can use the InlineMessage component. This component
                    offers support for a text message or markup, as well as for an type and a button.
                    The button and button text will appear if the button text is passed and a call back
                    function is passed.
                </p>

                <InlineMessage data-id="notice-message-no-button" type={ InlineMessage.MessageTypes.NOTICE }>
                    Message with just text and no action.
                </InlineMessage>

                <InlineMessage data-id="notice-message-button" type={ InlineMessage.MessageTypes.NOTICE }
                               label="Do Something" onClick={doSomething}>
                    Message with action.
                </InlineMessage>

                <InlineMessage data-id="notice-message-button-missing-action"
                               type={ InlineMessage.MessageTypes.NOTICE } label="Bad button" >
                    Message with missing action parameter, must pass label and action.
                </InlineMessage>

                <InlineMessage data-id="notice-message-with-markup" type={ InlineMessage.MessageTypes.NOTICE }>
                    <strong>Message with markup.</strong>
                </InlineMessage>
                
                <InlineMessage data-id="notice-message-warning" type={ InlineMessage.MessageTypes.WARNING }>
                    Warning message
                </InlineMessage>
                
                <InlineMessage data-id="notice-message-error" type={ InlineMessage.MessageTypes.ERROR }>
                    Error message
                </InlineMessage>
                
                <InlineMessage data-id="notice-message-success" type={ InlineMessage.MessageTypes.SUCCESS }>
                    Success message
                </InlineMessage>

            </div>
        );
    }
});

module.exports = InlineMessageDemo;
