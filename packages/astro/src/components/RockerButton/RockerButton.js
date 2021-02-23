import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { Item } from '@react-stately/collections';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import useRockerButton from '../../hooks/useRockerButton';
import Button from '../Button';
import { RockerContext } from '../RockerButtonGroup';
import useStatusClasses from '../../hooks/useStatusClasses';

export const CollectionRockerButton = forwardRef((props, ref) => {
  const {
    className,
    item,
    isDisabled: buttonGroupDisabled,
  } = props;
  const defaultSelectedStyles = { bg: 'active' };
  const { key, rendered, props: itemProps } = item;
  const { selectedStyles = defaultSelectedStyles, isDisabled: rockerButtonDisabled } = itemProps;
  const isDisabled = buttonGroupDisabled || rockerButtonDisabled;
  const state = useContext(RockerContext);
  const { isFocusVisible, focusProps } = useFocusRing();
  const isSelected = state.selectedKey === key;
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
    isSelected,
  });

  const rockerButtonRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => rockerButtonRef.current);
  const { rockerButtonProps } = useRockerButton({ item, isDisabled }, state, rockerButtonRef);

  return (
    <Button
      className={classNames}
      variant="rocker"
      {...itemProps}
      {...mergeProps(focusProps, rockerButtonProps)}
      ref={rockerButtonRef}
      sx={{
        '&.is-selected': {
          ...selectedStyles,
        },
      }}
    >
      {rendered}
    </Button>
  );
});

CollectionRockerButton.displayName = 'CollectionRockerButton';
CollectionRockerButton.propTypes = {
  /** Whether the button is disabled. */
  isDisabled: PropTypes.bool,
  /** Allows custom styles to be passed to button. */
  selectedStyles: PropTypes.shape({}), // adding to surface in props table
  /** @ignore */
  item: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.shape({
      selectedStyles: PropTypes.shape({}),
    }),
    rendered: PropTypes.node,
  }),
};

CollectionRockerButton.defaultProps = {
  selectedStyles: { bg: 'active' },
  item: {
    props: {
      selectedStyles: {
        bg: 'active',
      },
    },
  },
};
// Export Item as default for simplicity, convert to CollectionRockerButton within
// RockerButtonGroup component.
export default Item;
