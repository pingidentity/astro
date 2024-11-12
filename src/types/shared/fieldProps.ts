import { Status } from '../item';
import { LabelModeProps } from '../label';

export interface SharedFieldProps {
    status?: Status,
    label?: string,
    /** Text rendered below the textarea. */
    helperText?: string;
    /** If present this prop will cause a help hint to render in the label of the field. */
    hintText?: string,
    /** A string designating whether or not the label is a float label. */
    labelMode?: LabelModeProps,
}
