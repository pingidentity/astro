import React from 'react';
import DragVerticalIcon from 'mdi-react/DragVerticalIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import CogsIcon from 'mdi-react/CogsIcon';
import Box from '../components/Box';
import { Icon, ComboBoxField, Item, IconButton, IconButtonToggle } from '../index';


export default {
  title: 'Recipes/OneWayToBidirectionalArrow',
};

const items = [
  { name: 'Last Name', id: '1' },
  { name: 'First Name', id: '2' },
  { name: 'Third Option', id: '3' },
];

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
        sx={{
          alignItems: 'center',
        }}
        isRow
      >
        <Icon icon={DragVerticalIcon} size={25} color="neutral.50" />
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
          sx={{
            mx: 'sm',
            flexShrink: 0,
          }}
        >
          <IconButtonToggle
            toggledIcon={CustomOnSvg}
            defaultIcon={CustomOffSvg}
            title="Bidirectional/ Outbound toggle"
            iconProps={{
              size: 16,
            }}
            buttonProps={{
              variant: 'bidirectionalIconButton',
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
          alignItems="center"
          sx={{
            marginLeft: '12px',
            marginRight: '12px',
          }}
        >
          <IconButton aria-label="Edit">
            <Icon icon={CogsIcon} color="neutral.30" size={20} title="edit icon" />
          </IconButton>
          <IconButton ml="5px" aria-label="Delete">
            <Icon icon={DeleteIcon} color="neutral.30" size={20} title="delete icon" />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
        }}
        isRow
      >
        <Icon icon={DragVerticalIcon} size={25} color="neutral.50" />
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
          sx={{
            mx: 'sm',
            flexShrink: 0,
          }}
        >
          <IconButtonToggle
            toggledIcon={CustomRightSvg}
            defaultIcon={CustomRightSvg}
            title="This attribute does not support write-back."
            iconProps={{
              size: 8,
            }}
            buttonProps={{
              variant: 'bidirectionalIconButton',
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
          alignItems="center"
          sx={{
            marginLeft: '12px',
            marginRight: '12px',
          }}
        >
          <IconButton aria-label="Edit">
            <Icon icon={CogsIcon} color="neutral.30" size={20} title="edit icon" />
          </IconButton>
          <IconButton ml="5px" aria-label="Delete">
            <Icon icon={DeleteIcon} color="neutral.30" size={20} title="delete icon" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
