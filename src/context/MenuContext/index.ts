import { createContext, MutableRefObject, useContext } from 'react';

export interface MenuContextValue {
  onClose?: () => void,
  closeOnSelect?: boolean,
  ref?: MutableRefObject<HTMLDivElement | HTMLElement | null>,
}

export const MenuContext = createContext<MenuContextValue>({});

export function useMenuContext(): MenuContextValue {
  return useContext(MenuContext);
}
