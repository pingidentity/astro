import { createContext, useContext } from 'react';

export const AccordionContext = createContext({});
/* istanbul ignore next */
export const useAccordionContext = () => useContext(AccordionContext);
