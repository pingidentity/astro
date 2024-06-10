import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Box, DataTableMultiLineProps, Icon } from '../../index';

const DataTableMultiLine = forwardRef<HTMLDivElement, DataTableMultiLineProps>(({ cell }, ref) => (
  <>
    {cell.map(item => (
      <Box key={`${item.key}_${item.accountId}`} ref={ref}>
        <Box sx={{ flexDirection: 'row !important' as 'row' }}>
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              mx: '18px',
            }}
          >
            <Icon icon={item.icon} color="accent.40" size="18.75px" title={{ name: `Icon for ${item.name}` }} />
          </Box>
          <Box>
            <Box sx={{ fontWeight: 500, fontSize: '15px' }}>{item.name}</Box>
            <Box
              sx={{ color: 'neutral.40', fontWeight: 400, fontSize: '13px' }}
            >
              Account ID:
              {' '}
              {item.accountId}
            </Box>
          </Box>
        </Box>
      </Box>
    ))}
  </>
));

DataTableMultiLine.propTypes = {
  cell: PropTypes.arrayOf(PropTypes.shape({})),
};

export default DataTableMultiLine;
