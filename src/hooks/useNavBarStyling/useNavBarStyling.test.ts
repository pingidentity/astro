import { renderHook } from '@testing-library/react';

import useNavBarStyling from '.';

test('popUpNav variant returns the correct variants', () => {
  const { result } = renderHook(() => useNavBarStyling('popupNav'));
  expect(result.current).toMatchObject({
    navBar: 'navBar.popUpContainer',
    primaryItem: 'variants.navBar.popUpSectionButton',
    sectionItem: 'variants.navBar.popUpSectionButton',
    navBarItemHeader: 'navBar.popUpItemHeaderContainer',
    navBarItemHeaderText: 'variants.navBar.popUpHeaderText',
    navBarItemButton: 'variants.navBar.popUpItemButton',
    navBarItemLink: 'variants.navBar.popUpItemButton',
    navBarItem: 'navBar.popUpItem',
    navBarItemText: 'variants.navBar.popUpHeaderText',
    navBarItemHeaderListItem: 'variants.navBar.popUpItemListItem',
    navBarItemBody: 'variants.navBar.popUpNavBarItemBody',
    navBarItemHeaderIconSize: 'xs',
  });
});

test('default prop returns standard nav variants', () => {
  const { result } = renderHook(() => useNavBarStyling(''));
  expect(result.current).toMatchObject({
    navBar: 'navBar.container',
    primaryItem: 'variants.navBar.sectionButton',
    sectionItem: 'variants.navBar.sectionButton',
    navBarItemHeader: 'navBar.itemHeaderContainer',
    navBarItemHeaderText: 'variants.navBar.headerText',
    navBarItemButton: 'variants.navBar.itemButton',
    navBarItemLink: 'variants.navBar.itemButton',
    navBarItem: 'variants.navBar.item',
    navBarItemText: 'variants.navBar.headerText',
    navBarItemHeaderListItem: null,
    navBarItemBody: 'variants.navBar.navBarItemBody',
    navBarItemHeaderIconSize: 'sm',
  });
});
