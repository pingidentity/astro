import React, {
  forwardRef,
  useMemo,
} from 'react';
import { Key } from 'react-stately';
import { AriaToggleButtonGroupProps, useToggleButtonGroup } from '@react-aria/button';
import { ToggleGroupProps, useToggleGroupState } from '@react-stately/toggle';

import { RockerContext } from '../../context/RockerButtonGroupContext';
import { useGetTheme, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { RockerButtonGroupProps } from '../../types';
import Box from '../Box';

const RockerButtonGroup = forwardRef<HTMLDivElement, RockerButtonGroupProps>((props, ref) => {
  const {
    defaultSelectedKey: defaultSelectedKeyProp,
    defaultSelectedKeys: defaultSelectedKeysProp,
    disabledKeys,
    selectedKey: selectedKeyProp,
    selectedKeys: selectedKeysProp,
    tabListProps,
    onSelectionChange,
    ...others
  } = props;
  const buttonGroupRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  usePropWarning(props, 'disabled', 'isDisabled');

  const isUsingSingleKeyAPI = selectedKeyProp !== undefined
    || defaultSelectedKeyProp !== undefined;

  const selectedKeys = selectedKeysProp || (selectedKeyProp ? [selectedKeyProp] : null);
  const defaultSelectedKeys = defaultSelectedKeysProp
    || (defaultSelectedKeyProp ? [defaultSelectedKeyProp] : null);

  const handleSelectionChange = (keys: Set<Key>) => {
    if (!onSelectionChange) return;

    if (isUsingSingleKeyAPI) {
      const firstKey = Array.from(keys)[0] as string;
      onSelectionChange(firstKey);
    } else {
      onSelectionChange(Array.from(keys) as string[]);
    }
  };

  const theseProps = {
    ...others,
    ...(defaultSelectedKeys && { defaultSelectedKeys }),
    ...(selectedKeys && { selectedKeys }),
    ...(onSelectionChange && { onSelectionChange: handleSelectionChange }),
  };

  const state = useToggleGroupState(theseProps as ToggleGroupProps);

  const {
    groupProps: raTabListProps,
  } = useToggleButtonGroup(
    theseProps as AriaToggleButtonGroupProps, state, buttonGroupRef);

  delete raTabListProps.role;
  delete raTabListProps['data-testid'];

  const contextValue = useMemo(() => (
    { state, disabledKeys }
  ), [state, disabledKeys]);

  const { rockerButtonGap } = useGetTheme();

  return (
    <RockerContext.Provider value={contextValue}>
      <Box variant="rockerButton.container" {...others}>
        <Box
          variant="rockerButton.innerContainer"
          isRow
          {...tabListProps}
          {...raTabListProps}
          ref={buttonGroupRef}
          role="toolbar"
          gap={rockerButtonGap}
        >
          {props.children}
        </Box>
      </Box>
    </RockerContext.Provider>
  );
});

RockerButtonGroup.displayName = 'RockerButtonGroup';
export default RockerButtonGroup;
