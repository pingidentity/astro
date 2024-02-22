const topShadowBox = {
  '&.has-shadows.is-top-shadow-showing': {
    position: 'relative',
    zIndex: '10000',
    boxShadow: '0px 4px 2px 1px rgb(37, 55, 70, 0.15)',
    height: '4px',
    marginBottom: '-4px',
    backgroundColor: '#FFFFFF',
  },
};

const bottomShadowBox = {
  '&.has-shadows.is-bottom-shadow-showing': {
    position: 'relative',
    zIndex: '10000',
    boxShadow: '0px -4px 2px 1px rgb(37, 55, 70, 0.15)',
    height: '4px',
    marginTop: '-2px',
    backgroundColor: '#FFFFFF',
  },
};

const container = {
  '&::-webkit-scrollbar': {
    display: 'none',
    width: '0px !important',
  },
  '&::-webkit-scrollbar-track': {
    width: '0px',
    display: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '0px',
    display: 'none',
  },
  position: 'relative',
  '& > *': {
    overflow: 'hidden auto',
  },
};

export default {
  container,
  topShadowBox,
  bottomShadowBox,

};
