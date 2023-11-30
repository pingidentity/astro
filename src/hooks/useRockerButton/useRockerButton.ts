import React from 'react';
import { MultipleSelectionManager } from 'react-stately';
import { useSelectableItem } from '@react-aria/selection';
import { useId } from '@react-aria/utils';

import { FocusableElement } from '../../types';

interface RockerButtonProps {
  item: { key: string };
  isDisabled: boolean;
  isSelected: boolean;
}

const useRockerButton = (
  props: RockerButtonProps,
  state: { selectionManager: MultipleSelectionManager },
  ref: React.RefObject<FocusableElement>,
) => {
  const { item, isDisabled, isSelected } = props;
  const { key } = item;
  const { selectionManager: manager } = state;

  const { itemProps } = useSelectableItem({
    isDisabled,
    selectionManager: manager,
    key,
    ref,
  });
  const rockerButtonId = useId();

  return {
    rockerButtonProps: {
      ...itemProps,
      id: rockerButtonId,
      'aria-pressed': isSelected,
      'aria-disabled': isDisabled || undefined,
    },
  };
};

export default useRockerButton;
