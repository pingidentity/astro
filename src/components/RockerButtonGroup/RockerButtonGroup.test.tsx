import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { RockerButton, RockerButtonGroup } from '../../index';
import { RockerButtonGroupProps } from '../../types';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'testId';

type TestButton = {
  name: string;
  key: string;
  selectedStyles?: { bg: string };
};

const testButtons: TestButton[] = [
  { name: 'And', key: 'And', selectedStyles: { bg: '#640099' } },
  { name: 'Or', key: 'Or', selectedStyles: { bg: 'accent.30' } },
  { name: 'Maybe?', key: 'Maybe?' },
];

const defaultProps = {
  'data-testid': testId,
  defaultSelectedKey: testButtons[0].name,
};

const getComponent = (props = {}, { buttons = testButtons, renderFn = render } = {}) => renderFn((
  <RockerButtonGroup {...defaultProps} {...props} data-id="test-container">
    {buttons.map(button => (
      <RockerButton
        name={button.name}
        key={button.key}
        selectedStyles={button.selectedStyles}
      />
    ))}
  </RockerButtonGroup>
));

const ControlledWithSelectedKey = (
  {
    selectedKey: initialKey,
    onSelectionChange: onSelectionChangeProp,
    ...props
  }: RockerButtonGroupProps,
) => {
  const [selectedKey, setSelectedKey] = useState(initialKey);

  const handleSelectionChange = (key: string) => {
    setSelectedKey(key);
    onSelectionChangeProp?.(key);
  };

  return (
    <RockerButtonGroup
      selectedKey={selectedKey}
      onSelectionChange={handleSelectionChange}
      {...props}
      data-id="test-container"
    >
      {testButtons.map(button => (
        <RockerButton
          name={button.name}
          key={button.key}
          selectedStyles={button.selectedStyles}
        />
      ))}
    </RockerButtonGroup>
  );
};

const ControlledWithSelectedKeys = (
  {
    selectedKeys: initialKeys,
    onSelectionChange: onSelectionChangeProp,
    ...props
  }: RockerButtonGroupProps,
) => {
  const [selectedKeys, setSelectedKeys] = useState(initialKeys);

  const handleSelectionChange = (keys: string[]) => {
    setSelectedKeys(keys);
    onSelectionChangeProp?.(keys);
  };

  return (
    <RockerButtonGroup
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
      {...props}
      data-id="test-container"
    >
      {testButtons.map(button => (
        <RockerButton
          name={button.name}
          key={button.key}
          selectedStyles={button.selectedStyles}
        />
      ))}
    </RockerButtonGroup>
  );
};

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <RockerButtonGroup {...props}>
      <RockerButton
        name={testButtons[0].name}
        key={testButtons[0].key}
        selectedStyles={testButtons[0].selectedStyles}
      />
    </RockerButtonGroup>
  ),
});

test('renders rocker container with buttons', () => {
  getComponent();
  const rockerContainer = screen.getByTestId(testId);
  expect(rockerContainer).toBeInTheDocument();
  const buttons = screen.getAllByRole('radio');
  expect(buttons).toHaveLength(3);
});

test('buttonGroup is not disabled by default', () => {
  getComponent();
  const rockerContainer = screen.getByTestId(testId);
  expect(rockerContainer).toBeEnabled();

  testButtons.forEach(button => {
    const buttonKey = screen.getByText(button.key);
    expect(buttonKey).not.toHaveClass('is-disabled');
  });
});

test('rocker button is disabled when its key is included in disabledKeys', () => {
  getComponent({ disabledKeys: testButtons.map(button => button.key) });
  testButtons.forEach(button => {
    const buttonKey = screen.getByText(button.key);
    expect(buttonKey).toHaveClass('is-disabled');
  });
});

test('rockerButton renders selectedStyles prop when selected', () => {
  getComponent();
  const buttonColorKey = screen.getByText(testButtons[0].key);
  expect(buttonColorKey).toHaveClass('is-selected');
});

test('selected button can be changed by keyboard interaction', async () => {
  getComponent();
  await userEvent.tab();
  const button0 = screen.getByText(testButtons[0].key);
  expect(button0).toHaveClass('is-selected');
  const button1 = screen.getByText(testButtons[1].key);
  expect(button1).not.toHaveClass('is-selected');
  fireEvent.keyDown(screen.getByText(testButtons[0].key), { key: 'ArrowRight', code: 'ArrowRight' });
  fireEvent.keyDown(screen.getByText(testButtons[1].key), { key: 'Enter', code: 'Enter' });
  fireEvent.keyUp(screen.getByText(testButtons[1].key), { key: 'Enter', code: 'Enter' });

  const updatedButton0 = await screen.findByText(testButtons[0].key);
  const updatedButton1 = await screen.findByText(testButtons[1].key);

  expect(updatedButton1).toHaveClass('is-selected');
  expect(updatedButton0).not.toHaveClass('is-selected');
});

test('rockerButton renders correct darker bg when selectedStyles prop is passed', async () => {
  getComponent();
  const button0 = screen.getByText(testButtons[0].key);
  expect(button0).toHaveClass('is-selected');
  expect(button0).toHaveStyle('background-color: #640099');
  await userEvent.hover(button0);
  expect(button0).toHaveClass('is-selected');
  expect(button0).toHaveClass('is-hovered');
  expect(button0).toHaveStyle('background-color: #590089');
  fireEvent.keyDown(button0, { key: 'Enter', code: 13 });
  expect(button0).toHaveClass('is-selected');
  expect(button0).toHaveClass('is-pressed');
  expect(button0).toHaveStyle('background-color: #4d0077');
});

test('rockerButton renders correct bg when selectedStyles prop is css variable', async () => {
  getComponent();
  const button1 = screen.getByText(testButtons[1].key);
  fireEvent.keyDown(screen.getByText(testButtons[0].key), { key: 'ArrowRight', code: 'ArrowRight' });
  fireEvent.keyDown(screen.getByText(testButtons[1].key), { key: 'Enter', code: 'Enter' });
  fireEvent.keyUp(screen.getByText(testButtons[1].key), { key: 'Enter', code: 'Enter' });
  await userEvent.hover(button1);
  expect(button1).toHaveClass('is-selected');
  expect(button1).toHaveClass('is-hovered');
  expect(button1).toHaveStyle('background-color: #364872');
  fireEvent.keyDown(button1, { key: 'Enter', code: 13 });
  expect(button1).toHaveClass('is-selected');
  expect(button1).toHaveClass('is-pressed');
  expect(button1).toHaveStyle('background-color: #2e3e63');
});

test('should call onSelectionChange callback when selectedKey prop is provided', async () => {
  const onSelectionChange = jest.fn();
  render(<ControlledWithSelectedKey selectedKey="Or" onSelectionChange={onSelectionChange} />);

  const button0 = screen.getByRole('radio', { name: testButtons[0].key });
  const button1 = screen.getByRole('radio', { name: testButtons[1].key });
  const button2 = screen.getByRole('radio', { name: testButtons[2].key });

  expect(button0).not.toHaveClass('is-selected');
  expect(button1).toHaveClass('is-selected');
  expect(button2).not.toHaveClass('is-selected');

  await act(async () => userEvent.click(button0));
  expect(onSelectionChange).toHaveBeenCalledWith(testButtons[0].key);
  expect(button0).toHaveClass('is-selected');

  await act(async () => userEvent.click(button2));
  expect(onSelectionChange).toHaveBeenCalledWith(testButtons[2].key);
  expect(button2).toHaveClass('is-selected');
});


test('should call onSelectionChange callback when selectedKeys prop is provided', async () => {
  const onSelectionChange = jest.fn();
  render(<ControlledWithSelectedKeys selectedKeys={['Or']} onSelectionChange={onSelectionChange} />);

  const button0 = screen.getByRole('radio', { name: testButtons[0].key });
  const button1 = screen.getByRole('radio', { name: testButtons[1].key });
  const button2 = screen.getByRole('radio', { name: testButtons[2].key });

  expect(button0).not.toHaveClass('is-selected');
  expect(button1).toHaveClass('is-selected');
  expect(button2).not.toHaveClass('is-selected');

  await act(async () => userEvent.click(button0));
  expect(onSelectionChange).toHaveBeenCalledWith([testButtons[0].key]);
  expect(button0).toHaveClass('is-selected');

  await act(async () => userEvent.click(button2));
  expect(onSelectionChange).toHaveBeenCalledWith([testButtons[2].key]);
  expect(button2).toHaveClass('is-selected');
});
