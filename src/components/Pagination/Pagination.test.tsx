import React from 'react';
import userEvent from '@testing-library/user-event';

import { usePaginationState } from '../../hooks';
import { Box, Text } from '../../index';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Pagination from './Pagination';
import PaginationProvider from './PaginationProvider';

const initialString = '1-10 of 250';

const mockState = {
  setOffsetCount: jest.fn(),
};

const changeFunction = jest.fn();

const offsetChangeFunc = jest.fn();

const nextButtonId = 'next-button';
const prevButtonId = 'prev-button';

const menuId = 'menu-id';

const offsetButtonId = 'menu-button';

const defaultProps = {
  state: mockState,
  onPageIndexChange: changeFunction,
  containerProps: {},
  totalCount: 250,
  onOffsetCountChange: offsetChangeFunc,
  nextButtonProps: {
    'data-testid': nextButtonId,
  },
  previousButtonProps: {
    'data-testid': prevButtonId,
  },
  offsetMenuProps: {
    'data-testid': menuId,
    buttonProps: {
      'data-testid': offsetButtonId,
    },
  },
};

universalComponentTests({ renderComponent: props => <Pagination {...props} {...defaultProps} /> });

const ExampleComponent = () => {
  const { paginationState } = usePaginationState();
  return (
    <Box>
      <Text>
        Current Page Index:
        {' '}
        {paginationState.currentPageIndex}
      </Text>
      <Text>
        First Rendered Index:
        {' '}
        {paginationState.firstRenderedIndex}
      </Text>
      <Text>
        Last Rendered Index:
        {' '}
        {paginationState.lastRenderedIndex}
      </Text>
    </Box>
  );
};

const CustomComponents = () => {
  return (
    <PaginationProvider>
      <Pagination {...defaultProps} />
      <ExampleComponent />
    </PaginationProvider>
  );
};

describe('Pagination Component', () => {
  const getComponent = (props = {}) => render((
    <Pagination {...defaultProps} {...props} />
  ));

  afterEach(() => {
    jest.clearAllMocks();
    offsetChangeFunc.mockClear();
    changeFunction.mockClear();
  });

  it('should render without crashing', () => {
    getComponent();
    expect(screen.getByText(initialString)).toBeInTheDocument();
  });

  it('should call setOffsetCount when a menu item is selected', () => {
    getComponent();
    const popoverButton = screen.getByText(initialString);
    fireEvent.click(popoverButton);

    const menuItem = screen.getByText('Show 25 Results');
    fireEvent.click(menuItem);

    expect(offsetChangeFunc).toHaveBeenCalledWith(25);
  });

  it('should call setOffsetCount when a menu item is selected, but custom props', () => {
    getComponent({ offsetOptions: [5, 51, 100] });
    const popoverButton = screen.getByText(initialString);
    fireEvent.click(popoverButton);

    const menuItem = screen.getByText('Show 51 Results');
    fireEvent.click(menuItem);

    expect(offsetChangeFunc).toHaveBeenCalledWith(51);
  });

  it('should call previousButtonProps.onClick when previous button is clicked', () => {
    getComponent();
    const previousButton = screen.getByTestId(prevButtonId);
    fireEvent.click(previousButton);
    expect(changeFunction).not.toHaveBeenCalled();
  });

  it('should call nextButtonProps.onClick when next button is clicked', () => {
    getComponent();
    const nextButton = screen.getByTestId(nextButtonId);
    expect(changeFunction).not.toHaveBeenCalled();
    act(() => {
      userEvent.click(nextButton);
    });
    expect(changeFunction).toHaveBeenCalledTimes(1);
  });

  it('should not call change function when prev button is clicked, on first page', () => {
    getComponent();
    const previousButton = screen.getByTestId(prevButtonId);
    expect(changeFunction).not.toHaveBeenCalled();
    act(() => {
      userEvent.click(previousButton);
    });
    expect(changeFunction).not.toHaveBeenCalled();
  });

  it('should not call change function when next button is clicked, on last page', () => {
    getComponent({ currentPageIndex: 24 });
    const nextButton = screen.getByTestId(nextButtonId);
    expect(changeFunction).not.toHaveBeenCalled();
    act(() => {
      userEvent.click(nextButton);
    });
    expect(changeFunction).not.toHaveBeenCalled();
  });

  it('should call change function when prev button is clicked', () => {
    getComponent({ currentPageIndex: 24 });
    const previousButton = screen.getByTestId(prevButtonId);
    expect(changeFunction).not.toHaveBeenCalled();
    act(() => {
      userEvent.click(previousButton);
    });
    expect(changeFunction).toHaveBeenCalledTimes(1);
  });

  it('should change offset using keyboard', () => {
    getComponent();

    const menuButton = screen.getByTestId(offsetButtonId);

    // Focus on the next button and press Enter
    userEvent.tab();
    expect(menuButton).toHaveFocus();
    fireEvent.keyDown(menuButton, { key: 'Enter', code: 13 });
    fireEvent.keyUp(menuButton, { key: 'Enter', code: 13 });
    const menuItem = screen.getByText('Show 25 Results');
    expect(menuItem).toBeInTheDocument();
    const menu = screen.getByRole('menu');
    const menutItem = screen.queryAllByRole('menuitemradio')[1];
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    fireEvent.keyUp(menu, { key: 'ArrowDown' });
    fireEvent.keyDown(menutItem, { key: 'Enter', code: 13 });
    fireEvent.keyUp(menutItem, { key: 'Enter', code: 13 });

    expect(screen.getByText('1-25 of 250')).toBeInTheDocument();
  });

  it('should navigate using keyboard keys', () => {
    getComponent();

    const nextButton = screen.getByTestId(nextButtonId);
    const previousButton = screen.getByTestId(prevButtonId);
    const menuButton = screen.getByTestId(offsetButtonId);

    // Focus on the next button and press Enter
    userEvent.tab();
    expect(menuButton).toHaveFocus();
    userEvent.tab();
    expect(nextButton).toHaveFocus();
    fireEvent.keyDown(nextButton, { key: 'Enter', code: 13 });
    fireEvent.keyUp(nextButton, { key: 'Enter', code: 13 });

    expect(screen.getByText('11-20 of 250')).toBeInTheDocument();

    userEvent.tab({ shift: true });
    expect(previousButton).toHaveFocus();
  });

  it('clicking the next button changes the rendered page index string', () => {
    render(<CustomComponents />);

    const nextButton = screen.getByTestId(nextButtonId);

    expect(screen.getByText('Current Page Index: 0')).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(screen.getByText('Current Page Index: 1')).toBeInTheDocument();
  });


  it('if fewer than a full page of items is rendered, this is reflected in the text', () => {
    getComponent({ totalCount: 9, offsetCount: 10 });
    expect(screen.getByText('1-9 of 9')).toBeInTheDocument();
  });
});
