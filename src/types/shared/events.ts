import type { HoverEvents, PressEvents } from '@react-types/shared';

// export type PressProps = Omit<PressEvents, 'onClick'> & {
//   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
// };
export type PressProps = PressEvents

export interface HoverProps extends HoverEvents {
  isHovered?: boolean;
}
