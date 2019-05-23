import React from "react";
import InlineMessage from "../../components/general/InlineMessage";

/**
 * @class EmailBasic
 * @desc This is an example of basic email styling.
 */

const Email = () => {
    return (
        <div className="email-demo">
            <InlineMessage type={ InlineMessage.MessageTypes.WARNING } fullwidth>
                Since each email requires a html, header, and body tag the code is located in and html file in the the
                'src/emails' directory.
            </InlineMessage>
            <iframe className="email-demo__iframe" src="src/emails/EmailBasic.html"></iframe>
        </div>
    );
};

export default Email;
