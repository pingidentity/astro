import React, { forwardRef, useState, useRef, useImperativeHandle, useContext } from 'react';
import PropTypes from 'prop-types';
import { useOption } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';
import { useFocus } from '@react-aria/interactions';
import CircleSmallIcon from 'mdi-react/CircleSmallIcon';

import { useStatusClasses } from '../../hooks';
import Box from '../Box';
import Icon from '../Icon';
import { ListBoxContext } from './ListBoxContext';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';

const Option = forwardRef((props, ref) => {
  const {
    item,
    hasVirtualFocus,
    ...others
  } = props;
  const {
    key,
    props: itemProps,
    rendered,
  } = item;

  const state = useContext(ListBoxContext);

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
      isVirtualized: true,
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
      ref={optionRef}
      variant="listBox.option"
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
    disabledKeys: isIterableProp,
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
