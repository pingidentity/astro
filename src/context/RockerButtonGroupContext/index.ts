import { createContext } from 'react';
import type { ToggleGroupState } from '@react-stately/toggle';

interface ToggleGroupContextProps {
    state: ToggleGroupState
    disabledKeys?: string[]
}

export const RockerContext = createContext<ToggleGroupContextProps>({} as ToggleGroupContextProps);
