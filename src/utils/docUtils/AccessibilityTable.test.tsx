import React from 'react';
import { render, screen } from '@testing-library/react';

import { universalComponentTests } from '../testUtils/universalComponentTest';

import AccessibilityTable from './AccessibilityTable';

// Needs to be added to each component test file
universalComponentTests({
  renderComponent: props => (
    <AccessibilityTable
      keyboardRows={[{ key: 'Tab', description: 'Focus next element' }]}
      {...props}
    />
  ),
  skipForwardRefTest: true,
});

test('renders nothing when both keyboardRows and screenReaderRows are absent', () => {
  const { container } = render(<AccessibilityTable />);
  expect(container).toBeEmptyDOMElement();
});

test('renders nothing when both props are provided as empty arrays', () => {
  const { container } = render(
    <AccessibilityTable keyboardRows={[]} screenReaderRows={[]} />,
  );
  expect(container).toBeEmptyDOMElement();
});

describe('keyboard navigation section', () => {
  const keyboardRows = [
    { key: 'Tab', description: 'Focus next element' },
    { key: 'Shift+Tab', description: 'Focus previous element' },
  ];

  test('renders the Keyboard Navigation heading', () => {
    render(<AccessibilityTable keyboardRows={keyboardRows} />);
    expect(screen.getByText('Keyboard Navigation')).toBeInTheDocument();
  });

  test('renders the keyboard section description paragraph', () => {
    render(<AccessibilityTable keyboardRows={keyboardRows} />);
    expect(
      screen.getByText('These keys provide additional functionality to the component.'),
    ).toBeInTheDocument();
  });

  test('renders Key and Function column headers', () => {
    render(<AccessibilityTable keyboardRows={keyboardRows} />);
    expect(screen.getByText('Key')).toBeInTheDocument();
    expect(screen.getByText('Function')).toBeInTheDocument();
  });

  test('renders one row per keyboardRows entry', () => {
    render(<AccessibilityTable keyboardRows={keyboardRows} />);
    const rows = screen.getAllByRole('row');
    // thead has 1 row, tbody has 2 rows (one per entry)
    expect(rows).toHaveLength(3);
  });

  test('renders the key cell for each row', () => {
    render(<AccessibilityTable keyboardRows={keyboardRows} />);
    expect(screen.getByText('Tab')).toBeInTheDocument();
    expect(screen.getByText('Shift+Tab')).toBeInTheDocument();
  });

  test('does not render the Screen Readers section', () => {
    render(<AccessibilityTable keyboardRows={keyboardRows} />);
    expect(screen.queryByText('Screen Readers')).not.toBeInTheDocument();
  });

  test('renders a custom keyboardDescription when the prop is provided', () => {
    render(
      <AccessibilityTable
        keyboardRows={keyboardRows}
        keyboardDescription="Custom keyboard description for this component."
      />,
    );
    expect(
      screen.getByText('Custom keyboard description for this component.'),
    ).toBeInTheDocument();
  });

  test('does not render a custom keyboardDescription when the prop is omitted', () => {
    render(<AccessibilityTable keyboardRows={keyboardRows} />);
    expect(
      screen.queryByText('Custom keyboard description for this component.'),
    ).not.toBeInTheDocument();
  });

  test('falls back to the default description when keyboardDescription is an empty string', () => {
    render(<AccessibilityTable keyboardRows={keyboardRows} keyboardDescription="" />);
    expect(
      screen.getByText('These keys provide additional functionality to the component.'),
    ).toBeInTheDocument();
  });
});

describe('screen reader section', () => {
  const screenReaderRows = [
    'aria-label',
    'aria-expanded',
  ];

  test('renders the Screen Readers heading', () => {
    render(<AccessibilityTable screenReaderRows={screenReaderRows} />);
    expect(screen.getByText('Screen Readers')).toBeInTheDocument();
  });

  test('renders the screen reader section description paragraph', () => {
    render(<AccessibilityTable screenReaderRows={screenReaderRows} />);
    expect(
      screen.getByText('This component uses the following attributes to assist screen readers:'),
    ).toBeInTheDocument();
  });

  test('renders a list with one item per screenReaderRows entry', () => {
    render(<AccessibilityTable screenReaderRows={screenReaderRows} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(screenReaderRows.length);
  });

  test('renders text content for each screen reader row item', () => {
    render(<AccessibilityTable screenReaderRows={screenReaderRows} />);
    expect(screen.getByText('aria-label')).toBeInTheDocument();
    expect(screen.getByText('aria-expanded')).toBeInTheDocument();
  });

  test('does not render the Keyboard Navigation section', () => {
    render(<AccessibilityTable screenReaderRows={screenReaderRows} />);
    expect(screen.queryByText('Keyboard Navigation')).not.toBeInTheDocument();
  });
});

describe('both sections together', () => {
  const keyboardRows = [{ key: 'Tab', description: 'Focus next element' }];
  const screenReaderRows = ['aria-label'];

  test('renders both headings when both props are provided', () => {
    render(
      <AccessibilityTable
        keyboardRows={keyboardRows}
        screenReaderRows={screenReaderRows}
      />,
    );
    expect(screen.getByText('Keyboard Navigation')).toBeInTheDocument();
    expect(screen.getByText('Screen Readers')).toBeInTheDocument();
  });

  test('renders both the table and the list', () => {
    render(
      <AccessibilityTable
        keyboardRows={keyboardRows}
        screenReaderRows={screenReaderRows}
      />,
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

describe('markdown rendering', () => {
  test('renders bold markdown in row.description as a strong element', () => {
    const keyboardRows = [{ key: 'Enter', description: '**Confirm** selection' }];
    render(<AccessibilityTable keyboardRows={keyboardRows} />);
    const strongEl = screen.getByText('Confirm');
    expect(strongEl.tagName).toBe('STRONG');
  });

  test('renders plain text description via markdown-to-jsx without error', () => {
    const keyboardRows = [{ key: 'Tab', description: 'Focus next element' }];
    render(<AccessibilityTable keyboardRows={keyboardRows} />);
    expect(screen.getByText('Focus next element')).toBeInTheDocument();
  });

  test('renders bold markdown in screenReaderRows item as a strong element', () => {
    const screenReaderRows = ['**aria-label**: describes the element'];
    render(<AccessibilityTable screenReaderRows={screenReaderRows} />);
    const strongEl = screen.getByText('aria-label');
    expect(strongEl.tagName).toBe('STRONG');
  });
});
