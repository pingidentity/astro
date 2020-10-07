import React from 'react';
import PropTypes from 'prop-types';
import CoreHelpHint from '@pingux/compass-core/lib/components/HelpHint/emotion';
import useCompassTheme from '../../styles/useCompassTheme';
import { textProps } from '../../styles/text';

const HelpHint = ({
    helpHintProps,
    ...props
}) => {
    const theme = useCompassTheme();

    return (
        <CoreHelpHint
            animationDelay={200}
            theme={theme}
            helpHintProps={{ ...helpHintProps, ...textProps() }}
            {...props}
        />
    );
};

HelpHint.propTypes = {
    /** Background color */
    bg: PropTypes.string,
    /** Color of border */
    borderColor: PropTypes.string,
    /** Color of text */
    color: PropTypes.string,
    /** Content that goes in the help hint */
    content: PropTypes.node,
    /** When true, the reference is not wrapped in a span.
     *  You must provide a single child that can receive a ref
     */
    hasNoWrapper: PropTypes.bool,
    /** Props passed to the help hint component. */
    helpHintProps: PropTypes.object,
    /** When defined, it controls the visibility of the help hint */
    isShowing: PropTypes.bool,
    /** Placement for the help hint can be any popper.js value
     *  https://popper.js.org/docs/v2/constructors/#options
     */
    placement: PropTypes.string,
};

HelpHint.defaultProps = {
    bg: 'neutral.10',
    color: 'text.secondaryLight',
    placement: 'top',
};

export default HelpHint;
