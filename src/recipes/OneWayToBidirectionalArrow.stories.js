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
  const CustomOnSvg = () => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M8 10V13H14V18H8V21L2 15.5L8 10Z" fill="#CACED3" />
        <path d="M9.83325 10.6251V6.37511H15.4999V2.94678L21.0533 8.50011L15.4999 14.0534V10.6251H9.83325Z" fill="#4462ED" />
        <path d="M8 10V13H14V18H8V21L2 15.5L8 10ZM22 8.5L16 3V6H10V11H16V14L22 8.5Z" fill="#515F6B" />
      </svg>
    );
  };

  const CustomOffSvg = () => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M8 10V13H14V18H8V21L2 15.5L8 10Z" fill="#CACED3" />
        <path d="M9.83331 10.6251V6.37511H15.5V2.94678L21.0533 8.50011L15.5 14.0534V10.6251H9.83331Z" fill="#4462ED" />
      </svg>
    );
  };

  return (
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
          ml: '5px',
          mr: '5px',
          flexShrink: 0,
        }}
      >
        <IconButtonToggle
          toggledIcon={CustomOnSvg}
          defaultIcon={CustomOffSvg}
          title="Bidirectional/ Outbound toggle"
          iconProps={{ size: 20 }}
          buttonProps={{
            variant: 'svgIconButton',
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
        <IconButton>
          <Icon icon={CogsIcon} color="neutral.30" size={20} title="edit icon" />
        </IconButton>
        <IconButton ml="5px" >
          <Icon icon={DeleteIcon} color="neutral.30" size={20} title="delete icon" />
        </IconButton>
      </Box>
    </Box>
  );
};
