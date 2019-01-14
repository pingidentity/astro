import React, { Component } from "react";
import Tutorial from "./Tutorial";
import Markup from "../../core/Markup";
import classnames from "classnames";
import FormRadioInput from "ui-library/lib/components/forms/FormRadioInput";
import FormCheckbox from "ui-library/lib/components/forms/FormCheckbox";
import FormLabel from "ui-library/lib/components/forms/FormLabel";
var FormTextField = require("./../../../components/forms/form-text-field").v2,
    Toggle = require("../../../components/forms/form-toggle").v2;

class Inputs extends Component {
    state = {
        showFieldset: false
    };

    _toggleFieldset = () => {
        this.setState ({
            showFieldset: !this.state.showFieldset
        });
    };

    render() {
        var fieldsetCss = {
            focused: this.state.showFieldset,
            unfocused: !this.state.showFieldset
        };
        return (
            <Tutorial>
                <h2>Fieldsets</h2>
                <p>
                    In some designs you may find a group of inputs shown when another control is
                    selected/toggled/etc. You can easily style this by using the "fieldset" tag with the
                    "focused" and "unfocused" class (see below).
                </p>
                <p>
                    Note that in the example below, the toggle lives inside of the "legend" tag. This insures
                    that the control(s) that toggle the visibility of the fieldset appears in the proper
                    location.
                </p>
                <p>
                    Also note that while the "focused" class adds the outline and padding required for such
                    designs, the "unfocused" class is used to preserve the legend placement when the border
                    isn't present.
                </p>
                <div className="output">
                    <fieldset className={classnames(fieldsetCss)}>
                        <legend>
                            <Toggle stateless={true} onToggle={this._toggleFieldset} toggled={this.state.showFieldset}
                                value={this.state.showFieldset} />
                            &nbsp; Click here to toggle fieldset content
                        </legend>

                        {this.state.showFieldset && (
                            <FormTextField labelText="Toggled Text Input" />
                        )}

                    </fieldset>
                </div>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<fieldset className="{classNames({ focused: this.state.showFieldset, unfocused: !this.state.showFieldset })}">',
                            '    <legend>',
                            '        <Toggle onToggle={this._toggleFieldset} value={this.state.showFieldset} />',
                            '        &nbsp; Click here to toggle fieldset content',
                            '    </legend>',
                            '    {this.state.showFieldset && (',
                            '        <FormTextField labelText="Toggled Text Input" />',
                            '    )}',
                            '</fieldset>'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />
                <br /> <br />
                <h2>Input Variations</h2>
                <p>
                    Our inputs are usually a light blue-gray color, but in some
                    contexts are better displayed with a white variant. This can
                    be triggered by surrounding the inputs in the 'modifier_light-inputs'
                    class.
                </p>

                <div>
                    <FormTextField labelText="Normal Text Input" value="Content of normal input" />
                    <div>
                        <FormLabel>Normal Radio Button and Checkbox</FormLabel><br />
                        <FormRadioInput name="nothing" value="nothing" checked={true} />
                        <FormCheckbox name="nothing" value="nothing" checked={true} />
                    </div>
                </div>
                <hr className="hr" />
                <div className="modifier_light-inputs" style={{ background: "#f8f8f8", padding: 15 }}>
                    <FormTextField labelText="White BG Text Input" value="Content of white input" />
                    <div>
                        <FormLabel>White BG Radio Button and Checkbox</FormLabel><br />
                        <FormRadioInput name="nothing" value="nothing" checked={true} />
                        <FormCheckbox name="nothing" value="nothing" checked={true} />
                    </div>
                </div>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<div>',
                            '    <FormTextField labelText="Normal Text Input" value="Content of normal input" />',
                            '    <div>',
                            '        <FormLabel>Normal Radio Button and Checkbox</FormLabel><br />',
                            '        <FormRadioInput name="nothing" value="nothing" checked={true} />',
                            '        <FormCheckbox name="nothing" value="nothing" checked={true} />',
                            '    </div>',
                            '</div>',
                            '<hr className="hr" />',
                            '<div className="modifier_light-inputs" style={{background: "#f8f8f8", padding: 15}}>',
                            '    <FormTextField labelText="White BG Text Input" value="Content of white input" />',
                            '    <div>',
                            '        <FormLabel>White BG Radio Button and Checkbox</FormLabel><br />',
                            '        <FormRadioInput name="nothing" value="nothing" checked={true} />',
                            '        <FormCheckbox name="nothing" value="nothing" checked={true} />',
                            '    </div>',
                            '</div>',
                            /* eslint-enable */
                        ].join("\n")
                    }
                />
            </Tutorial>
        );
    }
}

module.exports = Inputs;