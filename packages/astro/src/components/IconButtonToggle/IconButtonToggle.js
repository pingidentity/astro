import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import Icon from '../Icon';
import { useComponentToggle } from '../../hooks';

const IconButtonToggle = (props) => {
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
  } = useComponentToggle(
    conditionalRenderProps,
  );

  return (
    <IconButton onPress={handleConditionChange} {...buttonProps} title={title} >
      <Icon icon={RenderedComponent} {...iconProps} />
    </IconButton>
  );
};

IconButtonToggle.propTypes = {
  /** Props object that is spread into the icon element. */
  iconProps: PropTypes.shape({}),
  /** Props object that is spread into the button element. */
  buttonProps: PropTypes.shape({}),
  /** The icon that will render by default. */
  defaultIcon: PropTypes.elementType.isRequired,
  /** The icon that will render after toggling the icon. */
  toggledIcon: PropTypes.elementType.isRequired,
  /** Whether or not the icon is toggled. (use only when controlled) */
  isToggled: PropTypes.bool,
  /** Function that is passed into the IconButton within this component. */
  onToggle: PropTypes.func,
  /** Content will be displayed in a tooltip on hover or focus. */
  title: PropTypes.string,
};

export default IconButtonToggle;
