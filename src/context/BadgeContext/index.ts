import { createContext } from 'react';

const defaultValue = 'inherit';
export const BadgeContext = createContext<string | object>(defaultValue);
