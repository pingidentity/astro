import { IconButtonProps as ThemeUIIconButtonProps } from 'theme-ui';

import { TestingAttributes } from './shared/test';
import { IconTypeExtended } from './icon';
import { HoverProps, IconSize, PressProps } from './shared';
import { TooltipTriggerProps } from './tooltipTrigger';

export interface IconButtonProps extends ThemeUIIconButtonProps, TestingAttributes,
    PressProps, HoverProps {
    /** The styling variation of the element. */
    variant?: string | undefined;
    /** The icon of the element. */
    icon?: IconTypeExtended;
    /**
     * The title associated with the icon. It is recommended that icons always have an associated
     * title in order to allow a better user experience for those using screen readers.
     * It also what will be supplied to the **`aria-labelledby`** attribute in the SVG.
     * */
    title?: string | undefined;
    'aria-label'?: string | undefined,
    /** Whether the icon button is disabled. */
    isDisabled?: boolean;
    size?: IconSize;
    isRow?: boolean;
    'aria-controls'?: string | undefined;
    tooltipTriggerProps?: TooltipTriggerProps,
}
