
var React = require("react"),
    FormTextArea = require("./../../../components/forms/FormTextArea.jsx"),
    FormTextField = require("./../../../components/forms/FormTextField.jsx"),
    FormSelectField = require("./../../../components/forms/FormSelectField.jsx"),
    FormCheckbox = require("./../../../components/forms/FormCheckbox.jsx");


var FormInputWidthsDemo = React.createClass({

    render: function () {
        var selectOptions = {
            value1: "Option One",
            value2: "Option Two",
            value3: "Option Three",
            value4: "Option Four",
            value5: "Option Fiv"
        };

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
                    <FormTextField labelText="Small but with a veryverylonglabel name"
                        className="input-width-small" />
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
                    <FormSelectField options={selectOptions} label="Full" className="input-width-full" />
                </div>
                <div>
                    <FormSelectField options={selectOptions} label="X-Large" className="input-width-xlarge" />
                    <FormSelectField options={selectOptions} label="X-Small" className="input-width-xsmall" />
                </div>
                <div>
                    <FormSelectField options={selectOptions} label="Large" className="input-width-large" />
                    <FormSelectField options={selectOptions} label="Small" className="input-width-small" />
                </div>
                <div>
                    <FormSelectField options={selectOptions} label="Medium" className="input-width-medium" />
                    <FormSelectField options={selectOptions} label="Medium" className="input-width-medium" />
                </div>
                <div>
                    <FormSelectField options={selectOptions} label="Small" className="input-width-small" />
                    <FormSelectField options={selectOptions} label="Small" className="input-width-small" />
                    <FormSelectField options={selectOptions} label="Small" className="input-width-small" />
                </div>
                <div>
                    <FormSelectField options={selectOptions} label="X-Small" className="input-width-xsmall" />
                    <FormSelectField options={selectOptions} label="X-Small" className="input-width-xsmall" />
                    <FormSelectField options={selectOptions} label="X-Small" className="input-width-xsmall" />
                    <FormSelectField options={selectOptions} label="X-Small" className="input-width-xsmall" />
                    <FormSelectField options={selectOptions} label="X-Small" className="input-width-xsmall" />
                    <FormSelectField options={selectOptions} label="X-Small" className="input-width-xsmall" />
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
});

module.exports = FormInputWidthsDemo;
