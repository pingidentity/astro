import React from 'react';

import { ariaAttributeBaseArgTypes } from '../../utils/devUtils/props/ariaAttributes';
import { inutFieldAttributeBaseArgTypes } from '../../utils/devUtils/props/fieldAttributes';
import CheckboxField from './CheckboxField';
import Link from '../Link';
import Text from '../Text';
import statuses from '../../utils/devUtils/constants/statuses';

export default {
  title: 'Form/CheckboxField',
  component: CheckboxField,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Click me!',
    },
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
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
    },
    name: {},
    id: {
      control: {
        type: 'text',
      },
    },
    value: {},
    isRequired: {},
    isDisabled: {},
    isReadOnly: {},
    hasAutoFocus: {},
    isIndeterminate: {},
    isDefaultSelected: {},
    isSelected: {},
    ...ariaAttributeBaseArgTypes,
    ...inutFieldAttributeBaseArgTypes,
  },
};

export const Default = args => (
  <CheckboxField
    {...args}
  />
);

export const DefaultSelected = () => (
  <CheckboxField
    isDefaultSelected
    label="Click me"
  />
);

export const Controlled = () => {
  const [isSelected, setSelected] = React.useState(false);
  return (
    <CheckboxField
      isSelected={isSelected}
      onChange={setSelected}
      label="Click me"
    />
  );
};

export const Required = () => (
  <CheckboxField
    isRequired
    label={
      <Text>
        I agree to the <Link href="https://pingidentity.com" target="_blank">Terms and Conditions</Link>
      </Text>
    }
  />
);

export const HelperText = () => (
  <CheckboxField
    status="error"
    helperText="Here is some helpful text..."
    label="Click me"
  />
);
