import React from "react";
import FormCheckbox from "../components/forms/FormCheckbox";
import FormDropDownList from "../components/forms/FormDropDownList";
import FormTextField from "../components/forms/form-text-field";
import Icon from "../components/general/Icon";
import Indent from "../components/general/Indent";
import PageHeader from "../components/general/PageHeader";
import RowBuilder from "../components/rows/RowBuilder";

/**
 * @class SSO Attributes
 * @desc This is a template to demonstrate how to build an SSO Attribute screen.
 */
const SSOAttributes = () => {
    const firstRow = (
        [<div className="row-builder--form__row" key="first">
            <FormDropDownList
                className="row-builder--form__input input-width-medium"
                options={[ { label: "Name" } ]}
                autofocus={true}
                label="Pingone User Attribute"
            />
            <Icon className="row-builder--form__icon" iconName="link"/>
            <FormTextField
                className="row-builder--form__input input-width-medium"
                labelText="Application Attribute"
                value="Customer Name"
            />
            <FormCheckbox
                label="Required"
                className="inline"
            />
        </div>]
    );

    const secondRow = (
        [<div className="row-builder--form__row" key="second">
            <FormDropDownList
                className="row-builder--form__input input-width-medium"
                label="Pingone User Attribute"
                noneOption={{ label: "Select a PingOne attribute" }}
                options={[{ label: "Name" }]}
                required
                selectedOption={{ label: "Select a PingOne attribute" }}
                selectedOptionLabelClassName="row-builder--form__input__option"
            />
            <Icon className="row-builder--form__icon row-builder--form__icon--required" iconName="link"/>
            <FormTextField
                className="row-builder--form__input input-width-medium"
                labelText="Application Attribute"
                placeholder="Enter mapped attribute"
                required
            />
            <FormCheckbox
                className="inline"
                label="Required"
            />
        </div>]
    );

    return (
        <div>
            <PageHeader title="SSO ATTRIBUTES" underlined />
            <Indent border={false} >
                <RowBuilder
                    addLabel="+ ADD ATTRIBUTE"
                    rows={[
                        {
                            id: "first",
                            content: firstRow
                        },
                        {
                            id: "second",
                            content: secondRow
                        }
                    ]}
                    showRemoveLabel
                />
            </Indent>
        </div>
    );
};

export default SSOAttributes;
