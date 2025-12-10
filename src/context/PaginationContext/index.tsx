import React, { createContext, forwardRef, useCallback, useContext, useEffect, useState } from 'react';

import { PaginationContextProps } from '../../types/pagination';


export const defaultState = {
  firstRenderedIndex: 0,
  lastRenderedIndex: 0,
  offsetCount: 0,
  totalCount: 0,
  currentPageIndex: 0,
};

export const PaginationContext = createContext<PaginationContextProps>(
  {
    paginationState: defaultState,
  });
