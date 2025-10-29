import { createContext } from 'react';
import { StylePropertyValue } from 'theme-ui';

export interface BadgeContextProps {
    bg?: StylePropertyValue<string | undefined>
}

const defaultValue = 'inherit';
export const BadgeContext = createContext<BadgeContextProps | string | object>(defaultValue);
