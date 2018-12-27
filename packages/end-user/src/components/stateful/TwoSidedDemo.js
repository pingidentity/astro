import { compose, withState, withHandlers, mapProps } from 'recompose';
import TwoSided from '../TwoSided';

const enhance = compose(
    withState('flipped', 'setFlipped', false),
    withHandlers({
        onFlip: props => () => {
            props.setFlipped(!props.flipped);
        },
    }),
    mapProps(props => ({
        ...props,
        children: props.renderSides(props.onFlip),
    })),
);

export default enhance(TwoSided);
