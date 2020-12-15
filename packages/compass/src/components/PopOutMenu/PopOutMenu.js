import React, { useCallback, useRef } from 'react';
import { noop } from 'underscore';
import PropTypes from 'prop-types';
import { useProgStateful } from '@pingux/compass-core/lib/utils/StateUtils';
import PopOver from '@pingux/compass-core/lib/components/Popover';
import Popper from '@pingux/compass-core/lib/components/Popper';
import useCompassTheme from '../../styles/useCompassTheme';

import { arrowStyle, dropdownStyle, triggerStyle } from './PopOutMenu.styles';

const PopOutMenu = (props) => {
    const {
        children,
        isOpen: isOpenProp,
        onClose,
        onOpen,
        placement,
        title: titleProp,
        ...other
    } = props;
    const theme = useCompassTheme();
    const [isOpen, setIsOpen] = useProgStateful(isOpenProp, false);
    const handleOpen = useCallback((...args) => {
        setIsOpen(true);
        onOpen(...args);
    }, [setIsOpen]);
    const handleClose = useCallback((...args) => {
        setIsOpen(false);
        onClose(...args);
    }, [setIsOpen]);
    const title = typeof titleProp === 'function' ? titleProp({ isOpen }) : titleProp;
    const titleRef = useRef(null);

    return (
        <PopOver
            renderReference={(renderRefProps) => {
                return (
                    <div
                        css={triggerStyle({ isOpen, theme, ...props })}
                        {...renderRefProps}
                        ref={titleRef}
                    >
                        {
                            React.isValidElement(title) ?
                                React.cloneElement(title, { isOpen }) :
                                title
                        }
                    </div>
                );
            }}
            reference={titleRef} // sending my own reference to PopoverBox
            placement={placement}
            isOpen={isOpen}
            onOpen={handleOpen}
            onClose={handleClose}
            {...other}
        >
            {popoverProps => (
                <>
                    <div css={arrowStyle({ titleRef, theme, ...props })} data-popper-arrow />
                    <div css={dropdownStyle({ theme })}>
                        {typeof children === 'function' ? children({ ...popoverProps }) : children}
                    </div>
                </>
            )}
        </PopOver>
    );
};

PopOutMenu.propTypes = {
    /** You can pass a function to children, which will be executed with an object of props
     *  including `onClose`, which can be called to close the menu.
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Whether or not the menu is open.
     *
     * _Note: Providing this prop will relinquish control of the menu state. This should only_
     * _be used in conjunction with the `onClose` and `onOpen` props to externally manage state._
     */
    isOpen: PropTypes.bool,
    /** Callback which fires when the menu is closed */
    onClose: PropTypes.func,
    /** Callback which fires when the menu is opened */
    onOpen: PropTypes.func,
    /**
     * Placement options from [popper.js](https://popper.js.org/docs/v2/constructors/#options)
     */
    placement: Popper.propTypes.placement,
    /**
     * The trigger to open the menu.
     * If it is a Component, it will recieve an `isOpen` prop for styling.
     */
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

PopOutMenu.defaultProps = {
    onClose: noop,
    onOpen: noop,
    placement: 'bottom-start',
};

export default PopOutMenu;
