interface NavBarStyling {
  /**
   * @typedef {Object} NavBarStylingObject
   * @property {String} navBar - The nav bar container
   * @property {String} primaryItem - The nav bar selection button
   * @property {String} sectionItem -  The nav bar selection button;
   * @property {String} navBarItemHeader - The nav bar item header;
   * @property {String} navBarItemHeaderText - The nav bar item header text;
   * @property {String} navBarItemButton - The nav bar item button;
   * @property {String} navBarItemLink - The nav bar item link;
   * @property {String} navBarItem - The nav bar item;
   * @property {String} navBarItemText - The nav bar item text;
   * @property {String} navBarItemHeaderListItem - The nav bar item header list item;
   * @property {String} navBarItemBody - The nav bar item body;
   * @property {String} navBarItemHeaderIconSize - The nav bar item header size;
   */

  /**
   * Generates the necessary props to be used in field components.
   * @param {String} variant Variant for the overall NavBar
   * @returns {NavBarStylingObject} Prop object that distributes styling to various sub-components.
   */

  (variant: string): {
    navBar: string;
    primaryItem: string;
    sectionItem: string;
    navBarItemHeader: string;
    navBarItemHeaderText: string;
    navBarItemButton: string;
    navBarItemLink: string;
    navBarItem: string;
    navBarItemText: string;
    navBarItemHeaderListItem: string | null;
    navBarItemBody: string;
    navBarItemHeaderIconSize: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xx';
    navBarItemLinkButtonColor: string | null;
  }
}

const useNavBarStyling: NavBarStyling = variant => {
  switch (variant) {
    case 'popupNav':
      return {
        navBar: 'navBar.popUpContainer',
        primaryItem: 'variants.navBar.popUpSectionButton',
        sectionItem: 'variants.navBar.popUpSectionButton',
        navBarItemHeader: 'navBar.popUpItemHeaderContainer',
        navBarItemHeaderText: 'variants.navBar.popUpHeaderText',
        navBarItemHeaderIcon: 'text.primary',
        navBarItemButton: 'variants.navBar.popUpItemButton',
        navBarItemLink: 'variants.navBar.popUpItemButton',
        navBarItem: 'navBar.popUpItem',
        navBarItemText: 'variants.navBar.popUpHeaderText',
        navBarItemHeaderListItem: 'variants.navBar.popUpItemListItem',
        navBarItemBody: 'variants.navBar.popUpNavBarItemBody',
        navBarItemHeaderIconSize: 'xs',
        navBarItemLinkButtonColor: null,
        navBarSectionList: null,
        navBarItemCustomIcon: null,
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
        navBarItem: 'variants.navBar.item',
        navBarItemText: 'variants.navBar.headerText',
        navBarItemHeaderListItem: null,
        navBarItemBody: 'variants.navBar.navBarItemBody',
        navBarItemHeaderIconSize: 'sm',
        navBarSubTitle: 'variants.navBar.subtitle',
        navBarItemLinkButtonColor: 'variants.navBar.itemLinkButtonColor',
        navBarSectionList: 'variants.navBar.sectionList',
        navBarItemIcon: 'variants.navBar.itemIcon',
        navBarItemIconSelected: 'variants.navBar.itemIconSelected',
        navBarItemCustomIcon: 'variants.navBar.itemCustomIcon',
        navBarItemCustomIconSelected: 'variants.navBar.itemCustomIconSelected',
      };
  }
};

export default useNavBarStyling;
