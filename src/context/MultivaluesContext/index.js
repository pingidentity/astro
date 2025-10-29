import { createContext, useContext } from 'react';

export const MultivaluesContext = createContext(null);

export const useMultivaluesContext = () => useContext(MultivaluesContext);
