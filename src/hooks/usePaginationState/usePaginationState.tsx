import { useContext } from 'react';

import { PaginationContext } from '../../context/PaginationContext';


const usePaginationState = () => {
  const { paginationState } = useContext(PaginationContext);
  return { paginationState };
};

export default usePaginationState;
