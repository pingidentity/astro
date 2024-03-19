import React, { forwardRef } from 'react';

import { useComponentToggle } from '../../hooks';
import { ComponentToggleProps, ComponentToggleResult } from '../../hooks/useComponentToggle/useComponentToggle';
import { IconButtonToggleProps, IconTypeExtended } from '../../types';
import Icon from '../Icon';
import IconButton from '../IconButton';

const IconButtonToggle = forwardRef<HTMLButtonElement, IconButtonToggleProps>((props, ref) => {
  const {
    toggledIcon,
    defaultIcon,
    buttonProps,
    iconProps,
    isToggled,
    onToggle,
    title,
  } = props;

  const conditionalRenderProps = {
    ComponentToRenderIfTrue: toggledIcon,
    ComponentToRenderIfFalse: defaultIcon,
    condition: isToggled,
    onConditionChange: onToggle,
  };

  const {
    handleConditionChange,
    RenderedComponent,
  }: ComponentToggleResult = useComponentToggle(
    conditionalRenderProps as ComponentToggleProps,
  );

  return (
    <IconButton
      onPress={handleConditionChange}
      ref={ref}
      title={title}
      {...buttonProps}
    >
      <Icon icon={RenderedComponent as IconTypeExtended} {...iconProps} />
    </IconButton>
  );
});

export default IconButtonToggle;
