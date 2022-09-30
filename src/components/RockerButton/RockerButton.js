import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { Item } from '@react-stately/collections';
import { FocusRing } from '@react-aria/focus';
import { useRockerButton, useStatusClasses, usePropWarning } from '../../hooks';
import { Box } from '../../index';
import { RockerContext } from '../RockerButtonGroup';

export const CollectionRockerButton = forwardRef((props, ref) => {
  const {
    className,
    item,
  } = props;
  const { key, rendered, props: itemProps } = item;
  const state = useContext(RockerContext);
  const isDisabled = state.disabledKeys.has(key);
  const isSelected = state.selectedKey === key;
  const { classNames } = useStatusClasses(className, {
    isSelected,
    isDisabled,
  });

  const rockerButtonRef = useRef();

  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => rockerButtonRef.current);
  const { rockerButtonProps } = useRockerButton({
    item,
    isDisabled,
    isSelected,
  }, state, rockerButtonRef);

  return (
    <FocusRing focusRingClass="is-focused">
      <Box
        as="button"
        className={classNames}
        variant="variants.rockerButton.thumbSwitch"
        {...rockerButtonProps}
        ref={rockerButtonRef}
        {...itemProps}
        sx={{
        '&.is-selected': {
          ...itemProps.selectedStyles,
        },
      }}
      >
        {rendered}
      </Box>
    </FocusRing>
  );
});

CollectionRockerButton.displayName = 'CollectionRockerButton';
CollectionRockerButton.propTypes = {
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
