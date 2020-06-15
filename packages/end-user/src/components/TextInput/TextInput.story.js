import React from 'react';
import TextInput, { textInputTypes } from './TextInput';
import { fieldMessageStatuses } from '../FieldMessage/FieldMessage';

export default {
    title: 'Components/Inputs/Text/Basic',
    component: TextInput,
};

export const Default = () => (<React.Fragment>
    <TextInput
        placeholder="Text"
    />
    <TextInput
        placeholder="Error"
        type={textInputTypes.ERROR}
        fieldMessage='asdf'
        fieldMessageStatus={fieldMessageStatuses.ERROR}
    />
    <TextInput
        placeholder="Success"
        type={textInputTypes.SUCCESS}
        fieldMessage='asdf'
    />
    <TextInput
        placeholder="Primary"
        type={textInputTypes.PRIMARY}
        fieldMessage='asdf'
    />
</React.Fragment>);
