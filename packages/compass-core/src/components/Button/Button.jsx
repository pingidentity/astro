import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { useFocusOutline } from '../../utils/FocusUtils';

/**
 * Basic button component.
 */

const Button = forwardRef(({
    children,
    className,
    css,
    'data-id': dataId,
    isDisabled,
    href,
    onClick,
    onMouseDown,
    style,
    isSubmit,
    target,
    ...props
}, ref) => {
    useFocusOutline();

    const TagName = href ? 'a' : 'button';

    return (
        <TagName
            className={className}
            css={css}
            data-id={dataId}
            onClick={onClick}
            onMouseDown={onMouseDown}
            ref={ref}
            disabled={isDisabled}
            type={isSubmit ? 'submit' : 'button'}
            href={href}
            style={style}
            target={target}
            {...props}
        >
            {children}
        </TagName>
    );
});

Button.displayName = 'Button';

Button.propTypes = {
    /** Extra CSS class(s) applied to the top-level HTML container. */
    className: PropTypes.string,
    /** CSS prop can be used for CSS-in-JS components. */
    css: PropTypes.object,
    /** Defines the "data-id" for top-level HTML container. */
    'data-id': PropTypes.string,
    /** Button will not function when true. */
    isDisabled: PropTypes.bool,
    /** Pass in a string to give the button an href. Converts to an a tag for a11y. */
    href: PropTypes.string,
    /** Click handler.
     * @param {object} event
    */
    onClick: PropTypes.func,
    /** Mouse down handler.
     * @param {object} event
    */
    onMouseDown: PropTypes.func,
    /** Set inline styles. */
    style: PropTypes.shape({}),
    /** Set to true to render a submit type button. */
    isSubmit: PropTypes.bool,
    /** Pass a string to give the button a target. Only relevant if it also has href. */
    target: PropTypes.string,
};

Button.defaultProps = {
    isDisabled: false,
    onClick: noop,
    onMouseDown: noop,
    isSubmit: false,
};

export default Button;
