import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useOption } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';
import { useFocus } from '@react-aria/interactions';
import CircleSmallIcon from 'mdi-react/CircleSmallIcon';

import useStatusClasses from '../../hooks/useStatusClasses';
import Box from '../Box';
import Icon from '../Icon';

const Option = forwardRef((props, ref) => {
  const {
    item,
    state,
    hasVirtualFocus,
    ...others
  } = props;
  const {
    key,
    props: itemProps,
    rendered,
  } = item;
  const {
    disabledKeys,
    selectionManager,
  } = state;
  const { isSeparator } = itemProps;
  // Get props for the option element
  const optionRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => optionRef.current);
  const isDisabled = disabledKeys.has(key) || isSeparator;
  const isSelected = selectionManager.isSelected(key);
  const { optionProps } = useOption(
    {
      key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      shouldUseVirtualFocus: hasVirtualFocus,
      ...others,
    },
    state,
    optionRef,
  );

  // Handle focus events so we can apply highlighted
  // style to the focused option
  const [isFocused, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });
  const { classNames } = useStatusClasses(null, {
    isDisabled,
    isFocused: isFocused || state?.selectionManager?.focusedKey === item.key,
    isSelected,
  });

  return (
    <Box
      isRow
      as="li"
      ref={optionRef}
      variant="forms.select.option"
      className={classNames}
      {...others}
      {...mergeProps(optionProps, focusProps)}
    >
      {isSelected && <Icon icon={CircleSmallIcon} />}
      {rendered}
    </Box>
  );
});

Option.propTypes = {
  hasVirtualFocus: PropTypes.bool,
  item: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.shape({}),
    rendered: PropTypes.node,
  }),
  state: PropTypes.shape({
    disabledKeys: PropTypes.instanceOf(Set),
    selectionManager: PropTypes.shape({
      focusedKey: PropTypes.string,
      isSelected: PropTypes.func,
    }),
  }),
};

Option.defaultProps = {
  item: {},
  state: {},
};

export default Option;
