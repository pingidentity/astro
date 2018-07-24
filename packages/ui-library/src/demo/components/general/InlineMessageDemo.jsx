var React = require("react"),
    InlineMessage = require("../../../components/general/InlineMessage");

/**
* @name InlineMessageDemo
* @memberof InlineMessage
* @desc A demo for InlineMessage
*/

var doSomething = function (e) {
    console.log("Did something with " + e);
};

class InlineMessageDemo extends React.Component {
    render() {
        return (
            <div>
                <p>
                    For messages that will appear inside a form and not appear post action, but appear as a
                    general notice relating to that form, you can use the InlineMessage component. This component
                    offers support for a text message or markup, as well as for an type and a button.
                    The button and button text will appear if the button text is passed and a call back
                    function is passed.
                </p>


                <div className="hr" />
                <h2>Inline Message Types</h2>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING }>
                    Warning message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING} alternate={true}>
                    Warning message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.ERROR }>
                    Error message
                </InlineMessage>

                 <InlineMessage type={ InlineMessage.MessageTypes.ERROR} alternate={true}>
                    Error message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.SUCCESS }>
                    Success message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.SUCCESS} alternate={true}>
                    Success message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.NOTICE }>
                    Notice message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.NOTICE} alternate={true}>
                    Notice message
                </InlineMessage>


                <div className="hr" />
                <h2>Other Variations</h2>

                <InlineMessage
                    type={ InlineMessage.MessageTypes.WARNING }
                    label="Do Something"
                    onClick={doSomething}>
                    Message with action.
                </InlineMessage>

                <InlineMessage
                    type={ InlineMessage.MessageTypes.WARNING }
                    label="Do Something"
                    onClick={doSomething}
                    secondaryButtons={[
                        {
                            onClick: doSomething,
                            label: "Do Something",
                            className: "secondary"

                        },
                    ]}
                    >
                    Message with two actions
                </InlineMessage>

                <InlineMessage
                    type={ InlineMessage.MessageTypes.WARNING }
                    label="Do Something"
                    onClick={doSomething}
                    alternate={true}>
                    Alternate Message with action.
                </InlineMessage>

                <InlineMessage
                    type={ InlineMessage.MessageTypes.ERROR }
                    label="Do Something"
                    onClick={doSomething}
                    secondaryButtons={[
                        {
                            onClick: doSomething,
                            label: "Do Something",
                            className: "secondary"

                        },
                    ]}
                    alternate={true}>
                    Alternate Message with two actions.
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING } label="Bad button" >
                    Message with missing action parameter, must pass label and action.
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING } label="Bad button" alternate={true} >
                    Message with missing action parameter, must pass label and action.
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING }>
                    <strong>Message with markup.</strong>
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING } alternate={true}>
                    <strong>Message with markup.</strong>
                </InlineMessage>

                <InlineMessage bordered={false}>
                    Message with no border.
                </InlineMessage>
            </div>
        );
    }
}

module.exports = InlineMessageDemo;
