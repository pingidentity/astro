import React from 'react';
import FormAside from './FormAside';
import TextInput from '../TextInput';
import Form from '../Form';
import TextBlock from '../TextBlock';
import Button from '../Button';

export default {
    title: 'Components/Inputs/FormAside',
    component: FormAside,
};

export const Default = () => (
    <Form>
        <TextInput placeholder="Something" />
        <FormAside>
            <TextBlock>I&apos;m in an aside!</TextBlock>
            <Button label="Cool" type={Button.ButtonTypes.TERTIARY} />
        </FormAside>
        <Button label="Okay" type={Button.ButtonTypes.PRIMARY} />
    </Form>
);
