import React from 'react';

import { ListViewState } from '../../types/listView';

interface ListViewContextType<T> {
  state: ListViewState<T>
}

export const ListViewContext = React.createContext<ListViewContextType<object>>(
  null as unknown as ListViewContextType<object>);
