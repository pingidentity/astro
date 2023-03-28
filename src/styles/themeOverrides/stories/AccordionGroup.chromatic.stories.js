import React from 'react';

import { AccordionGroup, Item, Text } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only AccordionGroup',
  component: AccordionGroup,
  decorators: [WithUiLibraryCss],
};

export const Default = () => {
  return (
    <AccordionGroup>
      <Item key="accordionKey" textValue="accordionKey" label="Accordion Label" data-id="accordionItem">
        <Text>Render me!</Text>
      </Item>
    </AccordionGroup>
  );
};
