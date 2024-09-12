import React, {
  forwardRef,
} from 'react';
import { useMenuSection } from 'react-aria';

import { useLocalOrForwardRef } from '../../hooks';
import { MenuSectionProps } from '../../types';
import Box from '../Box';
import MenuItem from '../MenuItem';
import Separator from '../Separator';

/**
 * Menu Section component intended to be used within Menu or PopupMenu.
 * This component is not intented to be used outside of Menu or independently.
 * Utilizes [React Aria](https://react-spectrum.adobe.com/react-aria/useMenu.html)
 */
const MenuSection = forwardRef<HTMLDivElement, MenuSectionProps>((props, ref) => {
  const {
    section,
    state,
    onAction,
    isDisabled,
    isFocusVisible,
    isNotFocusedOnHover,
  } = props;

  const menuSectionRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  const { itemProps, groupProps, headingProps } = useMenuSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <Separator as="li" p={0} m={0} />
      )}
      <Box
        as="li"
        {...itemProps}
        ref={menuSectionRef}
        role="presentation"
      >
        {section.rendered
          && (
            <Box
              as="span"
              variant="menuSection.sectionTitle"
              {...headingProps}
              role="presentation"
            >
              {section.rendered}
            </Box>
          )}
        <Box
          as="ul"
          variant="menuSection.section"
          {...groupProps}
          role="group"
        >
          {Array.from(section.childNodes).map(node => (
            <MenuItem
              key={node.key}
              item={node}
              state={state}
              onAction={onAction}
              isDisabled={isDisabled}
              isFocusVisible={isFocusVisible}
              isNotFocusedOnHover={isNotFocusedOnHover}
            />
          ),
          )}
        </Box>
      </Box>
    </>
  );
});

export default MenuSection;
