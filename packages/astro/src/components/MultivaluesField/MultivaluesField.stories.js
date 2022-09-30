import React, { useState } from 'react';

import { Box, Item, MultivaluesField, OverlayProvider } from '../../';
import { ariaAttributeBaseArgTypes } from '../../utils/devUtils/props/ariaAttributes';
import statuses from '../../utils/devUtils/constants/statuses';

export default {
  title: 'Form/MultivaluesField',
  component: MultivaluesField,
  argTypes: {
    direction: {
      defaultValue: 'bottom',
    },
    hasAutoFocus: {},
    hasNoStatusIndicator: {},
    isDisabled: {},
    isNotFlippable: {},
    isReadOnly: {},
    isRequired: {},
    label: {
      defaultValue: 'Field Label',
    },
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
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    ...ariaAttributeBaseArgTypes,
  },
  parameters: {
    docs: {
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

const items = [
  { id: 1, name: 'Aardvark', key: 'Aardvark' },
  { id: 2, name: 'Kangaroo', key: 'Kangaroo' },
  { id: 3, name: 'Snake', key: 'Snake' },
  { id: 4, name: 'Frog', key: 'Frog' },
  { id: 5, name: 'Seal', key: 'Seal' },
  { id: 6, name: 'Orangutan', key: 'Orangutan' },
  { id: 7, name: 'Shark', key: 'Shark' },
];

const setOverlayStyle = (direction, isOpen, mr, ml, mt) => {
  return {
    marginRight: direction === 'right' && isOpen ? mr : 0,
    marginLeft: direction === 'left' && isOpen ? ml : 0,
    marginTop: direction === 'top' && isOpen ? mt : 0,
  };
};

export const Default = (args) => {
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
        items={items}
        {...args}
        onOpenChange={onOpenChange}
      >
        {item => (
          <Item key={item.key} data-id={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const WithCustomValues = (args) => {
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
        items={items}
        mode="non-restrictive"
        {...args}
        onOpenChange={onOpenChange}
      >
        {item => (
          <Item key={item.key} data-id={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

WithCustomValues.argTypes = {
  mode: {
    defaultValue: 'non-restrictive',
  },
};

export const WithDisabledKeys = (args) => {
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
          <Item key={item.key} data-id={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const Uncontrolled = (args) => {
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
          <Item key={item.key} data-id={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const Controlled = (args) => {
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
          <Item key={item.key} data-id={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const WithCustomSize = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = args;

  const onOpenChange = () => {
    setIsOpen(true);
  };

  return (
    <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Box width={300}>
        <OverlayProvider
        // note: spacing for demo purpose only so that the select list renders in the correct place
          style={setOverlayStyle(direction, isOpen, '25%', '25%', '75%')}
        >
          <MultivaluesField
            items={items}
            {...args}
            onOpenChange={onOpenChange}
          >
            {item => (
              <Item key={item.key} data-id={item.name}>
                {item.name}
              </Item>
            )}
          </MultivaluesField>
        </OverlayProvider>
      </Box>
    </Box>
  );
};

export const WithReadOnlyValues = (args) => {
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
          <Item key={item.key} data-id={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const Error = (args) => {
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
          <Item key={item.key} data-id={item.name} >
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const ReadOnlyField = (args) => {
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
        items={items}
        {...args}
        isReadOnly
        onOpenChange={onOpenChange}
      >
        {item => (
          <Item key={item.key} data-id={item.name} >
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
  );
};
