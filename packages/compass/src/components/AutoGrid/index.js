import React from 'react';
import CoreAutoGrid from '@pingux/compass-core/lib/components/AutoGrid/emotion';
import useCompassTheme from '../../styles/useCompassTheme';

const AutoGrid = (props) => {
    const theme = useCompassTheme();

    return <CoreAutoGrid theme={theme} gap="md" {...props} />;
};

export default AutoGrid;
