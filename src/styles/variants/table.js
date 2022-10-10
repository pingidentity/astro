import { text } from '../variants/text';

const tableHead = {
  ...text.label,
  fontWeight: 500,
  width: '100%',
  flexDirection: 'row !important',
  p: '10px',
};

const tableData = {
  ...text.tableData,
  width: '100%',
  p: '10px',
};

const tableBody = {
  borderTop: '1px solid',
  borderTopColor: 'neutral.40',
  borderBottom: '1px solid',
  borderBottomColor: 'neutral.80',
  '&& > tr:nth-of-type(odd) ': {
    backgroundColor: 'neutral.95',
  },
};

const tableRow = {
  width: '100%',
  flexDirection: 'row !important',
};

const tableCaption = {
  textAlign: 'left',
  marginBottom: 'xs',
  lineHeight: '21px',
};

const table = {
  width: '100%',
};

export default {
  tableHead,
  tableData,
  tableBody,
  tableRow,
  tableCaption,
  table,
};
