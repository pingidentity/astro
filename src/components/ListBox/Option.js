import React, { forwardRef, useRef, useImperativeHandle, useContext } from 'react';
import CircleSmallIcon from 'mdi-react/CircleSmallIcon';
import PropTypes from 'prop-types';
import { useOption } from '@react-aria/listbox';

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
  const { isSeparator, 'data-id': dataId } = itemProps;
  // Get props for the option element
  const optionRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => optionRef.current);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      shouldUseVirtualFocus: hasVirtualFocus,
      isVirtualized: true,
      ...others,
    },
    state,
    optionRef,
  );

  const { classNames } = useStatusClasses(null, {
    isDisabled: isDisabled || isSeparator,
    isFocused: isFocused || state?.selectionManager?.focusedKey === item.key,
    isSelected,
  });

  /* Related to UIP-4992
   * Need to remove these properties to avoid errors in the console on the external app.
   * By the way, these properties return "undefined", so it shouldn't create issues */
  delete optionProps.onPressStart;
  delete optionProps.onPressUp;

  return (
    <Box
      as="li"
      isRow
      ref={optionRef}
      variant="listBox.option"
      data-id={dataId}
      className={classNames}
      {...optionProps}
      {...others}
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
    props: PropTypes.shape({
      'data-id': PropTypes.string,
      isSeparator: PropTypes.bool,
    }),
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
