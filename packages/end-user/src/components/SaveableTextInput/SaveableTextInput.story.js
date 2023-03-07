import React from 'react';
import SaveableTextInput from './SaveableTextInput';

export default {
    title: 'Components/Inputs/SaveableTextInput',
    component: SaveableTextInput,
};

export const Default = () => (
    <div>
        <SaveableTextInput onCancel={() => console.log('cancel')} onSave={() => console.log('save')}/>
    </div>
);