import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocale } from '@react-aria/i18n';
import { useListBoxSection } from '@react-aria/listbox';
import { layoutInfoToStyle, useVirtualizerItem } from '@react-aria/virtualizer';

import { ListBoxContext } from './ListBoxContext';
import Box from '../Box';
import Separator from '../Separator';

const ListBoxSection = (props) => {
  const {
    children,
    reusableView,
    header,
  } = props;

  const item = reusableView.content;

  const { headingProps, groupProps } = useListBoxSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });

  const headerRef = useRef();

  useVirtualizerItem({
    reusableView: header,
    ref: headerRef,
  });

  const { direction } = useLocale();

  const state = useContext(ListBoxContext);

  return (
    <>
      <Box
        as="ul"
        ref={headerRef}
        style={layoutInfoToStyle(header.layoutInfo, direction)}
        // uls add a 40px left padding by default
        sx={{ paddingInlineStart: '0px' }}
        {...groupProps}
      >
        {item.key !== state.collection.getFirstKey() &&
          <Separator mt="0px" />
        }
        {item.rendered &&
          <Box
            {...headingProps}
            variant="listBox.sectionTitle"
          >
            {item.rendered}
          </Box>
        }
      </Box>
      <Box
        style={layoutInfoToStyle(reusableView.layoutInfo, direction)}
      >
        {children}
      </Box>
    </>
  );
};

ListBoxSection.propTypes = {
  header: PropTypes.shape({
    layoutInfo: PropTypes.shape({}),
  }),
  reusableView: PropTypes.shape({
    layoutInfo: PropTypes.shape({}),
    content: PropTypes.shape({
      rendered: PropTypes.node,
      key: PropTypes.string,
      'aria-label': PropTypes.string,
    }),
  }),
};

export default ListBoxSection;
