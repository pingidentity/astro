var React = require("react"),
    InlineMessage = require("../../../components/general/InlineMessage");
import HR from "ui-library/lib/components/general/HR";

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


                <HR />
                <h2>Inline Message Types</h2>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING }>
                    Warning message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING } fullwidth>
                    Full Width Warning message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING} alternate>
                    Warning message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.ERROR }>
                    Error message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.ERROR} alternate>
                    Error message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.ERROR} alternate fullwidth>
                    Full Width Alternate Error message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.SUCCESS }>
                    Success message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.SUCCESS} alternate>
                    Success message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.NOTICE }>
                    Notice message
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.NOTICE} alternate>
                    Notice message
                </InlineMessage>


                <HR />
                <h2>Other Variations</h2>

                <InlineMessage
                    type={ InlineMessage.MessageTypes.WARNING }
                    label="Do Something"
                    onClick={doSomething}
                >
                    Message with action.
                </InlineMessage>

                <InlineMessage
                    type={ InlineMessage.MessageTypes.WARNING }
                    label="message with href and target"
                    onClick={doSomething}
                    primaryButtonProps={{
                        href: "#",
                        target: "#"
                    }}
                >
                Message with Href
                </InlineMessage>

                <InlineMessage
                    type={ InlineMessage.MessageTypes.WARNING }
                    label="Do Something"
                    onClick={doSomething}
                    secondaryButtons={[
                        {
                            onClick: doSomething,
                            label: "Do Something",
                        },
                    ]}
                >
                    Message with two actions
                </InlineMessage>

                <InlineMessage
                    type={ InlineMessage.MessageTypes.WARNING }
                    label="Do Something"
                    onClick={doSomething}
                    alternate>
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
                        },
                    ]}
                    alternate>
                    Alternate Message with two actions.
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING } label="Bad button" >
                    Message with missing action parameter, must pass label and action.
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING } label="Bad button" alternate>
                    Message with missing action parameter, must pass label and action.
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING }>
                    <strong>Message with markup.</strong>
                </InlineMessage>

                <InlineMessage type={ InlineMessage.MessageTypes.WARNING } alternate>
                    <strong>Message with markup.</strong>
                </InlineMessage>

                <InlineMessage bordered={false}>
                    Message with no border.
                </InlineMessage>

                <InlineMessage noMargin>
                    Message with no margins.
                </InlineMessage>


            </div>
        );
    }
}

module.exports = InlineMessageDemo;
