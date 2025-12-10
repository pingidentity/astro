import React, { forwardRef, ReactNode } from 'react';

import Box from '../Box';

type ModalBodyProps = {
  children?: ReactNode;
  isScrollable?: boolean;
  scrollProps?: object;
  containerProps?: object;
}

const ModalBody = forwardRef<HTMLElement, ModalBodyProps>((props, ref) => {
  const {
    children,
    isScrollable,
    scrollProps = {},
    containerProps,
  } = props;

  return (
    <Box variant="modal.body" ref={ref} {...containerProps}>
      {isScrollable ? <Box width="calc(100% + 24px)" overflowY="auto" {...scrollProps}>{children}</Box> : children}
    </Box>
  );
});

ModalBody.displayName = 'ModalBody';
export default ModalBody;
