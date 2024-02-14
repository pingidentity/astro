import { createContext, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MenuContent { }

export const MenuContext = createContext<MenuContent | undefined>({});

export const useMenuContext = () => useContext(MenuContext);
