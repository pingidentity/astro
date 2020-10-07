import React, { useLayoutEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { createPopper } from '@popperjs/core';
import { Portal } from 'react-portal';
import { missingDependencyMessage } from '../../utils/DependencyUtils';

missingDependencyMessage(Portal, 'react-portal', 'Popper');
missingDependencyMessage(createPopper, '@popperjs/core', 'Popper');

export const usePopper = (getReference, getPopper, options) => {
    const popperObject = useRef(null);

    useLayoutEffect(() => {
        popperObject.current = createPopper(
            getReference.current || getReference(),
            getPopper.current || getPopper(),
            options,
        );

        return () => {
            popperObject.current.destroy();
        };
    }, []);

    return popperObject;
};

const Popper = forwardRef(({
    children,
    'data-id': dataId,
    'data-parent': dataParent,
    placement = 'bottom',
    hasNoPortal = false,
    getReference,
    ...other
}, ref) => {
    const popper = ref || useRef(null);

    const popperObject = usePopper(getReference, popper, { placement, ...other });
    useLayoutEffect(() => {
        if (popperObject.current && popperObject.current.update) {
            popperObject.current.update();
        }
    }, [children]);

    const contents = <div data-id={dataId} data-parent={dataParent} ref={popper}>{children}</div>;

    return (
        hasNoPortal
            ? contents
            : (
                <Portal>
                    {contents}
                </Portal>
            )
    );
});

Popper.propTypes = {
    /** Defines the "data-id" for top-level HTML container. */
    'data-id': PropTypes.string,
    /** Defines the "data-parent" for top-level HTML container. */
    'data-parent': PropTypes.string,
    /** Popper js placement value */
    placement: PropTypes.string,
    /** What to attach the popper to.
     * Either a function that returns the DOM element or a ref from useRef hook
     */
    getReference: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    /** If true item will stay in the DOM tree an not use a React Portal */
    hasNoPortal: PropTypes.bool,

};

export default Popper;
