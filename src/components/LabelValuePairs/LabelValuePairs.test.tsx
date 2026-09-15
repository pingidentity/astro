import React from 'react';
import InformationIcon from '@pingux/mdi-react/InformationIcon';
import { astroTokens, astroTokensDark } from '@pingux/onyx-tokens';
import userEvent from '@testing-library/user-event';

import {
  AstroProvider, Icon, OnyxDarkTheme, OnyxTheme,
} from '../../index';
import { act, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import LabelValuePairs, {
  Pair, PairLabel, PairSubvalue, PairValue, ValueTypes,
} from '.';

const originalClipboard = { ...global.navigator.clipboard };

const getComponent = (children: React.ReactNode) => render(
  <LabelValuePairs>{children}</LabelValuePairs>,
);

const getThemedComponent = (theme: typeof OnyxTheme, children: React.ReactNode) => render(
  <AstroProvider themeOverrides={[theme]}>
    <LabelValuePairs>{children}</LabelValuePairs>
  </AstroProvider>,
);

const valuePair = (
  <Pair>
    <PairLabel>Username</PairLabel>
    <PairValue>jsmith</PairValue>
  </Pair>
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <LabelValuePairs {...props}>
      <Pair>
        <PairLabel>Username</PairLabel>
        <PairValue>jsmith</PairValue>
      </Pair>
    </LabelValuePairs>
  ),
});

test('renders a row for each field with a value', () => {
  getComponent(valuePair);
  expect(screen.getByText('Username')).toBeInTheDocument();
  expect(screen.getByText('jsmith')).toBeInTheDocument();
});

describe('value color', () => {
  test('uses the primary Onyx light text color', () => {
    getThemedComponent(OnyxTheme, valuePair);

    expect(screen.getByText('jsmith')).toHaveStyleRule('color', astroTokens.color.font.base);
  });

  test('uses the primary Onyx dark text color', () => {
    getThemedComponent(OnyxDarkTheme, valuePair);

    expect(screen.getByText('jsmith')).toHaveStyleRule('color', astroTokensDark.color.font.base);
  });
});

test('rows with falsy value are not rendered unless isLoading is true', () => {
  getComponent(
    <>
      <Pair>
        <PairLabel>Empty Field</PairLabel>
        <PairValue />
      </Pair>
      <Pair>
        <PairLabel>Null Field</PairLabel>
        <PairValue>{null}</PairValue>
      </Pair>
      <Pair>
        <PairLabel>Visible Field</PairLabel>
        <PairValue>some value</PairValue>
      </Pair>
    </>,
  );
  expect(screen.queryByText('Empty Field')).not.toBeInTheDocument();
  expect(screen.queryByText('Null Field')).not.toBeInTheDocument();
  expect(screen.getByText('Visible Field')).toBeInTheDocument();
});

test('rows with falsy value are rendered when isLoading is true', () => {
  getComponent(
    <Pair>
      <PairLabel>Loading Field</PairLabel>
      <PairValue isLoading />
    </Pair>,
  );
  expect(screen.getByText('Loading Field')).toBeInTheDocument();
});

describe('valueType COPYABLE', () => {
  beforeEach(() => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    Object.defineProperty(window, 'navigator', {
      value: { clipboard: mockClipboard },
      configurable: true,
    });
    global.document.execCommand = jest.fn();
    jest.spyOn(document, 'execCommand').mockReturnValue(true);
  });

  afterEach(() => {
    jest.resetAllMocks();
    Object.defineProperty(window, 'navigator', {
      value: { clipboard: originalClipboard },
      configurable: true,
    });
  });

  test('renders a copy-to-clipboard button', () => {
    getComponent(
      <Pair>
        <PairLabel>API Key</PairLabel>
        <PairValue valueType={ValueTypes.COPYABLE}>abc123</PairValue>
      </Pair>,
    );
    expect(screen.getByLabelText('copy to clipboard')).toBeInTheDocument();
  });

  test('clicking the copy button writes the field value to the clipboard', async () => {
    const fieldValue = 'abc123';
    getComponent(
      <Pair>
        <PairLabel>API Key</PairLabel>
        <PairValue valueType={ValueTypes.COPYABLE}>{fieldValue}</PairValue>
      </Pair>,
    );
    const button = screen.getByLabelText('copy to clipboard');
    await act(async () => userEvent.click(button));
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(fieldValue);
  });
});

test('valueType ELEMENT renders the provided node directly', () => {
  const customNode = <span data-testid="custom-element">Custom Element</span>;
  getComponent(
    <Pair>
      <PairLabel>Custom</PairLabel>
      <PairValue valueType={ValueTypes.ELEMENT}>{customNode}</PairValue>
    </Pair>,
  );
  expect(screen.getByTestId('custom-element')).toBeInTheDocument();
  expect(screen.getByText('Custom Element')).toBeInTheDocument();
});

test('valueType MASKED renders bullet characters by default', () => {
  const secretValue = 'secret';
  getComponent(
    <Pair>
      <PairLabel>Password</PairLabel>
      <PairValue valueType={ValueTypes.MASKED}>{secretValue}</PairValue>
    </Pair>,
  );
  const bullets = '•'.repeat(secretValue.length);
  expect(screen.getByText(bullets)).toBeInTheDocument();
});

test('masked toggle has aria-label "Show content" initially, clicking reveals value and changes label to "Hide content"', async () => {
  const secretValue = 'mypassword';
  getComponent(
    <Pair>
      <PairLabel>Secret</PairLabel>
      <PairValue valueType={ValueTypes.MASKED}>{secretValue}</PairValue>
    </Pair>,
  );

  const showButton = screen.getByLabelText('Show content');
  expect(showButton).toBeInTheDocument();

  // The actual value should not be visible yet
  expect(screen.queryByText(secretValue)).not.toBeInTheDocument();

  await userEvent.click(showButton);

  // After click: value is revealed and button label changes
  expect(screen.getByText(secretValue)).toBeInTheDocument();
  expect(screen.getByLabelText('Hide content')).toBeInTheDocument();
});

test('isLoading renders the skeleton and has role="alert" in the DOM', () => {
  getComponent(
    <Pair>
      <PairLabel>Loading Row</PairLabel>
      <PairValue isLoading>will be replaced</PairValue>
    </Pair>,
  );
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('isLoading renders even when value is falsy', () => {
  getComponent(
    <Pair>
      <PairLabel>Empty Loading Row</PairLabel>
      <PairValue isLoading>{undefined}</PairValue>
    </Pair>,
  );
  expect(screen.getByText('Empty Loading Row')).toBeInTheDocument();
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('helpHint content appears and trigger button has expected aria-label', () => {
  const helpText = 'This is some help content';
  const fieldLabel = 'Help Field';
  getComponent(
    <Pair>
      <PairLabel helpHint={helpText}>{fieldLabel}</PairLabel>
      <PairValue>value here</PairValue>
    </Pair>,
  );
  const expectedAriaLabel = `${fieldLabel} help hint`;
  expect(screen.getByLabelText(expectedAriaLabel)).toBeInTheDocument();
});

test('Subvalue renders when provided', () => {
  getComponent(
    <Pair>
      <PairLabel>Main Label</PairLabel>
      <PairSubvalue>Secondary label text</PairSubvalue>
      <PairValue>some value</PairValue>
    </Pair>,
  );
  expect(screen.getByText('Secondary label text')).toBeInTheDocument();
});

test('second child renders as an icon element when provided', () => {
  getComponent(
    <Pair>
      <PairLabel>
        Icon Field
        <Icon aria-hidden="true" title={{ name: '' }} icon={InformationIcon} />
      </PairLabel>
      <PairValue>icon value</PairValue>
    </Pair>,
  );
  // the icon is aria-hidden so must query with hidden: true
  const icons = screen.getAllByRole('img', { hidden: true });
  expect(icons.length).toBeGreaterThan(0);
});

describe('sub-component prop passthrough', () => {
  test('PairLabel forwards containerProps and textProps, and renders a second child as an icon', () => {
    getComponent(
      <Pair>
        <PairLabel
          containerProps={{ 'data-testid': 'label-container' }}
          textProps={{ 'data-testid': 'label-text' }}
        >
          Field
          <Icon data-testid="label-icon" aria-hidden="true" title={{ name: '' }} icon={InformationIcon} />
        </PairLabel>
        <PairValue>value</PairValue>
      </Pair>,
    );
    expect(screen.getByTestId('label-container')).toBeInTheDocument();
    expect(screen.getByTestId('label-text')).toBeInTheDocument();
    expect(screen.getByTestId('label-icon')).toBeInTheDocument();
  });

  test('PairLabel forwards helpHintProps to the HelpHint popover trigger', () => {
    getComponent(
      <Pair>
        <PairLabel
          helpHint="Help content"
          helpHintProps={{ 'data-testid': 'label-help-hint' }}
        >
          Field
        </PairLabel>
        <PairValue>value</PairValue>
      </Pair>,
    );
    expect(screen.getByTestId('label-help-hint')).toBeInTheDocument();
  });

  test('PairValue forwards containerProps and textProps for the default text display', () => {
    getComponent(
      <Pair>
        <PairLabel>Field</PairLabel>
        <PairValue
          containerProps={{ 'data-testid': 'value-container' }}
          textProps={{ 'data-testid': 'value-text' }}
        >
          value
        </PairValue>
      </Pair>,
    );
    expect(screen.getByTestId('value-text')).toBeInTheDocument();
  });

  test('PairValue forwards containerProps and textProps for COPYABLE values', () => {
    getComponent(
      <Pair>
        <PairLabel>Field</PairLabel>
        <PairValue
          valueType={ValueTypes.COPYABLE}
          containerProps={{ 'data-testid': 'copy-container' }}
          textProps={{ 'data-testid': 'copy-text' }}
        >
          abc123
        </PairValue>
      </Pair>,
    );
    expect(screen.getByTestId('copy-container')).toBeInTheDocument();
    expect(screen.getByTestId('copy-text')).toBeInTheDocument();
  });

  test('PairValue forwards containerProps, textProps, iconProps, and iconButtonProps for MASKED values', () => {
    getComponent(
      <Pair>
        <PairLabel>Field</PairLabel>
        <PairValue
          valueType={ValueTypes.MASKED}
          containerProps={{ 'data-testid': 'masked-container' }}
          textProps={{ 'data-testid': 'masked-text' }}
          iconProps={{ 'data-testid': 'masked-icon' }}
          iconButtonProps={{ 'data-testid': 'masked-icon-button' }}
        >
          secret
        </PairValue>
      </Pair>,
    );
    expect(screen.getByTestId('masked-container')).toBeInTheDocument();
    expect(screen.getByTestId('masked-text')).toBeInTheDocument();
    expect(screen.getByTestId('masked-icon')).toBeInTheDocument();
    expect(screen.getByTestId('masked-icon-button')).toBeInTheDocument();
  });

  test('PairValue forwards skeletonProps and containerProps when isLoading', () => {
    getComponent(
      <Pair>
        <PairLabel>Field</PairLabel>
        <PairValue
          isLoading
          containerProps={{ 'data-testid': 'loading-container' }}
          skeletonProps={{ 'data-testid': 'loading-skeleton' }}
        />
      </Pair>,
    );
    expect(screen.getByTestId('loading-container')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  test('PairSubvalue forwards TextProps directly', () => {
    getComponent(
      <Pair>
        <PairLabel>Field</PairLabel>
        <PairSubvalue data-testid="subvalue-text">Secondary text</PairSubvalue>
        <PairValue>value</PairValue>
      </Pair>,
    );
    expect(screen.getByTestId('subvalue-text')).toBeInTheDocument();
  });
});
