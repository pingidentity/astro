import React from 'react';

import { ListViewState } from '../../types/listView';

import { ExampleItemProps } from './ListViewTypes';

interface ListViewContextType<T> {
  state: ListViewState<T>
}

export const ListViewContext = React.createContext<ListViewContextType<ExampleItemProps>>(
  null as unknown as ListViewContextType<ExampleItemProps>);
