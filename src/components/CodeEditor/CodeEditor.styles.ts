import { input } from '../Input/Input.styles';

const wrapper = {
  ...(input.fieldControlWrapper as object),
  borderColor: 'neutral.80',
  borderRadius: '4px 0 0 4px',
  borderStyle: 'solid',
  borderWidth: '1px 1px 1px 0px',
  width: '100%',
  '&.is-read-only': {
    borderWidth: '1px',
    '&:after': {
      display: 'none',
    },
  },
};

const header = {
  color: 'gray-300',
  px: 'md',
  width: '100%',
  borderBottom: '1px solid',
  borderColor: 'neutral.80',
  lineHeight: 'body',
  fontWeight: '600',
};

export default {
  wrapper,
  header,
};
