import React from 'react';

import statuses from '../../utils/devUtils/constants/statuses';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import FieldHelperText from '.';

const testId = 'test-field';
const children = 'example text';
const defaultProps = {
  'data-testid': testId,
  children,
};
const getComponent = (props = {}, { renderFn = render } = {}) => (
  renderFn(<FieldHelperText {...defaultProps} {...props} />)
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <FieldHelperText {...defaultProps} {...props} />,
});

test('basic field message', () => {
  getComponent();
  const fieldHelperText = screen.getByText(children);
  expect(fieldHelperText).toHaveAttribute('data-testid', testId);
  expect(fieldHelperText).toHaveClass(`is-${statuses.DEFAULT}`);
  expect(fieldHelperText).toBeInTheDocument();
});

test('status field message', () => {
  const { rerender } = getComponent();
  const fieldHelperText = screen.getByText(children);

  Object.values(statuses).forEach(status => {
    getComponent({ status }, { renderFn: rerender });
    expect(fieldHelperText).toHaveClass(`is-${status}`);
  });
});
