import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import PasswordField from '.';
import { ariaAttributeBaseArgTypes } from '../../utils/devUtils/props/ariaAttributes';
import { inutFieldAttributeBaseArgTypes } from '../../utils/devUtils/props/fieldAttributes';
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
    ...ariaAttributeBaseArgTypes,
    ...inutFieldAttributeBaseArgTypes,
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

  const checkPasswordExample = (string) => {
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

  const onChange = (event) => {
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

export const MaxLength = () => {
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
