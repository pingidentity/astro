import { createContext, useContext } from 'react';

export const AccordionGridContext = createContext({});
export const useAccordionGridContext = () => useContext(AccordionGridContext);
