import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Button from './Button';

export default {
    title: 'Components/Actions/Button',
    component: Button,
    decorators: [withKnobs],
};


export const Buttons = () => {
const [loading, setLoading] = useState(false);
   const _toggleLoadingButton = () => {
        setLoading(!loading);
    };

    return (
        <div>
        <Button
            type={Button.ButtonTypes.PRIMARY}
            disabled={boolean('Disabled', false)}
        >
            Primary Button
        </Button>
        <br/>
        <Button
            type={Button.ButtonTypes.SECONDARY}
            disabled={boolean('Disabled', false)}
            onClick={action('clicked')}
        >
            Secondary Button
        </Button>
        <br/>
        <Button
            type={Button.ButtonTypes.TERTIARY}
            disabled={boolean('Disabled', false)}
            onClick={action('clicked')}
        >
            Tertiary Button
        </Button>
        <br/>
        <Button
            type={Button.ButtonTypes.DANGER}
            disabled={boolean('Disabled', false)}
            onClick={action('clicked')}
        >
            Danger Button
        </Button>
        <br/>
        <Button
            type={Button.ButtonTypes.PRIMARY}
            disabled={boolean('Disabled', false)}
            loading={loading}
            onClick={_toggleLoadingButton}
        >
            Loading State Button - Click Me!
        </Button>
    </div>
    )
};


