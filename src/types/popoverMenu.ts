import { Alignment, Axis } from './shared';

export interface PopoverMenuProps {
  children?: React.ReactNode;
  /** Alignment of the popover menu relative to the trigger. */
  align?: Alignment;
  /** Where the popover menu opens relative to its trigger. */
  direction?: Axis;
  /** Whether the overlay is open by default (controlled). */
  isOpen?: boolean;
  /** Whether the overlay is open by default (uncontrolled). */
  isDefaultOpen?: boolean;
  /** Whether the popover is prevented from closing when a selection is made. */
  isNotClosedOnSelect?: boolean;
  closeOnSelect?: boolean;
  /**
   * Whether the popover is prevented from flipping directions when insufficient space is
   * available for the given `direction` placement.
   */
  isNotFlippable?: boolean;
  /** Whether the PopoverMenu hides the arrow. */
  hasNoArrow?: boolean;
  /** Whether the PopoverMenu contains focus inside the scope. */
  isContainFocus?: boolean;
  /**
   * Handler that is called when the overlay's open state changes.
   *
   * `(isOpen: boolean) => void`
   */
  onOpenChange?: (isOpen: boolean) => void;
}
