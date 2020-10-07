import React from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalOverlay } from '@pingux/compass-core/lib/components/Modal/emotion';
import { useTransition } from '@pingux/compass-core/lib/utils/AnimationUtils';
import TransitionFade from '@pingux/compass-core/lib/components/TransitionFade/emotion';
import TransitionGrow from '@pingux/compass-core/lib/components/TransitionGrow/emotion';
import { css } from '@emotion/core';
import { position } from 'styled-system';
import { noop } from 'underscore';
import { omit, pick } from '@styled-system/props';
import { Portal } from 'react-portal';
import Card from '../Card';
import useCompassTheme from '../../styles/useCompassTheme';
import { CloseSVG } from '../Icons';
import { makeIconButton } from '../IconButton';
import Dialog from '../Dialog';

const CloseIconButton = makeIconButton(CloseSVG, 'Close');

const CloseButton = (props) => {
    const theme = useCompassTheme();
    const styleProps = {
        position: 'absolute',
        right: 'xs',
        top: 'xs',
        theme,
        ...props,
    };

    return (
        <CloseIconButton
            css={css`
                ${position(styleProps)}
            `}
            variant="gray"
            {...props}
        />
    );
};

const animationInterval = 100;

/** Popup dialog to use for confirming actions and asking questions */
const Popup = ({
    buttons,
    cancelLabel,
    children,
    hasNoCancel,
    hasNoClose,
    hasNoOverlay,
    isOpen,
    onClose,
    title,
    ...props
}) => {
    const theme = useCompassTheme();
    const { isRendered, isShowing } = useTransition(isOpen, animationInterval);

    return isRendered ? (
        <Portal>
            <TransitionFade isShowing={isShowing} interval={animationInterval}>
                { !hasNoOverlay &&
                    <ModalOverlay
                        color={theme.colors.neutral[50]}
                        opacity={0.5}
                        hasNoPortal
                    />
                }
            </TransitionFade>
            <Modal
                onClose={onClose}
                onOutsideClick={onClose}
                onEscapeKey={onClose}
                {...omit(props)}
            >
                <TransitionGrow isShowing={isShowing} interval={animationInterval}>
                    <Card maxWidth="column" {...pick(props)}>
                        <Dialog
                            buttons={buttons}
                            cancelLabel={cancelLabel}
                            title={title}
                            onCancel={hasNoCancel ? undefined : onClose}
                            aria-modal="true"
                        >
                            {children}
                        </Dialog>
                        {!hasNoClose && <CloseButton onClick={onClose} />}
                    </Card>
                </TransitionGrow>
            </Modal>
        </Portal>
    ) : null;
};

Popup.propTypes = {
    /** Buttons that will be rendered at the bottom of the popup.
     *  Any content can be rendered here, but you probably want to supply
     *  a Button element or an array of Button elements.
     */
    buttons: PropTypes.node,
    /** Label for the cancel link */
    cancelLabel: PropTypes.node,
    /** Whether to display the basic cancel link.
     *  The link only shows if buttons are defined.
     */
    hasNoCancel: PropTypes.bool,
    /** Whether to display the close x in the corner. */
    hasNoClose: PropTypes.bool,
    /** Whether to display the overlay. */
    hasNoOverlay: PropTypes.bool,
    /** Whether the popup is currently showing */
    isOpen: PropTypes.bool,
    /** Callback for when the popup is closed */
    onClose: PropTypes.func,
    /** Title at the top of the popup */
    title: PropTypes.node,
};

Popup.defaultProps = {
    cancelLabel: 'Cancel',
    hasNoCancel: false,
    hasNoOverlay: false,
    isOpen: false,
    onClose: noop,
};

export default Popup;
