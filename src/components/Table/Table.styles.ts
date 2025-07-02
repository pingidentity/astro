import { text } from '../Text/Text.styles';

const head = {
  ...text.label,
  fontWeight: 500,
  width: '100%',
  flexDirection: 'row !important',
  p: 'sm',
};

const data = {
  ...text.tableData,
  width: '100%',
  p: 'sm',
};

const body = {
  borderTop: '1px solid',
  borderTopColor: 'neutral.40',
  borderBottom: '1px solid',
  borderBottomColor: 'neutral.80',
  '& > tr:nth-of-type(odd)': {
    backgroundColor: 'neutral.95',
  },
};

const row = {
  width: '100%',
  flexDirection: 'row !important',
};

const container = {
  width: '100%',
};

const caption = {
  fontFamily: 'standard',
  fontSize: 'lg',
  fontWeight: '2',
  p: 'sm',
  textAlign: 'left',
};

export default {
  body,
  caption,
  container,
  data,
  head,
  row,
};
