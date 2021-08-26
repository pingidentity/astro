import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import PasswordField from '.';
import statuses from '../../utils/devUtils/constants/statuses';

export default {
  title: 'Form/PasswordField',
  component: PasswordField,
  argTypes: {
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
  },
};

export const Default = (args) => {
  return (
    <PasswordField
      label="Example Label"
      {...args}
    />
  );
};

export const WithRequirementsList = () => {
  const [requirements, setRequirements] = useState([
    {
      name: '6 characters',
      status: 'default',
    },
    {
      name: '1 UPPERCASE letter',
      status: 'default',
    },
    {
      name: '1 lowercase letter',
      status: 'default',
    },
    {
      name: '1 number',
      status: 'default',
    },
    {
      name: '1 special character',
      status: 'default',
    },
  ]);

  const checkPasswordExample = (string) => {
    const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    const newRequirements = requirements;

    if (string.length > 5) {
      newRequirements[0].status = 'success';
    } else {
      newRequirements[0].status = 'default';
    } if (string.match(/[A-Z]/) !== null && string.match(/[A-Z]/).length >= 1) {
      newRequirements[1].status = 'success';
    } else {
      newRequirements[1].status = 'default';
    } if (string.match(/[a-z]/) !== null && string.match(/[a-z]/).length >= 1) {
      newRequirements[2].status = 'success';
    } else {
      newRequirements[2].status = 'default';
    } if (string.match(/[0-9]/) !== null && string.match(/[0-9]/).length >= 1) {
      newRequirements[3].status = 'success';
    } else {
      newRequirements[3].status = 'default';
    } if (specialCharacters.test(string)) {
      newRequirements[4].status = 'success';
    } else {
      newRequirements[4].status = 'default';
    }
    setRequirements(newRequirements);
  };

  const onChange = (event) => {
    checkPasswordExample(event.target.value);
  };

  return (
    <PasswordField
      label="Example Label"
      onChange={onChange}
      requirements={requirements}
    />
  );
};

export const WithStateProps = () => {
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

export const FloatLabel = () => {
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

export const LeftLabel = () => {
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

export const Controlled = () => {
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
      onChange={e => setValue(e.target.value)}
      value={value}
    />
  );
};

export const Disabled = () => {
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

export const ReadOnly = () => {
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

export const Required = () => {
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

export const Warning = () => {
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
    />
  );
};

export const Success = () => {
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
    />
  );
};

export const DynamicRequired = () => {
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
      onChange={e => setValue(e.target.value)}
    />
  );
};
