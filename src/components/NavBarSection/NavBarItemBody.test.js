import React from 'react';

import { Text } from '../..';
import { render, screen } from '../../utils/testUtils/testWrapper';
import NavBar from '../NavBar';

import NavBarItemBody from './NavBarItemBody';


const getComponent = item => render((
  <NavBar>
    <NavBarItemBody item={{ children: [item] }} />
  </NavBar>
));

const SUBTITLE = 'subtitle';
const TEXT = 'text';

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
