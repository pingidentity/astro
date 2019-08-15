import React from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";
import ButtonBar from "./ButtonBar";
import FormTextField from "./form-text-field";
import { usesStableContext } from "../../util/DependencyUtils";

usesStableContext();

/**
 * @class FormValidator
 * @desc A wrapper component that enables certain validation behaviors.
 *       Built to work with components that have been decorated with the validatesField HOC and the special ButtonBarValidated.
 *
 * @param {Object.<FormValidator~FieldData>} fields
 *     Validation data for fields. Use this object to set errors that will display on the associated fields and will affect ButtonBar behavior.
 *     Match the key in this object to the formKey prop set on the connected field component.
 * @param {Array.<string>} requiredValues
 *     An array of the values of required fields. If any of these values are undefined or empty strings, the save button will be disabled.
 * @param {string} validationErrorMessage
 *     Customize the message that shows when there are invalid fields. Shows as a help hint on the save button.
 * @param {string} requiredFieldsMessage
 *     Customize the message that shows when some required fields are empty. Shows as a help hint on the save button.
 * @param {function} onInvalidSave
 *     Callback for when the save button is clicked while there are validation problems. Receives the validationErrorMessage.
 */

/**
 *
 * @typedef {Object} FormValidator~FieldData
 * @param {string} [errorMessage]
 *     Text of the error message. An empty string means there is no error.
 *     By default, this message only shows after the field has blurred.
 * @param {boolean} [forceShow = false]
 *     When true, this will force any error message to be shown even before blurring the field.
 */

const ValidationContext = React.createContext({
    fields: {},
    touched: {},
    disabledText: "",
    onInvalidSave: noop,
});

const makeOnBlur = (touchField, onBlur = noop) => e => {
    touchField();
    onBlur(e);
};

export const validatesField = WrappedComponent => {
    const NewComponent = ({ formKey, onBlur, errorMessage, ...props }) => (
        <ValidationContext.Consumer>
            {({
                touched: {
                    [formKey]: isTouched = false
                },
                fields: {
                    [formKey]: field = {}
                },
                makeTouchField,
            }) => {
                return (
                    <WrappedComponent
                        {...props}
                        onBlur={
                            field && field.errorMessage
                                ? makeOnBlur(makeTouchField(formKey), onBlur)
                                : onBlur
                        }
                        errorMessage={
                            errorMessage || ((isTouched || field.forceShow) && field.errorMessage) || ""
                        }
                    />
                );
            }}
        </ValidationContext.Consumer>
    );

    NewComponent.displayName = WrappedComponent.displayName;
    return NewComponent;
};

/**
 * @class ButtonBarValidated
 * @desc An enhanced version of ButtonBar that can be used inside FormValidator to show/hide/disable based on field validation.
 *       It doesn't take any other props than the normal ButtonBar.
 * @memberof FormValidator
 * @see ButtonBar
 */
export const ButtonBarValidated = ({ saveDisabled, saveDisabledText, onDiscard = noop, ...props }) => (
    <ValidationContext.Consumer>
        {({ disabledText, onSaveMouseDown, clearTouches }) => (
            <ButtonBar
                {...props}
                saveDisabled={saveDisabled || (disabledText !== "")}
                saveDisabledText={disabledText || saveDisabledText}
                onSaveMouseDown={onSaveMouseDown}
                onDiscard={
                    e => {
                        clearTouches();
                        onDiscard(e);
                    }
                }
            />
        )}
    </ValidationContext.Consumer>
);

/**
 * @class FormTextFieldValidated
 * @desc An enhanced version of FormTextField that can be used inside FormValidator show error messages.
 * @param {string} [formKey]
 *     The key that's used in the 'fields' prop of FormValidator
 * @memberof FormValidator
 * @see FormTextField
 */
export const FormTextFieldValidated = validatesField(FormTextField);

export default class FormValidator extends React.Component {
    state = {
        touched: {},
    }

    static propTypes = {
        fields: PropTypes.objectOf(PropTypes.shape({
            errorMessage: PropTypes.string,
            forceShow: PropTypes.bool,
        })),
        requiredValues: PropTypes.array,
        validationErrorMessage: PropTypes.string,
        requiredFieldsMessage: PropTypes.string,
        onInvalidSave: PropTypes.func,
    }

    static defaultProps = {
        fields: {},
        requiredValues: [],
        validationErrorMessage: "You have validation errors.",
        requiredFieldsMessage: "You have missing required fields.",
        onInvalidSave: noop,
    }

    _allRequired = () => this.props.requiredValues.every(
        value => (value !== undefined && value !== "")
    );

    _anyInvalid = () => {
        const { fields } = this.props;

        return Object.keys(fields).some(key => (fields[key].errorMessage ? true : false));
    }

    _anyErrors = () => {
        const { fields } = this.props;

        return Object.keys(fields).some(key => (
            ((this.state.touched[key] || fields[key].forceShow) && fields[key].errorMessage) ? true : false
        ));
    }

    _getDisabledText = () => {
        const { validationErrorMessage, requiredFieldsMessage } = this.props;
        if (this._anyErrors()) {
            return validationErrorMessage;
        } else if (!this._allRequired()) {
            return requiredFieldsMessage;
        }

        return "";
    };

    _makeTouchField = key => () => this.setState(state => ({ touched: { ...state.touched, [key]: true } }));

    _clearTouches = () => this.setState({ touched: {} });

    _handleInvalidSave = () => this.props.onInvalidSave(this._getDisabledText());

    render() {
        const { fields, children } = this.props;

        return (
            <ValidationContext.Provider value={{
                fields,
                touched: this.state.touched,
                disabledText: this._getDisabledText(),
                makeTouchField: this._makeTouchField,
                onSaveMouseDown: this._anyInvalid() ? this._handleInvalidSave : noop,
                clearTouches: this._clearTouches,
            }}>{children}</ValidationContext.Provider>
        );
    }
}
