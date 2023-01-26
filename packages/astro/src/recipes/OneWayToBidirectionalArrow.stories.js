import React from 'react';
import DragVerticalIcon from 'mdi-react/DragVerticalIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import CogsIcon from 'mdi-react/CogsIcon';
import Box from '../components/Box';
import { Icon, ComboBoxField, Item, IconButton, IconButtonToggle } from '../index';


export default {
  title: 'Recipes/One Way to Bidirectional Arrow',
};

const items = [
  { name: 'Last Name', id: '1' },
  { name: 'First Name', id: '2' },
  { name: 'Third Option', id: '3' },
];

const sx = {
  actionIcon: {
    color: 'neutral.30',
  },
  dragVerticalIcon: {
    color: 'neutral.50',
  },
  iconButton: {
    ml: 'xs',
  },
  iconButtonToggleContainer: {
    mx: 'sm',
    flexShrink: 0,
  },
  iconContainer: {
    alignItems: 'center',
    ml: '12px',
    mr: '12px',
  },
  outerContainer: {
    alignItems: 'center',
  },
};

export const Default = () => {
  const CustomOnSvg = (props) => {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} >
        <path d="M5.33325 6.66666V8.66666H9.33325V12H5.33325V14L1.33325 10.3333L5.33325 6.66666Z" fill="currentColor" />
        <path d="M14.6666 5.66667L10.6666 2V4H6.66658V7.33333H10.6666V9.33333L14.6666 5.66667Z" fill="currentColor" />
      </svg>
    );
  };

  const CustomOffSvg = (props) => {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} >
        <path d="M5.33325 6.66667V8.66667H9.33325V12H5.33325V14L1.33325 10.3333L5.33325 6.66667Z" fill="#CACED3" />
        <path d="M14.6666 5.66667L10.6666 2V4H6.66658V7.33333H10.6666V9.33333L14.6666 5.66667Z" fill="currentColor" />
      </svg>
    );
  };

  const CustomRightSvg = (props) => {
    return (
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} >
        <path d="M8 4L4 0V2.18182H0V5.81818H4V8L8 4Z" fill="currentColor" />
      </svg>
    );
  };

  return (
    <>
      <Box
        sx={sx.outerContainer}
        isRow
      >
        <Icon icon={DragVerticalIcon} size={25} sx={sx.dragVerticalIcon} />
        <ComboBoxField
          items={items}
          defaultSelectedKey="Last Name"
          aria-label="Row one value"
          containerProps={{
            width: '275px',
          }}
          labelProps={{
            mb: 0,
          }}
          controlProps={{
            'aria-label': 'test',
          }}
        >
          {item => <Item key={item.name} data-id={item.name}>{item.name}</Item>}
        </ComboBoxField>
        <Box
          sx={sx.iconButtonToggleContainer}
        >
          <IconButtonToggle
            toggledIcon={CustomOnSvg}
            defaultIcon={CustomOffSvg}
            title="Bidirectional/ Outbound toggle"
            iconProps={{
              size: 'xs',
            }}
            buttonProps={{
              variant: 'bidirectional',
            }}
          />
        </Box>
        <ComboBoxField
          items={items}
          defaultSelectedKey="First Name"
          containerProps={{
            width: '275px',
          }}
          labelProps={{
            mb: 0,
          }}
          controlProps={{
            'aria-label': 'Row one Pingone value',
          }}
        >
          {item => <Item key={item.name} data-id={item.name}>{item.name}</Item>}
        </ComboBoxField>
        <Box
          isRow
          sx={sx.iconContainer}
        >
          <IconButton aria-label="Edit">
            <Icon icon={CogsIcon} sx={sx.actionIcon} size="sm" title="edit icon" />
          </IconButton>
          <IconButton sx={sx.iconButton} aria-label="Delete">
            <Icon icon={DeleteIcon} sx={sx.actionIcon} size="sm" title="delete icon" />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={sx.outerContainer}
        isRow
      >
        <Icon icon={DragVerticalIcon} size={25} sx={sx.dragVerticalIcon} />
        <ComboBoxField
          items={items}
          defaultSelectedKey="Last Name"
          containerProps={{
            width: '275px',
          }}
          labelProps={{
            mb: 0,
          }}
          aria-label="Row one value"
          controlProps={{
            'aria-label': 'test',
          }}
        >
          {item => <Item key={item.name} data-id={item.name}>{item.name}</Item>}
        </ComboBoxField>
        <Box
          sx={sx.iconButtonToggleContainer}
        >
          <IconButtonToggle
            toggledIcon={CustomRightSvg}
            defaultIcon={CustomRightSvg}
            title="This attribute does not support write-back."
            iconProps={{
              size: 8,
            }}
            buttonProps={{
              variant: 'bidirectional',
            }}
          />
        </Box>
        <ComboBoxField
          items={items}
          defaultSelectedKey="First Name"
          containerProps={{
            width: '275px',
          }}
          labelProps={{
            mb: 0,
          }}
          controlProps={{
            'aria-label': 'Row one Pingone value',
          }}
        >
          {item => <Item key={item.name} data-id={item.name}>{item.name}</Item>}
        </ComboBoxField>
        <Box
          isRow
          sx={sx.iconContainer}
        >
          <IconButton aria-label="Edit">
            <Icon icon={CogsIcon} sx={sx.actionIcon} size="sm" title="edit icon" />
          </IconButton>
          <IconButton sx={sx.iconButton} aria-label="Delete">
            <Icon icon={DeleteIcon} sx={sx.actionIcon} size="sm" title="delete icon" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
