import React from "react";
import ButtonBar from "ui-library/lib/components/forms/ButtonBar";
import FormTextField from "ui-library/lib/components/forms/form-text-field";
import InputRow from "ui-library/lib/components/layout/InputRow";
import Messages from "ui-library/lib/components/general/messages/Messages";
import FormValidator, {
    ButtonBarValidated,
    FormTextFieldValidated
} from "ui-library/lib/components/forms/FormValidator";
import moment from "moment";
import { isValidEmail, isValidUrl, isValidPhoneNumber } from "../../../../util/Validators";
import { FormDemo } from "../../forms/FormValidatorDemo";

export class ShowSaveBar extends React.Component {
    initialValue = "change me";

    state = {
        value: this.initialValue,
        savedValue: this.initialValue,
    };

    _handleChange = value => this.setState({ value });
    _handleSave = () => this.setState(state => ({ savedValue: state.value }));
    _handleDiscard = () => this.setState(state => ({ value: state.savedValue }));

    _isChanged = () => this.state.savedValue !== this.state.value;

    render = () => (
        <div>
            <FormTextField
                flags={["v4"]}
                value={this.state.value}
                onValueChange={this._handleChange}
                labelText="A Field"
            />
            <ButtonBar
                flags={["v4"]}
                unfixed
                visible={this._isChanged()}
                onSave={this._handleSave}
                onDiscard={this._handleDiscard}
            />
        </div>
    );
}

export class RequiredFields extends React.Component {
    render = () => (
        <div>
            <FormTextField
                labelText="A Required Field"
                required
                flags={["v4"]}
                placeholder="Enter Something"
            />
            <FormTextField
                required
                flags={["v4"]}
                labelText="A Second Field"
                placeholder="Enter Something"
            />
            <FormTextField
                labelText="A Third Field"
                required
                flags={["v4"]}
                placeholder="Enter Something"
            />
        </div>
    );
}

export class DisableSave extends FormDemo {
    constructor(props) {
        super(props, {
            name: "",
            eight: "",
        });
    }

    _errorEightChars = () => {
        const { eight } = this.state;
        return (eight !== "" && eight.length !== 8)
            ? "If you must put something in this field, please make it eight characters long."
            : "";
    }

    _moreThanEight = () => (this.state.eight.length > 8);

    render = () => (
        <FormValidator
            fields={{
                eight: {
                    errorMessage: this._errorEightChars(),
                    forceShow: this._moreThanEight(),
                }
            }}
            requiredValues={[this.state.name]}
            onInvalidSave={this._saveError}
        >
            <Messages messages={this._getMessages()} flags={["v4"]} />
            <InputRow>
                <FormTextField
                    flags={["v4"]}
                    value={this.state.name}
                    onValueChange={this._handleChange("name")}
                    labelText="A Required Field"
                    required
                />
            </InputRow>
            <InputRow>
                <FormTextFieldValidated
                    formKey="eight"
                    flags={["v4"]}
                    value={this.state.eight}
                    onValueChange={this._handleChange("eight")}
                    labelText="A Field That Must Be 8 Characters Long"
                />
            </InputRow>
            <ButtonBarValidated
                flags={["v4"]}
                unfixed
                visible={this._isChanged()}
                onSave={this._handleSave}
                onDiscard={this._handleDiscard}
                saveDisabledText="You have required fields."
            />
        </FormValidator>
    );
}

export class InvalidCharacters extends React.Component {
    state = {
        value: "",
    }

    _handleChange = value => {
        const sanitized = value.replace(/\s/, "");
        this.setState({ value: sanitized });
    }

    render() {
        return (
            <div>
                <FormTextField
                    flags={["v4"]}
                    value={this.state.value}
                    onValueChange={this._handleChange}
                    labelText="No Spaces Please"
                    subText="No spaces"
                />
            </div>
        );
    }
}

export class AutoFormat extends React.Component {
    state = {
        cardValue: "",
        filenameValue: "",
    }

    _handleChangeCard = value => {
        let formatted = "";
        for (let i = 0; (i < value.length && formatted.length < 19); i += 1) {
            if (value[i].match(/[0-9]/) !== null) {
                if ((formatted.length + 1) % 5 === 0) {
                    formatted = `${formatted} `;
                }
                formatted = `${formatted}${value[i]}`;
            }
            if (value[i].match(/[\s\.\-]/) && ((formatted.length + 1) % 5) === 0) {
                formatted = `${formatted} `;
            }
        }
        this.setState({ cardValue: formatted });
    }

    _handleChangeFilename = value => {
        this.setState({ filenameValue: value.replace(/\s/, "_").toLowerCase() });
    }

    render() {
        return (
            <div>
                <InputRow>
                    <FormTextField
                        flags={["v4"]}
                        value={this.state.cardValue}
                        onValueChange={this._handleChangeCard}
                        labelText="Credit Card"
                        placeholder="xxxx xxxx xxxx xxxx"
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        flags={["v4"]}
                        value={this.state.filenameValue}
                        onValueChange={this._handleChangeFilename}
                        labelText="Filename"
                        subText="All lowercase, underscores instead of spaces"
                    />
                </InputRow>
            </div>
        );
    }
}

export class Reformat extends React.Component {
    state = {
        date: "",
        dateError: false,
    }

    _handleDateChange = value => {
        this.setState({ date: value });

        if (value === "" || moment(value).isValid()) {
            this.setState({ dateError: false });
        }
    };

    _formatDate = () => this.setState(state => {
        if (state.date === "") {
            return {};
        }

        const dateObject = moment(state.date);

        return (dateObject.isValid())
            ? { date: dateObject.format("YYYY-MM-DD hh:MM:SS a") }
            : { dateError: true };
    });

    render() {
        return (
            <div>
                <FormTextField
                    flags={["v4"]}
                    value={this.state.date}
                    onValueChange={this._handleDateChange}
                    onBlur={this._formatDate}
                    labelText="Expiration Date"
                    errorMessage={this.state.dateError ? "Invalid date" : ""}
                    labelHelpText="Type in a date and click off the field."
                    placeholder="YYYY-MM-DD hh:MM:SS a"
                />
            </div>
        );
    }
}

export class InvalidFormats extends FormDemo {
    constructor(props) {
        super(props, {
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

    render = () => (
        <FormValidator
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
            <Messages messages={this._getMessages()} flags={["v4"]} />
            <InputRow>
                <FormTextFieldValidated
                    formKey="email"
                    flags={["v4"]}
                    value={this.state.email}
                    onValueChange={this._handleChange("email")}
                    labelText="Email"
                    placeholder="abcd@efghijk.com"
                />
            </InputRow>
            <InputRow>
                <FormTextFieldValidated
                    formKey="url"
                    flags={["v4"]}
                    value={this.state.url}
                    onValueChange={this._handleChange("url")}
                    labelText="URL"
                    placeholder="https://some.domain.com"
                />
            </InputRow>
            <InputRow>
                <FormTextFieldValidated
                    formKey="phone"
                    flags={["v4"]}
                    value={this.state.phone}
                    onValueChange={this._handleChange("phone")}
                    labelText="Phone"
                    placeholder="555-666-7777"
                />
            </InputRow>
            <ButtonBarValidated
                flags={["v4"]}
                unfixed
                visible={this._isChanged()}
                onSave={this._handleSave}
                onDiscard={this._handleDiscard}
                saveDisabledText="You have required fields."
            />
        </FormValidator>
    );
}

export class UniqueValue extends FormDemo {
    constructor(props) {
        super(props, {
            name: "",
        });
    }

    _isNotUnique = name => (name.toLowerCase() !== "joe" && name.toLowerCase() !== "denise");

    render = () => (
        <FormValidator messages={{
            name: {
                errorMessage: this._isNotUnique(this.state.name) ? "" : "You can't be Joe or Denise.",
            }
        }} onInvalidSave={this._saveError} >
            <Messages messages={this._getMessages()} flags={["v4"]} />
            <FormTextFieldValidated
                flags={["v4"]}
                formKey="name"
                value={this.state.name}
                onValueChange={this._handleChange("name")}
                labelText="Name (Not Joe or Denise)"
            />
            <ButtonBarValidated
                flags={["v4"]}
                unfixed
                visible={this._isChanged()}
                onSave={this._handleSave}
                onDiscard={this._handleDiscard}
            />
        </FormValidator>
    );
}
