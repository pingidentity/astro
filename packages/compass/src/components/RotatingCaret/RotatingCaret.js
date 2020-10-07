import React from 'react';
import PropTypes from 'prop-types';
import TransitionRotate from '@pingux/compass-core/lib/components/TransitionRotate/emotion';
import { makeIcon } from '../Icon';
import { MenuDownSVG } from '../Icons';

const Caret = makeIcon(MenuDownSVG, 'Caret');

/** A simple caret icon that can be rotated.
 *  Intended for dropdowns.
 */
const RotatingCaret = ({ isRotated, ...props }) => (
    <TransitionRotate isRotated={isRotated} interval={200}>
        <Caret {...props} />
    </TransitionRotate>
);

RotatingCaret.propTypes = {
    /** Whether to rotate the caret */
    isRotated: PropTypes.bool,
};

RotatingCaret.defaultProps = {
    isRotated: false,
};

export default RotatingCaret;
