import React from 'react';
import { compose, withHandlers, withState, withProps } from "recompose";
import DropdownCustomSearchable from './DropdownCustomSearchable.js';

export default {
    title: 'Components/Inputs/Dropdowns/CustomSearchable',
    component: DropdownCustomSearchable,
};


const initialOptions = [
    { value: 'A', label: 'Albert' },
    { value: 'B', label: 'Betty' },
    { value: 'C', label: 'Charlie' },
    { value: 'D', label: 'Daniel' },
    { value: 'E', label: 'Eduard' },
    { value: 'F', label: 'Fred' },
];


const Demo = compose(
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

export const Default = () => <Demo />;
