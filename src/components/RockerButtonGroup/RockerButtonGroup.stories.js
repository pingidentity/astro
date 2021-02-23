import React, { useState } from 'react';
import RockerButtonGroup, { Item } from '../RockerButtonGroup';

export default {
  title: 'RockerButtonGroup',
  component: RockerButtonGroup,
};

export const Uncontrolled = () => (
  <RockerButtonGroup>
    <Item name="and" key="and" keyColor="#640099">And</Item>
    <Item name="or" key="or" keyColor="#4660A2">Or</Item>
    <Item name="maybe" key="maybe" keyColor="accent.30">Maybe</Item>
  </RockerButtonGroup>
);

export const Controlled = () => {
  const [currentTab, setCurrentTab] = useState('and');
  return (
    <RockerButtonGroup selectedKey={currentTab} onSelectionChange={setCurrentTab} >
      <Item name="and" key="and" keyColor="#640099">And</Item>
      <Item name="or" key="or" keyColor="#4660A2">Or</Item>
      <Item name="maybe" key="maybe" keyColor="accent.30">Maybe</Item>
    </RockerButtonGroup>
  );
};

export const DisabledSingleButton = () => (
  <RockerButtonGroup defaultSelectedKey="or">
    <Item name="and" key="and" keyColor="#640099" isDisabled>And</Item>
    <Item name="or" key="or" keyColor="#4660A2">Or</Item>
    <Item name="maybe" key="maybe" keyColor="accent.30">Maybe</Item>
  </RockerButtonGroup>
);

export const DisabledRockerButtonGroup = () => (
  <RockerButtonGroup isDisabled defaultSelectedKey="and">
    <Item name="and" key="and" keyColor="#640099">And</Item>
    <Item name="or" key="or" keyColor="#4660A2">Or</Item>
    <Item name="maybe" key="maybe" keyColor="accent.30">Maybe</Item>
  </RockerButtonGroup>
);
