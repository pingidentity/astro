import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Button from './Button';

export default {
    title: 'Components/Actions/Button',
    decorators: [withKnobs],
};

export const Buttons = () => (
    <div>
        <Button
            type={Button.ButtonTypes.PRIMARY}
            disabled={boolean('Disabled', false)}
            onClick={action('clicked')}
        >
            Primary Button
        </Button>
        <Button
            type={Button.ButtonTypes.SECONDARY}
            disabled={boolean('Disabled', false)}
            onClick={action('clicked')}
        >
            Secondary Button
        </Button>
        <Button
            type={Button.ButtonTypes.TERTIARY}
            disabled={boolean('Disabled', false)}
            onClick={action('clicked')}
        >
            Tertiary Button
        </Button>
        <Button
            type={Button.ButtonTypes.DANGER}
            disabled={boolean('Disabled', false)}
            onClick={action('clicked')}
        >
            Danger Button
        </Button>
    </div>
);
