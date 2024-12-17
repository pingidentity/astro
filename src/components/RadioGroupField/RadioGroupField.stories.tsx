import React, { useState } from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { RadioField, RadioGroupField } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import RadioGroupFieldReadme from './RadioGroupField.mdx';

export default {
  title: 'Form/RadioGroupField',
  component: RadioGroupField,
  parameters: {
    docs: {
      page: () => (
        <>
          <RadioGroupFieldReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
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
    defaultValue: {},
    orientation: {},
    isDisabled: {},
    isRequired: {},
    name: {},
    id: {},
    value: {
      control: {
        type: 'none',
      },
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
  },
  args: {
    label: 'Pick one',
    defaultValue: 'A',
  },
};

export const Default = args => (
  <RadioGroupField {...args}>
    <RadioField value="A" label="A" />
    <RadioField value="B" label="B" />
    <RadioField value="C" label="C" />
  </RadioGroupField>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.radioGroup.default,
  },
};

export const Controlled = () => {
  const [value, setValue] = useState('A');

  return (
    <RadioGroupField label="Pick one" value={value} onChange={newValue => setValue(newValue)}>
      <RadioField value="A" label="A" />
      <RadioField value="B" label="B" />
      <RadioField value="C" label="C" />
    </RadioGroupField>
  );
};

export const Required = () => (
  <RadioGroupField label="Pick one" isRequired>
    <RadioField value="A" label="A" />
    <RadioField value="B" label="B" />
    <RadioField value="C" label="C" />
  </RadioGroupField>
);

export const CheckedContent = () => (
  <RadioGroupField label="Pick one">
    <RadioField value="A" label="A" checkedContent="You chose A..." />
    <RadioField value="B" label="B" checkedContent="You chose B..." />
    <RadioField value="C" label="C" checkedContent="You chose C..." />
  </RadioGroupField>
);

export const HelperText = () => (
  <RadioGroupField
    label="Pick one"
    helperText="Here is some helpful text..."
    status="error"
  >
    <RadioField value="A" label="A" />
    <RadioField value="B" label="B" />
    <RadioField value="C" label="C" />
  </RadioGroupField>
);

// Added to bypass aria-allowed-attr issue due to ticket UIP-6801
HelperText.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'aria-allowed-attr', enabled: false }],
    },
  },
};

export const HorizontalOrientation = () => (
  <RadioGroupField label="Pick one" orientation="horizontal">
    <RadioField value="A" label="Option A" />
    <RadioField value="B" label="Option B" />
    <RadioField value="C" label="Option C" />
  </RadioGroupField>
);
