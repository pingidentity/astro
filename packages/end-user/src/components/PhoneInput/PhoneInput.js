import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'underscore';
import countryCodes from './countryCodes';
import TextInput, { textInputFormats } from '../TextInput';
import utils from '../../util/Validators';
import GenericStateContainer from '../../util/GenericStateContainer';
import DropdownCustomSearchable from "../DropdownCustomSearchable";

/**
 * @enum {string}
 * @alias PhoneInput~phoneInputStatuses
 * @desc Enum for the different types of text input styling
 */

export const phoneInputStatuses = {
    PRIMARY: 'primary',
    ERROR: 'error',
    SUCCESS: 'success',
};

/**
 * @class PhoneInput
 * @description A component for inputting a country code and number
 * @param {string} [data-id='phone-input']
 *      The data-id attribute value applied to the element.
 * @param {string} country
 *      2-character ISO code for country is selected.
 * @param {boolean} [dropdownOpen=false]
 *      The open state of the dial code dropdown.
 * @param {PhoneInput~onCountryChange} onCountryChange
 *      The callback triggered when the country changes. Callback is provided with ISO country code.
 * @param {PhoneInput~onPhoneNumberValueChange} onPhoneNumberValueChange
 *      The callback triggered when the phone number input value changes.
 * @param {PhoneInput~onSearchValueChange} onSearchValueChange
 *      The callback triggered when the dial code search value changes.
 * @param {string} phoneNumber
 *      The text to display in phone number input.
 * @param {string} placeholder
 *      The text to display in phone number input before a value is entered a a placeholder.
 */
const PhoneInputStateless = ({
    dropdownOpen,
    'data-id': dataId,
    setOpen,
    country: countryName,
    phoneNumber,
    placeholder,
    status,
    fieldMessage,
    fieldMessageProps,
    dialCodeSearchValue,
    onCountryChange,
    onSearchValueChange,
    onPhoneNumberValueChange,
}) => {
    const dropdownClasses = classnames('phone-input__code', {
        'phone-input__code--open': dropdownOpen,
    });
    const country = countryCodes.find(({ iso2 }) => iso2 === countryName);
    const optionsFiltered = countryCodes
      .filter(({ name, dialCode }) => {
          return (
            dialCode.toUpperCase().indexOf(dialCodeSearchValue.toUpperCase()) > -1 ||
            name.toUpperCase().indexOf(dialCodeSearchValue.toUpperCase()) > -1
          )
      })
        .map(({ name, iso2, dialCode }) => {
        return {
            label: `${name} +${dialCode}`,
            value: iso2,
            dialCode: dialCode,
        }
    })

    return (
        <div className="phone-input" data-id={dataId}>
            <div
                className={dropdownClasses}
            >
                <DropdownCustomSearchable
                    id='country-code-input'
                    value={country ? `+${country.dialCode}` : ''}
                    options={optionsFiltered}
                    data-id="country-search"
                    searchPlaceholder="Search countries..."
                    searchValue={dialCodeSearchValue}
                    onValueChange={onCountryChange}
                    onSearchValueChange={onSearchValueChange}
                    open={dropdownOpen}
                    onToggle={setOpen}
                    status={status}
                />
            </div>
            <div className="phone-input__number">
                <TextInput
                    value={phoneNumber}
                    onChange={e => onPhoneNumberValueChange(e.target.value, e)}
                    placeholder={placeholder}
                    format={textInputFormats.NUMERIC}
                    type={status}
                    fieldMessage={fieldMessage}
                    fieldMessageProps={fieldMessageProps}
                />
            </div>
        </div>
    );
};

PhoneInputStateless.propTypes = {
    'data-id': PropTypes.string,
    onToggleDropdown: PropTypes.func,
    onPhoneNumberValueChange: PropTypes.func,
    onCountryChange: PropTypes.func,
    onSearchValueChange: PropTypes.func,
    dialCodeSearchValue: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string,
    dropdownOpen: PropTypes.bool,
    placeholder: PropTypes.string,
};

PhoneInputStateless.defaultProps = {
    'data-id': 'phone-input',
    placeholder: 'Phone number...',
};

/**
 * Component for inputting a country code and number
 */
const PhoneInput = props => (
    <GenericStateContainer
        values={[
            {
                name: 'dropdownOpen',
                value: props.dropdownOpen || false,
            },
            {
                name: 'country',
                value: props.country || '',
            },
            {
                name: 'phoneNumber',
                value: props.phoneNumber || '',
            },
            {
                name: 'dialCodeSearchValue',
                value: props.dialCodeSearchValue || '',
            },
        ]}
    >
        {({
            dropdownOpen: {
                getValue: getDropdownOpen,
                setValue: setDropDownOpen,
            },
            country: {
                getValue: getCountry,
                setValue: setCountry,
            },
            phoneNumber: {
                getValue: getPhoneNumber,
                setValue: setPhoneNumber,
            },
            dialCodeSearchValue: {
                getValue: getDialCodeSearchValue,
                setValue: setDialCodeSearchValue,
            },
        }) => {
            const onPhoneNumberValueChange = (val, e) => {
                if (utils.isValidPhoneNumber(val)) {
                    setPhoneNumber(val);
                    props.onPhoneNumberValueChange(val, e);
                }
            };

            const onSearchValueChange = (val, e) => {
                setDialCodeSearchValue(val);
                props.onSearchValueChange(val, e);
            };

            const onCountryChange = (iso2, e, { dialCode }) => {
                setCountry(iso2);
                setDialCodeSearchValue('');
                setDropDownOpen(false);

                props.onCountryChange(iso2, e, { dialCode, iso2 });
                props.onToggleDropdown();
            };

            return (
                <PhoneInputStateless
                    {...props}
                    onPhoneNumberValueChange={onPhoneNumberValueChange}
                    onSearchValueChange={onSearchValueChange}
                    onCountryChange={onCountryChange}
                    setOpen={setDropDownOpen}
                    dropdownOpen={getDropdownOpen()}
                    country={getCountry()}
                    phoneNumber={getPhoneNumber()}
                    dialCodeSearchValue={getDialCodeSearchValue()}
                />
            );
        }}
    </GenericStateContainer>
);

PhoneInput.propTypes = {
    /**
    * The callback triggered when the dropdown is toggled
    */
    onToggleDropdown: PropTypes.func,
    /**
    *  The callback triggered when the phone number input value changes
    */
    onPhoneNumberValueChange: PropTypes.func,
    /**
    * The callback triggered when the country changes. Callback is provided with ISO country code
    */
    onCountryChange: PropTypes.func,
    /**
     * The callback triggered when the dial code search value changes
     */
    onSearchValueChange: PropTypes.func,
    /**
    * The dial code input search value
    */
    dialCodeSearchValue: PropTypes.string,
    /**
    * 2-character ISO code for the selected country
    */
    country: PropTypes.string,
    /**
    * The text to display in phone number input
    */
    phoneNumber: PropTypes.string,
    /**
    * The open state of the dial code dropdown
    */
    dropdownOpen: PropTypes.bool,
};

PhoneInput.defaultProps = {
    onToggleDropdown: noop,
    onCountryChange: noop,
    onPhoneNumberValueChange: noop,
    onSearchValueChange: noop
};

export default PhoneInput;
