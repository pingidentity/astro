import React, { useContext } from 'react';

export const DataTableContext = React.createContext(null);
export const useDataTableContext = () => useContext(DataTableContext);
