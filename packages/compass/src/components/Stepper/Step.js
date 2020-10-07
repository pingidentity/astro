import React from 'react';
import PropTypes from 'prop-types';
import CheckSVG from '@mdi/svg/svg/check-bold.svg';
import { valuePropType } from '@pingux/compass-core/lib/utils/PropUtils';

import { stepStatuses } from './Stepper.constants';
import * as styles from './Stepper.styles';
import Box from '../Box';
import Icon from '../Icon';
import Text from '../Text';
import useCompassTheme from '../../styles/useCompassTheme';
import { textProps } from '../../styles/text';

const {
    COMPLETED,
    INACTIVE,
} = stepStatuses;


/** Step component */
const Step = (props) => {
    const { status, value } = props;
    const theme = useCompassTheme();
    const CompletedIcon = () => <Icon component={CheckSVG} fill="white" />;

    return (
        <Box css={styles.getStepStyle({ theme, status, ...props })}>
            {status === COMPLETED
                ? <CompletedIcon />
                : <Text {...textProps({ weight: 1, color: status === INACTIVE ? 'secondary' : 'active' })}>{value}</Text>
            }
        </Box>
    );
};

Step.propTypes = {
    status: PropTypes.oneOf(Object.values(stepStatuses)),
    value: valuePropType,
};

Step.defaultProps = {
    status: INACTIVE,
    value: '?',
};

export default Step;
