import React, { useCallback, useEffect, useState } from 'react';
import PlusCircleMultipleOutlineIcon from '@pingux/mdi-react/PlusCircleMultipleOutlineIcon';
import { useFilter } from '@react-aria/i18n';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { getAllUsers } from '../../api/users';
import {
  Box,
  Icon,
  Item,
  MultivaluesField,
  OverlayProvider,
  Section,
} from '../../index';
import { LIMIT } from '../../mocks/constants';
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
      control: false,
    },
    disabledKeys: {
      control: false,
    },
    items: {
      control: false,
    },
    selectedKeys: {
      control: false,
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
    badgeProps: { variant: 'itemBadgeWithSlot' },
    buttonProps: { variant: 'badgeDeleteButton' },
    slots: { leftIcon: <Icon icon={PlusCircleMultipleOutlineIcon} size={16} /> },
  },
  {
    id: 2,
    name: 'Kangaroo',
    key: 'Kangaroo',
    badgeProps: { variant: 'itemBadgeWithSlot' },
    buttonProps: { variant: 'badgeDeleteButton' },
    slots: { leftIcon: <Icon icon={PlusCircleMultipleOutlineIcon} size={16} /> },
  },
  {
    id: 3,
    name: 'Snake',
    key: 'Snake',
    badgeProps: { variant: 'itemBadgeWithSlot' },
    buttonProps: { variant: 'badgeDeleteButton' },
    slots: { leftIcon: <Icon icon={PlusCircleMultipleOutlineIcon} size={16} /> },
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
      <MultivaluesField
        defaultSelectedKeys={['Option 5', 'Option 7']}
        disabledKeys={['Option 6']}
        items={checkboxItems}
        {...args}
        mode="condensed"
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

export const CondensedAsyncLoading = args => {
  const { direction } = args;

  const [isOpen, setIsOpen] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [loadingState, setLoadingState] = useState(loadingStates.LOADING);
  const [dataSize, setDataSize] = useState(0);
  const [limit, setLimit] = useState(LIMIT);
  const [filterString, setFilterString] = useState('');

  const fetchData = useCallback(async currentLimit => {
    try {
      const response = await getAllUsers(currentLimit);
      const json = await response.json();

      if (response.ok) {
        setListItems(json.body._embedded.users || []);
        setDataSize(json.body.count);
      }
      setLoadingState(loadingStates.IDLE);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoadingState(loadingStates.ERROR);
    }
  }, []);

  const handleLoadMore = () => {
    if (loadingState !== loadingStates.IDLE || limit >= dataSize) return;
    setLoadingState(loadingStates.LOADING_MORE);
    setLimit(prevLimit => prevLimit + LIMIT);
  };

  useEffect(() => {
    fetchData(limit);
  }, [fetchData, limit]);

  const onOpenChange = () => {
    setIsOpen(true);
  };

  const { contains } = useFilter({ sensitivity: 'base' });

  const filter = nodes => {
    const nodeArr = Array.from(nodes);
    if (!filterString) return nodeArr;
    return nodeArr.filter(item => contains(item.props.name, filterString));
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the right place
      style={setOverlayStyle(direction, isOpen, '25%', '25%', '75%')}
    >
      <MultivaluesField
        items={listItems}
        {...args}
        mode="condensed"
        onOpenChange={onOpenChange}
        loadingState={loadingState}
        onLoadMore={handleLoadMore}
        filter={filter}
        onInputChange={setFilterString}
      >
        {item => (
          <Item key={item.id} data-id={item.id} aria-label={item.username} name={`${item.name.given} ${item.name.family}`}>
            {`${item.name.given} ${item.name.family}`}
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

export const CondensedWithCustomText = args => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the right place
      style={setOverlayStyle(direction, isOpen, '25%', '25%', '75%')}
    >
      <MultivaluesField
        items={withSection}
        {...args}
        mode="condensed"
        onOpenChange={onOpenChange}
        placeholder="Select your animal"
        selectedOptionText={`${selectedKeys.size} Selected Animals`}
        onSelectionChange={setSelectedKeys}
        selectedKeys={selectedKeys}
      >
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
