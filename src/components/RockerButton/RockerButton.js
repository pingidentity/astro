import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import useRockerButton from '../../hooks/useRockerButton';
import Button from '../Button';
import { RockerContext } from '../RockerButtonGroup';
import useStatusClasses from '../../hooks/useStatusClasses';

const RockerButton = forwardRef((props, ref) => {
  const {
    className,
    item,
    isDisabled: buttonGroupDisabled,
  } = props;
  const { key, rendered, props: itemProps } = item;
  const { keyColor, isDisabled: rockerButtonDisabled } = itemProps;
  const isDisabled = buttonGroupDisabled || rockerButtonDisabled;
  const state = useContext(RockerContext);
  const { isFocusVisible, focusProps } = useFocusRing();
  const isSelected = state.selectedKey === key;
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
    'is-selected': isSelected,
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
      bg={isSelected && (keyColor || 'active')}
    >
      {rendered}
    </Button>
  );
});

RockerButton.displayName = 'RockerButton';
RockerButton.propTypes = {
  isDisabled: PropTypes.bool,
  item: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.shape({
      keyColor: PropTypes.string,
    }),
    rendered: PropTypes.node,
  }),
};

export default RockerButton;
