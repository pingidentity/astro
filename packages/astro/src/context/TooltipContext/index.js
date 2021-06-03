import { createContext, useContext } from 'react';

export const TooltipContext = createContext({});
/* istanbul ignore next */
export const useTooltipContext = () => useContext(TooltipContext);
