import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import useCompassTheme from '../../styles/useCompassTheme';
import solutionCard from './solutionCard.styles';

const SolutionCard = React.forwardRef((props, ref) => {
    const theme = useCompassTheme();
    const { isSelected, ...others } = props;
    return <Card ref={ref} {...others} css={solutionCard({ theme, isSelected })} />;
});

SolutionCard.propTypes = {
    ...Card.propTypes,
    isSelected: PropTypes.bool,
};

SolutionCard.defaultProps = {
    ...Card.defaultProps,
    isSelected: false,
};

export default SolutionCard;
