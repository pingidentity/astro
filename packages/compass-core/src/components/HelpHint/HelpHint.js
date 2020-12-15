import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import { missingDependencyMessage } from '../../utils/DependencyUtils';
import { useTransition } from '../../utils/AnimationUtils';

missingDependencyMessage(Tippy, '@tippyjs/react', 'Tippy');

const HelpHint = ({
    animationDelay,
    children,
    content,
    hasNoWrapper,
    helpHintProps,
    isShowing: isShowingProp,
    ...other
}) => {
    const [isHoveredState, setIsHovered] = useState(false);
    const isHovered = isShowingProp || isHoveredState;

    const handleShow = useCallback(() => setIsHovered(true), [setIsHovered]);
    const handleHide = useCallback(() => setIsHovered(false), [setIsHovered]);

    const { isShowing } = useTransition(isHovered);

    return (
        <Tippy
            interactive
            render={attrs => (
                <div
                    {...attrs}
                    {...(typeof helpHintProps === 'function' ? helpHintProps({ isShowing }) : helpHintProps)}
                >
                    {content}
                </div>
            )}
            {...other}
            onShow={handleShow}
            onHide={
                (instance) => {
                    handleHide();
                    global.setTimeout(
                        () => requestAnimationFrame(instance.unmount),
                        animationDelay,
                    );
                }
            }
            visible={isShowingProp}
        >
            {hasNoWrapper ? children : <span>{children}</span>}
        </Tippy>
    );
};

HelpHint.propTypes = {
    /** Number of milliseconds to keep the help hint in the DOM for */
    animationDelay: PropTypes.number,
    /** Content that goes in the help hint */
    content: PropTypes.node,
    /** When true, the reference is not wrapped in a span.
     *  You must provide a single child that can receive a ref
     */
    hasNoWrapper: PropTypes.bool,
    /** Props passed to the help hint component. Can be a function if you
     *  need to key off of the `isShowing` state.
     */
    helpHintProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** When defined, it controls the visibility of the help hint */
    isShowing: PropTypes.bool,
    /** Placement for the help hint can be any popper.js value
     *  https://popper.js.org/docs/v2/constructors/#options
     */
    placement: PropTypes.string,
};

HelpHint.defaultProps = {
    animationDelay: 0,
    hasNoWrapper: false,
    placement: 'top',
};

export default HelpHint;
