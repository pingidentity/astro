import React from "react";
import InputRow from "../../../components/layout/InputRow";
import FormValidator, { FormTextFieldValidated, ButtonBarValidated } from "../../../components/forms/FormValidator";
import Messages from "../../../components/general/messages";
import { isValidEmail, isValidUrl, isValidPhoneNumber } from "../../../util/Validators";
import FormattedContent from "../../../components/general/FormattedContent";

export class FormDemo extends React.Component {
    constructor(props, initialValues = {}) {
        super(props);
        this.initialValues = initialValues;

        this.state = {
            ...this.initialValues,
            savedValues: this.initialValues,
            message: false,
        };
    }

    _handleChange = key => value => this.setState({ [key]: value });

    _handleSave = () => {
        this.setState(state => ({
            savedValues: { ...state }
        }));
    };

    _handleDiscard = () => (
        this.setState(state => ({
            ...state.savedValues,
            savedValues: state.savedValues,
            message: state.message,
        }))
    );

    _isChanged = () => Object.keys(this.initialValues).reduce((changed, key) => (
        changed ? true : this.state[key] !== this.state.savedValues[key]
    ), false);

    _getMessages = () => (
        this.state.message ? [
            {
                text: "Save failed. You have validation errors.",
                type: "error",
            }
        ] : []
    );

    _saveError = () => {
        this.setState({
            message: true,
        });
        setTimeout(
            () => this.setState({ message: false }),
            5000
        );
    }

    render = () => {
        return <div />;
    };
}

/**
* @name FormValidatorDemo
* @memberof FormValidator
* @desc A demo for FormValidator
*/
class FormValidatorDemo extends FormDemo {
    constructor(props) {
        super(props, {
            name: "",
            email: "",
            url: "",
            phone: "",
        });
    }

    _isEmailValid = () => (
        this.state.email === "" || isValidEmail(this.state.email)
    );

    _isURLValid = () => (
        this.state.url === "" || isValidUrl(this.state.url)
    )

    _isPhoneValid = () => (
        this.state.phone === "" || isValidPhoneNumber(this.state.phone)
    )

    render = () => {
        return (
            <FormValidator
                requiredValues={[ this.state.name, this.state.email ]}
                fields={{
                    email: {
                        errorMessage: this._isEmailValid() ? "" : "Invalid email"
                    },
                    url: {
                        errorMessage: this._isURLValid() ? "" : "Invalid URL"
                    },
                    phone: {
                        errorMessage: this._isPhoneValid() ? "" : "Invalid phone number"
                    },
                }}
                onInvalidSave={this._saveError}
            >
                <Messages messages={this._getMessages()} />
                <FormattedContent>
                    <p>
                        <code>FormValidator</code> is wrapped around your form components and your button bar.
                        To work properly, <code>ButtonBar</code> should be
                        replaced with <code>ButtonBarValidated</code>.
                        The form fields should be enhanced with <code>validatesField</code> (or you can use the
                        pre-enhanced <code>FormTextFieldValidated</code>).
                    </p>
                </FormattedContent>
                <InputRow>
                    <FormTextFieldValidated
                        required
                        formKey="name"
                        value={this.state.name}
                        onValueChange={this._handleChange("name")}
                        labelText="name"
                    />
                </InputRow>
                <InputRow>
                    <FormTextFieldValidated
                        required
                        formKey="email"
                        value={this.state.email}
                        onValueChange={this._handleChange("email")}
                        labelText="Email"
                        placeholder="abcd@efghijk.com"
                    />
                </InputRow>
                <InputRow>
                    <FormTextFieldValidated
                        formKey="url"
                        value={this.state.url}
                        onValueChange={this._handleChange("url")}
                        labelText="URL"
                        placeholder="https://some.domain.com"
                    />
                </InputRow>
                <InputRow>
                    <FormTextFieldValidated
                        formKey="phone"
                        value={this.state.phone}
                        onValueChange={this._handleChange("phone")}
                        labelText="Phone"
                        placeholder="555-666-7777"
                    />
                </InputRow>
                <ButtonBarValidated
                    unfixed
                    visible={this._isChanged()}
                    onSave={this._handleSave}
                    onDiscard={this._handleDiscard}
                />
            </FormValidator>
        );
    }
}

export default FormValidatorDemo;