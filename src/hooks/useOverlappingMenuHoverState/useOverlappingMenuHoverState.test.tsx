import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  IconButton,
  ListItem,
  Menu,
  PopoverMenu,
} from '../../index';

import useOverlappingMenuHoverState from './index';

const IS_HOVERED = 'isHovered';

const TestComponent = () => {
  const listItemRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const {
    handleHoverEnd,
    handleHoverStart,
    handleMenuHoverEnd,
    handleMouseMove,
    isHovered,
  } = useOverlappingMenuHoverState({ listItemRef });

  return (
    <>
      <ListItem
        isHovered={isHovered}
        onHoverEnd={handleHoverEnd}
        onHoverStart={handleHoverStart}
        onMouseMove={() => handleMouseMove}
        role="listitem"
        ref={listItemRef}
      >
        <PopoverMenu>
          <IconButton />
          <Menu
            onAction={handleHoverEnd}
            onHoverEnd={handleMenuHoverEnd}
            onHoverStart={handleHoverStart}
          />
        </PopoverMenu>
      </ListItem>
      {isHovered && IS_HOVERED}
    </>
  );
};

const getComponent = () => render(<TestComponent />);

describe('useOverlappingMenuHoverState', () => {
  describe('when the menu is closed', () => {
    describe('when the ListItem has not been hovered', () => {
      it('it should not be hovered', () => {
        getComponent();

        expect(screen.queryByText(IS_HOVERED)).not.toBeInTheDocument();
      });
    });

    describe('when the ListItem is hovered', () => {
      it('it should be hovered', async () => {
        getComponent();

        await userEvent.hover(screen.getByRole('listitem'));

        screen.getByText(IS_HOVERED);
      });
    });
  });

  describe('when the menu is opened', () => {
    describe('when the ListItem is hovered', () => {
      it('it should be hovered', async () => {
        getComponent();

        await userEvent.click(screen.getByRole('button'));

        screen.getByText(IS_HOVERED);
      });
    });

    describe('when the ListItem is unhovered', () => {
      it('it should not be hovered', async () => {
        getComponent();

        await userEvent.click(screen.getByRole('button'));

        await userEvent.unhover(screen.getByRole('listitem'));

        expect(screen.queryByText(IS_HOVERED)).not.toBeInTheDocument();
      });
    });

    describe('when the Menu is hovered', () => {
      it('it should be hovered', async () => {
        getComponent();

        await userEvent.click(screen.getByRole('button'));

        await userEvent.hover(screen.getByRole('menu'));

        screen.getByText(IS_HOVERED);
      });
    });

    describe('when hover moves from the menu to the ListItem', () => {
      // FIXME: upgrade RTL to v14 (UIP-6248), then fix this test,
      // then remove related coveragePathIgnorePatterns in jest.config.js
      it('it should be hovered', async () => {
        getComponent();

        await userEvent.click(screen.getByRole('button'));

        await userEvent.hover(screen.getByRole('menu'));
        await userEvent.hover(screen.getByRole('listitem'));

        screen.getByText(IS_HOVERED);
      });
    });

    describe('when hover moves from the menu to unhovered', () => {
      it('it should not be hovered', async () => {
        getComponent();

        await userEvent.click(screen.getByRole('button'));

        await userEvent.hover(screen.getByRole('menu'));
        await userEvent.unhover(screen.getByRole('menu'));

        expect(screen.queryByText(IS_HOVERED)).not.toBeInTheDocument();
      });
    });

    describe('when hover moves from the menu to ListItem to unhoverd', () => {
      it('it should not be hovered', async () => {
        getComponent();

        await userEvent.click(screen.getByRole('button'));

        await userEvent.hover(screen.getByRole('menu'));
        await userEvent.hover(screen.getByRole('listitem'));
        await userEvent.unhover(screen.getByRole('listitem'));

        expect(screen.queryByText(IS_HOVERED)).not.toBeInTheDocument();
      });
    });
  });
});
