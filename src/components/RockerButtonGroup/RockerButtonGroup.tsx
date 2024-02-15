import React, {
  forwardRef,
} from 'react';
import { useTabList } from 'react-aria';
import { useTabListState } from 'react-stately';
import { AriaTabListProps } from '@react-aria/tabs';
import { TabListState, TabListStateOptions } from '@react-stately/tabs';

import { RockerContext } from '../../context/RockerButtonGroupContext';
import { useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { RockerButtonGroupProps } from '../../types';
import Box from '../Box';
import { CollectionRockerButton } from '../RockerButton';

const RockerButtonGroup = forwardRef<HTMLDivElement, RockerButtonGroupProps>((props, ref) => {
  const {
    tabListProps, // eslint-disable-line
    ...others
  } = props;
  const buttonGroupRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  usePropWarning(props, 'disabled', 'isDisabled');
  const state = useTabListState(props as TabListStateOptions<object>) as TabListState<object>;
  const {
    tabListProps: raTabListProps,
  } = useTabList(props as AriaTabListProps<object>, state, buttonGroupRef);
  // removed tabList role for now as this isn't really the role we are looking for
  delete raTabListProps.role;

  return (
    <RockerContext.Provider value={state}>
      <Box variant="rockerButton.container" {...others}>
        <Box
          variant="rockerButton.innerContainer"
          isRow
          {...tabListProps}
          {...raTabListProps}
          ref={buttonGroupRef}
          role="toolbar"
        >
          {Array.from(state.collection).map(item => (
            <CollectionRockerButton
              key={item.key}
              item={item}
            />
          ))}
        </Box>
      </Box>
    </RockerContext.Provider>
  );
});

RockerButtonGroup.displayName = 'RockerButtonGroup';
export default RockerButtonGroup;
