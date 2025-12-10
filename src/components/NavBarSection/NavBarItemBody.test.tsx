import React from 'react';

import { Text } from '../..';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import NavBar from '../NavBar';

import NavBarItemBody from './NavBarItemBody';
import NavBarSection from './NavBarSection';

const SUBTITLE = 'subtitle';
const TEXT = 'text';

const data = [
  {
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

const NavBarWithItemBody = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <NavBar>
      <NavBarItemBody
        isExpanded
        isTransitioning
        ref={ref}
        {...props}
        item={{ children: [<Text>{TEXT}</Text>] }}
      />
    </NavBar>
  );
});

const NavBarWithSection = React.forwardRef<HTMLUListElement>((props, ref) => {
  return (
    <NavBar>
      <NavBarSection ref={ref} {...props} items={data} />
    </NavBar>
  );
});

// Needs to be added to each component's test file
universalComponentTests({
  renderComponent: props => (
    <NavBarWithItemBody {...props} />
  ),
});

// Needs to be added to each component's test file
universalComponentTests({
  renderComponent: props => (
    <NavBarWithSection {...props} />
  ),
});

const getComponent = item => render((
  <NavBar>
    <NavBarItemBody
      item={{ children: [item] }}
      isExpanded
      isTransitioning
    />
  </NavBar>
));

describe('NavBarItemBody', () => {
  describe('when its passed a component', () => {
    it('renders the component', () => {
      const childItem = <Text>{TEXT}</Text>;
      getComponent(childItem);

      expect(screen.getByText(TEXT));
    });
  });

  describe('when its passed an object', () => {
    describe('when it has a subTitle', () => {
      it('renders the subTitle and the separator', () => {
        getComponent({ subTitle: SUBTITLE });

        expect(screen.getByText(SUBTITLE));
        expect(screen.getByRole('separator'));
      });
    });

    describe('when it has a subTitle and hasSeparator is false', () => {
      it('renders the subTitle and no separator', () => {
        getComponent({ subTitle: SUBTITLE, hasSeparator: false });

        expect(screen.getByText(SUBTITLE));
        expect(screen.queryByRole('separator')).not.toBeInTheDocument();
      });
    });
  });
});
