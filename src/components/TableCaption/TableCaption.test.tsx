import React from 'react';

import { Table, TableCaption } from '../../index';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Table>
      <TableCaption {...props} />
    </Table>
  ),
});
