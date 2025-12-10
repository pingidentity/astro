import { createContext, useContext } from 'react';
import { TooltipTriggerState } from 'react-stately';

export const TooltipContext = createContext<TooltipTriggerState>({
  isOpen: false,
  open: () => undefined,
  close: () => undefined,
});
/* istanbul ignore next */
export const useTooltipContext = () => useContext(TooltipContext);
