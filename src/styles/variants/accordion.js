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
  mb: '20px',
  alignItems: 'flex-start',
};

const accordionBody = {
  display: 'none !important',
  pt: 'md',
  width: '100%',
  '.is-open &': {
    display: 'flex !important',
  },
};

const accordionGridHeader = {
  cursor: 'pointer',
  lineHeight: '30px',
  pl: 'sm',
  outline: 'none',
  display: 'flex',
  justifyContent: 'center',
  flexShrink: 0,
  wordBreak: 'inherit',
  whiteSpace: 'nowrap',
  bg: 'white',
  color: 'neutral.10',
  flexGrow: 1,
  fontWeight: 700,
  '&.is-focused': {
    outline: 'none',
    boxShadow: 'focus',
    WebkitBoxShadow: 'focus',
    MozBoxShadow: 'focus',
  },
  minHeight: '64px',
  '&.is-hovered': {
    backgroundColor: 'accent.99',
  },
  '&.is-pressed': {
    color: 'accent.20',
    '& div > div > div > span': {
      color: 'accent.20',
    },
  },
};

const accordionGridBody = {
  display: 'none !important',
  pl: 'sm',
  width: '100%',
  '&.is-selected': {
    display: 'flex !important',
  },
};

export default {
  accordionGridHeader,
  accordionGridBody,
  accordionTitle,
  accordion,
  accordionBody,
};
