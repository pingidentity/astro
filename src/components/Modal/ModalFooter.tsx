import React, { forwardRef } from 'react';

import { ModalFooterProps } from '../../types/Modal';
import Button from '../Button';
import ButtonBar from '../ButtonBar';

const ModalFooter = forwardRef<HTMLElement, ModalFooterProps>((props, ref) => {
  const {
    onSubmit,
    onCancel,
    footerProps,
    children,
    primaryButtonText = 'Save',
    secondaryButtonText = 'Cancel',
  } = props;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (children) return <>{children}</>;

  return (
    <ButtonBar variant="modal.footer" as="footer" ref={ref} {...footerProps}>
      <Button
        variant="primary"
        onPress={onSubmit}
        mr="md"
        aria-label={primaryButtonText}
      >
        {primaryButtonText}
      </Button>
      <Button
        variant="link"
        onPress={onCancel}
        aria-label={secondaryButtonText}
      >
        {secondaryButtonText}
      </Button>
    </ButtonBar>
  );
});

ModalFooter.displayName = 'ModalFooter';
export default ModalFooter;
