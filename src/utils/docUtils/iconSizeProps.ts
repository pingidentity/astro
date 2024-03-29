import PropTypes from 'prop-types';

import { tShirtSizes } from '../devUtils/constants/tShirtSizes';


export const sizeArgTypes = {
  size: {
    options: Object.keys(tShirtSizes),
    description: `The size of the icon container. If given a number value, it will be converted to pixels. 
    Tshirt sizing is recommended and can be passed to the size prop as "xs", "sm" , "md" 
    rendering 15, 20, and 25 pixel svg containers.`,
  },
};

export const sizePropTypes = {
  size: PropTypes.oneOf(Object.keys(tShirtSizes)),
};
