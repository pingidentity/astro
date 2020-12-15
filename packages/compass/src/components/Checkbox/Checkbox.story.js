import React, { useState } from 'react';
import { Checkbox } from '../../.';

export default {
    title: 'Checkbox',
    component: Checkbox,
};

export const Default = () => <Checkbox />;

export const WithLabel = () => <Checkbox label="Example Label" />;

export const DefaultChecked = () => <Checkbox isDefaultChecked />;

export const Disabled = () => <Checkbox isDisabled />;

export const ExternalState = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Checkbox
            isChecked={isChecked}
            onChange={setIsChecked}
            label={isChecked ? 'Checked' : 'Unchecked'}
        />
    );
};
