import type { PressEvent } from '@react-types/shared';

import { IconTypeExtended } from './icon';
import { TextFieldProps } from './textField';

export interface PromptInputProps extends TextFieldProps {
    attachmentProps?: object,
    value: string,
    onFileChange?: (files: FileProps[]) => void,
    onCancel?: (event: PressEvent) => void,
    onSubmit?: (event: PressEvent) => void,
    isLoading?: boolean,
    uploadButtonContainerProps?: object,
    uploadButtonProps?: object,
    fileInputButtonProps?: object,
    isFullScreen?: boolean,
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

export interface PromptUploadButtonProps {
    uploadButtonContainerProps?: object,
    value: string,
    isLoading?: boolean,
    onSubmit?: (event: PressEvent) => void
    onCancel?: (event: PressEvent) => void
}
