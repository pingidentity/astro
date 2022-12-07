import React from 'react';

import NavBarItemBody from './NavBarItemBody';

import { Text } from '../../';
import { render, screen } from '../../utils/testUtils/testWrapper';


const getComponent = item => render((
  <NavBarItemBody item={{ children: [item] }} />
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
