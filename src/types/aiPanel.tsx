import { BoxProps } from './box';
import { IconButtonProps } from './iconButton';
import { OverlayPanelProps, OverlayPanelState } from './overlayPanel';

interface SharedAIPanelProps {
    isExpanded?: boolean,
    setIsExpanded?: (isExpanded: boolean) => void
    onPanelClose?: () => void,
}

export interface AIPanelProps extends OverlayPanelProps, SharedAIPanelProps {
    headerProps?: object,
    state: OverlayPanelState;
}

export interface AIPanelHeaderProps extends BoxProps, SharedAIPanelProps {
    onClose?: () => void
    setIsExpanded?: (isExpanded: boolean) => void
    isExpanded?: boolean
    onPanelClose?: () => void
    expandButtonProps?: IconButtonProps
    closeButtonProps?: IconButtonProps
    slots?: {
        menuSlot?: React.ReactNode
    }
}
