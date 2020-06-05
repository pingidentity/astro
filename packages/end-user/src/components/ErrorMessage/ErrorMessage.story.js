import React from 'react';
import { compose, withHandlers, withState, withProps } from "recompose";
import PasswordInput from '../PasswordInput';
import Dropdown from '../Dropdown';
import DropdownCustomSearchable from '../DropdownCustomSearchable';
import FloatLabelDropdown from '../FloatLabelDropdown';
import PhoneInput from '../PhoneInput';
import FloatLabelPasswordInput from '../FloatLabelPasswordInput';

export default {
    title: 'Components/Inputs/ErrorMessage'
};

const initialOptions = [
    { value: 'A', label: 'Albert' },
    { value: 'B', label: 'Betty' },
    { value: 'C', label: 'Charlie' },
    { value: 'D', label: 'Daniel' },
    { value: 'E', label: 'Eduard' },
    { value: 'F', label: 'Fred' },
];


const CustomSearchable = compose(
    withProps({
        searchPlaceholder: 'Type to filter',
        placeholder: 'Choose the name'
    }),
    withState('open', 'onToggle', false),
    withState('options', 'setOptions', initialOptions),
    withState('value', 'setValue', ''),
    withState('searchValue', 'setSearchValue'),
    withHandlers({
        'onSearchValueChange': ({ setOptions, setSearchValue }) => (searchString) => {
            setSearchValue(searchString);
            setOptions(
                initialOptions.filter(({ label }) => label.toLowerCase().match(searchString.toLowerCase()))
            );
        },
        'onValueChange': ({ setValue, onToggle }) => (value, e, option) => {
            setValue(option);
            onToggle(false);
        }
    })
)(DropdownCustomSearchable);

export const Default = () => (<React.Fragment>
    <PasswordInput
        error
        errorMessage="Username or password is invalid"
        placeholder="Password"
    />
    <FloatLabelPasswordInput
        error
        errorMessage="Float label password error"
        label="Password"
    />
    <Dropdown
        error
        errorMessage="Dropdown error message"
        options={['First Value', 'Second Value', 'Third Value', 'Fourth Value']}
        placeholder="Select one"
    />
    <CustomSearchable
        error
        errorMessage="Custom searchable error message"
    />
    <FloatLabelDropdown
        label="Select one"
        options={['First Value', 'Second Value', 'Third Value', 'Fourth Value']}
        error
        errorMessage="Float label dropdown error message"
    />
    <PhoneInput
        error
        errorMessage="You must enter a valid phone number"
    />
</React.Fragment>);
