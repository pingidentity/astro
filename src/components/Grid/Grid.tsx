import React from 'react';
import { Grid as ThemeUIGrid } from 'theme-ui';

import { GridProps } from '../../types';

export const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => (
  <ThemeUIGrid
    ref={ref}
    {...props}
  />
));

Grid.defaultProps = {
  repeat: 'fit',
};

Grid.displayName = 'Grid';

export default Grid;
