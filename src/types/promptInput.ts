import type { PressEvent } from '@react-types/shared';

import { IconTypeExtended } from './icon';
import { IconButtonProps } from './iconButton';
import { TextFieldProps } from './textField';

export interface PromptProps {
    attachmentProps?: object,
    value?: string,
    onFileChange?: (files: FileProps[]) => void,
    onCancel?: (event: PressEvent | KeyboardEvent) => void,
    onSubmit?: (event: PressEvent | KeyboardEvent, value?: string) => void,
    isLoading?: boolean,
    uploadButtonContainerProps?: object,
    uploadButtonProps?: object,
    fileInputButtonProps?: object,
    isFullScreen?: boolean,
}

export interface PromptInputProps extends TextFieldProps, PromptProps {
    onKeyUp?: (e: React.KeyboardEvent, value?: string) => void;
    onKeyDown?: (e: React.KeyboardEvent, value?: string) => void;
}

export interface AttachmentProps {
    title: string,
    isFullScreen?: boolean,
    fileType: string,
    removeFile: (id: string) => void,
    id: string,
    className?: string,
    containerProps?: object,
    iconWrapperProps?: object,
    deleteButtonProps?: object,
    icon?: IconTypeExtended
}

export interface FileProps {
    id: string,
    name: string,
    downloadLink: string,
    fileType: string,
    status: string,
    fileObj: object
}

export interface PromptUploadButtonProps extends PromptProps, Omit<IconButtonProps, 'onSubmit' | 'value'> {
    uploadButtonContainerProps?: object,
}
