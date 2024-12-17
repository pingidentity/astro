import { ReactNode } from 'react';
import { AriaRadioGroupProps } from 'react-aria';

import { SharedFieldProps } from './shared/fieldProps';

export interface RadioGroupFieldProps extends Omit<AriaRadioGroupProps, 'label'>, SharedFieldProps{
    className?: string
    id?: string
    isDisabled?: boolean
    isRequired?: boolean
    children?: ReactNode
    name?: string
    value?: string
    defaultValue?: string
    orientation?: 'horizontal' | 'vertical'
    onChange?: (value: string) => void
}
