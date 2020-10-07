import React from 'react';
import { makeUseDefaultTheme } from '@pingux/compass-core/lib/utils/StyleUtils';
import compassTheme from './theme';

const useCompassTheme = makeUseDefaultTheme(compassTheme);

export const withCompassTheme = Component => (props) => {
    const theme = useCompassTheme();

    return <Component theme={theme} {...props} />;
};

export default useCompassTheme;
