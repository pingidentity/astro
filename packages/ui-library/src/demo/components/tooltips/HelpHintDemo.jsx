var React = require("react");
var HelpHint = require("../../../components/tooltips/HelpHint.jsx");
var FormTextField = require("../../../components/forms/form-text-field").v1;

var HelpHintDemo = React.createClass({

    _onClick: function () {
        alert("clicked!");
    },

    render: function () {
        return (
            <div>
                <strong>
                    Types of Tooltips
                </strong>
                <br /><br />
                <HelpHint
                    className="short-tooltip right"
                    hintText="Regular help tooltip with icon" />
                &nbsp; &nbsp;
                <HelpHint
                    className="short-tooltip"
                    hintText="Help tooltip text">
                    <button onClick={this._onClick}>Button with tooltip</button>
                </HelpHint>
                &nbsp; &nbsp;
                <HelpHint
                    className="short-tooltip"
                    hintText="Help tooltip text">
                    <a onClick={this._onClick}>Text Link with tooltip</a>
                </HelpHint>
                &nbsp; &nbsp;
                <HelpHint
                    className="short"
                    hintText="Help tooltip text">
                    <button onClick={this._onClick} className="inline">Inline button with tooltip</button>
                </HelpHint>

                <br /><br />
                <strong>
                    Tooltip Placement
                </strong>
                <br /><br />
                <HelpHint
                    className="right short-tooltip"
                    hintText="Top right placement"
                />
                &nbsp; &nbsp;
                <HelpHint
                    className="bottom right short-tooltip"
                    hintText="Bottom right placement"
                />
                &nbsp; &nbsp;
                <HelpHint
                    className="short-tooltip"
                    hintText="Top center placement (default)"
                />
                &nbsp; &nbsp;
                <HelpHint
                    className="bottom short-tooltip"
                    hintText="Bottom center placement"
                />
                &nbsp; &nbsp;
                <HelpHint
                    className="left short-tooltip"
                    hintText="Top left placement"
                />
                &nbsp; &nbsp;
                <HelpHint
                    className="bottom left short-tooltip"
                    hintText="Bottom left placement"
                />

                <br /><br />
                <strong>
                    Tooltip Lengths
                </strong>
                <br /><br />
                <HelpHint
                    className="right"
                    hintText="Regular length tooltip (default)"
                />
                &nbsp; &nbsp;
                <HelpHint
                    className="right medium-tooltip"
                    hintText="Medium length tooltip"
                />
                &nbsp; &nbsp;
                <HelpHint
                    className="right short-tooltip"
                    hintText="Short length tooltip"
                />
                <br /><br />
                <strong>
                    Inline help hint style.
                </strong>
                <br /><br />
                <FormTextField
                    labelText="Label"
                    labelHelpText="Here is an inline help hint"
                    helpCss="short-tooltip inline"
                />


            </div>
        );
    }
});

module.exports = HelpHintDemo;
