const expandableRowSharedStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};
const alignCellRightWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
};

const responsiveContainer = {
  width: '100%',
  height: '100%',
};

const chart = {
  width: '50',
  height: '18',
};

const chartContainer = {
  width: '50px',
  height: '18px',
};

const divider = {
  backgroundColor: 'neutral.50',
  height: '41px',
  width: '1px',
};

const chartLabel = {
  fontSize: 'sm',
  color: 'neutral.40',
};
const trendContainer = {
  ml: 'md',
  width: '50px',
};

const trend = {
  color: 'neutral.40',
  fontSize: 'md',
  fontWeight: 3,
  whiteSpace: 'nowrap',
};

const chartButton = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: 'black',
  background: 'none',
  cursor: 'pointer',
  height: '44px',
  padding: 0,
  ml: 'md',
  pr: 'md',
  border: 'none',
  '&:hover': {
    backgroundColor: '#4462ED1A',
  },
};

const titleContainer = {
  ...alignCellRightWrapper,
  mr: 'md',
};

const title = {
  fontSize: 'sm',
  color: 'neutral.40',
  maxWidth: '100%',
  ...expandableRowSharedStyle,
};

const content = {
  ...alignCellRightWrapper,
  height: '44px',
  justifyContent: 'center',
};

const count = {
  color: 'neutral.40',
  fontSize: 'xx',
  fontWeight: 3,
};

const countLabel = {
  fontSize: 'sm',
  color: 'neutral.40',
};

export default {
  chart,
  responsiveContainer,
  chartContainer,
  divider,
  chartLabel,
  trendContainer,
  trend,
  chartButton,
  titleContainer,
  title,
  content,
  count,
  countLabel,
};
