import React, { useState } from 'react';
import SearchIcon from 'mdi-react/SearchIcon';
import TextAreaField from '.';

import { Box, Icon } from '../../';
import { ariaAttributeBaseArgTypes } from '../../utils/devUtils/props/ariaAttributes';
import { modes as labelModes } from '../Label/constants';
import statuses from '../../utils/devUtils/constants/statuses';

export default {
  title: 'Form/TextAreaField',
  component: TextAreaField,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Example Label',
    },
    labelMode: {
      control: {
        type: 'select',
        options: Object.values(labelModes),
      },
      defaultValue: Object.values(labelModes)[0],
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
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
    },
    isDisabled: {},
    isRequired: {},
    isReadOnly: {},
    hasAutoFocus: {},
    isUnresizable: {},
    id: {},
    autocomplete: {},
    className: {},
    containerProps: {},
    labelProps: {},
    controlProps: {},
    value: {
      control: {
        type: 'none',
      },
    },
    ...ariaAttributeBaseArgTypes,
  },
};

const IconSlot = (
  <Box isRow>
    <Icon
      icon={SearchIcon}
    />
  </Box>
);

export const Default = args => (
  <TextAreaField
    {...args}
  />
);

export const WithSlots = args => (
  // This is an example of a slot that can be passed into the component
  // const IconSlot = (
  //   <Box isRow>
  //     <Icon
  //       icon={SearchIcon}
  //     />
  //   </Box>
  // );
  <TextAreaField
    {...args}
    slots={{
      inContainer: IconSlot,
    }}
  />
);

export const FloatLabel = () => (
  <TextAreaField
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

export const Disabled = () => (
  <TextAreaField
    isDisabled
    label="Example Label"
    value="This is disabled"
  />
);
export const ReadOnly = () => (
  <TextAreaField
    isReadOnly
    label="Example Label"
    value="This is read only"
  />
);

export const Required = () => (
  <TextAreaField
    isRequired
    label="Example Label"
  />
);

export const Rows = () => (
  <TextAreaField
    label="Example label"
    rows={5}
  />
);

export const Unresizable = () => (
  <TextAreaField
    isUnresizable
    label="Example label"
  />
);

export const Error = () => (
  <TextAreaField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="error"
  />
);

export const WithoutStatusIndicator = () => (
  <TextAreaField
    label="Example Label"
    hasNoStatusIndicator
  />
);

export const MaxLength = () => (
  <TextAreaField
    label="Example label"
    maxLength={9}
  />
);
