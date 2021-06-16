const accordionTitle = {
  display: 'inline-block !important',
  overflowWrap: 'break-word',
  maxWidth: '100%',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  fontSize: 'lg',
  fontWeight: 700,
  color: 'text.primary',
  '&.is-pressed': {
    color: 'white',
  },
};

const accordion = {
  display: 'flex',
  mt: '5px',
  mb: '5px',
  alignItems: 'flex-start',
};

const accordionBody = {
  display: 'none !important',
  m: 'md',
  '.is-open &': {
    display: 'flex !important',
  },
};

export default {
  accordionTitle,
  accordion,
  accordionBody,
};
