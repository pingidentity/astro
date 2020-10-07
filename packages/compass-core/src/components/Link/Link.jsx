import React, { useContext, createContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { useFocusOutline } from '../../utils/FocusUtils';

export const LinkContext = createContext(null);

export const LinkProvider = ({ onClick, ...props }) => (
    <LinkContext.Provider value={{ onClick }} {...props} />
);

LinkProvider.propTypes = {
    onClick: PropTypes.func,
};

LinkProvider.defaultProps = {
    onClick: noop,
};


const Link = ({
    children,
    href,
    onClick,
    ...props
}) => {
    useFocusOutline();
    const linkContext = useContext(LinkContext);

    const handleClick = useCallback(
        (e) => {
            onClick(e);
            if (linkContext && linkContext.onClick) {
                linkContext.onClick(e);
            }
        }, [onClick, linkContext],
    );

    const Element = href ? 'a' : 'button';

    return <Element href={href} {...props} onClick={handleClick}>{children}</Element>;
};

Link.propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func,
};

Link.defaultProps = {
    onClick: noop,
};

export default Link;
