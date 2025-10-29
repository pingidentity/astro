import React from 'react';

import { Table, TableBody, TableRow } from '../../index';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Table>
      <TableBody>
        <TableRow {...props} />
      </TableBody>
    </Table>
  ),
});
