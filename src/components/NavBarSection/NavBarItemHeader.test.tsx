import React from 'react';
import ViewDashboard from '@pingux/mdi-react/ViewDashboardIcon';

import { useGetTheme } from '../../hooks';
import { render, screen } from '../../utils/testUtils/testWrapper';
import NavBar from '../NavBar';

import NavBarSection from './NavBarSection';

const data = [
  {
    'data-id': 'dashboard-data-id',
    heading: 'Dashboard',
    icon: ViewDashboard,
    key: 'Dashboard',
    children: [
      'Users',
      'Group',
      'Populations',
      'Attributes',
      'Roles',
      'Dashboard Unique',
    ],
  },
];

const mockTheme = {
  themeState: {
    isOnyx: false,
  },
  icons: {
    MenuDown: () => <span>MenuDown</span>,
    MenuUp: () => <span>MenuUp</span>,
  },
};

jest.mock('../../hooks/useGetTheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const NavBarWithSection = React.forwardRef<HTMLUListElement>((props, ref) => {
  return (
    <NavBar>
      <NavBarSection ref={ref} {...props} items={data} />
    </NavBar>
  );
});

const getComponent = () => render((
  <NavBarWithSection />
));

describe('NavItemHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  it('should render Icon', () => {
    getComponent();
    const icon = screen.getByTestId('Dashboard').querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', '20px');
  });
});

describe('NavItemHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetTheme as jest.Mock).mockReturnValue({
      ...mockTheme,
      themeState: {
        isOnyx: true,
      },
    });
  });

  it('should render Icon', () => {
    getComponent();
    const icon = screen.getByTestId('Dashboard').querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', 'icon-200');
  });
});
