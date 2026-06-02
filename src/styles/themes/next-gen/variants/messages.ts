import { astroTokens } from '@pingux/onyx-tokens';

export const message = {
  wrapper: {
    gap: 'md',
  },
  item: {
    maxWidth: 400,
    pointerEvents: 'all',
    mb: '0',
    p: '20px 16px 20px 20px',
    wordBreak: 'break-word',
    alignItems: 'center',
    backgroundColor: astroTokens.color.blue[100],
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'blue',
    color: astroTokens.color.gray[700],
    fontSize: '15px !important',
    lineHeight: '1.3',
    borderRadius: 4,
    '& > svg': {
      minWidth: '20px',
      width: '20px',
      height: '20px',
      color: astroTokens.color.gray[700],
      path: {
        fill: astroTokens.color.gray[700],
        transform: 'scale(0.96)',
        transformOrigin: 'center',
      },
      alignSelf: 'start',
    },
    '&.is-success': {
      bg: astroTokens.color.green[100],
      borderLeftColor: astroTokens.color.green[500],
      color: astroTokens.color.gray[700],
    },
    '&.is-warning': {
      bg: 'warning.light',
      borderLeftColor: astroTokens.color.yellow[500],
      color: astroTokens.color.gray[700],
    },
    '&.is-error, > .is-error': {
      bg: 'red-100',
    },
    '&.is-error, > button > svg': {
      color: `${astroTokens.color.gray[700]} !important`,
      path: {
        fill: astroTokens.color.gray[700],
      },
    },
    '&.is-error': {
      borderLeftColor: astroTokens.color.red[500],
    },
  },
};
