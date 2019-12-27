/*eslint-disable valid-jsdoc*/

//For some very odd reason linting picks up the "/**"  JSDoc definitions of the @alias as having a JSDoc syntax error. So we disable.

import React from "react";
import FormTextArea from "./../../../components/forms/form-text-area";
import FormTextField from "./../../../components/forms/form-text-field";
import FormCheckbox from "./../../../components/forms/FormCheckbox";
import FormDropDownList from "./../../../components/forms/FormDropDownList";
import InputWidths from "./../../../components/forms/InputWidths";
import HR from "ui-library/lib/components/general/HR";

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
                Input widths are no longer declared using CSS class names. While the CSS classes are still supported,
                this usage is deprecated.  Widths should now be specified using the "width" prop on each input.  See the
                examples below:

                <HR />

                <div>
                    <FormTextField labelText="X-Large" width={InputWidths.XL} />
                    <FormTextField labelText="X-Small" width={InputWidths.XS} />
                </div>
                <div>
                    <FormTextField labelText="Large" width={InputWidths.LG} />
                    <FormTextField labelText="Small" width={InputWidths.SM} />
                </div>
                <div>
                    <FormTextField labelText="Medium" width={InputWidths.MD} />
                    <FormTextField labelText="Medium with a extra veryvery long label name"
                        width={InputWidths.MD} />
                </div>
                <div>
                    <FormTextField labelText="Small" width={InputWidths.SM} />
                    <FormTextField labelText="Small" width={InputWidths.SM} />
                    <FormTextField labelText="Small" width={InputWidths.SM} />
                </div>
                <div>
                    <FormTextField labelText="Maximum/100%" width={InputWidths.MAX} />
                </div>
                <div>
                    <FormTextField labelText="X-Small" width={InputWidths.XS} />
                    <FormTextField labelText="X-Small" width={InputWidths.XS} />
                    <FormTextField labelText="X-Small" width={InputWidths.XS} />
                    <FormTextField labelText="X-Small" width={InputWidths.XS} />
                    <FormTextField labelText="X-Small" width={InputWidths.XS} />
                    <FormTextField labelText="X-Small and with a veryvery longlabelname"
                        width={InputWidths.XS} />
                </div>

                <HR />

                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Full"
                        width={InputWidths.XX}
                    />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Large"
                        width={InputWidths.XL} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Large"
                        width={InputWidths.LG} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Small"
                        width={InputWidths.SM} />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Medium"
                        width={InputWidths.MD} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Medium"
                        width={InputWidths.MD} />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Small"
                        width={InputWidths.SM} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Small"
                        width={InputWidths.SM} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Small"
                        width={InputWidths.SM} />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Maximum/100%"
                        width={InputWidths.MAX} />
                </div>

                <HR />

                <div>
                    <FormTextArea labelText="Full" width={InputWidths.XX} />
                </div>
                <div>
                    <FormTextArea labelText="X-Large" width={InputWidths.XL} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} />
                </div>
                <div>
                    <FormTextArea labelText="Large" width={InputWidths.LG} />
                    <FormTextArea labelText="Small" width={InputWidths.SM} />
                </div>
                <div>
                    <FormTextArea labelText="Medium" width={InputWidths.MD} />
                    <FormTextArea labelText="Medium" width={InputWidths.MD} />
                </div>
                <div>
                    <FormTextArea labelText="Small" width={InputWidths.SM} />
                    <FormTextArea labelText="Small" width={InputWidths.SM} />
                    <FormTextArea labelText="Small" width={InputWidths.SM} />
                </div>
                <div>
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} />
                </div>
                <div>
                    <FormTextArea labelText="Maximum/100%" width={InputWidths.MAX} />
                </div>

                <HR />

                <div>
                    <FormCheckbox label="Full" width={InputWidths.XX} />
                </div>
                <div>
                    <FormCheckbox label="X-Large" width={InputWidths.XL} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} />
                </div>
                <div>
                    <FormCheckbox label="Large" width={InputWidths.LG} />
                    <FormCheckbox label="Small" width={InputWidths.SM} />
                </div>
                <div>
                    <FormCheckbox label="Medium" width={InputWidths.MD} />
                    <FormCheckbox label="Medium" width={InputWidths.MD} />
                </div>
                <div>
                    <FormCheckbox label="Small" width={InputWidths.SM} />
                    <FormCheckbox label="Small" width={InputWidths.SM} />
                    <FormCheckbox label="Small" width={InputWidths.SM} />
                </div>
                <div>
                    <FormCheckbox label="X-Small" width={InputWidths.XS} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} />
                </div>
                <div>
                    <FormCheckbox label="Maximum/100%" width={InputWidths.MAX} />
                </div>
            </div>
        );
    }
}

module.exports = FormInputWidthsDemo;
