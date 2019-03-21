import { compose, withState, withHandlers } from 'recompose';
import SmsPairing from '../SmsPairing';

const enhance = compose(
    withState('open', 'setOpen', false),
    withHandlers({
        onToggle: props => () => {
            props.setOpen(!props.open);
        },
    }),
);

export default enhance(SmsPairing);
