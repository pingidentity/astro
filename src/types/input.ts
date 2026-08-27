import { TestingAttributes } from './shared/test';
import { DOMAttributes, StyleProps, ValidPositiveInteger } from './shared';

export interface InputProps extends StyleProps, DOMAttributes, TestingAttributes {
    /** Defines a string value that labels the current element. */
    'aria-label'?: string,
    /** Id of input. */
    id?: string,
    /** Name of input. */
    name?: string,
    /** Type of input. Accepts most [HTML input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) */
    type?: string,
    /** Placeholder for the input */
    placeholder?: string,
    /** Styling variant for the input */
    variant?: string,
    value?: React.InputHTMLAttributes<HTMLInputElement>['value'],
    defaultValue?: React.InputHTMLAttributes<HTMLInputElement>['defaultValue'],
    maxLength?: React.InputHTMLAttributes<HTMLInputElement>['maxLength'];
    multiple?: boolean,
    accept?: string,

}
