import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';

import { Requirements, RequirementsListProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import RequirementsList from '.';

// Emotion Cache added as test fails otherwise, root cause of this failure is unknown.
// Failure occured with ThemeUI refactor.
// https://github.com/emotion-js/emotion/issues/1105#issuecomment-557726922
const emotionCache = createCache({ key: 'requirements-test' });
emotionCache.compat = true;

const testId = 'test-requirements-list';

const testStatusIdDefault = 'status-icon__default';
const testStatusIdSuccess = 'status-icon__success';
const testStatusIdWarning = 'status-icon__warning';
const testStatusIdError = 'status-icon__error';

const testRequirements: Requirements = [
  {
    name: '6 characters',
    status: 'default',
  },
  {
    name: '1 UPPERCASE letter',
    status: 'success',
  },
  {
    name: '1 lowercase letter',
    status: 'success',
  },
  {
    name: '1 number',
    status: 'error',
  },
  {
    name: 'Password Strength',
    status: 'warning',
  },
];

const defaultProps = {
  'data-testid': testId,
  requirements: testRequirements,
};


const getComponent = (props: RequirementsListProps = {}) => render(
  <CacheProvider value={emotionCache}>
    <RequirementsList {...defaultProps} {...props} />
  </CacheProvider>,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <RequirementsList {...defaultProps} {...props} />,
});

test('base case requirements list', () => {
  getComponent();
  const requirementsList = screen.getByTestId(testId);
  expect(requirementsList).toBeInstanceOf(HTMLUListElement);
  expect(requirementsList).toBeInTheDocument();
});

test('empty variables requirements list', () => {
  getComponent({ requirements: [] });
  const requirementsList = screen.getByTestId(testId);
  expect(requirementsList).toBeInstanceOf(HTMLUListElement);
  expect(requirementsList).toBeInTheDocument();
});


test('should render default status icon if such passed in props', () => {
  getComponent({
    requirements: [
      {
        name: '6 characters',
        status: 'default',
      },
    ],
  });
  expect(screen.getByTestId(testStatusIdDefault)).toBeInTheDocument();
});

test('should render success status icon if such passed in props', () => {
  getComponent({
    requirements: [
      {
        name: '6 characters',
        status: 'success',
      },
    ],
  });
  expect(screen.getByTestId(testStatusIdSuccess)).toBeInTheDocument();
});

test('should render warning status icon if such passed in props', () => {
  getComponent({
    requirements: [
      {
        name: '6 characters',
        status: 'warning',
      },
    ],
  });
  expect(screen.getByTestId(testStatusIdWarning)).toBeInTheDocument();
});

test('should render error status icon if such passed in props', () => {
  getComponent({
    requirements: [
      {
        name: '6 characters',
        status: 'error',
      },
    ],
  });
  expect(screen.getByTestId(testStatusIdError)).toBeInTheDocument();
});
