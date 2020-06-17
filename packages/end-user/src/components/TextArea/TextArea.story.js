import React from 'react';
import TextArea from './TextArea';


export default {
    title: 'Components/Inputs/TextArea/Basic',
    component: TextArea,
};


export const Default = () => <TextArea placeholder="Text Area" />;

export const NoResize = () => <TextArea placeholder="No resize" resize={false} />;
