import React, { useRef, useState } from 'react';
import { useOverlayPosition } from 'react-aria';
import CloseIcon from '@pingux/mdi-react/CloseIcon';
import MenuDown from '@pingux/mdi-react/MenuDownIcon';
import MenuUp from '@pingux/mdi-react/MenuUpIcon';
import { useLayoutEffect } from '@react-aria/utils';

import {
  Box,
  Button,
  Icon,
  IconButton,
  PopoverContainer,
} from '../index';

export default {
  title: 'Recipes/Flippable Caret Menu Button',
};

const buttonArray = [
  'Web App',
  'Native App',
  'Single Page App',
  'Non-Interactive',
  'Worker',
  'Advanced Configuration',
  'Built-in admin console for this environment',
  'Built-in Application portal',
];
const sx = {
  openButton: {
    height: '30px',
    borderRadius: 'md',
    fontSize: '13px',
    mb: 'sm',
  },
  closeIconButton: {
    position: 'absolute',
    top: '14px',
    right: 'sm',
  },
  buttonsContainer: {
    p: 'lg',
    flexDirection: 'initial !important',
    alignContent: 'space-between',
    flexWrap: 'wrap',
  },
  selectedButton: {
    mb: 'sm',
    mr: '4px',
    height: '30px',
    borderRadius: '15px',
    fontSize: '13px',
  },
  unSelectedButton: {
    mb: 'sm',
    mr: '4px',
    borderColor: 'neutral.80',
    height: '30px',
    borderRadius: '15px',
    fontSize: '13px',
  },
};

export const Default = () => {
  const buttonRef = useRef();
  const popoverRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButtons, setSelectedButton] = useState([]);

  const onChange = () => {
    setIsOpen(!isOpen);
  };

  const toggleButton = key => {
    const newState = selectedButtons;
    if (selectedButtons.includes(key)) {
      const index = newState.indexOf(key);
      newState.splice(index, 1);
    } else {
      newState.push(key);
    }
    setSelectedButton([...newState]);
  };

  const { overlayProps, placement, updatePosition } = useOverlayPosition({
    targetRef: buttonRef,
    overlayRef: popoverRef,
    placement: 'bottom left',
    isOpen: true,
  });

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      updatePosition();
    });
  }, [updatePosition]);

  const style = {
    ...overlayProps.style,
    width: '500px',
    minWidth: '500px',
    height: '200px',
  };

  return (
    <>
      <Button
        ref={buttonRef}
        variant="inline"
        onPress={onChange}
        sx={sx.openButton}
      >
        <Box isRow alignItems="center">
          <Icon icon={isOpen ? MenuUp : MenuDown} mr="sm" color="active" size={20} title={{ name: isOpen ? 'Menu Up Icon' : 'Menu Down Icon' }} />
          Add a Form
        </Box>
      </Button>
      <PopoverContainer
        isOpen={isOpen}
        hasNoArrow
        isNonModal
        isDismissable={false}
        ref={popoverRef}
        placement={placement}
        style={style}
      >
        <Box>
          <IconButton
            aria-label="my-label"
            size={22}
            onPress={() => setIsOpen(false)}
            sx={sx.closeIconButton}
          >
            <Icon icon={CloseIcon} title={{ name: 'Close Icon' }} />
          </IconButton>
          <Box
            sx={sx.buttonsContainer}
          >
            {buttonArray.map(item => (
              <Button
                variant="inline"
                sx={selectedButtons.includes(item) ? sx.selectedButton : sx.unSelectedButton}
                key={item}
                onPress={() => toggleButton(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Box>
      </PopoverContainer>
    </>
  );
};
