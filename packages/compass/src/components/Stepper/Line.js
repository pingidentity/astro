import React from 'react';
import PropTypes from 'prop-types';

import { stepStatuses } from './Stepper.constants';
import * as styles from './Stepper.styles';
import useCompassTheme from '../../styles/useCompassTheme';

const {
    INACTIVE,
} = stepStatuses;


// Line Component - used internally
const Line = (props) => {
    const { status } = props;
    const theme = useCompassTheme();
    return <div css={styles.getLineStyle({ theme, status, ...props })} />;
};

Line.propTypes = {
    status: PropTypes.oneOf(Object.values(stepStatuses)),
};

Line.defaultProps = {
    status: INACTIVE,
};

export default Line;
