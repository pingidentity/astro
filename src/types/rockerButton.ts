import type { AriaToggleButtonProps } from '@react-types/button';
import { StylePropertyValue } from 'theme-ui';

type SelectedStyles = {
    bg?: StylePropertyValue<string | undefined>
}

type RockerButtonItem = {
    key: string
    props: { selectedStyles?: {bg?: StylePropertyValue<string | undefined>}}
}

export interface RockerButtonProps extends AriaToggleButtonProps {
    className?: string
    name: string
    title?: string
    key: string
    selectedStyles?: SelectedStyles
}
