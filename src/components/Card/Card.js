import React, { forwardRef } from 'react';
import { Card as ThemeUICard } from 'theme-ui';

/**
 * A Box component built for the common "Card" use case. Has default variant of card.
 * See Box for list of props.
 */
const Card = forwardRef((props, ref) => {
  const { children, ...others } = props;
  return (
    <ThemeUICard
      ref={ref}
      {...others}
      variant="container"
    >
      {children}
    </ThemeUICard>
  );
});

Card.displayName = 'Card';

export default Card;
