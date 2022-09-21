import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Icon } from '../../index';

const DataTableMultiLine = forwardRef(({ cell }, ref) => (
  <>
    {cell.map(item => (
      <Box key={`${cell.key}_${item.accountId}`} ref={ref}>
        <Box sx={{ flexDirection: 'row !important' }}>
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              mx: '18px',
            }}
          >
            <Icon icon={item.icon} color="accent.40" size="18.75" />
          </Box>
          <Box>
            <Box sx={{ fontWeight: 500, fontSize: '15px' }}>{item.name}</Box>
            <Box
              sx={{ color: 'neutral.40', fontWeight: 400, fontSize: '13px' }}
            >
              Account ID: {item.accountId}
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
