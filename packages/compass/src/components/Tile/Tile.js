import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { omit } from '@styled-system/props';
import { noop } from 'underscore';
import CheckSVG from '@mdi/svg/svg/check-bold.svg';

import { getTileStyle, getTileIconStyle } from './Tile.styles';
import useCompassTheme from '../../styles/useCompassTheme';
import Box from '../Box';
import Icon from '../Icon';

const Tile = React.forwardRef((props, ref) => {
    const {
        children,
        id,
        isSelected,
        onHighlight,
        onHighlightOut,
        ...others
    } = props;
    const theme = useCompassTheme();
    const [hasFocus, setHasFocus] = useState(false);
    // Don't allow these events to override our highlight events
    const {
        onMouseDown,
        onMouseEnter,
        onFocus,
        onMouseLeave,
        onBlur,
        ...rest
    } = others;
    const nonStyleProps = omit({ ...rest });

    const handleHighlight = (e) => {
        // Call event handler props if supplied
        if (e.type === 'mouseenter') {
            onMouseEnter(e);
            if (hasFocus) return;
        } else if (e.type === 'focus') {
            onFocus(e);
            setHasFocus(true);
        }

        onHighlight({ id });
    };
    const handleHighlightOut = (e) => {
        // Call event handler props if supplied
        if (e.type === 'mouseleave') {
            onMouseLeave(e);
            if (hasFocus) return;
        } else if (e.type === 'blur') {
            onBlur(e);
            setHasFocus(false);
        }

        onHighlightOut({ id });
    };
    const handleMouseDown = (e) => {
        e.preventDefault();
        onMouseDown(e);
    };

    return (
        <Box
            tabIndex="0"
            ref={ref}
            css={getTileStyle({ theme, ...others })}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleHighlight}
            onFocus={handleHighlight}
            onMouseLeave={handleHighlightOut}
            onBlur={handleHighlightOut}
            {...nonStyleProps}
        >
            {
                isSelected
                && (
                    <Box css={getTileIconStyle({ theme, ...others })}>
                        <Icon
                            component={CheckSVG}
                            color="white"
                            size=".8em"
                        />
                    </Box>
                )
            }
            {children}
        </Box>
    );
});

Tile.propTypes = {
    /** A unique identifier for the tile */
    id: PropTypes.string.isRequired,
    /** Controls whether the tile is currently selected */
    isSelected: PropTypes.bool,
    /**
     * Callback which is triggered onMouseEnter or onFocus, receives a tile object
     *
     * e.g. `(tile) => console.log(tile) // { id: ... }`
     */
    onHighlight: PropTypes.func,
    /**
     * Callback which is triggered onMouseLeave or onBlur, receives a tile object
     *
     * e.g. `(tile) => console.log(tile) // { id: ... }`
     */
    onHighlightOut: PropTypes.func,
    /** Passthrough for React's equivalent SyntheticEvent */
    onBlur: PropTypes.func,
    /** Passthrough for React's equivalent SyntheticEvent */
    onFocus: PropTypes.func,
    /** Passthrough for React's equivalent SyntheticEvent */
    onMouseDown: PropTypes.func,
    /** Passthrough for React's equivalent SyntheticEvent */
    onMouseEnter: PropTypes.func,
    /** Passthrough for React's equivalent SyntheticEvent */
    onMouseLeave: PropTypes.func,
};

Tile.defaultProps = {
    isSelected: false,
    onHighlight: noop,
    onHighlightOut: noop,
    onBlur: noop,
    onFocus: noop,
    onMouseDown: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
};

export default Tile;
