/**
 * Generates the necessary props to be used in field components.
 * @param {String} variant Variant for the overall NavBar
 * @returns {Object} Prop object that distributes styling to various sub-components.
 */

const useNavBarStyling = variant => {
  switch (variant) {
    case 'popupNav':
      return {
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
      };
    default:
      return {
        navBar: 'navBar.container',
        primaryItem: 'variants.navBar.sectionButton',
        sectionItem: 'variants.navBar.sectionButton',
        navBarItemHeader: 'navBar.itemHeaderContainer',
        navBarItemHeaderText: 'variants.navBar.headerText',
        navBarItemButton: 'variants.navBar.itemButton',
        navBarItemLink: 'variants.navBar.itemButton',
        navBarItem: 'navBar.item',
        navBarItemText: 'variants.navBar.headerText',
        navBarItemHeaderListItem: null,
        navBarItemBody: 'variants.navBar.navBarItemBody',
        navBarItemHeaderIconSize: 'sm',
      };
  }
};

export default useNavBarStyling;
