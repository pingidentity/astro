import { input } from '../Input/Input.styles';

const wrapper = {
  ...(input.fieldControlWrapper as object),
  borderColor: 'neutral.80',
  borderRadius: '3px 4px 4px 3px',
  borderStyle: 'solid',
  borderWidth: '1px 1px 1px 0px',
  width: '100%',
};

export default {
  wrapper,
};
