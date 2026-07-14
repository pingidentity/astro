export const paginationArgTypes = {
  totalCount: {
    control: {
      type: 'number',
    },
  },
  currentPageIndex: {
    control: {
      type: 'number',
    },
  },
  offsetCount: {
    control: {
      type: 'number',
    },
  },
  offsetOptions: {
    control: {
      type: 'array',
    },
  },
  onPageIndexChange: {},
  onOffsetCountChange: {},
};
