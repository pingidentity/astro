import { link as buttonLink } from '../Button/Buttons.styles';
import { text } from '../Text/Text.styles';

const breadcrumbMinWidth = '40px';

const link = {
  ...text.textEllipsis,
  ...buttonLink,
  display: 'block',
  minWidth: breadcrumbMinWidth,
  '&.is-current': {
    color: 'text.primary',
    textDecoration: 'none',
    cursor: 'default',
  },
};

const containerOl = {
  alignItems: 'center',
  minHeight: 42,
  minWidth: 0,
  maxWidth: 'fit-content',
  paddingInlineStart: 'unset',
  gap: 'xs',
  'a.is-hovered.is-current ': {
    textDecoration: 'none',
  },
};

const containerLi = {
  flex: '1 2 auto',
  textWrap: 'nowrap',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  minWidth: breadcrumbMinWidth,
  '&.is-current': {
    flex: '2 1 auto',
    overflow: 'visible',
  },
};

export default {
  containerLi,
  containerOl,
  link,
};
