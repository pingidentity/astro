import { LabelProps as ThemeUILabelProps } from 'theme-ui';

import { TestingAttributes } from './shared/test';
import { HelpHintProps } from './helpHint';

export type LabelModeProps = 'default' | 'float' | 'left';

export interface LabelProps extends ThemeUILabelProps, TestingAttributes {
    children?: React.ReactNode;
    className?: string;
    /** Whether the label has disabled styling applied. */
    isDisabled?: boolean;
    /** Whether the label has required indicator styling applied. */
    isRequired?: boolean;
    /** Determines the behavior pattern for the label. */
    mode?: LabelModeProps;
    labelMode?: LabelModeProps;
    /** The visual component used to mark an input as required within the label. */
    requiredIndicator?: React.ReactNode;
    /** If present this prop will cause a help hint to render in the label. */
    hintText?: string;
    /** Props object that is spread directly into the helphint element. */
    helpHintProps?: HelpHintProps;
    statusClasses?: { [className: string]: boolean };
}
