import { compose, withState, withHandlers, mapProps } from 'recompose';
import FloatLabelDropDown from '../FloatLabelDropdown';

const enhance = compose(
    withState('value', 'updateValue', ''),
    mapProps(props => ({ ...props, inputClassName: props.value ? '' : 'placeholder-shown' })),
    withHandlers({
        onChange: props => (event) => {
            props.updateValue(event.target.value);
        },
    }),
);

export default enhance(FloatLabelDropDown);
