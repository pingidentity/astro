const expandableRow = {
  titleWrapper: {
    maxWidth: '50%',
  },
  lineChart: {
    alignCellRightWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    chart: {
      width: '50px',
      height: '18px',
    },
    chartWrapper: {
      '&:hover': {
        backgroundColor: '#4462ED1A',
      },
    },
    divider: {
      backgroundColor: 'neutral.80',
      height: '35px',
      width: '1px',
    },
  },
};

const expandableRowButton = {
  chartWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
    background: 'none',
    cursor: 'pointer',
    height: 60,
    padding: 0,
    '&:hover': {
      backgroundColor: '#4462ED1A',
    },
  },
};

const expandableRowSharedStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

const expandableRowText = {
  title: {
    fontSize: 'lg',
    color: 'neutral.20',
    ...expandableRowSharedStyle,
  },
  subtitle: {
    fontSize: 'sm',
    color: 'neutral.60',
    ...expandableRowSharedStyle,
  },
  lineChart: {
    title: {
      fontSize: 'sm',
      color: 'neutral.40',
      maxWidth: '100%',
      ...expandableRowSharedStyle,
    },
    count: {
      color: 'neutral.20',
      fontSize: 22,
      fontWeight: 2,
    },
    countLabel: {
      fontSize: 'xs',
      color: 'neutral.50',
    },
    chartLabel: {
      fontSize: 'xs',
      color: 'neutral.50',
      minWidth: '60px',
    },
    trend: {
      color: 'neutral.20',
      fontSize: 'sm',
      fontWeight: 3,
      whiteSpace: 'nowrap',
    },
  },
};

export default {
  expandableRow,
  expandableRowButton,
  expandableRowText,
};
