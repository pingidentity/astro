import React, { useCallback, useEffect, useRef, useState } from 'react';
import PlusCircleMultipleOutlineIcon from '@pingux/mdi-react/PlusCircleMultipleOutlineIcon';
import { useFilter } from '@react-aria/i18n';
import type { Key, Node } from '@react-types/shared';
import { Meta } from '@storybook/react-vite';

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
import { MultivaluesFieldItem, MultivaluesFieldProps } from '../../types/MultivaluesField';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import statuses from '../../utils/devUtils/constants/statuses';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import MultivaluesFieldReadme from './MultivaluesField.mdx';

export default {
  title: 'Form/MultivaluesField',
  component: MultivaluesField,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    mode: {
      control: {
        type: 'select',
        options: ['restrictive', 'non-restrictive', 'condensed'],
      },
      table: {
        type: { summary: "'restrictive' | 'non-restrictive' | 'condensed'" },
        defaultValue: { summary: "'restrictive'" },
      },
    },
    direction: {
      // addon-docs reads options from the argType top level, not control.options
      options: ['top', 'right', 'bottom', 'left'],
      control: {
        type: 'radio',
        options: ['top', 'right', 'bottom', 'left'],
      },
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: "'bottom'" },
      },
    },
    hasAutoFocus: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasNoStatusIndicator: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isReadOnly: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isNotFlippable: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasNoSelectAll: {
      description: 'Whether the condensed mode select-all checkbox is hidden.',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    scrollBoxProps: {
      // JSDoc on this prop is @ignore-suppressed, so docgen emits no description.
      description: 'Props object that is spread directly into the ScrollBox element.',
      control: {
        type: 'object',
      },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{ maxHeight: 300 }' },
      },
    },
    inputProps: {
      control: {
        type: 'object',
      },
    },
    containerProps: {
      control: {
        type: 'object',
      },
    },
    defaultSelectedKeys: {
      control: false,
    },
    selectedKeys: {
      control: false,
    },
    disabledKeys: {
      control: false,
    },
    // Declared only in DefaultMultivaluesFieldProps, which the dispatcher type
    // does not expose, so docgen cannot resolve a description for these.
    readOnlyKeys: {
      description: 'The item keys that are readonly. These items cannot be changed or selected.',
      control: false,
      table: {
        type: { summary: 'string[]' },
      },
    },
    items: {
      control: false,
    },
    onSelectionChange: {
      control: false,
    },
    onInputChange: {
      control: false,
    },
    onOpenChange: {
      control: false,
    },
    ...statusArgTypes,
    // addon-docs reads options from the argType top level; docgen cannot resolve the
    // imported `Status` alias, so hoist the option list here for the docs radio control.
    status: {
      ...statusArgTypes.status,
      options: Object.values(statuses),
    },
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
} satisfies Meta<typeof MultivaluesField>;

const items: MultivaluesFieldItem[] = [
  { id: 1, name: 'Aardvark', key: 'Aardvark' },
  { id: 2, name: 'Kangaroo', key: 'Kangaroo' },
  { id: 3, name: 'Snake', key: 'Snake' },
  { id: 4, name: 'Frog', key: 'Frog' },
  { id: 5, name: 'Seal', key: 'Seal' },
  { id: 6, name: 'Orangutan', key: 'Orangutan' },
  { id: 7, name: 'Shark', key: 'Shark' },
];

const checkboxItems: MultivaluesFieldItem[] = [
  { id: 1, name: 'Option 1', key: 'Option 1' },
  { id: 2, name: 'Option 2', key: 'Option 2' },
  { id: 3, name: 'Option 3', key: 'Option 3' },
  { id: 4, name: 'Option 4', key: 'Option 4' },
  { id: 5, name: 'Option 5', key: 'Option 5' },
  { id: 6, name: 'Option 6', key: 'Option 6' },
  { id: 7, name: 'Option 7', key: 'Option 7' },
];

const withSection: MultivaluesFieldItem[] = [
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

const itemsWithSlots: MultivaluesFieldItem[] = [
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

const longLabelItems: MultivaluesFieldItem[] = [
  { id: 1, name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,', key: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' },
  { id: 2, name: 'Quisque vitae lacinia diam, nec ullamcorper neque.', key: 'Quisque vitae lacinia diam, nec ullamcorper neque.' },
  { id: 3, name: 'In egestas dui vel dolor tincidunt, sit amet ullamcorper', key: 'In egestas dui vel dolor tincidunt, sit amet ullamcorper' },
  { id: 4, name: 'Short name', key: 'Short name' },
];

const setOverlayStyle = (
  direction: string | undefined, isOpen: boolean, mr: string, ml: string, mt: string,
) => {
  return {
    marginRight: direction === 'right' && isOpen ? mr : 0,
    marginLeft: direction === 'left' && isOpen ? ml : 0,
    marginTop: direction === 'top' && isOpen ? mt : 0,
  };
};

export const Default = (args: Partial<MultivaluesFieldProps>) => {
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

export const DefaultOpen = () => {
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <OverlayProvider
      // note: spacing for demo purpose only so that the select list renders in the correct place
      style={setOverlayStyle('bottom', true, '50%', '50%', '20%')}
    >
      <MultivaluesField items={items} label="Field Label" ref={inputRef}>
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const Uncontrolled = (args: Partial<MultivaluesFieldProps>) => {
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

export const Controlled = (args: Partial<MultivaluesFieldProps>) => {
  const [selectedKeys, setSelectedKeys] = useState<Iterable<Key>>(['Aardvark', 'Snake']);
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

export const Error = (args: Partial<MultivaluesFieldProps>) => {
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

export const ReadOnlyField = (args: Partial<MultivaluesFieldProps>) => {
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

export const ReadOnlyValues = (args: Partial<MultivaluesFieldProps>) => {
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

export const DisabledKeys = (args: Partial<MultivaluesFieldProps>) => {
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

export const CustomValues = (args: Partial<MultivaluesFieldProps>) => {
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

export const IconSlotsInBadge = (args: Partial<MultivaluesFieldProps>) => {
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

export const CustomSize = (args: Partial<MultivaluesFieldProps>) => {
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


export const Condensed = (args: Partial<MultivaluesFieldProps>) => {
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

export const CondensedAsyncLoading = (args: Partial<MultivaluesFieldProps>) => {
  const { direction } = args;

  const [isOpen, setIsOpen] = useState(false);
  const [listItems, setListItems] = useState<MultivaluesFieldItem[]>([]);
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

  const filter = (nodes: Iterable<Node<object>>): Iterable<Node<object>> => {
    const nodeArr = Array.from(nodes);
    if (!filterString) return nodeArr;
    return nodeArr.filter(item => contains((item.props as { name?: string }).name ?? '', filterString));
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
        {item => {
          const givenName = (item.name as { given?: string; family?: string })?.given ?? '';
          const familyName = (item.name as { given?: string; family?: string })?.family ?? '';
          // `name` is passed through to the Item (as in the original JSX story) but is not
          // part of react-stately's ItemProps, so it is spread via a cast to keep typecheck clean.
          const nameProp = { name: `${givenName} ${familyName}` } as Record<string, unknown>;
          return (
            <Item
              key={item.id}
              data-id={item.id}
              aria-label={(item.name as { username?: string })?.username ?? ''}
              {...nameProp}
            >
              {`${givenName} ${familyName}`}
            </Item>
          );
        }}
      </MultivaluesField>
    </OverlayProvider>

  );
};

export const CondensedWithSection = (args: Partial<MultivaluesFieldProps>) => {
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

export const CondensedWithCustomText = (args: Partial<MultivaluesFieldProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
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
        onSelectionChange={keys => setSelectedKeys(new Set(keys))}
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

export const LongLabels = () => (
  <OverlayProvider>
    <MultivaluesField
      items={longLabelItems}
      label="Example label"
      defaultSelectedKeys={[
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        'Quisque vitae lacinia diam, nec ullamcorper neque.',
        'In egestas dui vel dolor tincidunt, sit amet ullamcorper',
      ]}
    >
      {item => (
        <Item key={item.key} aria-label={item.name}>
          {item.name}
        </Item>
      )}
    </MultivaluesField>
  </OverlayProvider>
);
