import React, { forwardRef } from 'react';
import Box from '../Box';

/**
 * A Box component built for the common "Card" use case. Has default variant of card.
 * See Box for list of props.
 */
const Card = forwardRef((props, ref) => <Box variant="boxes.card" ref={ref} {...props} />);

Card.displayName = 'Card';

export default Card;
