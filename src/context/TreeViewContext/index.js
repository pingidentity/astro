import { createContext, useContext } from 'react';

export const TreeViewContext = createContext(null);

export const useTreeViewContext = () => useContext(TreeViewContext);
