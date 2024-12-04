import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import isEmpty from 'lodash/isEmpty';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { PasswordField } from '../../index';
import { PasswordFieldProps } from '../../types';
import statuses from '../../utils/devUtils/constants/statuses';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import PasswordFieldReadme from './PasswordField.mdx';

export default {
  title: 'Form/PasswordField',
  component: PasswordField,
  parameters: {
    docs: {
      page: () => (
        <>
          <PasswordFieldReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    helperText: {
      control: {
        type: 'text',
      },
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
} as Meta;

export const Default: StoryFn<PasswordFieldProps> = args => {
  return (
    <PasswordField
      label="Example Label"
      {...args}
    />
  );
};

export const WithRequirementsList: StoryFn<PasswordFieldProps> = () => {
  const [charactersReq, setCharactersReq] = useState({
    name: '6 characters',
    status: statuses.DEFAULT,
  });
  const [uppercaseReq, setUppercaseReq] = useState({
    name: '1 UPPERCASE letter',
    status: statuses.DEFAULT,
  });
  const [lowercaseReq, setLowercaseReq] = useState({
    name: '1 lowercase letter',
    status: statuses.DEFAULT,
  });
  const [numberReq, setNumberReq] = useState({
    name: '1 number',
    status: statuses.DEFAULT,
  });
  const [specialReq, setSpecialReq] = useState({
    name: '1 special character',
    status: statuses.DEFAULT,
  });

  const checkPasswordExample = string => {
    const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    if (string.length > 5) {
      setCharactersReq(prev => ({ ...prev, status: statuses.SUCCESS }));
    } else {
      setCharactersReq(prev => ({ ...prev, status: statuses.DEFAULT }));
    }

    if (string.match(/[A-Z]/) !== null && string.match(/[A-Z]/).length >= 1) {
      setUppercaseReq(prev => ({ ...prev, status: statuses.SUCCESS }));
    } else {
      setUppercaseReq(prev => ({ ...prev, status: statuses.DEFAULT }));
    }

    if (string.match(/[a-z]/) !== null && string.match(/[a-z]/).length >= 1) {
      setLowercaseReq(prev => ({ ...prev, status: statuses.SUCCESS }));
    } else {
      setLowercaseReq(prev => ({ ...prev, status: statuses.DEFAULT }));
    }

    if (string.match(/[0-9]/) !== null && string.match(/[0-9]/).length >= 1) {
      setNumberReq(prev => ({ ...prev, status: statuses.SUCCESS }));
    } else {
      setNumberReq(prev => ({ ...prev, status: statuses.DEFAULT }));
    }

    if (specialCharacters.test(string)) {
      setSpecialReq(prev => ({ ...prev, status: statuses.SUCCESS }));
    } else {
      setSpecialReq(prev => ({ ...prev, status: statuses.DEFAULT }));
    }
  };

  const onChange = event => {
    checkPasswordExample(event.target.value);
  };

  return (
    <PasswordField
      label="Example Label"
      onChange={onChange}
      requirements={[
        charactersReq,
        uppercaseReq,
        lowercaseReq,
        numberReq,
        specialReq,
      ]}
    />
  );
};

export const WithStateProps:StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
    />
  );
};

export const FloatLabel:StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
      labelMode="float"
    />
  );
};

// Added to bypass color contrast issue
FloatLabel.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const LeftLabel:StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
      labelMode="left"
    />
  );
};

export const Controlled:StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);
  const [value, setValue] = useState('');

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
      onChange={e => setValue((e.target as HTMLInputElement).value)}
      value={value}
    />
  );
};

export const Disabled: StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
      isDisabled
    />
  );
};

export const ReadOnly: StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
      isReadOnly
    />
  );
};

export const Required: StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
      isRequired
    />
  );
};

export const Warning: StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
      status="warning"
      helperText="This might match a password you’ve used before."
    />
  );
};

export const Success: StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
      status="success"
      helperText="This password meets requirements."
    />
  );
};

export const DynamicRequired: StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);
  const [value, setValue] = useState('');

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      isRequired={isEmpty(value)} // isEmpty from lodash
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
      onChange={e => setValue((e.target as HTMLInputElement).value)}
    />
  );
};

export const MaxLength: StoryFn<PasswordFieldProps> = () => {
  const [isVisible, setPasswordShown] = useState(false);

  const onVisibleChange = () => {
    setPasswordShown(!isVisible);
  };

  return (
    <PasswordField
      onVisibleChange={onVisibleChange}
      isVisible={isVisible}
      label="Example Label"
      labelMode="left"
      maxLength={9}
    />
  );
};
