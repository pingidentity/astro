import { useSelectableItem } from '@react-aria/selection';
import { useId } from '@react-aria/utils';

const useRockerButton = (props, state, ref) => {
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
