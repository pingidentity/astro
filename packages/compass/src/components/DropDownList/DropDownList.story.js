import React, { useState } from 'react';
import {
    DropDownList,
    DropDownOption,
    Field,
} from '../../.';

export default {
    title: 'DropDownList',
    component: DropDownList,
};

const someOptions = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'].map((label, value) => ({ label, value }));

export const Default = () => {
    const [value, onValueChange] = useState();

    return (
        <DropDownList
            onValueChange={onValueChange}
            options={someOptions}
            value={value}
        />
    );
};

export const InField = () => {
    const [value, onValueChange] = useState();

    return (
        <Field label="Pick a Number">
            <DropDownList
                onValueChange={onValueChange}
                options={someOptions}
                value={value}
            />
        </Field>
    );
};

export const Wider = () => {
    const [value, onValueChange] = useState('');

    return (
        <Field label="Pick a Number">
            <DropDownList
                maxWidth="column"
                onValueChange={onValueChange}
                options={someOptions}
                value={value}
                width="100%"
            />
        </Field>
    );
};

export const UsingMarkup = () => {
    const [value, onValueChange] = useState();

    return (
        <DropDownList
            onValueChange={onValueChange}
            value={value}
        >
            <DropDownOption value="this">This</DropDownOption>
            <DropDownOption value="that">That</DropDownOption>
            <DropDownOption value="other">The Other</DropDownOption>
        </DropDownList>
    );
};

export const WithNoneOption = () => {
    const [value, onValueChange] = useState();

    return (
        <DropDownList
            hasNoneOption
            onValueChange={onValueChange}
            options={someOptions}
            value={value}
        />
    );
};
