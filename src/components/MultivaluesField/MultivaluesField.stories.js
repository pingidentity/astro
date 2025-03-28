import React, { useState } from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Icon,
  Item,
  MultivaluesField,
  OverlayProvider,
  Section,
} from '../../index';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import MultivaluesFieldReadme from './MultivaluesField.mdx';


export default {
  title: 'Form/MultivaluesField',
  component: MultivaluesField,
  argTypes: {
    direction: {},
    hasAutoFocus: {},
    hasNoStatusIndicator: {},
    isDisabled: {},
    isNotFlippable: {},
    isReadOnly: {},
    isRequired: {},
    label: {},
    mode: {},
    placeholder: {},
    defaultSelectedKeys: {
      control: {
        type: 'none',
      },
    },
    disabledKeys: {
      control: {
        type: 'none',
      },
    },
    items: {
      control: {
        type: 'none',
      },
    },
    selectedKeys: {
      control: {
        type: 'none',
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    hasNoSelectAll: {
      control: {
        tyle: 'boolean',
      },
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: {
    direction: 'bottom',
    label: 'Field Label',
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <MultivaluesFieldReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
    a11y: {
      config: {
        /** The "color-contrast" test ends with an "incomplete" status
         * since pseudo-element applies to the same container as selected values.
         * A  workaround to disable "color-contrast" incomplete tests.
         */
        rules: [{
          id: 'color-contrast',
          enabled: false,
        }],
      },
    },
  },
};


const VariableIcon = props => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="variable-icon-title" {...props}>
      <title id="variable-icon-title">Variable Icon</title>
      <g clipPath="url(#clip0_709_18965)">
        <circle cx="8" cy="8" r="7.5" fill="white" stroke="#7AC7F2" />
        <path d="M11.5042 4.25C12.0833 5.37917 12.3125 6.68333 12.1667 8C12.0833 9.31667 11.625 10.6208 10.8458 11.75L10.2083 11.3333C10.8792 10.3208 11.2708 9.16667 11.3333 8C11.475 6.83333 11.2875 5.67917 10.7917 4.66667L11.5042 4.25ZM5.15416 4.25L5.79166 4.66667C5.12083 5.67917 4.72916 6.83333 4.66666 8C4.525 9.16667 4.71666 10.3208 5.20833 11.3333L4.50416 11.75C3.92083 10.6208 3.6875 9.32083 3.83333 8C3.91666 6.68333 4.375 5.37917 5.15416 4.25ZM8.03333 7.45L9 6.10417H10.0542L8.47916 8.1875L9.39583 10.2375H8.45416L7.87916 8.83333L6.86666 10.2208H5.81666L7.44166 8.0875L6.55416 6.10417H7.5L8.03333 7.45Z" fill="#7AC7F2" />
      </g>
      <defs>
        <clipPath id="clip0_709_18965">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const HTMLIcon = props => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="html-icon-title" {...props}>
      <title id="html-icon-title">HTML Icon</title>
      <g clipPath="url(#clip0_709_18936)">
        <circle cx="8" cy="8" r="7.5" fill="white" stroke="#2E5EA6" />
        <g clipPath="url(#clip1_709_18936)">
          <path d="M9.81667 8.83325C9.85 8.55825 9.875 8.28325 9.875 7.99992C9.875 7.71659 9.85 7.44159 9.81667 7.16659H11.225C11.2917 7.43325 11.3333 7.71242 11.3333 7.99992C11.3333 8.28742 11.2917 8.56659 11.225 8.83325H9.81667ZM9.07917 11.1499C9.32917 10.6874 9.52084 10.1874 9.65417 9.66659H10.8833C10.4833 10.3541 9.84584 10.8874 9.07917 11.1499ZM8.975 8.83325H7.025C6.98334 8.55825 6.95834 8.28325 6.95834 7.99992C6.95834 7.71659 6.98334 7.43742 7.025 7.16659H8.975C9.0125 7.43742 9.04167 7.71659 9.04167 7.99992C9.04167 8.28325 9.0125 8.55825 8.975 8.83325ZM8 11.3166C7.65417 10.8166 7.375 10.2624 7.20417 9.66659H8.79584C8.625 10.2624 8.34584 10.8166 8 11.3166ZM6.33334 6.33325H5.11667C5.5125 5.64159 6.15417 5.10825 6.91667 4.84992C6.66667 5.31242 6.47917 5.81242 6.33334 6.33325ZM5.11667 9.66659H6.33334C6.47917 10.1874 6.66667 10.6874 6.91667 11.1499C6.15417 10.8874 5.5125 10.3541 5.11667 9.66659ZM4.775 8.83325C4.70834 8.56659 4.66667 8.28742 4.66667 7.99992C4.66667 7.71242 4.70834 7.43325 4.775 7.16659H6.18334C6.15 7.44159 6.125 7.71659 6.125 7.99992C6.125 8.28325 6.15 8.55825 6.18334 8.83325H4.775ZM8 4.67909C8.34584 5.17909 8.625 5.73742 8.79584 6.33325H7.20417C7.375 5.73742 7.65417 5.17909 8 4.67909ZM10.8833 6.33325H9.65417C9.52084 5.81242 9.32917 5.31242 9.07917 4.84992C9.84584 5.11242 10.4833 5.64159 10.8833 6.33325ZM8 3.83325C5.69584 3.83325 3.83334 5.70825 3.83334 7.99992C3.83334 9.10499 4.27232 10.1648 5.05372 10.9462C5.44064 11.3331 5.89996 11.64 6.40549 11.8494C6.91101 12.0588 7.45283 12.1666 8 12.1666C9.10507 12.1666 10.1649 11.7276 10.9463 10.9462C11.7277 10.1648 12.1667 9.10499 12.1667 7.99992C12.1667 7.45274 12.0589 6.91093 11.8495 6.4054C11.6401 5.89988 11.3332 5.44055 10.9463 5.05364C10.5594 4.66673 10.1 4.35982 9.59452 4.15042C9.08899 3.94103 8.54718 3.83325 8 3.83325Z" fill="#4660A2" />
        </g>
      </g>
      <g clipPath="url(#clip2_709_18936)">
        <circle cx="8" cy="8" r="7.5" fill="white" stroke="#2E5EA6" />
        <g clipPath="url(#clip3_709_18936)">
          <path d="M9.81667 8.83325C9.85 8.55825 9.875 8.28325 9.875 7.99992C9.875 7.71659 9.85 7.44159 9.81667 7.16659H11.225C11.2917 7.43325 11.3333 7.71242 11.3333 7.99992C11.3333 8.28742 11.2917 8.56659 11.225 8.83325H9.81667ZM9.07917 11.1499C9.32917 10.6874 9.52084 10.1874 9.65417 9.66659H10.8833C10.4833 10.3541 9.84584 10.8874 9.07917 11.1499ZM8.975 8.83325H7.025C6.98334 8.55825 6.95834 8.28325 6.95834 7.99992C6.95834 7.71659 6.98334 7.43742 7.025 7.16659H8.975C9.0125 7.43742 9.04167 7.71659 9.04167 7.99992C9.04167 8.28325 9.0125 8.55825 8.975 8.83325ZM8 11.3166C7.65417 10.8166 7.375 10.2624 7.20417 9.66659H8.79584C8.625 10.2624 8.34584 10.8166 8 11.3166ZM6.33334 6.33325H5.11667C5.5125 5.64159 6.15417 5.10825 6.91667 4.84992C6.66667 5.31242 6.47917 5.81242 6.33334 6.33325ZM5.11667 9.66659H6.33334C6.47917 10.1874 6.66667 10.6874 6.91667 11.1499C6.15417 10.8874 5.5125 10.3541 5.11667 9.66659ZM4.775 8.83325C4.70834 8.56659 4.66667 8.28742 4.66667 7.99992C4.66667 7.71242 4.70834 7.43325 4.775 7.16659H6.18334C6.15 7.44159 6.125 7.71659 6.125 7.99992C6.125 8.28325 6.15 8.55825 6.18334 8.83325H4.775ZM8 4.67909C8.34584 5.17909 8.625 5.73742 8.79584 6.33325H7.20417C7.375 5.73742 7.65417 5.17909 8 4.67909ZM10.8833 6.33325H9.65417C9.52084 5.81242 9.32917 5.31242 9.07917 4.84992C9.84584 5.11242 10.4833 5.64159 10.8833 6.33325ZM8 3.83325C5.69584 3.83325 3.83334 5.70825 3.83334 7.99992C3.83334 9.10499 4.27232 10.1648 5.05372 10.9462C5.44064 11.3331 5.89996 11.64 6.40549 11.8494C6.91101 12.0588 7.45283 12.1666 8 12.1666C9.10507 12.1666 10.1649 11.7276 10.9463 10.9462C11.7277 10.1648 12.1667 9.10499 12.1667 7.99992C12.1667 7.45274 12.0589 6.91093 11.8495 6.4054C11.6401 5.89988 11.3332 5.44055 10.9463 5.05364C10.5594 4.66673 10.1 4.35982 9.59452 4.15042C9.08899 3.94103 8.54718 3.83325 8 3.83325Z" fill="#4660A2" />
        </g>
      </g>
      <defs>
        <clipPath className="clip0_709_18936">
          <rect width="16" height="16" fill="white" />
        </clipPath>
        <clipPath className="clip1_709_18936">
          <rect width="10" height="10" fill="white" transform="translate(3 3)" />
        </clipPath>
        <clipPath className="clip2_709_18936">
          <rect width="16" height="16" fill="white" />
        </clipPath>
        <clipPath className="clip3_709_18936">
          <rect width="10" height="10" fill="white" transform="translate(3 3)" />
        </clipPath>
      </defs>
    </svg>
  );
};

const items = [
  { id: 1, name: 'Aardvark', key: 'Aardvark' },
  { id: 2, name: 'Kangaroo', key: 'Kangaroo' },
  { id: 3, name: 'Snake', key: 'Snake' },
  { id: 4, name: 'Frog', key: 'Frog' },
  { id: 5, name: 'Seal', key: 'Seal' },
  { id: 6, name: 'Orangutan', key: 'Orangutan' },
  { id: 7, name: 'Shark', key: 'Shark' },
];

const checkboxItems = [
  { id: 1, name: 'Option 1', key: 'Option 1' },
  { id: 2, name: 'Option 2', key: 'Option 2' },
  { id: 3, name: 'Option 3', key: 'Option 3' },
  { id: 4, name: 'Option 4', key: 'Option 4' },
  { id: 5, name: 'Option 5', key: 'Option 5' },
  { id: 6, name: 'Option 6', key: 'Option 6' },
  { id: 7, name: 'Option 7', key: 'Option 7' },
];

const withSection = [
  {
    name: 'Animals',
    key: 'Animals',
    children: [
      { name: 'Option A1', key: 'Option A1' },
      { name: 'Option A2', key: 'Option A2' },
      { name: 'Option A3', key: 'Option A3' },
      { name: 'Option A4', key: 'Option A4' },
      { name: 'Option A5', key: 'Option A5' },
    ],
  },
  {
    name: 'People',
    key: 'People',
    children: [
      { name: 'Option B1', key: 'Option B1' },
      { name: 'Option B2', key: 'Option B2' },
      { name: 'Option B3', key: 'Option B3' },
    ],
  },

];

const itemsWithSlots = [
  {
    id: 1,
    name: 'Aardvark',
    key: 'Aardvark',
    badgeProps: { variant: 'itemBadgeWithSlot', bg: 'white' },
    buttonProps: { variant: 'badgeDeleteButton' },
    slots: { leftIcon: <Icon icon={VariableIcon} size={16} /> },
  },
  {
    id: 2,
    name: 'Kangaroo',
    key: 'Kangaroo',
    badgeProps: { variant: 'itemBadgeWithSlot', bg: 'white' },
    buttonProps: { variant: 'badgeDeleteButton' },
    slots: { leftIcon: <Icon icon={HTMLIcon} size={16} /> },
  },
  {
    id: 3,
    name: 'Snake',
    key: 'Snake',
    badgeProps: { variant: 'itemBadgeWithSlot', bg: 'white' },
    buttonProps: { variant: 'badgeDeleteButton' },
    slots: { leftIcon: <Icon icon={HTMLIcon} size={16} /> },
  },
];

const setOverlayStyle = (direction, isOpen, mr, ml, mt) => {
  return {
    marginRight: direction === 'right' && isOpen ? mr : 0,
    marginLeft: direction === 'left' && isOpen ? ml : 0,
    marginTop: direction === 'top' && isOpen ? mt : 0,
  };
};

export const Default = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle(direction, isOpen, '50%', '50%', '20%')}
    >
      <MultivaluesField items={items} {...args} onOpenChange={onOpenChange}>
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const Uncontrolled = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle(direction, isOpen, '50%', '50%', '20%')}
    >
      <MultivaluesField
        defaultSelectedKeys={['Aardvark', 'Snake']}
        items={items}
        {...args}
        onOpenChange={onOpenChange}
      >
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const Controlled = args => {
  const [selectedKeys, setSelectedKeys] = useState(['Aardvark', 'Snake']);
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle(direction, isOpen, '50%', '50%', '20%')}
    >
      <MultivaluesField
        label="Field Label"
        {...args}
        items={items}
        onSelectionChange={setSelectedKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
      >
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const Error = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;
  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle(direction, isOpen, '50%', '50%', '20%')}
    >
      <MultivaluesField
        {...args}
        items={items}
        helperText="Here is some helpful text..."
        status="error"
        onOpenChange={onOpenChange}
      >
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const ReadOnlyField = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;
  const onOpenChange = () => {
    setIsOpen(true);
  };
  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle(direction, isOpen, '50%', '50%', '20%')}
    >
      <MultivaluesField items={items} {...args} isReadOnly onOpenChange={onOpenChange}>
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const ReadOnlyValues = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle(direction, isOpen, '50%', '50%', '20%')}
    >
      <MultivaluesField
        readOnlyKeys={['Aardvark', 'Snake']}
        items={items}
        {...args}
        onOpenChange={onOpenChange}
      >
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const DisabledKeys = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle(direction, isOpen, '50%', '50%', '20%')}
    >
      <MultivaluesField
        disabledKeys={['Aardvark']}
        items={items}
        {...args}
        onOpenChange={onOpenChange}
      >
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const CustomValues = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle(direction, isOpen, '50%', '50%', '20%')}
    >
      <MultivaluesField items={items} mode="non-restrictive" {...args} onOpenChange={onOpenChange}>
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

CustomValues.args = {
  mode: 'non-restrictive',
};

export const IconSlotsInBadge = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle(direction, isOpen, '50%', '50%', '20%')}
    >
      <MultivaluesField items={itemsWithSlots} {...args} onOpenChange={onOpenChange}>
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const CustomSize = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Box width={300}>
        <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the right place
          style={setOverlayStyle(direction, isOpen, '25%', '25%', '75%')}
        >
          <MultivaluesField items={items} {...args} onOpenChange={onOpenChange}>
            {item => (
              <Item key={item.key} data-id={item.name} aria-label={item.name}>
                {item.name}
              </Item>
            )}
          </MultivaluesField>
        </OverlayProvider>
      </Box>
    </Box>
  );
};


export const Condensed = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the right place
      style={setOverlayStyle(direction, isOpen, '25%', '25%', '75%')}
    >
      <MultivaluesField items={checkboxItems} {...args} mode="condensed" onOpenChange={onOpenChange}>
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>

  );
};

export const CondensedWithSection = args => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the right place
      style={setOverlayStyle(direction, isOpen, '25%', '25%', '75%')}
    >
      <MultivaluesField items={withSection} {...args} mode="condensed" onOpenChange={onOpenChange}>
        {section => (
          <Section key={section.key} items={section.children} title={section.name}>
            {item => <Item key={item.name}>{item.name}</Item>}
          </Section>
        )}
      </MultivaluesField>
    </OverlayProvider>

  );
};

export const OnLoadPrev = () => {
  const initialItems = new Array(10).fill({ key: 'string', name: 'string' }).map((_, index) => ({ name: `name: ${index}`, key: `name: ${index}`, id: index }));
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(10);
  const [listItems, setListItems] = useState(initialItems);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingState, setLoadingState] = useState(loadingStates.IDLE);


  const onOpenChange = () => {
    setIsOpen(true);
  };

  const onLoadMore = async () => {
    setLoadingState(loadingStates.LOADING_MORE);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const newItems = new Array(10).fill({ key: 'string', name: 'string' }).map((_, index) => ({ name: `name: ${maxNum + index}`, key: `name: ${maxNum + index}`, id: maxNum + index }));
    setMaxNum(maxNum + 10);
    setListItems([...listItems, ...newItems]);
    setLoadingState(loadingStates.IDLE);
  };

  const onLoadPrev = async () => {
    setLoadingState(loadingStates.LOADING_MORE_PREPEND);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const newItems = new Array(10).fill({ key: 'string', name: 'string' }).map((_, index) => ({ name: `name: ${minNum - (index + 1)}`, key: `name: ${minNum - (index + 1)}`, id: minNum - (index + 1) }));
    setMinNum(minNum - 10);
    setListItems([...newItems, ...listItems]);
    setLoadingState(loadingStates.IDLE);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle('bottom', isOpen, '50%', '50%', '20%')}
    >
      <MultivaluesField
        items={listItems}
        onOpenChange={onOpenChange}
        onLoadMore={onLoadMore}
        onLoadPrev={onLoadPrev}
        loadingState={loadingState}
        label="On Load More & Prev"
      >
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};
