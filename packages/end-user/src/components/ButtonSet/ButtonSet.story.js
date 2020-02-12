import React from 'react';
import ButtonSet from './ButtonSet';
import Button from '../Button';

export default {
    title: 'Components/Layout/Button Set',
    component: ButtonSet,
};

export const Default = () => (
    <ButtonSet>
        <Button type={Button.ButtonTypes.PRIMARY}>Button One</Button>
        <Button type={Button.ButtonTypes.SECONDARY}>Button Two</Button>
        <Button type={Button.ButtonTypes.DANGER}>Button Three</Button>
    </ButtonSet>
);
