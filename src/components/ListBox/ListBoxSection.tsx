import React, { ReactNode, useContext, useRef } from 'react';
import { useLocale } from '@react-aria/i18n';
import { useListBoxSection } from '@react-aria/listbox';
import { layoutInfoToStyle, useVirtualizerItem } from '@react-aria/virtualizer';
import { LayoutInfo, ReusableView } from '@react-stately/virtualizer';
import PropTypes from 'prop-types';

import { ListBoxSectionProps, ListBoxStateType, UseListBoxSectionProps } from '../../types';
import Box from '../Box';
import Separator from '../Separator';

import { ListBoxContext } from './ListBoxContext';

const ListBoxSection = (props: ListBoxSectionProps) => {
  const {
    children,
    reusableView,
    header,
  } = props;

  const item = reusableView.content as ReusableView<object, ReactNode>;

  const { headingProps, groupProps } = useListBoxSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  }) as UseListBoxSectionProps;

  const headerRef = useRef(null);

  useVirtualizerItem({
    reusableView: header,
    ref: headerRef,
  });

  const { direction } = useLocale();

  const state = useContext(ListBoxContext) as ListBoxStateType;

  return (
    <>
      <Box
        ref={headerRef}
        style={layoutInfoToStyle(header.layoutInfo as LayoutInfo, direction)}
      >
        {item.key !== state.collection.getFirstKey()
          && <Separator mt="0px" />}
        {item.rendered
          && (
          <Box
            {...headingProps}
            variant="listBox.sectionTitle"
          >
            {item.rendered}
          </Box>
          )}
      </Box>
      <Box
        {...groupProps}
        style={layoutInfoToStyle(reusableView.layoutInfo as LayoutInfo, direction)}
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
