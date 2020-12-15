import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import Box from '../Box';
import Text from '../Text';
import HR from '../HR';
import Button from '../Button';

const Dialog = ({
    buttons,
    cancelLabel,
    children,
    onCancel,
    title,
    ...props
}) => {
    const dialogId = useMemo(uuid, []);
    const rootProps = {
        role: 'dialog',
        'aria-labelledby': `${dialogId}-label`,
        'aria-describedby': `${dialogId}-description`,
    };

    // We want to make sure the props go to the root element
    const otherRootProps = buttons ? {} : { ...props, ...rootProps };

    const content = title
        ? (
            <Box gap="sm" {...otherRootProps}>
                {title && <Text variant="title" id={rootProps['aria-labelledby']}>{title}</Text>}
                {title && children && <HR />}
                {children && <Text id={rootProps['aria-describedby']}>{children}</Text>}
            </Box>
        ) : <div {...otherRootProps}>{children}</div>;

    return (
        <>
            {buttons ? (
                <Box gap="lg" {...props} {...rootProps}>
                    {content}
                    <Box gap="sm" alignItems="center">
                        {buttons}
                        {onCancel && (
                            <Button variant="text" isInline onClick={onCancel}>{cancelLabel}</Button>
                        )}
                    </Box>
                </Box>
            ) : content}
        </>
    );
};

Dialog.propTypes = {
    /** Buttons that will be rendered at the bottom of the popup.
     *  Any content can be rendered here, but you probably want to supply
     *  a Button element or an array of Button elements.
     */
    buttons: PropTypes.node,
    /** Label for the cancel link */
    cancelLabel: PropTypes.node,
    /** Callback for the cancel link.
     *  If it's not provided, the cancel link doesn't appear.
     */
    onCancel: PropTypes.func,
    /** Title at the top of the popup */
    title: PropTypes.node,
};

Dialog.defaultProps = {
    cancelLabel: 'Cancel',
};

export default Dialog;
