/*eslint-disable valid-jsdoc*/

//For some very odd reason linting picks up the "/**"  JSDoc definitions of the @alias as having a JSDoc syntax error. So we disable.

import React from "react";
import FormTextArea from "./../../../components/forms/form-text-area";
import FormTextField from "./../../../components/forms/form-text-field";
import FormCheckbox from "./../../../components/forms/FormCheckbox";
import FormDropDownList from "./../../../components/forms/FormDropDownList";
import InputWidths from "./../../../components/forms/InputWidths";
import HR from "ui-library/lib/components/general/HR";
import { allFlags } from "ui-library/lib/util/FlagUtils";

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
                this usage is depricated.  Widths should now be specified using the "width" prop on each input.  See the
                examples below:

                <HR />

                <div>
                    <FormTextField labelText="X-Large" width={InputWidths.XL} flags={allFlags} />
                    <FormTextField labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                </div>
                <div>
                    <FormTextField labelText="Large" width={InputWidths.LG} flags={allFlags} />
                    <FormTextField labelText="Small" width={InputWidths.SM} flags={allFlags} />
                </div>
                <div>
                    <FormTextField labelText="Medium" width={InputWidths.MD} flags={allFlags} />
                    <FormTextField labelText="Medium with a extra veryvery long label name"
                        width={InputWidths.MD} flags={allFlags} />
                </div>
                <div>
                    <FormTextField labelText="Small" width={InputWidths.SM} flags={allFlags} />
                    <FormTextField labelText="Small" width={InputWidths.SM} flags={allFlags} />
                    <FormTextField labelText="Small" width={InputWidths.SM} flags={allFlags} />
                </div>
                <div>
                    <FormTextField labelText="Maximum/100%" width={InputWidths.MAX} flags={allFlags} />
                </div>
                <div>
                    <FormTextField labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormTextField labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormTextField labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormTextField labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormTextField labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormTextField labelText="X-Small and with a veryvery longlabelname"
                        width={InputWidths.XS} flags={allFlags} />
                </div>

                <HR />

                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Full"
                        width={InputWidths.XX} flags={allFlags}
                    />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Large"
                        width={InputWidths.XL} flags={allFlags} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} flags={allFlags} />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Large"
                        width={InputWidths.LG} flags={allFlags} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Small"
                        width={InputWidths.SM} flags={allFlags} />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Medium"
                        width={InputWidths.MD} flags={allFlags} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Medium"
                        width={InputWidths.MD} flags={allFlags} />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Small"
                        width={InputWidths.SM} flags={allFlags} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Small"
                        width={InputWidths.SM} flags={allFlags} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Small"
                        width={InputWidths.SM} flags={allFlags} />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} flags={allFlags} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} flags={allFlags} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} flags={allFlags} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} flags={allFlags} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} flags={allFlags} />
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="X-Small"
                        width={InputWidths.XS} flags={allFlags} />
                </div>
                <div>
                    <FormDropDownList selectedOption={{}} options={selectOptions} label="Maximum/100%"
                        width={InputWidths.MAX} flags={allFlags} />
                </div>

                <HR />

                <div>
                    <FormTextArea labelText="Full" width={InputWidths.XX} flags={allFlags} />
                </div>
                <div>
                    <FormTextArea labelText="X-Large" width={InputWidths.XL} flags={allFlags} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                </div>
                <div>
                    <FormTextArea labelText="Large" width={InputWidths.LG} flags={allFlags} />
                    <FormTextArea labelText="Small" width={InputWidths.SM} flags={allFlags} />
                </div>
                <div>
                    <FormTextArea labelText="Medium" width={InputWidths.MD} flags={allFlags} />
                    <FormTextArea labelText="Medium" width={InputWidths.MD} flags={allFlags} />
                </div>
                <div>
                    <FormTextArea labelText="Small" width={InputWidths.SM} flags={allFlags} />
                    <FormTextArea labelText="Small" width={InputWidths.SM} flags={allFlags} />
                    <FormTextArea labelText="Small" width={InputWidths.SM} flags={allFlags} />
                </div>
                <div>
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormTextArea labelText="X-Small" width={InputWidths.XS} flags={allFlags} />
                </div>
                <div>
                    <FormTextArea labelText="Maximum/100%" width={InputWidths.MAX} flags={allFlags} />
                </div>

                <HR />

                <div>
                    <FormCheckbox label="Full" width={InputWidths.XX} flags={allFlags} />
                </div>
                <div>
                    <FormCheckbox label="X-Large" width={InputWidths.XL} flags={allFlags} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} flags={allFlags} />
                </div>
                <div>
                    <FormCheckbox label="Large" width={InputWidths.LG} flags={allFlags} />
                    <FormCheckbox label="Small" width={InputWidths.SM} flags={allFlags} />
                </div>
                <div>
                    <FormCheckbox label="Medium" width={InputWidths.MD} flags={allFlags} />
                    <FormCheckbox label="Medium" width={InputWidths.MD} flags={allFlags} />
                </div>
                <div>
                    <FormCheckbox label="Small" width={InputWidths.SM} flags={allFlags} />
                    <FormCheckbox label="Small" width={InputWidths.SM} flags={allFlags} />
                    <FormCheckbox label="Small" width={InputWidths.SM} flags={allFlags} />
                </div>
                <div>
                    <FormCheckbox label="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} flags={allFlags} />
                    <FormCheckbox label="X-Small" width={InputWidths.XS} flags={allFlags} />
                </div>
                <div>
                    <FormCheckbox label="Maximum/100%" width={InputWidths.MAX} flags={allFlags} />
                </div>
            </div>
        );
    }
}

module.exports = FormInputWidthsDemo;
