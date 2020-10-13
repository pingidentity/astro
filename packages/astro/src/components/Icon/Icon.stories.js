import React from 'react';
import { Earth } from '@pingux/icons';
import Icon from '.';

export default {
  title: 'Icon',
  component: Icon,
};

export const Default = () => <Icon icon={Earth} size={50} color="active" />;

export const SVGIcons = () => {
  // SVGR can used to convert .svg files to components instead of doing this manually
  const SVGComponent = props => (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </svg>
  );
  return <Icon icon={SVGComponent} color="active" size={50} />;
};
