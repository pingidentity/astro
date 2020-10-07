import React, { useState } from 'react';

import { SolutionCard } from '../../.';

export default {
    title: 'Solution Card',
    component: SolutionCard,

};


export const Default = () => {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <SolutionCard onClick={() => setIsSelected(!isSelected)} isSelected={isSelected}>
            I am a solution card. Click me to highlight.
        </SolutionCard>
    );
};
