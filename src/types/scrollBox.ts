import { UIEventHandler } from 'react';

import { FocusableElement } from './shared/dom';
import { BoxProps } from './box';

export interface ScrollBoxProps extends BoxProps {
  /** Callback that fires when scrolling is done inside the ScrollBox */
  onScroll?: UIEventHandler<FocusableElement>;
  /** If true the box will render top and bottom shadows with scroll */
  hasShadows?: boolean;
}
