import { useSelectableItem } from '@react-aria/selection';
import { useId } from '@react-aria/utils';

const useRockerButton = (props, state, ref) => {
  const { item, isDisabled: propsDisabled } = props;
  const { key } = item;
  const { selectionManager: manager, selectedKey } = state;

  const isSelected = key === selectedKey;

  const { itemProps } = useSelectableItem({
    selectionManager: manager,
    key,
    ref,
  });
  const isDisabled = propsDisabled || state.disabledKeys.has(key);
  const rockerButtonId = useId();

  return {
    rockerButtonProps: {
      ...itemProps,
      isDisabled,
      id: rockerButtonId,
      'aria-selected': isSelected,
      'aria-disabled': isDisabled || undefined,
    },
  };
};

export default useRockerButton;
