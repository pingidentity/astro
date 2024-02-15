import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import { FocusRing } from 'react-aria';
import { Item } from 'react-stately';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import PropTypes from 'prop-types';

import { RockerContext } from '../../context/RockerButtonGroupContext';
import { usePropWarning, useRockerButton, useStatusClasses } from '../../hooks';
import { Box } from '../../index';
import { accent, getBaseHexColor, getDarkerColor } from '../../styles/colors';

export const CollectionRockerButton = forwardRef((props, ref) => {
  const {
    className,
    item,
  } = props;
  const { key, rendered, props: itemProps } = item;
  const state = useContext(RockerContext);
  const isDisabled = state.disabledKeys.has(key);
  const isSelected = state.selectedKey === key;

  const rockerButtonRef = useRef();
  const { hoverProps, isHovered } = useHover({});
  const { pressProps, isPressed } = usePress(rockerButtonRef);

  const { classNames } = useStatusClasses(className, {
    isHovered,
    isPressed,
    isSelected,
    isDisabled,
  });

  const backgroundHexColor = itemProps.selectedStyles?.bg
    ? getBaseHexColor(itemProps.selectedStyles?.bg)
    : accent[20];

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
        ref={rockerButtonRef}
        sx={{
          '&.is-selected': {
            ...itemProps.selectedStyles,
          },
          '&.is-selected.is-hovered': {
            bg: getDarkerColor(backgroundHexColor, 0.2),
          },
          '&.is-selected.is-pressed': {
            bg: getDarkerColor(backgroundHexColor, 0.4),
          },
        }}
        {...mergeProps(hoverProps, pressProps, itemProps, rockerButtonProps)}
      >
        {rendered}
      </Box>
    </FocusRing>
  );
});

CollectionRockerButton.displayName = 'CollectionRockerButton';
CollectionRockerButton.propTypes = {
  /** Allows custom styles to be passed to button. */
  selectedStyles: PropTypes.shape({
    bg: PropTypes.string,
  }), // adding to surface in props table
  /** @ignore */
  item: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.shape({
      selectedStyles: PropTypes.shape({
        bg: PropTypes.string,
      }),
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
