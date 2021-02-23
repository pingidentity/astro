import React, { useState } from 'react';
import RockerButtonGroup from '../RockerButtonGroup';
import RockerButton from '../RockerButton';

export const Uncontrolled = () => (
  <RockerButtonGroup>
    <RockerButton name="and" key="and">And</RockerButton>
    <RockerButton name="or" key="or" >Or</RockerButton>
    <RockerButton name="maybe" key="maybe" >Maybe</RockerButton>
  </RockerButtonGroup>
);

export const Controlled = () => {
  const [currentTab, setCurrentTab] = useState('and');
  return (
    <RockerButtonGroup selectedKey={currentTab} onSelectionChange={setCurrentTab} >
      <RockerButton name="and" key="and" >And</RockerButton>
      <RockerButton name="or" key="or">Or</RockerButton>
      <RockerButton name="maybe" key="maybe" >Maybe</RockerButton>
    </RockerButtonGroup>
  );
};

export const withCustomSelectedColors = () => (
  <RockerButtonGroup>
    <RockerButton
      name="and"
      key="and"
      selectedStyles={{
        bg: '#640099',
      }}
    >
      And
    </RockerButton>
    <RockerButton
      name="or"
      key="or"
      selectedStyles={{
        bg: '#4660A2',
      }}
    >
      Or
    </RockerButton>
    <RockerButton
      name="maybe"
      key="maybe"
      selectedStyles={{
        bg: 'accent.30',
        color: 'yellow',
      }}
    >
      Maybe
    </RockerButton>
  </RockerButtonGroup>
);

export const DisabledSingleButton = () => (
  <RockerButtonGroup defaultSelectedKey="or">
    <RockerButton name="and" key="and" isDisabled>And</RockerButton>
    <RockerButton name="or" key="or">Or</RockerButton>
    <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
  </RockerButtonGroup>
);

export const DisabledRockerButtonGroup = () => (
  <RockerButtonGroup isDisabled defaultSelectedKey="and">
    <RockerButton name="and" key="and">And</RockerButton>
    <RockerButton name="or" key="or">Or</RockerButton>
    <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
  </RockerButtonGroup>
);
