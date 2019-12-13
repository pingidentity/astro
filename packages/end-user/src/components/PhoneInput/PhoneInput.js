import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import countryCodes from './countryCodes';
import TextInput from '../TextInput';
import utils from '../../util/Validators';
import GenericStateContainer from '../../util/GenericStateContainer';

/**
 * @class PhoneInput
 * @description A component for inputting a country code and number
 * @param {string} [data-id='phone-input']
 *      The data-id attribute value applied to the element.
 * @param {string} dialCode
 *      The value of the dial code input when dropdown closed.
 * @param {boolean} [dropdownOpen=false]
 *      The open state of the dial code dropdown.
 * @param {PhoneInput~onDialCodeChange} onDialCodeChange
 *      The callback triggered when the dial code value changes.
 * @param {PhoneInput~onPhoneNumberValueChange} onPhoneNumberValueChange
 *      The callback triggered when the phone number input value changes.
 * @param {PhoneInput~onSearchValueChange} onSearchValueChange
 *      The callback triggered when the dial code search value changes.
 * @param {string} phoneNumber
 *      The text to display in phone number input.
 * @param {string} placeholder
 *      The text to display in phone number input before a value is entered a a placeholder.
 * @param {string|number} value
 *      The current value of the input
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
                        if (!option.searchTerm.toUpperCase().includes(searchValue.toUpperCase())) return
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
                                onClick={(e) => onValueChange(option.value, e)}
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
    onValueChange: () => { },
    onSearchValueChange: () => { },
    options: [],
};

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

                    if (props.onPhoneNumberValueChange) {
                        props.onPhoneNumberValueChange(val, e);
                    }
                }
            };

            const onSearchValueChange = (val, e) => {
                setDialCodeSearchValue(val);

                if (props.onSearchValueChange) {
                    props.onSearchValueChange(val, e);
                }
            };

            const onCountryChange = (val, e) => {
                setCountry(val);
                setDialCodeSearchValue('');
                setDropDownOpen(false);

                if (props.onDialCodeChange) {
                    props.onCountryChange(val, e);
                    props.onToggleDropdown();
                }
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
    onToggleDropdown: PropTypes.func,
    onPhoneNumberValueChange: PropTypes.func,
    onCountryChange: PropTypes.func,
    onSearchValueChange: PropTypes.func,
    dialCodeSearchValue: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string,
    dropdownOpen: PropTypes.bool,
};

export default PhoneInput;
