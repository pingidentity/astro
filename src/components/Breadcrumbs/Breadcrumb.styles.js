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
  paddingInlineStart: 'unset',
  'a.is-hovered.is-current ': {
    textDecoration: 'none',
  },
};

const containerLi = {
  flex: '0 1000000 auto',
  minWidth: breadcrumbMinWidth,
  '&.is-current': {
    flex: '0 1 auto',
  },
};

export default {
  containerLi,
  containerOl,
  link,
};
