var React = require("react");
var HelpHint = require("../../../components/tooltips/HelpHint");
var FormLabel = require("../../../components/forms/FormLabel");

import Button from "../../../components/buttons/Button";

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
                <FormLabel value="Help Hints On Various Elements" className="detached" />
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

                <FormLabel value="Help Hint Placement" className="detached" />
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
                <FormLabel value="Help Hint with Link" className="detached" />
                <HelpHint
                    data-id="helphint-more"
                    hintText="Help hint text"
                    placement="bottom"
                    link="#"
                />

            </div>
        );
    }
}

module.exports = HelpHintDemo;
