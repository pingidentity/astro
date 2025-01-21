import React, { useRef } from 'react';
import { AriaHiddenSelectProps, HiddenSelectProps, mergeProps, useHiddenSelect } from 'react-aria';

import {
  Box, Label,
} from '../../index';

export function HiddenSelect<T>(props: HiddenSelectProps<T>) {
  const { state, triggerRef, label, name, isDisabled, ...others } = props;
  const selectRef = useRef<HTMLSelectElement>(null);
  const { containerProps, selectProps } = useHiddenSelect(
    { ...props, selectRef } as AriaHiddenSelectProps, state, triggerRef,
  );

  if (state.collection.size <= 300) {
    return (
      <Box data-testid="hidden-select-container" {...containerProps}>
        <Label>
          {label}
          <select {...mergeProps(selectProps, others)} ref={selectRef}>
            {Array.from(state.collection).map(item => {
              if (item && item.type === 'item') {
                return (
                  <option
                    key={item.key}
                    value={item.key}
                    {...item.props}
                  >
                    {item.textValue}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </Label>
      </Box>
    );
  }

  return (
    <input
      type="hidden"
      autoComplete={selectProps.autoComplete}
      name={name}
      disabled={isDisabled}
      value={state.selectedKey ?? ''}
      {...others}
    />
  );
}
