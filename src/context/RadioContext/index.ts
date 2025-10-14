import { createContext } from 'react';
import { RadioGroupState } from 'react-stately';

const defaultValue = {} as RadioGroupState;

export const RadioContext = createContext<RadioGroupState>(defaultValue);
