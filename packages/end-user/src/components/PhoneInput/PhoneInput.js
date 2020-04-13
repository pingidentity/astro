import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'underscore';
import countryCodes from './countryCodes';
import TextInput from '../TextInput';
import utils from '../../util/Validators';
import GenericStateContainer from '../../util/GenericStateContainer';

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
    onToggleDropdown,
    country,
    phoneNumber,
    placeholder,
    dialCodeSearchValue,
    onCountryChange,
    onSearchValueChange,
    onPhoneNumberValueChange,
}) => {
    const dropdownClasses = classnames('phone-input__code', {
        'phone-input__code--open': dropdownOpen,
    });

    return (
        <div className="phone-input" data-id={dataId}>
            <div
                className={dropdownClasses}
                role="button"
                onClick={onToggleDropdown}
                tabIndex="0"
            >
                <CountryDropdown
                    id="dropdownCustom2"
                    options={countryCodes.map((country) => {
                        return {
                            label: `${country.name} +${country.dialCode}`,
                            searchTerm: country.name,
                            value: country.iso2,
                            dialCode: country.dialCode,
                        }
                    })}
                    placeholder="Search countries..."
                    value={country}
                    searchValue={dialCodeSearchValue}
                    onValueChange={onCountryChange}
                    onSearchValueChange={onSearchValueChange}
                    open={dropdownOpen}
                />
            </div>
            <div className="phone-input__number">
                <TextInput
                    value={phoneNumber}
                    onChange={e => onPhoneNumberValueChange(e.target.value, e)}
                    placeholder={placeholder}
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

const CountryDropdown = ({
    children,
    className,
    error,
    id,
    inputClassName,
    options,
    placeholder,
    onValueChange,
    onSearchValueChange,
    searchValue,
    value,
    open,
}) => {
    const classNames = classnames('dropdown', className, {
        'dropdown--error': error,
        'dropdown--open': open,
    });
    const inputClassNames = classnames('dropdown__input', inputClassName);

    const country = countryCodes.find(({ iso2 }) => iso2 === value);

    return (
        <div className={classNames}>
            <input
                className={inputClassNames}
                name={id}
                placeholder={open ? placeholder : null}
                type="text"
                value={open ? searchValue : (country ? `+${country.dialCode}` : '')}
                autoFocus
                autoComplete="new-password"
                onChange={e => onSearchValueChange(e.target.value, e)}
                readOnly={!open}
            />
            {children}
            {open &&
                <ul className="dropdown__list">
                    {options.map((option) => {
                        if (!option.searchTerm.toUpperCase().includes(searchValue.toUpperCase())) return;
                        return (
                            <li
                                className={classnames(
                                    'dropdown__option',
                                    {
                                        'dropdown__option--selected': option.value === value,
                                    },
                                )}
                                key={option.value}
                                value={option.value}
                                role="button"
                                onClick={(e) => onValueChange(option.value, e, option)}
                            >
                                {option.label}
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    );
};

CountryDropdown.propTypes = {
    id: PropTypes.string,
    inputClassName: PropTypes.string,
    error: PropTypes.bool,
    open: PropTypes.bool,
    onValueChange: PropTypes.func,
    onSearchValueChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }),
    ])),
    placeholder: PropTypes.string,
    value: PropTypes.string,
    searchValue: PropTypes.string,
};

CountryDropdown.defaultProps = {
    id: 'country-code-input',
    error: false,
    open: false,
    onValueChange: noop,
    onSearchValueChange: noop,
    options: [],
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

            const onCountryChange = (iso2, e, dialCode) => {
                setCountry(iso2);
                setDialCodeSearchValue('');
                setDropDownOpen(false);

                props.onCountryChange(iso2, e, { dialCode, iso2 });
                props.onToggleDropdown();
            };

            const onToggleDropdown = () => setDropDownOpen(!getDropdownOpen());

            return (
                <PhoneInputStateless
                    {...props}
                    onPhoneNumberValueChange={onPhoneNumberValueChange}
                    onSearchValueChange={onSearchValueChange}
                    onCountryChange={onCountryChange}
                    onToggleDropdown={onToggleDropdown}
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
