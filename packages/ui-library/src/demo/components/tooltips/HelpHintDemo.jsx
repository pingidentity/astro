import React from "react";
import HelpHint from "ui-library/lib/components/tooltips/HelpHint";
import FormLabel from "ui-library/lib/components/forms/FormLabel";
import Button from "ui-library/lib/components/buttons/Button";
import HR from "ui-library/lib/components/general/HR";
import Text from "ui-library/lib/components/general/Text";

/**
* @name HelpHintDemo
* @memberof HelpHint
* @desc A demo for HelpHint
*/
class HelpHintDemo extends React.Component {
    _onClick = () => {
        alert("clicked!");
    };

    render() {
        return (
            <div>
                <FormLabel value="Help Hints On Various Elements" detached />
                <HelpHint
                    data-id="helphint-regular"
                    ref="testTip"
                    hintText="Regular help hint with icon"
                />
                &nbsp; &nbsp;
                <HelpHint
                    data-id="helphint-button"
                    hintText="Help hint text">
                    <Button onClick={this._onClick}>Button with help hint</Button>
                </HelpHint>
                &nbsp; &nbsp;
                <HelpHint
                    data-id="helphint-link"
                    hintText="Help hint text">
                    <a onClick={this._onClick}>Link with help hint</a>
                </HelpHint>
                &nbsp; &nbsp;
                <HelpHint
                    data-id="helphint-inlinebutton"
                    hintText="Help hint text">
                    <Button onClick={this._onClick} inline>Inline button with help hint</Button>
                </HelpHint>

                <br /><br /><br />

                <FormLabel value="Help Hint Placement" detached />
                <HelpHint
                    data-id="helphint-topplacement"
                    placement="top"
                    hintText="Top placement"
                />
                &nbsp; &nbsp;
                <HelpHint
                    data-id="helphint-bottomplacement"
                    placement="bottom"
                    hintText="Bottom placement"
                />
                &nbsp; &nbsp;
                <HelpHint
                    data-id="helphint-leftplacement"
                    placement="left"
                    hintText="Left placement"
                />
                &nbsp; &nbsp;
                <HelpHint
                    data-id="helphint-rightplacement"
                    placement="right"
                    hintText="Right placement"
                />

                <br /><br /><br />
                <FormLabel value="Help Hint with Link" detached />
                <HelpHint
                    data-id="helphint-more"
                    hintText="Help hint text"
                    placement="bottom"
                    link="#"
                />

                <HR />
                <HelpHint
                    data-id="helphint-error"
                    hintText="Error type"
                    type={HelpHint.types.ERROR}
                />
                &nbsp; &nbsp;
                <HelpHint
                    data-id="helphint-light"
                    hintText="Light type"
                    type={HelpHint.types.LIGHT}
                />
                &nbsp; &nbsp;
                <HelpHint
                    data-id="helphint-success"
                    hintText="Success type"
                    type={HelpHint.types.SUCCESS}
                />
                &nbsp; &nbsp;
                <HelpHint
                    data-id="helphint-warning"
                    hintText="Warning type"
                    type={HelpHint.types.WARNING}
                />


            </div>
        );
    }
}

module.exports = HelpHintDemo;
