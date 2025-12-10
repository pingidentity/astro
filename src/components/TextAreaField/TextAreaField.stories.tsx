import React, { useState } from 'react';
import SearchIcon from '@pingux/mdi-react/SearchIcon';
import { Meta } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Icon,
  TextAreaField,
} from '../../index';
import { modes as labelModes } from '../../utils/devUtils/constants/labelModes';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import TextAreaFieldReadme from './TextAreaField.mdx';

export default {
  title: 'Form/TextAreaField',
  component: TextAreaField,
  parameters: {
    docs: {
      page: () => (
        <>
          <TextAreaFieldReadme />
          <DocsLayout />
        </>
      ),
    },
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    labelMode: {
      control: {
        type: 'select',
        options: Object.values(labelModes),
      },
    },
    defaultValue: {},
    placeholder: {},
    name: {},
    helperText: {
      control: {
        type: 'text',
      },
    },
    hintText: {
      control: {
        type: 'text',
      },
    },
    rows: {},
    isDisabled: {},
    isRequired: {},
    isReadOnly: {},
    hasAutoFocus: {},
    isUnresizable: {},
    id: {},
    autocomplete: {},
    className: {},
    value: {
      control: {
        type: 'none',
      },
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: {
    label: 'Example Label',
    labelMode: Object.values(labelModes)[0],
  },
} as Meta;

const IconSlot = (
  <Box isRow>
    <Icon
      icon={SearchIcon}
      title={{ name: 'Search Icon' }}
    />
  </Box>
);

export const Default = args => (
  <TextAreaField
    {...args}
  />
);

export const WithSlots = () => (
  // This is an example of a slot that can be passed into the component
  // const IconSlot = (
  //   <Box isRow>
  //     <Icon
  //       icon={SearchIcon}
  //     />
  //   </Box>
  // );
  <TextAreaField
    slots={{
      inContainer: IconSlot,
    }}
  />
);

export const FloatLabel = args => (
  <TextAreaField
    {...args}
    label="Example label"
    labelMode="float"
  />
);

export const Controlled = () => {
  const [value, setValue] = useState();

  return (
    <TextAreaField
      label="Example Label"
      onChange={e => setValue(e.target.value)}
      value={value}
    />
  );
};

export const Disabled = args => (
  <TextAreaField
    {...args}
    isDisabled
    label="Example Label"
    value="This is disabled"
  />
);
export const ReadOnly = args => (
  <TextAreaField
    {...args}
    isReadOnly
    label="Example Label"
    value="This is read only"
  />
);

export const Required = args => (
  <TextAreaField
    {...args}
    isRequired
    label="Example Label"
  />
);

export const Rows = args => (
  <TextAreaField
    {...args}
    label="Example label"
    rows={5}
  />
);

export const Unresizable = args => (
  <TextAreaField
    {...args}
    isUnresizable
    label="Example label"
  />
);

export const Error = args => (
  <TextAreaField
    {...args}
    helperText="Here is some helpful text..."
    label="Example Label"
    status="error"
  />
);

export const WithoutStatusIndicator = args => (
  <TextAreaField
    {...args}
    label="Example Label"
    hasNoStatusIndicator
  />
);

export const MaxLength = args => (
  <TextAreaField
    {...args}
    label="Example label"
    maxLength={9}
  />
);
