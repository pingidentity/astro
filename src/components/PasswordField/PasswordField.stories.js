import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import PasswordField from '.';

export default {
  title: 'Form/PasswordField',
  component: PasswordField,
};

export const Default = () => {
  return (
    <PasswordField
      label="Example Label"
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
