import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

export default {
    title: 'Components/Actions/Button',
    component: Button,
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
            disabled={false}
        >
            Primary Button
        </Button>
        <br/>
        <Button
            type={Button.ButtonTypes.SECONDARY}
            disabled={false}
            onClick={action('clicked')}
        >
            Secondary Button
        </Button>
        <br/>
        <Button
            type={Button.ButtonTypes.TERTIARY}
            disabled={false}
            onClick={action('clicked')}
        >
            Tertiary Button
        </Button>
        <br/>
        <Button
            type={Button.ButtonTypes.DANGER}
            disabled={false}
            onClick={action('clicked')}
        >
            Danger Button
        </Button>
        <br/>
        <Button
            type={Button.ButtonTypes.PRIMARY_A11Y}
            disabled={false}
        >
            Primary A11y Button
        </Button>
        <br/>
        <Button
            type={Button.ButtonTypes.PRIMARY}
            disabled={false}
            loading={loading}
            onClick={_toggleLoadingButton}
        >
            Loading State Button - Click Me!
        </Button>
    </div>
    )
};


