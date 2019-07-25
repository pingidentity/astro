import React from "react";
import GlobalMessage, { messageTypes } from "../../../components/general/GlobalMessage";
import Icon from "../../../components/general/Icon";
import InputRow from "../../../components/layout/InputRow";

/**
* @name GlobalMessageDemo
* @memberof GlobalMessage
* @desc A demo for GlobalMessage component
*/

export default function GlobalMessageDemo() {
    const buttonClick = () => console.log("Button click!");
    const onClear = () => console.log("Cleared!");

    return (
        <div>
            <InputRow>
                <GlobalMessage
                    buttonLabel="Talk to sales"
                    onButtonClick={buttonClick}
                    onClear={onClear}
                >
                    <Icon iconName="timer" type="leading" />
                    Your trial expires in 30 days
                </GlobalMessage>
            </InputRow>
            <InputRow>
                <GlobalMessage
                    buttonLabel="Talk to sales"
                    onButtonClick={buttonClick}
                    onClear={onClear}
                    type={messageTypes.WARNING}
                >
                    <Icon iconName="timer" type="leading" />
                    Your trial expires in 30 days
                </GlobalMessage>
            </InputRow>
            <InputRow>
                <GlobalMessage
                    buttonLabel="Talk to sales"
                    onButtonClick={buttonClick}
                    onClear={onClear}
                    type={messageTypes.ERROR}
                >
                    <Icon iconName="timer" type="leading" />
                    Your trial expires in 30 days
                </GlobalMessage>
            </InputRow>
        </div>
    );
}
