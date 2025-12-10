import { createContext, useContext } from 'react';

export const NavBarContext = createContext({});

export const useNavBarContext = () => useContext(NavBarContext);
