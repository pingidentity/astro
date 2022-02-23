import React from 'react';
import PropTypes from 'prop-types';
import { Separator, AccordionGridGroup, Text, Item, Box } from '../../index';
import NavBarItemBody from './NavBarItemBody';
import NavBarItemHeader from './NavBarItemHeader';

/**
 * Composed component that creates an AccordionGrid group
 * with title, and separator options.
 *
 */

const NavBarSection = (props) => {
  const {
    hasSeparator,
    title,
    items,
  } = props;

  return (
    <>
      {title &&
        <Text variant="text.navBarSubtitle">
          {title}
        </Text>
      }
      <AccordionGridGroup items={items.filter(i => i.children)}>
        {
          item => (
            <Item
              headerProps={{ variant: 'accordion.accordionGridHeaderNav' }}
              bodyProps={{ variant: 'navBar.sectionBody' }}
              textValue={item}
            >
              <NavBarItemHeader item={item} />
              <NavBarItemBody item={item} />
            </Item>
          )
        }
      </AccordionGridGroup>
      {hasSeparator &&
        <Box sx={{ pl: '15px', pr: '15px', my: '10px' }}>
          <Separator variant="separator.navBarSeparator" />
        </Box>
      }
    </>
  );
};

NavBarSection.defaultProps = {
  hasSeparator: false,
};

NavBarSection.propTypes = {
  /** If true, a separator will render at the end of the section */
  hasSeparator: PropTypes.bool,
  /** If present, this string will render at the top of the section */
  title: PropTypes.string,
  /**
   * *For performance reasons, use this prop instead of Array.map when iteratively rendering Items*.
   * For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections).
  */
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

export default NavBarSection;
