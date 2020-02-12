import React from 'react';
import StepLink from './StepLink';

export default {
    title: 'Components/Display/StepLink',
    component: StepLink,
};

export const Default = () => (
    <div>
        <StepLink type="back">Previous</StepLink>
        <StepLink type="forward">Next</StepLink>
    </div>
);
