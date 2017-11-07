/*eslint-disable valid-jsdoc*/

//For some very odd reason linting picks up the "/**"  JSDoc definitions of the @alias as having a JSDoc syntax error. So we disable.

var React = require("react"),
    FormTextArea = require("./../../../components/forms/form-text-area"),
    FormTextField = require("./../../../components/forms/form-text-field"),
    FormSelectField = require("./../../../components/forms/form-select-field"),
    FormCheckbox = require("./../../../components/forms/FormCheckbox.jsx"),
    FormDropDownList = require("./../../../components/forms/FormDropDownList.jsx");

/**
* @name FormInputWidthsDemo
* @memberof module:constants/FormFieldConstants
* @desc A demo of CSS classes to set form field inputs
*/
class FormInputWidthsDemo extends React.Component {
    render() {
        var selectOptions = [
            { label: "value1", value: "Option One" },
            { label: "value2", value: "Option Two" },
            { label: "value3", value: "Option Three" },
            { label: "value4", value: "Option Four" },
            { label: "value5", value: "Option Five" },
        ];

        return (
            <div>
                <div>
                    Reusable input width CSS classes:

                    <ul className="ul">
                        <li>.input-width-xsmall</li>
                        <li>.input-width-small</li>
                        <li>.input-width-medium</li>
                        <li>.input-width-large</li>
                        <li>.input-width-xlarge</li>
                        <li>.input-width-full</li>
                    </ul>
                </div>
                <div>
                    <FormTextField labelText="Full" className="input-width-full" />
                </div>
                <div>
                    <FormTextField labelText="X-Large" className="input-width-xlarge" />
                    <FormTextField labelText="X-Small" className="input-width-xsmall" />
                </div>
                <div>
                    <FormTextField labelText="Large" className="input-width-large" />
                    <FormTextField labelText="Small" className="input-width-small" />
                </div>
                <div>
                    <FormTextField labelText="Medium" className="input-width-medium" />
                    <FormTextField labelText="Medium with a extra veryvery long label name"
                        className="input-width-medium" />
                </div>
                <div>
                    <FormTextField labelText="Small" className="input-width-small" />
                    <FormTextField labelText="Small" className="input-width-small" />
                    <FormTextField labelText="Small" className="input-width-small" />
                </div>
                <div>
                    <FormTextField labelText="X-Small" className="input-width-xsmall" />
                    <FormTextField labelText="X-Small" className="input-width-xsmall" />
                    <FormTextField labelText="X-Small" className="input-width-xsmall" />
                    <FormTextField labelText="X-Small" className="input-width-xsmall" />
                    <FormTextField labelText="X-Small" className="input-width-xsmall" />
                    <FormTextField labelText="X-Small and with a veryvery longlabelname"
                        className="input-width-xsmall" />
                </div>

                <br />

                <div>
                    <FormSelectField value="" options={selectOptions} label="Full" className="input-width-full" />
                </div>
                <div>
                    <FormSelectField value="" options={selectOptions} label="X-Large" className="input-width-xlarge" />
                    <FormSelectField value="" options={selectOptions} label="X-Small" className="input-width-xsmall" />
                </div>
                <div>
                    <FormSelectField value="" options={selectOptions} label="Large" className="input-width-large" />
                    <FormSelectField value="" options={selectOptions} label="Small" className="input-width-small" />
                </div>
                <div>
                    <FormSelectField value="" options={selectOptions} label="Medium" className="input-width-medium" />
                    <FormSelectField value="" options={selectOptions} label="Medium" className="input-width-medium" />
                </div>
                <div>
                    <FormSelectField value="" options={selectOptions} label="Small" className="input-width-small" />
                    <FormSelectField value="" options={selectOptions} label="Small" className="input-width-small" />
                    <FormSelectField value="" options={selectOptions} label="Small" className="input-width-small" />
                </div>
                <div>
                    <FormSelectField value="" options={selectOptions} label="X-Small" className="input-width-xsmall" />
                    <FormSelectField value="" options={selectOptions} label="X-Small" className="input-width-xsmall" />
                    <FormSelectField value="" options={selectOptions} label="X-Small" className="input-width-xsmall" />
                    <FormSelectField value="" options={selectOptions} label="X-Small" className="input-width-xsmall" />
                    <FormSelectField value="" options={selectOptions} label="X-Small" className="input-width-xsmall" />
                    <FormSelectField value="" options={selectOptions} label="X-Small" className="input-width-xsmall" />
                </div>

                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="Full"className="input-width-full" />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="X-Large" className="input-width-xlarge" />
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="X-Small" className="input-width-xsmall" />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="Large" className="input-width-large" />
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="Small" className="input-width-small" />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="Medium" className="input-width-medium" />
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="Medium" className="input-width-medium" />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="Small" className="input-width-small" />
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="Small" className="input-width-small" />
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="Small" className="input-width-small" />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="X-Small" className="input-width-xsmall" />
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="X-Small" className="input-width-xsmall" />
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="X-Small" className="input-width-xsmall" />
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="X-Small" className="input-width-xsmall" />
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="X-Small" className="input-width-xsmall" />
                    <FormDropDownList selectedOption={{}} options={selectOptions}
                            label="X-Small" className="input-width-xsmall" />
                </div>

                <br />

                <div>
                    <FormCheckbox label="Full" className="input-width-full" />
                </div>
                <div>
                    <FormCheckbox label="X-Large" className="input-width-xlarge" />
                    <FormCheckbox label="X-Small" className="input-width-xsmall" />
                </div>
                <div>
                    <FormCheckbox label="Large" className="input-width-large" />
                    <FormCheckbox label="Small" className="input-width-small" />
                </div>
                <div>
                    <FormCheckbox label="Medium" className="input-width-medium" />
                    <FormCheckbox label="Medium" className="input-width-medium" />
                </div>
                <div>
                    <FormCheckbox label="Small" className="input-width-small" />
                    <FormCheckbox label="Small" className="input-width-small" />
                    <FormCheckbox label="Small" className="input-width-small" />
                </div>
                <div>
                    <FormCheckbox label="X-Small" className="input-width-xsmall" />
                    <FormCheckbox label="X-Small" className="input-width-xsmall" />
                    <FormCheckbox label="X-Small" className="input-width-xsmall" />
                    <FormCheckbox label="X-Small" className="input-width-xsmall" />
                    <FormCheckbox label="X-Small" className="input-width-xsmall" />
                    <FormCheckbox label="X-Small" className="input-width-xsmall" />
                </div>

                <br />

                <div>
                    <FormTextArea labelText="Full" className="input-width-full" />
                </div>
                <div>
                    <FormTextArea labelText="X-Large" className="input-width-xlarge" />
                    <FormTextArea labelText="X-Small" className="input-width-xsmall" />
                </div>
                <div>
                    <FormTextArea labelText="Large" className="input-width-large" />
                    <FormTextArea labelText="Small" className="input-width-small" />
                </div>
                <div>
                    <FormTextArea labelText="Medium" className="input-width-medium" />
                    <FormTextArea labelText="Medium" className="input-width-medium" />
                </div>
                <div>
                    <FormTextArea labelText="Small" className="input-width-small" />
                    <FormTextArea labelText="Small" className="input-width-small" />
                    <FormTextArea labelText="Small" className="input-width-small" />
                </div>
                <div>
                    <FormTextArea labelText="X-Small" className="input-width-xsmall" />
                    <FormTextArea labelText="X-Small" className="input-width-xsmall" />
                    <FormTextArea labelText="X-Small" className="input-width-xsmall" />
                    <FormTextArea labelText="X-Small" className="input-width-xsmall" />
                    <FormTextArea labelText="X-Small" className="input-width-xsmall" />
                    <FormTextArea labelText="X-Small" className="input-width-xsmall" />
                </div>
            </div>
        );
    }
}

module.exports = FormInputWidthsDemo;
