import React from 'react';
import CoreBox from '@pingux/compass-core/lib/components/Box/emotion';
import useCompassTheme from '../../styles/useCompassTheme';

const Box = (props) => {
    const theme = useCompassTheme();

    return <CoreBox theme={theme} {...props} />;
};

export default Box;
