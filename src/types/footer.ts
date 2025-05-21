import { BoxProps } from './box';
import { LinkProps } from './link';

export type FooterProps = BoxProps;

export interface FooterLinkProps extends BoxProps {
  children?: React.ReactNode;
}

export interface CopyrightTextProps extends BoxProps {
  linkProps?: LinkProps;
  children?: React.ReactNode;
}
