import React, { useCallback, useState } from 'react';

import { defaultState, PaginationContext } from '../../context/PaginationContext';
import { PaginationProviderProps } from '../../types/pagination';

const PaginationProvider = (props:PaginationProviderProps) => {
  const { children } = props;
  const [paginationState, setPaginationState] = useState(defaultState);

  const setPaginationStateCallback = useCallback(newState => {
    setPaginationState(newState);
  }, []);

  const contextValue = React.useMemo(
    () => ({ paginationState, setPaginationState: setPaginationStateCallback }),
    [paginationState, setPaginationStateCallback]);


  return (
    <PaginationContext.Provider
      value={contextValue}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
